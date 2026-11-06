# Project instructions

Project: a short business presentation video made with Remotion (React). GitHub Actions renders it to an MP4 file and publishes it on GitHub Pages.

How the project is organized:
- src/content.ts holds the words, numbers and timing of every slide. Most changes start here.
- src/slides/ has one React component per slide type (title, bullets, stat, bar-chart, closing). When a slide needs a layout that does not exist yet, add a new component there and a new type in content.ts.
- src/theme.ts holds the colors and the font. src/timing.ts holds the frame math (30 frames per second, 15-frame fades between slides).
- src/Root.tsx registers the composition "Presentation" (1920 x 1080, 30 fps). Keep that ID, because the workflow renders it by name.
- public/ holds images, audio and fonts. Load them with staticFile("file-name.png"), never with an absolute path or a link to another website.
- site/ is the web page that plays the video on GitHub Pages. The workflow adds video.mp4, poster.jpg and build-info.json to it.
- .github/workflows/render.yml renders the video on every pull request, as a check, and renders and publishes it on every push to main.

Rules:
- The video should run 60 to 120 seconds unless I ask otherwise. Keep each slide on screen long enough to read: at least 4 seconds, and about 1 second for every 3 words of text.
- Never invent or estimate numbers, quotes or facts. Use only the numbers and sources I give you or that are in files in this repository, and list every source on the closing slide. If you need a number I have not given you, ask me for it.
- Use only images, icons, music and fonts that I uploaded or that are free to reuse. Record the source and license of each one in public/CREDITS.md. Don't add copyrighted music, logos or images.
- Don't call any paid API, text-to-speech or AI image service. Never put passwords, API keys or other secrets in any file.
- Remotion rules: drive every animation from useCurrentFrame() with interpolate() or spring(). Don't use CSS transitions, CSS animations, setTimeout, Math.random() or Date.now(), because they break rendering. Use Remotion's <Img>, <OffthreadVideo> and <Audio> components for media. Remotion's documentation for AI agents starts at https://www.remotion.dev/llms.txt, and Remotion's agent skills can be added with `npx skills add remotion-dev/skills` if your environment allows it.
- Keep remotion and every @remotion/* package on the same exact version, with no ^ or ~. Only add a package if you need it, and update package-lock.json with npm install.
- Work in small steps. Before a large change, describe your plan and wait for my approval.
- If you can run commands, run `npm ci`, then `npx tsc --noEmit`, and render a few frames with `npx remotion still Presentation out/check.png --frame=<number>` to check your work. Don't commit the out/ folder.
- After each change, tell me what you changed and how I can check it: the "Render video" check on the pull request, then the video on the GitHub Pages site after I merge. I don't install tools, run code or open Remotion Studio on my own computer, so don't ask me to.
