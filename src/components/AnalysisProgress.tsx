
import React, { useEffect, useState } from 'react';

interface AnalysisProgressProps {
  onComplete: () => void;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const steps = [
    'Extracting document content...',
    'Analyzing format and structure...',
    'Checking ATS compatibility...',
    'Evaluating content relevance...',
    'Generating recommendations...',
    'Preparing your results...'
  ];
  
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-8">
      <div className="w-32 h-32 relative">
        <svg 
          className="w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle 
            className="stroke-muted/50" 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            strokeWidth="8"
          />
          <circle 
            className="stroke-resume-primary transition-all duration-300 ease-out" 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            transform="rotate(-90 50 50)"
          />
          <text 
            x="50" 
            y="55" 
            textAnchor="middle" 
            className="text-2xl font-bold fill-foreground"
          >
            {Math.round(progress)}%
          </text>
        </svg>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Analyzing Your Resume</h3>
        <p className="text-sm text-muted-foreground">{steps[currentStep]}</p>
      </div>
      
      <div className="w-full bg-muted rounded-full h-1.5">
        <div 
          className="bg-resume-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
