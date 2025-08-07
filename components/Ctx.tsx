import React from "react";
import Image from "next/image";

const Ctx = () => {
  return (
    <div className="flex items-center h-[100vh] justify-around max-w-7xl mx-auto bg-transparent backdrop-blur-sm">
      {/* Logo Container */}
      <div className="flex-shrink-0">
        <Image src="/logo.png" width={500} height={500} alt="Logo" />
      </div>

      {/* Action Button */}
      <button className="px-6 py-3 w-70 h-21 rounded-lg bg-[#E1AA12] text-white font-medium hover:bg-[#C9961A] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E1AA12]/50 flex items-center justify-center gap-2">
        Contact us today
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17l9.2-9.2M17 17V7H7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Ctx;
