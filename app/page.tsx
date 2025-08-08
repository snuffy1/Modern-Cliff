"use client";
import React from "react";
import Demo from "@/components/Demo";
// import Hero from "@/components/Hero";
import BgAttached from "@/components/bg-attachment/BgAttached";
import Glass from "@/components/Glass";
import MagicReveal from "@/components/MagicReveal";
import Footer from "@/components/Footer";
import ScrollCarousel from "@/components/features/ScrollCarousel";
import MansoryLayout from "@/components/features/MansoryLayout";
import Loading from "@/components/PreLoader/Loading";
import CliffFeatures from "@/components/features/CliffFeatures";
import Feature from "@/components/features/Feature";

const Page = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 9000);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative">
          {/* <Display /> */}
          <div className="sticky top-0 z-0">
            <Glass />
          </div>
          <Demo />
          <BgAttached bgImage="./Divider/divider.png" />
          <Feature />
          {/* <CliffFeatures /> */}
          {/* <MansoryLayout /> */}
          <MagicReveal />
          <ScrollCarousel />
          <BgAttached bgImage="./ai1.jpg" />
          <div className="z-20">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
