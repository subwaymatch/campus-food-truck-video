import React from "react";
import { Slide } from "../content";
import { theme } from "../theme";
import { Heading, SlideFrame, useEnter } from "./Layout";

const Line: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const style = useEnter(delay);
  return <div style={{ ...style, fontSize: 40, lineHeight: 1.4, color: theme.muted, marginBottom: 24 }}>{text}</div>;
};

export const ClosingSlide: React.FC<{ slide: Extract<Slide, { type: "closing" }> }> = ({ slide }) => {
  return (
    <SlideFrame>
      <Heading>{slide.heading}</Heading>
      {slide.lines.map((text, i) => (
        <Line key={i} text={text} delay={10 + i * 10} />
      ))}
    </SlideFrame>
  );
};
