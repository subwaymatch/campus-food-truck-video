// Colors and font for the whole video. Change these to restyle every slide at once.
// The Inter font files are in public/fonts (SIL Open Font License, see public/fonts/OFL.txt),
// so rendering does not depend on downloading fonts from the internet.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const fontFamily = "Inter";

for (const [file, weight] of [
  ["Inter-Regular.otf", "400"],
  ["Inter-SemiBold.otf", "600"],
  ["Inter-ExtraBold.otf", "800"],
] as const) {
  loadFont({ family: fontFamily, url: staticFile(`fonts/${file}`), weight });
}

export const theme = {
  fontFamily,
  background: "#0f1b2d",
  surface: "#16263d",
  text: "#f4f6fa",
  muted: "#a9b4c6",
  accent: "#ff8a3d",
  accent2: "#4cc9a6",
};
