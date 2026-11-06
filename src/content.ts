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
  author: "Park",
  slides: [
    {
      type: "title",
      title: "Is a Campus Food Truck Worth It?",
      subtitle: "A six-month planning model by Park",
      seconds: 6,
    },
    {
      type: "bullets",
      heading: "Why the question matters",
      bullets: [
        "An $85,000 startup cost makes the decision consequential.",
        "Each order must help cover food, packaging, and monthly bills.",
        "The test: can daily demand support sustainable operations?",
      ],
      seconds: 9,
    },
    {
      type: "bullets",
      heading: "Planning assumptions",
      bullets: [
        "$85,000 startup cost; $11 average order",
        "Food and packaging: 32% of sales",
        "$9,800 monthly fixed costs: permit, insurance, parking, fuel, two part-time staff",
        "Open 20 days per month",
        "Orders/day, months 1–6: 60, 85, 100, 115, 120, 120",
      ],
      seconds: 15,
    },
    {
      type: "stat",
      heading: "Operating break-even",
      value: "66",
      caption: "orders per open day to cover monthly fixed costs. Rounded up; excludes startup-cost recovery.",
      seconds: 8,
    },
    {
      type: "bar-chart",
      heading: "Monthly operating profit",
      data: [
        { label: "Month 1", value: -824 },
        { label: "Month 2", value: 2916 },
        { label: "Month 3", value: 5160 },
        { label: "Month 4", value: 7404 },
        { label: "Month 5", value: 8152 },
        { label: "Month 6", value: 8152 },
      ],
      valuePrefix: "$",
      note: "After food and packaging and fixed costs; excludes startup-cost recovery.",
      seconds: 12,
    },
    {
      type: "bullets",
      heading: "Recommendation: validate demand first",
      bullets: [
        "Pilot before committing the $85,000 startup cost.",
        "The plan misses operating break-even in month 1, then clears it in months 2–6.",
        "Confirm demand near 66 orders per open day and plan startup-cost recovery.",
      ],
      seconds: 10,
    },
    {
      type: "closing",
      heading: "A planning model, not a forecast",
      lines: [
        "Every number is a planning assumption.",
        "Source: Park's own planning estimates supplied for this video.",
      ],
      seconds: 7,
    },
  ],
};
