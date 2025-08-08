"use client";
import React, { useEffect } from "react";
import ScrollCarousel from "@/components/features/ScrollCarousel";
import MagicReveal from "@/components/MagicReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Merge = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          //   markers: true,
        },
      });
      t.fromTo(
        ".reveal-layer",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          height: "50vh",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          height: "100vh",
        }
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative main h-screen overflow-hidden">
      <div>
        <MagicReveal />
      </div>
      <div className="absolute bottom-0 left-0 right-0 reveal-layer">
        <ScrollCarousel />
      </div>
    </div>
  );
};

export default Merge;
