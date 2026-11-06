// Animated bar chart. Bars grow one after another and their labels count up.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

const CHART_HEIGHT = 470;

export const BarChartSlide: React.FC<{ slide: Extract<Slide, { type: "bar-chart" }> }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...slide.data.map((d) => d.value), 1);
  const note = useEnter(30);
  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 56, height: CHART_HEIGHT + 120 }}>
        {slide.data.map((d, i) => {
          const grow = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 200 } });
          const h = interpolate(grow, [0, 1], [0, (d.value / max) * CHART_HEIGHT]);
          const shown = Math.round(d.value * grow);
          return (
            <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 600, marginBottom: 16, opacity: grow }}>
                {slide.valuePrefix ?? ""}
                {shown.toLocaleString("en-US")}
                {slide.valueSuffix ?? ""}
              </div>
              <div
                style={{
                  width: "100%",
                  height: h,
                  backgroundColor: i === slide.data.length - 1 ? theme.accent : theme.accent2,
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div style={{ fontSize: 36, color: theme.muted, marginTop: 20 }}>{d.label}</div>
            </div>
          );
        })}
      </div>
      {slide.note ? (
        <div style={{ ...note, fontSize: 30, color: theme.muted, marginTop: 30 }}>{slide.note}</div>
      ) : null}
    </SlideFrame>
  );
};
