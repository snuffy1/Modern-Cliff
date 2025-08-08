import React from "react";

// Define the types for the component's props
interface BgAttachedProps {
  bgImage: string;
}

const BgAttached: React.FC<BgAttachedProps> = ({ bgImage }) => {
  return (
    <div className="flex relative h-screen mt-96">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-20"
        style={{
          // Use the bgImage prop to set the background image dynamically
          backgroundImage: `url('${bgImage}')`,
          backgroundAttachment: "fixed", // Parallax effect
          filter: "brightness(0.8)", // Dark overlay for text readability
        }}
      ></div>
    </div>
  );
};

export default BgAttached;
