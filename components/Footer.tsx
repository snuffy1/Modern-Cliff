import React from "react";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-transparent h-[100vh] backdrop-blur-sm flex items-end text-white  ">
      <div className="max-w-7xl mx-auto h-fit ">
        <h1 className="text-9xl mt-8 font-bold font-ramro text-center tracking-[1.1rem]">
          STAY IN TOUCH
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* COMPANY Section */}
          <div>
            {/* <h1 className="text-[#cccaca] uppercase font-semibold font-ramro mt-10 text-8xl tracking-wide">
              Home
            </h1>
            <h2 className="text-[#cccaca] font-semibold font-ramro mt-10 text-6xl  tracking-wide">
              Ophthalmic Lens
            </h2>
            <h2 className="text-[#cccaca] font-semibold font-ramro mt-10 text-7xl tracking-wide">
              Accesories
            </h2> */}
            <ul className="text-4xl font-semibold font-ramro mt-10 mx-2 space-y-2">
              <li>
                <a href="#" className="text-white hover:underline">
                  ABOUT US
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  STORIES
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  FAQ
                </a>
              </li>
            </ul>

            <div className="mt-2 ml-1.5 pt-8">
              <h3 className="text-white text-start font-semibold text-xl mb-6 tracking-wide">
                SOCIAL MEDIA
              </h3>
              <div className="flex items-start justify-start space-x-6 mb-12">
                <a
                  href="#"
                  className="text-[#7e5d03] hover:text-[#E1AA12] transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#7e5d03] hover:text-[#E1AA12] transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#7e5d03] hover:text-[#E1AA12] transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  className="text-[#7e5d03] hover:text-[#E1AA12] transition-colors"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-end justify-end gap-5">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={190}
              height={100}
            />
            <button className="px-6 py-3  rounded-full bg-[#E1AA12] text-white font-medium hover:bg-[#C9961A] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E1AA12]/50 flex items-center justify-center gap-2">
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
          {/* Logo Section - Replace with your SVG */}
          {/* <div className="flex justify-center items-start">
            <Image
              src="/lense.svg"
              alt="Company Logo"
              width={350}
              height={400}
            />
          </div> */}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 flex w-full mt-10 justify-between p-4">
          <p className="text-gray-400 text-sm">
            ©2025 Cliff. All Rights Reserved
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-400 text-sm mr-2">
              Design & Developed by:
            </span>
            <img
              src="https://www.webxnep.com/logo/logo.svg"
              alt="asa"
              height={20}
              width={50}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
