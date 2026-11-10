---
title: Physics engine
slug: physics-engine
year: "2026"
role: Solo developer
team: Personal project
stack: [JavaScript, HTML5 Canvas]
summary: A 2D rigid-body physics engine written from scratch in JavaScript, with rotation, friction and polygon collisions for hundreds of objects at a smooth 60 fps.
links:
  - { label: demo, url: "https://jakejacobi14.github.io/physics-engine/" }
  - { label: github, url: "https://github.com/JakeJacobi14/physics-engine" }
demo: "https://jakejacobi14.github.io/physics-engine/"
cover: ./images/physics-engine-cover.jpg
coverAlt: "The physics engine's sandbox: hundreds of colored circles, squares and triangles piled up, with sliders for radius, bounciness, friction and mass below."
order: 3
---

## Problem

I'd used the built-in physics in Unity and Pygame for years without knowing how any of it worked.
I wanted to understand what mass, friction and bounciness actually do to an object, so I spent
about four weeks of summer 2026 writing a 2D physics engine from scratch. The original plan was
circles only, but by the end it handled polygons too.

## What I did

<video controls muted playsinline preload="none" width="1662" height="1080" poster="/work/physics-engine-reel-poster.jpg" aria-label="Clips of the physics engine sandbox: piles of colored circles, squares and triangles colliding, shapes funneling through static triangles, and objects stacking on static platforms.">
  <source src="/work/physics-engine-reel.mp4" type="video/mp4" />
</video>

- Detected collisions with the Separating Axis Theorem for circles and any convex polygon (the sandbox spawns squares and triangles), using edge clipping to find exact contact points and penetration depths.
- Resolved collisions with impulses, a moment of inertia for each shape, and Coulomb friction with separate static and dynamic coefficients.
- Kept it fast with a bounding-radius check that skips far-apart pairs before any expensive math, and a hybrid spatial hash that puts small objects in a grid and checks large or static ones separately.
- Kept stacks stable by splitting each frame into 8 substeps with 5 solver iterations each, and by letting resting objects sleep until something hits them. This stopped jitter, sinking, and objects gaining energy from nowhere. The spatial hash and sleeping bodies were the hardest parts of the project, and both took more than one attempt.
- Built a sandbox around the engine for spawning, dragging, inspecting and deleting objects. You can pin objects in place and adjust size, mass, bounciness, friction, angle, air resistance and time scale.
- Learned from YouTube tutorials and Wikipedia, and learned JavaScript along the way.

## Result

- A working engine that runs hundreds of rotating circles, squares and triangles at a smooth 60 fps in the browser, and about 1,000 at 30 fps, with no physics library.
- My favorite part is the behavior I never wrote directly. Piles settle and shapes funnel through gaps purely because of the collision rules.
- It's one of the most technical projects I've built, and it drew on years of earlier work in Unity and Pygame.

## What I'd change

I'd design for polygons from the start. The engine was built around circles, so adding polygons
meant reworking collision detection. Next I'd add springs and joints, and eventually I'd like to
grow it into a small game engine.
