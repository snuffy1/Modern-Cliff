"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/Card";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!container || !cards) return;

    // Get the scroll width
    const scrollWidth = cards.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate cards moving right to left
    tl.to(cards, {
      x: -scrollWidth,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const cardData = [
    {
      id: 1,
      category: "Single Vision",
      title: "You can do more with AI.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-02-at-3.49.12-PM.jpeg",
      isSmaller: true,
    },
    {
      id: 2,
      category: "Technologys",
      title: "Enhance your productivity.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/premium_photo-1664477083130-9566b4d74b62-transformed.webp",
      isSmaller: false,
    },
    {
      id: 3,
      category: "Progression",
      title: "Launching the new Apple Vision Pro.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/5164eb83-660b-459e-83eb-cff8ffd0088e.jpg",
      isSmaller: false,
    },
    {
      id: 4,
      category: "Product",
      title: "Maps for your iPhone 15 Pro Max.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2025/02/cliff-stock-lens-1.png",
      isSmaller: false,
    },
    {
      id: 5,
      category: "iOS",
      title: "Photography just got better.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/08/Bluesafe-scaled.jpg",
      isSmaller: false,
    },
  ];

  return (
    <div className="bg-transparent">
      {/* Horizontal scroll section */}
      <section ref={containerRef} className="relative overflow-hidden">
        <h1 className="text-7xl text-center font-light font-ramro mt-4">
          Why <span className="text-yellow-400"> Choose CliffLens?</span>
        </h1>
        <div
          ref={cardsRef}
          className="flex items-center gap-8 w-max px-8 py-16"
        >
          {cardData.map((card) => (
            <Card
              key={card.id}
              className={`${
                card.isSmaller ? "h-[75vh]" : "h-[75vh]"
              } w-[30vw] flex-shrink-0 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden relative rounded-3xl`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${card.bgImage})`,
                }}
              >
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              {/* Content positioned at bottom */}
              <CardContent className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                <div>
                  {/* Category Label */}
                  <div className="inline-block mb-2">
                    {/* <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
                      {card.category}
                    </span> */}
                  </div>

                  {/* Main Title */}
                  {/* <h3 className="text-2xl font-bold text-white leading-tight tracking-tight">
                    {card.title}
                  </h3> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
