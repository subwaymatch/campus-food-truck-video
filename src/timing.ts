// Frame math for the whole video. 30 frames = 1 second.
import { Slide, video } from "./content";

export const FPS = 30;
export const TRANSITION_FRAMES = 15; // length of the fade between slides

export const slideFrames = (slide: Slide) => Math.round(slide.seconds * FPS);

// Fades overlap the end of one slide with the start of the next, so they shorten the total.
export const totalFrames = () =>
  video.slides.reduce((sum, slide) => sum + slideFrames(slide), 0) -
  TRANSITION_FRAMES * Math.max(0, video.slides.length - 1);
