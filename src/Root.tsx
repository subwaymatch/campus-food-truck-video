// Registers the video ("composition") that GitHub Actions renders.
// Size: 1920 x 1080 (1080p), 30 frames per second. Length comes from the slides in content.ts.
import React from "react";
import { Composition } from "remotion";
import { Presentation } from "./Presentation";
import { FPS, totalFrames } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Presentation"
      component={Presentation}
      durationInFrames={totalFrames()}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
