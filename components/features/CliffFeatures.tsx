"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
  bgImage: string;
}

const CliffFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      title: "UV 400 Protection",
      description:
        "Blocks 100% of harmful UVA and UVB rays for optimal eye safety.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/Bluesafe-scaled.jpg",
    },
    {
      title: "Anti-Reflective Coating",
      description:
        "Reduces glare and eye strain for clearer vision in all conditions.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/PhotoZ-2-scaled.jpg",
    },
    {
      title: "Scratch-Resistant",
      description: "Durable coating ensures long-lasting clarity and wear.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-12-03-at-2.32.13-PM.jpeg",
    },
    {
      title: "Lightweight Design",
      description:
        "Ultra-comfortable frames that you can wear all day without fatigue.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/progressive-1.jpg",
    },
  ];

  const getGridSpanClass = (index: number): string => {
    const spans = [
      "md:col-span-2",
      "md:col-span-1",
      "md:col-span-1",
      "md:col-span-2",
    ];
    return spans[index] || "md:col-span-1";
  };

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
            // This is the key change. "reverse" on the 4th action (onLeaveBack).
            // It means: play, none, none, reverse
            toggleActions: "play none none reverse",
            // markers: true, // You can re-enable this for debugging trigger points
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={mainRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/eyewear-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light font-ramro text-white mb-4">
            Cliff lenses, crafted{" "}
            <span className="text-yellow-400"> just for you.</span>
          </h2>
        </div>

        <div className="grid-container grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8 h-auto md:h-[50rem]">
          {features.map((feature: Feature, index: number) => (
            <div
              key={index}
              className={`
                feature-card
                ${getGridSpanClass(index)}
                relative bg-white/10 backdrop-blur-md rounded-xl 
                border border-white/20 hover:border-white/40 
                transition-all duration-300 hover:scale-[1.02] 
                overflow-hidden group flex flex-col min-h-[300px]
              `}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.bgImage})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="relative z-10 mt-auto p-8">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CliffFeatures;
