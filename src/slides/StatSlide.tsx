import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

export const StatSlide: React.FC<{ slide: Extract<Slide, { type: "stat" }> }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const caption = useEnter(24);
  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      <div
        style={{
          fontSize: 230,
          fontWeight: 800,
          color: theme.accent,
          transform: `scale(${pop})`,
          transformOrigin: "left center",
          lineHeight: 1,
        }}
      >
        {slide.value}
      </div>
      <div style={{ ...caption, fontSize: 50, color: theme.muted, marginTop: 40, maxWidth: 1400 }}>
        {slide.caption}
      </div>
    </SlideFrame>
  );
};
