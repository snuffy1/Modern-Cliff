"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Animate image: Scale down and fade in
    gsap.from(imageRef.current, {
      scale: 2,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <Image
          fill
          ref={imageRef}
          src="/one.webp"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="sticky top-0 h-screen w-full">
        <Image
          fill
          src="/seven.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="sticky top-0 h-screen w-full">
        <Image
          fill
          src="/blurr.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Hero Image"
          className="object-cover w-full h-full "
        />
      </div>
    </div>
  );
}
