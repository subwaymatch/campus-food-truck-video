// Thin bar along the bottom edge that fills up as the video plays.
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, height: 8, width: "100%", backgroundColor: theme.surface }}>
      <div style={{ height: "100%", width: `${(frame / (durationInFrames - 1)) * 100}%`, backgroundColor: theme.accent }} />
    </div>
  );
};
