// Shared slide frame: background, padding and the author name in the corner.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { video } from "../content";
import { theme } from "../theme";

export const SlideFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.background, padding: "110px 140px" }}>
      {children}
      <div
        style={{
          position: "absolute",
          left: 140,
          bottom: 52,
          fontSize: 26,
          color: theme.muted,
          letterSpacing: 0.5,
        }}
      >
        {video.author}
      </div>
    </AbsoluteFill>
  );
};

// Fade and slide up, starting `delay` frames into the slide.
export const useEnter = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
  };
};

export const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const style = useEnter(0);
  return (
    <div style={{ ...style, fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginBottom: 60 }}>
      {children}
    </div>
  );
};
