// Slim a CAD export (.glb) for the web, with no dependencies (DESIGN.md §8, ADR 0021).
// The site restyles models in its own palette, so this keeps only geometry:
//   - drops textures, images, UVs, tangents and normals (normals are rebuilt in the browser)
//   - stores identical parts once (motors, props, screws repeat)
//   - quantizes positions to 16-bit (KHR_mesh_quantization) and indices to 16-bit if they fit
//   - keeps each part's material name, so the viewer can tell carbon from metal
// Usage: node scripts/slim-model.mjs <in.glb> <out.glb>
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const [src, out] = process.argv.slice(2);
if (!src || !out) throw new Error("usage: node scripts/slim-model.mjs <in.glb> <out.glb>");

const glb = readFileSync(src);
const jsonLen = glb.readUInt32LE(12);
const j = JSON.parse(glb.subarray(20, 20 + jsonLen).toString());
const binStart = 20 + jsonLen + 8;
const bin = glb.subarray(binStart, binStart + glb.readUInt32LE(20 + jsonLen));

const SIZES = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const TYPED = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };

/** Read an accessor into a plain typed array (handles byte stride). */
function read(index) {
  const a = j.accessors[index];
  const view = j.bufferViews[a.bufferView];
  const T = TYPED[a.componentType];
  const n = SIZES[a.type];
  const offset = (view.byteOffset ?? 0) + (a.byteOffset ?? 0);
  const stride = view.byteStride ?? n * T.BYTES_PER_ELEMENT;
  const outArr = new T(a.count * n);
  for (let i = 0; i < a.count; i++) {
    for (let k = 0; k < n; k++) {
      const at = bin.byteOffset + offset + i * stride + k * T.BYTES_PER_ELEMENT;
      const dv = new DataView(bin.buffer, at, T.BYTES_PER_ELEMENT);
      outArr[i * n + k] =
        T === Float32Array ? dv.getFloat32(0, true) :
        T === Uint32Array ? dv.getUint32(0, true) :
        T === Uint16Array ? dv.getUint16(0, true) :
        T === Int16Array ? dv.getInt16(0, true) :
        T === Uint8Array ? dv.getUint8(0) : dv.getInt8(0);
    }
  }
  return outArr;
}

