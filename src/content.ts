// The words, numbers and timing of the video live here.
// Each item in `slides` becomes one scene. `seconds` is how long the scene stays on screen.
// Slide types are drawn by the components in src/slides/. Add a new type there if you need one.

export type Slide =
  | { type: "title"; title: string; subtitle?: string; seconds: number }
  | { type: "bullets"; heading: string; bullets: string[]; seconds: number }
  | { type: "stat"; heading: string; value: string; caption: string; seconds: number }
  | {
      type: "bar-chart";
      heading: string;
      data: { label: string; value: number }[];
      valuePrefix?: string;
      valueSuffix?: string;
      note?: string;
      seconds: number;
    }
  | { type: "closing"; heading: string; lines: string[]; seconds: number };

export const video: { author: string; slides: Slide[] } = {
  author: "Your Name",
  slides: [
    {
      type: "title",
      title: "Your Presentation Title",
      subtitle: "A short video about a business topic you choose",
      seconds: 4,
    },
    {
      type: "bullets",
      heading: "How this starter works",
      bullets: [
        "Your coding agent edits src/content.ts and the slides in src/slides",
        "Every merge into main renders a new MP4 with GitHub Actions",
        "The finished video appears on your GitHub Pages site",
      ],
      seconds: 7,
    },
    {
      type: "bar-chart",
      heading: "A sample chart",
      data: [
        { label: "Q1", value: 120 },
        { label: "Q2", value: 180 },
        { label: "Q3", value: 150 },
        { label: "Q4", value: 240 },
      ],
      valueSuffix: "k",
      note: "Sample numbers, not real data. Replace them with your own.",
      seconds: 6,
    },
    {
      type: "closing",
      heading: "Sources",
      lines: ["List the source of every number in your video here."],
      seconds: 4,
    },
  ],
};
