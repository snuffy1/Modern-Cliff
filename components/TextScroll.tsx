"use client";

import { TextScroll } from "./ui/text-scroll";

export default function TextScrollDemo() {
  return (
    <div className="h-[30vh] mb-50 mt-50">
      <TextScroll
        className="font-display text-center text-4xl font-semibold tracking-tighter text-white dark:text-white md:text-7xl md:leading-[5rem]"
        text="CLIFF"
        default_velocity={5}
      />
    </div>
  );
}
