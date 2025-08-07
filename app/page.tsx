import React from "react";
import Demo from "@/components/Demo";
// import Hero from "@/components/Hero";
import BgAttached from "@/components/bg-attachment/BgAttached";
import Glass from "@/components/Glass";
import CliffFeatures from "@/components/features/CliffFeatures";
import MagicReveal from "@/components/MagicReveal";
import Footer from "@/components/Footer";
import ScrollCarousel from "@/components/features/ScrollCarousel";
const page = () => {
  return (
    <div className="relative">
      {/* <Display /> */}
      <div className="sticky top-0 z-0">
        <Glass />
      </div>
      <Demo />
      <BgAttached />
      <CliffFeatures />
      <MagicReveal />
      <ScrollCarousel />
      <BgAttached />
      <div className="z-20">
        <Footer />
      </div>
    </div>
  );
};

export default page;
