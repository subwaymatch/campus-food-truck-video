import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Slide } from "../content";
import { theme } from "../theme";
import { SlideFrame, useEnter } from "./Layout";

export const TitleSlide: React.FC<{ slide: Extract<Slide, { type: "title" }> }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bar = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const title = useEnter(0);
  const subtitle = useEnter(14);
  return (
    <SlideFrame>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <div style={{ ...title, fontSize: 120, fontWeight: 800, lineHeight: 1.05, maxWidth: 1500 }}>
          {slide.title}
        </div>
        <div
          style={{
            height: 10,
            width: interpolate(bar, [0, 1], [0, 320]),
            backgroundColor: theme.accent,
            borderRadius: 5,
            margin: "48px 0",
          }}
        />
        {slide.subtitle ? (
          <div style={{ ...subtitle, fontSize: 48, color: theme.muted, maxWidth: 1400 }}>{slide.subtitle}</div>
        ) : null}
      </div>
    </SlideFrame>
  );
};
