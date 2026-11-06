// Puts the slides from content.ts in order, with a short fade between them.
import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Slide, video } from "./content";
import { theme } from "./theme";
import { slideFrames, TRANSITION_FRAMES } from "./timing";
import { TitleSlide } from "./slides/TitleSlide";
import { BulletsSlide } from "./slides/BulletsSlide";
import { StatSlide } from "./slides/StatSlide";
import { BarChartSlide } from "./slides/BarChartSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { ProgressBar } from "./slides/ProgressBar";

const renderSlide = (slide: Slide) => {
  switch (slide.type) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "bullets":
      return <BulletsSlide slide={slide} />;
    case "stat":
      return <StatSlide slide={slide} />;
    case "bar-chart":
      return <BarChartSlide slide={slide} />;
    case "closing":
      return <ClosingSlide slide={slide} />;
  }
};

export const Presentation: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        fontFamily: theme.fontFamily,
      }}
    >
      <TransitionSeries>
        {video.slides.flatMap((slide, i) => [
          ...(i > 0
            ? [
                <TransitionSeries.Transition
                  key={`t${i}`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />,
              ]
            : []),
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={slideFrames(slide)}>
            {renderSlide(slide)}
          </TransitionSeries.Sequence>,
        ])}
      </TransitionSeries>
      <ProgressBar />
    </AbsoluteFill>
  );
};
