
import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 px-8 border-b bg-background">
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-resume-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-resume-primary to-resume-secondary bg-clip-text text-transparent">
          Resume ATS Analyzer
        </h1>
      </div>
      
      <nav className="flex items-center space-x-4">
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          How It Works
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
        <button className="bg-resume-primary text-white px-4 py-2 rounded-md hover:bg-resume-secondary transition-colors">
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Header;
