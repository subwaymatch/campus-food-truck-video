import React from "react";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

const Bullet: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const style = useEnter(delay);
  return (
    <div style={{ ...style, display: "flex", alignItems: "flex-start", gap: 32, marginBottom: 40 }}>
      <div
        style={{
          width: 22,
          height: 22,
          marginTop: 18,
          borderRadius: 11,
          backgroundColor: theme.accent,
          flexShrink: 0,
        }}
      />
      <div style={{ fontSize: 50, lineHeight: 1.3 }}>{text}</div>
    </div>
  );
};

export const BulletsSlide: React.FC<{ slide: Extract<Slide, { type: "bullets" }> }> = ({ slide }) => {
  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      {slide.bullets.map((text, i) => (
        <Bullet key={i} text={text} delay={12 + i * 18} />
      ))}
    </SlideFrame>
  );
};
