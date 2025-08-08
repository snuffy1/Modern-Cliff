"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
  bgImage: string;
  gridClass: string;
}

const MansoryLayout: React.FC = () => {
  const features: Feature[] = [
    {
      title: "UV 400 Protection",
      description:
        "Blocks 100% of harmful UVA and UVB rays for optimal eye safety.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/Bluesafe-scaled.jpg",
      gridClass: "row-span-2",
    },
    {
      title: "Anti-Reflective Coating",
      description:
        "Reduces glare and eye strain for clearer vision in all conditions.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/PhotoZ-2-scaled.jpg",
      gridClass: "col-start-2 row-start-1 row-span-3",
    },
    {
      title: "Scratch-Resistant",
      description: "Durable coating ensures long-lasting clarity and wear.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-12-03-at-2.32.13-PM.jpeg",
      gridClass: "row-start-3 row-span-2",
    },
    {
      title: "Forest Solitude",
      description: "Find peace in the quiet depths of the ancient woods.",
      bgImage: "https://images.unsplash.com/photo-1448375240586-882707db888b",
      gridClass: "col-start-2 row-start-4 row-span-3",
    },
    {
      title: "Lightweight Design",
      description:
        "Ultra-comfortable frames that you can wear all day without fatigue.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/progressive-1.jpg",
      gridClass: "row-start-5 row-span-2",
    },
  ];

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: ".grid-container",
            start: "top 80%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, mainRef);

    // Create a function to refresh ScrollTrigger
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Add an event listener to refresh ScrollTrigger once all content is loaded
    window.addEventListener("load", refreshTriggers);

    return () => {
      // Cleanup: remove the event listener and revert the GSAP context
      window.removeEventListener("load", refreshTriggers);
      ctx.revert();
    };
  }, []);

  return (
    // FIX: Removed "overflow-hidden" from the section's class list
    <section ref={mainRef} className="relative py-20">
      <div className="absolute inset-0 bg-cover bg-center" />
      <div className="absolute inset-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light font-ramro text-white mb-4">
            A Gallery of Inspiration{" "}
            <span className="text-yellow-400"> for you.</span>
          </h2>
        </div>

        <div className="grid-container grid h-auto md:h-[80rem] grid-cols-2 grid-rows-6  md:gap-2">
          {features.map((feature: Feature, index: number) => (
            <div
              key={index}
              className={`
                feature-card
                ${feature.gridClass} 
                relative bg-white/10 backdrop-blur-md rounded-xl
                border border-white/20 hover:border-white/40
                transition-all duration-300 hover:scale-[1.02]
                overflow-hidden group flex flex-col
              `}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.bgImage})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="relative z-10 mt-auto p-4 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MansoryLayout;
