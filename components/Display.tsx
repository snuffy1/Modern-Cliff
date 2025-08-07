"use client";
import React, { useState, useEffect, useRef } from "react";

interface HeroProps {
  className?: string;
}

const HeroSection: React.FC<HeroProps> = ({ className = "" }) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const parallaxOffset: number = scrollY * 0.5;
  const lensTransform = `translate(${mousePosition.x * 20 - 10}px, ${
    mousePosition.y * 20 - 10
  }px) rotate(${mousePosition.x * 5}deg)`;

  return (
    <div
      ref={heroRef}
      className={`relative min-h-screen overflow-hidden bg-black ${className}`}
    >
      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Left side - Content */}
        <div className="absolute z-20 w-8/12 mx-auto px-4 text-white space-y-8">
          <div className="space-y-6">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">
                Innovation • Vision • Excellence
              </span>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight uppercase">
                <span className="bg-gradient-to-r from-zinc-850 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Welcome
                </span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg">
                Pushing boundaries beyond the edge. Where innovation meets
                impossible, we create extraordinary solutions that redefine
                whats possible.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-900 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          ></div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-1100 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          ></div>
        </div>

        {/* Right side - Interactive Lens */}
        <div className="relative z-10 mt-44 flex items-center justify-center">
          <div
            ref={lensRef}
            className={`relative transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ transform: lensTransform }}
          >
            {/* Lens SVG with glow effects */}
            <div className="relative">
              <img
                src="/lense.svg"
                alt="Cliff Lens"
                className="relative z-10 w-96 h-96 lg:w-[500px] lg:h-[500px] drop-shadow-2xl transition-all duration-300 hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 0.3))",
                }}
              />

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#ffffff] rounded-full opacity-60 animate-ping"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 12}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
