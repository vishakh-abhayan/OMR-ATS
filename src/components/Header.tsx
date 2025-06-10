
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
    <header  className={`sticky top-0 backdrop-blur-sm z-20 transition-colors duration-300 ${
        isScrolled ? "bg-transparent" : "bg-white"
      }`}>
       {/* <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Be among the first to experience AI powered resume creation
        </p>
        <div className="inline-flex gap-1 items-center">
          <a aria-label="Join our early access waitlist" href="/waitlist">
            Join waitlist for free
          </a>
          {/* <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" /> */}
        {/* </div>
      </div>
       */} 
  

            <div
        className={`py-5 transition-colors duration-300 ${
          isScrolled ? "bg-transparent" : "bg-white"
        }`}
      >
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



    // <header
    //   className={`sticky top-0 backdrop-blur-sm z-20 transition-colors duration-300 ${
    //     isScrolled ? "bg-transparent" : "bg-[#D2DCFF]"
    //   }`}
    // >
    //   <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
    //     <p className="text-white/60 hidden md:block">
    //       Be among the first to experience AI powered resume creation
    //     </p>
    //     <div className="inline-flex gap-1 items-center">
    //       <a aria-label="Join our early access waitlist" href="/waitlist">
    //         Join waitlist for free
    //       </a>
    //       <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
    //     </div>
    //   </div>

    //   <div
    //     className={`py-5 transition-colors duration-300 ${
    //       isScrolled ? "bg-transparent" : "bg-[#D2DCFF]"
    //     }`}
    //   >
    //     <div className="container">
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center">
    //           <a href="/" className="flex items-center">
    //             <Image src={Logo} alt="Saas Logo" height={40} width={40} />
    //             <h1 className="text-2xl font-bold">OhMyResume</h1>
    //           </a>
    //         </div>
    //         <MenuIcon className="h-5 w-5 md:hidden" />

    //         <nav className="hidden md:flex gap-6 text-black/60 items-center">
    //           <a href="/about">About</a>
    //           <a href="#">Features</a>
    //           <a href="https://blog.ohmyresume.com">blog</a>
    //           <a aria-label="Join our early access waitlist" href="/waitlist">
    //             <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
    //               join waitlist
    //             </button>
    //           </a>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    // </header>