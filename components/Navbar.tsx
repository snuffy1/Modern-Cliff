"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Volume2 } from "lucide-react";
import gsap from "gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const closeMenu = (onCompleteCallback?: () => void) => {
    const menuLinks = gsap.utils.toArray(".menu-link");
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        if (onCompleteCallback) {
          onCompleteCallback();
        }
      },
    });

    tl.to(menuLinks, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: -0.05,
      ease: "power2.in",
    });

    tl.to(
      menuRef.current,
      {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.2"
    );
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (pathname === href) {
      closeMenu();
      return;
    }
    closeMenu(() => router.push(href));
  };

  useEffect(() => {
    if (isOpen) {
      const menuLinks = gsap.utils.toArray(".menu-link");
      gsap.set(menuLinks, { opacity: 0, y: 20 });

      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 1.2,
        ease: "power3.inOut",
      });
      tl.to(
        menuLinks,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { clipPath: "circle(0% at 100% 0%)" });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 flex items-center justify-between">
        <a
          href="#"
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="106"
            height="33"
            viewBox="0 0 106 33"
            fill="currentColor"
          >
            <path d="M15.5938 6.19486L25.8391 16.4402C26.4047 17.0058 26.4049 17.9231 25.8391 18.4891C25.2733 19.0552 24.3558 19.0555 23.79 18.4894L14.57 9.26994L5.34606 18.4928C4.77999 19.0589 3.86243 19.0589 3.29662 18.4928C2.73055 17.9267 2.73055 17.0094 3.29662 16.4434L13.5446 6.19486C14.1104 5.62906 15.0277 5.62906 15.5935 6.19486H15.5938Z"></path>
            <path d="M29.9363 14.3917C29.3703 14.9575 28.4527 14.9575 27.8869 14.3917L17.6423 4.1471C17.0763 3.58104 17.0763 2.66347 17.6423 2.0974C18.2084 1.53133 19.126 1.53133 19.692 2.0974L29.9366 12.342C30.5027 12.908 30.5027 13.8259 29.9366 14.3917H29.9363Z"></path>
            <path d="M29.9392 20.537C30.5053 21.103 30.5053 22.0211 29.9392 22.5872L23.7875 28.7389C23.2217 29.3047 22.3044 29.3047 21.7386 28.7389L15.5908 22.5911C15.0244 22.0248 15.0244 21.1064 15.5908 20.5401C16.1571 19.9738 17.0752 19.9738 17.6415 20.5401L22.7647 25.6615L27.8895 20.537C28.4556 19.9709 29.3734 19.9706 29.9397 20.537H29.9392Z"></path>
            <path d="M15.5954 14.391C16.1609 14.9565 16.1609 15.8738 15.5951 16.4393L10.4711 21.562L15.5936 26.6844C16.1602 27.251 16.1602 28.1699 15.5936 28.7365C15.027 29.3031 14.1084 29.3031 13.5418 28.7365L7.39502 22.5898C6.83367 22.0284 6.82921 21.1208 7.38216 20.554L7.40866 20.5275L8.42275 19.5136L13.547 14.391C14.1126 13.8254 15.0296 13.8254 15.5954 14.391Z"></path>
            <path d="M45.2691 25.8995C42.957 25.8995 41.194 25.3747 39.9803 24.3249C38.7666 23.259 38.1602 21.693 38.1602 19.6265V14.3624C38.1602 12.2963 38.767 10.7381 39.9803 9.68868C41.194 8.62279 42.9567 8.08984 45.2691 8.08984C46.8761 8.08984 48.188 8.36042 49.205 8.90158C50.238 9.42631 51.058 10.2216 51.6648 11.2875L49.1803 13.0095C48.672 12.2224 48.1391 11.6566 47.5815 11.3121C47.0403 10.9677 46.2697 10.7956 45.2691 10.7956C44.0065 10.7956 43.0798 11.099 42.4894 11.7059C41.9154 12.2963 41.6284 13.1819 41.6284 14.3624V19.6265C41.6284 20.8074 41.9154 21.7008 42.4894 22.3077C43.0798 22.8981 44.0061 23.1933 45.2691 23.1933C46.3514 23.1933 47.1878 23.0131 47.7782 22.6522C48.385 22.2748 48.9262 21.6766 49.4016 20.8563L51.8615 22.6764C51.3367 23.4307 50.7956 24.0375 50.238 24.4966C49.6804 24.9556 48.9997 25.3083 48.1962 25.5542C47.4091 25.7838 46.4335 25.8987 45.2691 25.8987V25.8995ZM59.8243 25.6043C57.7254 25.6043 56.2165 25.1452 55.298 24.2267C54.3959 23.3083 53.9451 21.98 53.9451 20.242V8.38543H57.4134V20.242C57.4134 21.144 57.6104 21.8162 58.0038 22.2588C58.3971 22.685 59.004 22.8985 59.8239 22.8985H65.334V25.6043H59.8239H59.8243ZM68.0364 8.38543H71.5047V25.6043H68.0364V8.38543ZM75.0603 13.7477C75.0603 12.0093 75.5357 10.681 76.487 9.76295C77.438 8.84448 79.0044 8.38543 81.1854 8.38543H86.9414V11.0912H81.1854C80.2834 11.0912 79.6112 11.3043 79.1682 11.7309C78.742 12.1571 78.5285 12.8296 78.5285 13.7481V16.134H85.8587V18.8398H78.5285V25.6043H75.0603V13.7477ZM89.2811 13.7477C89.2811 12.0093 89.7566 10.681 90.7079 9.76295C91.6592 8.84448 93.2252 8.38543 95.4062 8.38543H101.162V11.0912H95.4062C94.5042 11.0912 93.8316 11.3043 93.389 11.7309C92.9628 12.1571 92.7493 12.8296 92.7493 13.7481V16.134H100.08V18.8398H92.7493V25.6043H89.2811V13.7477Z"></path>
          </svg>
        </a>

        {/* This button is now conditionally rendered */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative z-[60] flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-sm font-semibold uppercase tracking-wider">
              Menu
            </span>
            <Menu size={24} />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 w-screen h-screen bg-[#fff] flex z-50"
          style={{ clipPath: "circle(0% at 100% 0%)" }}
        >
          {/* Left Panel */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start p-8 md:p-24 text-black">
            <div className="w-full absolute top-0 left-0 p-4 md:p-6 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">1.00x</span>
              </div>
              <div className="flex items-center space-x-4 md:space-x-6">
                <Volume2 size={24} className="text-gray-400" />
                <button
                  onClick={() => closeMenu()}
                  className="flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider text-black"
                >
                  <span>Close</span>
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`menu-link text-5xl md:text-7xl font-bold uppercase tracking-wider ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600"
                        : "text-gray-700 hover:text-black transition-colors duration-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Panel with Image */}
          <div className="hidden md:block w-1/2 h-full relative">
            <img
              src="/lense.svg"
              alt="Decorative lens flare"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
