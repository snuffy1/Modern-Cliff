"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Glass from "./Glass";

const Gif = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative">
      <div className="sticky top-0 min-h-screen flex justify-center overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          preload="auto"
          playsInline
          muted
          loop
          autoPlay
          className="w-full h-screen object-cover"
          src="/videos/fixed.mp4"
        />
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/4 -translate-y-1/4 text-white text-left w-1/2">
          <h1 className="text-5xl font-bold">See Beyond. Unlock Your Health</h1>
          <p className="mt-8 text-xl">
            Your body holds the answers — we help you see them.
          </p>
          <ul className="mt-12 text-lg space-y-4">
            <li>
              <span className="mr-2">⏱️</span> Real-Time Analysis: Fast,
              actionable insights without long wait times.
            </li>
            <li>
              <span className="mr-2">🧑‍⚕️</span> Personalized Health Insights:
              Tailored recommendations based on your unique biomarkers.
            </li>
            <li>
              <span className="mr-2">❤️</span> Holistic Health Monitoring:
              Combining physical, nutritional, and mental data for a complete
              picture.
            </li>
          </ul>
          <button className="mt-12 px-6 py-3 bg-white text-black rounded-full font-semibold">
            Join the Waitlist
          </button>
        </div>
      </div>

      <Image
        src="/foggy.webp"
        alt="Visual"
        height={400}
        width={500}
        className="relative w-full"
        priority
      />

      <div className="sticky bg-black top-0 h-auto w-full">
        <Glass />
      </div>
    </div>
  );
};

export default Gif;
