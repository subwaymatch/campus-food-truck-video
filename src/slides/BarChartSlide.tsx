// Animated bar chart. Bars grow one after another and their labels count up.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

const ZERO_LINE = 300;
const MAX_BAR_HEIGHT = 240;

export const BarChartSlide: React.FC<{ slide: Extract<Slide, { type: "bar-chart" }> }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...slide.data.map((d) => Math.abs(d.value)), 1);
  const note = useEnter(30);
  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      <div style={{ display: "flex", gap: 56, height: 530, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: ZERO_LINE,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: theme.muted,
            opacity: 0.5,
          }}
        />
        {slide.data.map((d, i) => {
          const grow = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 200 } });
          const h = interpolate(grow, [0, 1], [0, (Math.abs(d.value) / max) * MAX_BAR_HEIGHT]);
          const shown = Math.round(d.value * grow);
          const top = d.value >= 0 ? ZERO_LINE - h : ZERO_LINE;
          const valueTop = d.value >= 0 ? Math.max(0, top - 52) : top + h + 8;
          return (
            <div key={d.label} style={{ flex: 1, position: "relative", height: 500, textAlign: "center" }}>
              <div style={{ position: "absolute", top: valueTop, left: 0, right: 0, fontSize: 40, fontWeight: 600, opacity: grow }}>
                {slide.valuePrefix ?? ""}
                {shown.toLocaleString("en-US")}
                {slide.valueSuffix ?? ""}
              </div>
              <div
                style={{
                  position: "absolute",
                  top,
                  width: "100%",
                  height: h,
                  backgroundColor: d.value < 0 ? theme.accent : i === slide.data.length - 1 ? theme.accent : theme.accent2,
                  borderRadius: d.value < 0 ? "0 0 12px 12px" : "12px 12px 0 0",
                }}
              />
              <div style={{ position: "absolute", top: 480, left: 0, right: 0, fontSize: 36, color: theme.muted }}>
                {d.label}
              </div>
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