// ---- New binary, built up chunk by chunk ----
const chunks = [];
let size = 0;
const views = [];
const accessors = [];
function addView(bytes, target) {
  const pad = (4 - (size % 4)) % 4;
  if (pad) { chunks.push(Buffer.alloc(pad)); size += pad; }
  views.push({ buffer: 0, byteOffset: size, byteLength: bytes.byteLength, ...(target ? { target } : {}) });
  chunks.push(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
  size += bytes.byteLength;
  return views.length - 1;
}

// ---- Meshes: geometry only, deduplicated, positions quantized ----
const meshCache = new Map(); // content hash -> { mesh, scale, offset }
const meshOut = [];
const materialNames = [];
const materialIndex = new Map();
const matFor = (i) => {
  const name = (i != null && j.materials?.[i]?.name) || "default";
  if (!materialIndex.has(name)) { materialIndex.set(name, materialNames.length); materialNames.push(name); }
  return materialIndex.get(name);
};

function slimMesh(mi) {
  const prims = j.meshes[mi].primitives.map((p) => ({
    pos: read(p.attributes.POSITION),
    idx: p.indices != null ? read(p.indices) : null,
    mat: matFor(p.material),
    mode: p.mode ?? 4,
  }));
  // One box for the whole mesh, so its primitives share a dequantization transform.
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (const { pos } of prims) for (let i = 0; i < pos.length; i++) {
    min[i % 3] = Math.min(min[i % 3], pos[i]);
    max[i % 3] = Math.max(max[i % 3], pos[i]);
  }
  const offset = min.map((m, k) => (m + max[k]) / 2);
  const half = max.map((m, k) => Math.max((m - min[k]) / 2, 1e-9));
  const hash = createHash("sha1");
  const qPrims = prims.map(({ pos, idx, mat, mode }) => {
    const count = pos.length / 3;
    const q = new Int16Array(count * 4); // VEC3 of shorts, padded to 4-byte stride
    for (let i = 0; i < count; i++) for (let k = 0; k < 3; k++) {
      q[i * 4 + k] = Math.round(((pos[i * 3 + k] - offset[k]) / half[k]) * 32767);
    }
    const ind = idx ? (count <= 65535 ? Uint16Array.from(idx) : Uint32Array.from(idx)) : null;
    hash.update(Buffer.from(q.buffer)); if (ind) hash.update(Buffer.from(ind.buffer)); hash.update(String(mat));
    return { q, ind, mat, mode, count };
  });
  const key = hash.digest("hex") + offset.join() + half.join();
  if (meshCache.has(key)) return meshCache.get(key);
  const primitives = qPrims.map(({ q, ind, mat, mode, count }) => {
    const pv = addView(q, 34962);
    views[pv].byteStride = 8;
    accessors.push({ bufferView: pv, componentType: 5122, normalized: true, count, type: "VEC3", min: [-32767, -32767, -32767], max: [32767, 32767, 32767] });
    const prim = { attributes: { POSITION: accessors.length - 1 }, material: mat, mode };
    if (ind) {
      const iv = addView(ind, 34963);
      accessors.push({ bufferView: iv, componentType: ind instanceof Uint16Array ? 5123 : 5125, count: ind.length, type: "SCALAR" });
      prim.indices = accessors.length - 1;
    }
    return prim;
  });
  meshOut.push({ name: j.meshes[mi].name, primitives });
  const entry = { mesh: meshOut.length - 1, scale: half.map((h) => h), offset };
  meshCache.set(key, entry);
  return entry;
}

// ---- Nodes: same hierarchy; each mesh moves to a child node that undoes the quantization ----
const nodes = j.nodes.map((n) => {
  const { mesh, camera, skin, extensions, ...rest } = n; // CAD cameras etc. aren't kept
  return { ...rest, children: [...(n.children ?? [])] };
});
j.nodes.forEach((n, i) => {
  if (n.mesh == null) return;
  const { mesh, scale, offset } = slimMesh(n.mesh);
  nodes.push({ mesh, translation: offset, scale });
  nodes[i].children.push(nodes.length - 1);
});
for (const n of nodes) if (n.children && !n.children.length) delete n.children;

const outJson = {
  asset: { version: "2.0", generator: `slim-model.mjs (from ${j.asset?.generator ?? "unknown"})` },
  extensionsUsed: ["KHR_mesh_quantization"],
  extensionsRequired: ["KHR_mesh_quantization"],
  scene: j.scene ?? 0,
  scenes: j.scenes,
  nodes,
  meshes: meshOut,
  materials: materialNames.map((name) => ({ name })),
  accessors,
  bufferViews: views,
  buffers: [{ byteLength: size }],
};

const binOut = Buffer.concat(chunks);
const binPadded = Buffer.concat([binOut, Buffer.alloc((4 - (binOut.length % 4)) % 4)]);
let jsonBuf = Buffer.from(JSON.stringify(outJson));
jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc((4 - (jsonBuf.length % 4)) % 4, 0x20)]);
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4);
header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binPadded.length, 8);
const chunkHead = (len, type) => { const b = Buffer.alloc(8); b.writeUInt32LE(len, 0); b.writeUInt32LE(type, 4); return b; };
writeFileSync(out, Buffer.concat([header, chunkHead(jsonBuf.length, 0x4e4f534a), jsonBuf, chunkHead(binPadded.length, 0x004e4942), binPadded]));
console.log(`${src}: ${(glb.length / 1e6).toFixed(2)} MB → ${out}: ${((12 + 16 + jsonBuf.length + binPadded.length) / 1e6).toFixed(2)} MB`);
console.log(`${j.meshes.length} meshes → ${meshOut.length} unique; materials: ${materialNames.join(", ")}`);
