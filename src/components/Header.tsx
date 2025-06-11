import { AlignJustify, X } from 'lucide-react';
import Logo from "@/assets/SaaSLogo.webp";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from './ui/button';

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
    <header className={`sticky top-0 backdrop-blur-md z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-background/95 border-border" : "bg-background/80 border-transparent"
      }`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              {/* <img src={Logo} height={40} width={40} alt="ohmyresume logo" className="rounded-lg" /> */}
              <h1 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                OhMyResume
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="/about" className="text-foreground/70 hover:text-foreground transition-colors">
              About
            </a>
            <a href="https://blog.ohmyresume.com" className="text-foreground/70 hover:text-foreground transition-colors">
              Blog
            </a>
            <ThemeToggle />
            <a aria-label="Join our early access waitlist" href="https://ohmyresume.com">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-primary/90 transition-colors">
                Update CV
              </button>
            </a>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignJustify className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="/about" className="text-foreground/70 hover:text-foreground transition-colors py-2">
                    About
                  </a>
                  <a href="https://blog.ohmyresume.com" className="text-foreground/70 hover:text-foreground transition-colors py-2">
                    Blog
                  </a>
                  <a aria-label="Join our early access waitlist" href="https://ohmyresume.com" className="mt-4">
                    <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-primary/90 transition-colors">
                      Update CV
                    </button>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;