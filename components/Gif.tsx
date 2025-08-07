"use client";
import React, { useRef } from "react";

const Gif = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative  mt-80">
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
      </div>
      <div className="w-full h-[100vh] relative bg-gradient-to-b from-transparent to-black z-[1]"></div>
    </div>
  );
};

export default Gif;
