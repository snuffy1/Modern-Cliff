"use client";
import React, { useRef, useState, useEffect } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Detect scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // stop blur shortly after scroll ends
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div
      className="relative h-screen flex justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 z-0 object-cover w-full h-full transition-all duration-700 ease-in-out
          ${isHovered ? "opacity-100" : "opacity-90"}
          ${isScrolling ? "blur-md" : "blur-0"}
        `}
        src="/fixed.mp4"
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default Video;
