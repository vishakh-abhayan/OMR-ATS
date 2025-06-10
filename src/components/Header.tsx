
import { AlignJustify } from 'lucide-react';
import Logo from "@/assets/SaaSLogo.webp";
import  { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`hidden md:block sticky top-0 backdrop-blur-sm z-20 transition-colors duration-300 ${
        isScrolled ? "bg-transparent" : "bg-white"
      }`}>
      {/* Rest of your header content */}
      <div className={`py-5 transition-colors duration-300 ${
          isScrolled ? "bg-transparent" : "bg-white"
        }`}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src={Logo} height={40} width={40} alt="ohmyresume logo" />
                <h1 className="text-2xl font-bold">OhMyResume</h1>
              </a>
            </div>

            <AlignJustify className="h-5 w-5 md:hidden" />

            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/about">About</a>
              <a href="https://blog.ohmyresume.com">blog</a>
              <a aria-label="Join our early access waitlist" href="https://ohmyresume.com">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                  Update CV
                </button>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


