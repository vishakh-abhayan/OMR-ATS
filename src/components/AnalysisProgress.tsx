import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  status: string;
  onComplete: () => void;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ status, onComplete }) => {
  const [dots, setDots] = useState('');

  // Animate dots for loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-8">
      <div className="relative">
        <Loader2 className="h-16 w-16 animate-spin text-balck" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Analyzing Your Resume</h3>
        <p className="text-sm text-muted-foreground">
          {status}{status.includes('...') ? '' : dots}
        </p>
      </div>
      
      <div className="w-full">
        <div className="text-xs text-center text-muted-foreground">
          This typically takes 15-30 seconds
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;