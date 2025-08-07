"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section",
        start: "center 70%",
        end: "center 50%",
        scrub: true,
        markers: false,
        pin: true,
      },
    });
    timeline.set(".h1", {
      opacity: 0,
    });
    timeline.fromTo(
      ".h1",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        ease: "power2.inOut",
      }
    );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section",
        start: "center 70%",
        end: "center 40%",
        scrub: true,
        markers: false,
      },
    });
    timeline.fromTo(
      ".h2",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "back.inOut",
      }
    );
  }, []);
  return (
    <div className="flex flex-col text-5xl text-center justify-center font-semibold items-center min-h-screen">
      <h1 className="h1 my-12 opacity-0">hello</h1>
      <p className="h2 opacity-0">Lorem ipsum dolor sit amet.</p>
    </div>
  );
};

export default Page;
