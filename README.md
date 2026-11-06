# Presentation video starter

Make a short business presentation video with [Remotion](https://www.remotion.dev) and a coding agent, without installing anything on your computer.

Remotion turns React code into video. You describe what you want, your coding agent (GitHub Copilot, ChatGPT Codex, Claude Code or another agent) writes the code, and GitHub renders the video and publishes it for you.

## How it works

1. You give your coding agent one small task, such as "Add a slide that compares the three pricing plans."
2. The agent edits the project and opens a pull request.
3. GitHub Actions renders the video for the pull request. A green check means the video built.
4. You merge the pull request into `main`. GitHub Actions renders the video again and publishes it to your GitHub Pages site.

Repeat with the next small task until the video is done.

## Set up (once)

1. Click **Use this template**, then **Create a new repository**. Make it **Public**.
2. In your new repository, open **Settings**, then **Pages**, and set **Source** to **GitHub Actions**.
3. Open **Actions**, click **Render and publish video**, then **Run workflow**. The first run, from before Pages was on, fails; that is expected.
4. After a few minutes your video is at `https://your-username.github.io/your-repo-name/`.

## What is in the repository

| Path | What it is |
|---|---|
| `src/content.ts` | The words, numbers and timing of every slide. Most changes start here. |
| `src/slides/` | One React component per slide type: title, bullets, stat, bar chart, closing. |
| `src/theme.ts` | Colors and font. |
| `src/Root.tsx`, `src/timing.ts` | Video size (1920 x 1080), frame rate (30 fps) and length. |
| `public/` | Images, audio and fonts used in the video, plus `CREDITS.md`. |
| `site/index.html` | The web page that plays the video on GitHub Pages. |
| `.github/workflows/render.yml` | Renders the video on every pull request and publishes it on every push to `main`. |
| `AGENTS.md` | Instructions that coding agents read before they work on the project. |
| `AGENT_LOG.md` | Your record of what you asked the agent and what you checked. |

## Adding your own images or audio

Open the `public` folder on GitHub, click **Add file**, then **Upload files**, and commit. Then ask your agent to use the file, for example "Show public/team-photo.jpg on the title slide." Record where each file came from, and its license, in `public/CREDITS.md`. Only use files you made yourself or that are free to reuse.

## Licenses

- Remotion is not open source. Its [license](https://www.remotion.dev/license) lets individuals use it for free. Companies with more than three people need a paid license, so read the license before you use Remotion outside this course.
- The Inter font in `public/fonts` is under the SIL Open Font License (`public/fonts/OFL.txt`).
