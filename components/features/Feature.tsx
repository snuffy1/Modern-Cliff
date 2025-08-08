import React from "react";
import type { NextPage } from "next";

// --- SVG Icon Components ---
// Using inline SVGs to avoid external dependencies and closely match the design.

const ShieldIcon = () => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-gray-700"
  >
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M64 10.6667C64 10.6667 106.667 21.3333 106.667 64C106.667 106.667 64 117.333 64 117.333C64 117.333 21.3333 106.667 21.3333 64C21.3333 21.3333 64 10.6667 64 10.6667Z"
      stroke="rgba(160, 240, 220, 0.2)"
      strokeWidth="2"
      filter="url(#glow)"
    />
    <path
      d="M58.6667 61.3333L64 56L69.3333 61.3333V66.6667C69.3333 70.3487 66.982 73.6133 64 74.6667C61.018 73.6133 58.6667 70.3487 58.6667 66.6667V61.3333Z"
      fill="rgba(255, 255, 255, 0.1)"
    />
    <path
      d="M64 50.6667C66.9453 50.6667 69.3333 52.8213 69.3333 55.5C69.3333 58.1787 66.9453 60.3333 64 60.3333C61.0547 60.3333 58.6667 58.1787 58.6667 55.5C58.6667 52.8213 61.0547 50.6667 64 50.6667Z"
      fill="rgba(255, 255, 255, 0.1)"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-check-circle-fill text-green-400 mr-2"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);

// --- Individual Card Components ---

const CheckingSavingsCard = () => (
  <div className="bg-[#1c1c1e] rounded-2xl p-8 flex flex-col justify-end min-h-[350px] relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center opacity-50">
      <div className="relative w-full h-full">
        <img src="/c6.jpeg" alt="sas" />
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-xl font-semibold text-white mb-2">
        Checking and Savings
      </h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Free domestic wires and ACH transfers for Pro users, up to 1.89% APY,
        and millions in FDIC insurance.²
      </p>
    </div>
  </div>
);

const WorkingCapitalCard = () => (
  <div className="bg-[#1c1c1e] rounded-2xl p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden">
    {/* Background graph simulation */}
    <div className="absolute inset-0 opacity-50">
      <img src="/c5.jpeg" alt="s" />
    </div>
    <div className="relative z-10 mt-auto">
      <h3 className="text-xl font-semibold text-white mb-2">Working Capital</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Apply for business financing, term loans, and lines of credit through
        our partners.
      </p>
    </div>
  </div>
);

const CorporateCardsCard = () => (
  <div className="bg-[#1c1c1e] rounded-2xl p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden">
    {/* Background graph simulation */}
    <div className="absolute inset-0 opacity-50">
      <img src="/c5.jpeg" alt="s" />
    </div>
    <div className="relative z-10 mt-auto">
      <h3 className="text-xl font-semibold text-white mb-2">Working Capital</h3>
      <p className="text-gray-400 text-sm max-w-xs">
        Apply for business financing, term loans, and lines of credit through
        our partners.
      </p>
    </div>
  </div>
);

// --- Main Page Component ---

const Feature: NextPage = () => {
  return (
    <div className="bg-black min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
            A <span className="italic">strong</span> financial foundation
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            High-yield accounts, unlimited 2% cashback cards for Pro customers,
            and flexible working capital to fuel your business.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckingSavingsCard />
          <WorkingCapitalCard />
          <CorporateCardsCard />
          <CheckingSavingsCard />
        </main>
      </div>
    </div>
  );
};

export default Feature;
