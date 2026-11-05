# Setup (one time)

You need: Node 20+ (`node -v`), git, a GitHub account, and Claude Code
(`npm install -g @anthropic-ai/claude-code`, then run `claude` once to sign in).

## 1. Create the Astro project
```bash
cd ~/Projects            # or wherever you keep code
npm create astro@latest portfolio -- --template minimal --install --git --yes
cd portfolio
```

## 2. Drop in the starter kit
Unzip `portfolio-kit.zip` and copy its contents into the `portfolio/` folder
(keep the hidden `.claude/` folder — on macOS press Cmd+Shift+. in Finder to see it):
```bash
unzip ~/Downloads/portfolio-kit.zip -d /tmp/kit
cp -R /tmp/kit/portfolio-kit/. .
```
Optional, for the screenshot script:
```bash
npm i -D playwright && npx playwright install chromium
```

## 3. Check it runs
```bash
npm run dev     # open http://localhost:4321
```

## 4. Put it on GitHub
Easiest with the GitHub CLI (`brew install gh` or see cli.github.com):
```bash
gh auth login
git add -A
git commit -m "chore: astro scaffold + docs system"
gh repo create portfolio --public --source=. --push
```
No CLI? Create an empty repo named `portfolio` at github.com/new (no README), then:
```bash
git remote add origin https://github.com/<your-username>/portfolio.git
git branch -M main
git push -u origin main
```
Public vs private: public lets people see the code and your `docs/` process (good for a
case study). You can switch later in repo settings.

## 5. Deploy on Vercel
1. Sign up at vercel.com with "Continue with GitHub" (choose the free Hobby plan).
2. Add New → Project → import `portfolio`. Vercel detects Astro; keep the defaults → Deploy.
3. You get `portfolio-<something>.vercel.app`. Rename it under Settings → Domains
   (e.g. `yourname.vercel.app` if it's free).
From now on: every push to `main` deploys to production, and every other branch gets a
preview URL.

## 6. Start working
```bash
git tag -a v0.0-setup -m "Scaffold, docs system, first deploy"
git push --tags
claude
```
Inside Claude Code, try: "Read CLAUDE.md and DESIGN.md, then help me fill in the TBDs in
DESIGN.md, starting with the concept." When you finish a session, run `/log`.
