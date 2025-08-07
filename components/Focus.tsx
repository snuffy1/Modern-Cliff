"use client";
import React from "react";
import { Lens } from "@/components/magicui/lens";
import Image from "next/image";
const Focus = () => {
  const [lens, setLens] = React.useState(240);

  React.useEffect(() => {
    const handleResize = () => {
      setLens(window.innerWidth < 768 ? 120 : 240);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <Lens defaultPosition={{ x: 260, y: 150 }} lensSize={lens}>
        <Image
          className="h-full w-full object-cover"
          src="/ai4.jpg"
          alt="image placeholder"
          width={1000}
          height={1000}
          quality={100}
        />
      </Lens>
    </div>
  );
};

export default Focus;
