"use client";
import React, { useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MagicReveal() {
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
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
      t.fromTo(
        ".reveal-layer-",
        {
          clipPath: "inset(100% 100% 100% 100%)",
          borderRadius: "100px",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          borderRadius: "0px",
        }
      );
      t.fromTo(
        ".reveal-layer-second",
        {
          clipPath: "circle(0% at 50% 59%)",
          borderRadius: "0%",
        },
        {
          clipPath: "circle(100% at 50% 59%)",
          borderRadius: "0%",
          ease: "none",
          duration: 1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative main h-[100vh] overflow-hidden">
      {/* Background blurred image */}
      {/* <div className="h-full w-full relative">
        <Image
          src="/didi.jpg"
          alt="Blurred Image"
          fill
          objectFit="cover"
          quality={100}
        />
      </div> */}

      {/* Revealed clear image layer */}
      <div className="absolute bottom-0 left-0 right-0 reveal-layer">
        <div className="relative w-full h-full">
          <Image
            src="/ai2.jpg"
            alt="Revealed Image"
            fill
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      <div className="absolute inset-0 reveal-layer-second overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/circle.png"
            alt="Revealed Image"
            fill
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
