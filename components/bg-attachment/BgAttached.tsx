import React from "react";

const BgAttached = () => {
  return (
    <div className="flex relative h-screen mt-96">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-20"
        style={{
          backgroundImage:
            "url('/ai1.jpg')",
          backgroundAttachment: "fixed", // Parallax effect
          filter: "brightness(0.8)", // Dark overlay for text readability
        }}
      ></div>
    </div>
  );
};

export default BgAttached;
