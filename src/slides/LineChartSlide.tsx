// Animated cumulative profit line with a labeled startup-cost threshold.
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

const WIDTH = 1640;
const HEIGHT = 560;
const LEFT = 110;
const RIGHT = 30;
const TOP = 35;
const BOTTOM = 105;

export const LineChartSlide: React.FC<{ slide: Extract<Slide, { type: "line-chart" }> }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const min = Math.min(0, ...slide.data.map((point) => point.value));
  const max = Math.max(slide.target, ...slide.data.map((point) => point.value));
  const x = (index: number) => LEFT + (index / (slide.data.length - 1)) * (WIDTH - LEFT - RIGHT);
  const y = (value: number) => TOP + ((max - value) / (max - min)) * (HEIGHT - TOP - BOTTOM);
  const points = slide.data.map((point, index) => `${x(index)},${y(point.value)}`).join(" ");
  const segmentLengths = slide.data.slice(1).map((point, index) => {
    const dx = x(index + 1) - x(index);
    const dy = y(point.value) - y(slide.data[index].value);
    return Math.hypot(dx, dy);
  });
  const pathLength = segmentLengths.reduce((sum, length) => sum + length, 0);
  const progress = interpolate(frame, [20, Math.max(21, 20 + (slide.seconds * fps - 50))], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const thresholdY = y(slide.target);
  const crossingIndex = slide.data.findIndex((point) => point.value >= slide.target);
  const crossing = crossingIndex >= 0 ? slide.data[crossingIndex] : undefined;
  const labelStyle = useEnter(20);

  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      <div style={{ position: "relative", width: "100%", height: 560 }}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <line x1={LEFT} x2={WIDTH - RIGHT} y1={thresholdY} y2={thresholdY} stroke={theme.loss} strokeWidth={4} strokeDasharray="14 12" />
          <text x={LEFT + 12} y={thresholdY - 16} fill={theme.loss} fontSize="30" fontWeight="600">{slide.targetLabel}</text>
          <polyline
            points={points}
            fill="none"
            stroke={theme.accent}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - progress)}
          />
          {slide.data.map((point, index) => (
            <g key={point.label} opacity={progress >= index / (slide.data.length - 1) ? 1 : 0}>
              <circle cx={x(index)} cy={y(point.value)} r={index === crossingIndex ? 14 : 8} fill={index === crossingIndex ? theme.accent2 : theme.accent} />
              <text x={x(index)} y={HEIGHT - 38} fill={theme.muted} fontSize="24" textAnchor="middle">{index + 1}</text>
            </g>
          ))}
          <text x={LEFT} y={HEIGHT - 2} fill={theme.muted} fontSize="24" textAnchor="middle">Month</text>
          {crossing ? (
            <g style={labelStyle}>
              <line x1={x(crossingIndex)} x2={x(crossingIndex)} y1={thresholdY} y2={y(crossing.value)} stroke={theme.accent2} strokeWidth={3} />
              <rect x={x(crossingIndex) - 230} y={y(crossing.value) - 70} width="460" height="54" rx="12" fill={theme.surface} />
              <text x={x(crossingIndex)} y={y(crossing.value) - 34} fill={theme.accent2} fontSize="30" fontWeight="600" textAnchor="middle">{slide.highlightLabel}</text>
            </g>
          ) : null}
        </svg>
      </div>
    </SlideFrame>
  );
};
