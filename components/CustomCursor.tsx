// components/CustomCursor.tsx
"use client";
import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const CustomCursor: React.FC = () => {
  // 1. Create motion values to track mouse position.
  // These values are optimized for frequent updates and won't trigger re-renders.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Use `useSpring` to create a smooth, "springy" animation.
  // The cursor will gracefully follow the mouse pointer.
  // Adjust `stiffness` and `damping` to change the animation's feel.
  const springConfig = { stiffness: 500, damping: 30, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    // Add motion values to the dependency array
  }, [mouseX, mouseY]);

  // 3. Use `useMotionTemplate` to create a dynamic CSS transform string.
  // This combines the smoothed mouse coordinates with a static transform
  // that centers the cursor element on the pointer. Animating `transform`
  // is more performant than animating `top`/`left`.
  const transform = useMotionTemplate`translate3d(${smoothMouseX}px, ${smoothMouseY}px, 0) translate3d(-50%, -50%, 0)`;

  return (
    <motion.div
      // Apply the dynamic transform for positioning.
      style={{ transform }}
      // The rest of the styling remains the same.
      className="fixed top-0 left-0 z-[9999] w-24 h-24 bg-white rounded-full pointer-events-none mix-blend-difference"
    />
  );
};

export default CustomCursor;
