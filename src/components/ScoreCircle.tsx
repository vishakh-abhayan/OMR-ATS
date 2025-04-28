
import React, { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
  label?: string;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ 
  score, 
  size = 'md', 
  showAnimation = true,
  label
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Map size to dimensions
  const dimensions = {
    sm: { size: 60, thickness: 4, fontSize: 'text-sm', labelSize: 'text-xs' },
    md: { size: 120, thickness: 8, fontSize: 'text-2xl', labelSize: 'text-sm' },
    lg: { size: 180, thickness: 12, fontSize: 'text-4xl', labelSize: 'text-base' }
  };
  
  const { size: circleSize, thickness, fontSize, labelSize } = dimensions[size];
  const radius = circleSize / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * animatedScore) / 100;
  
  // Color based on score
  const getColor = () => {
    if (animatedScore >= 80) return '#4CAF50'; // Green for good scores
    if (animatedScore >= 60) return '#FFC107'; // Yellow for medium scores
    return '#ea384c'; // Red for poor scores
  };

  useEffect(() => {
    if (showAnimation) {
      const duration = 1000; // Animation duration in ms
      const steps = 60; // Number of steps in animation
      const increment = score / steps;
      let current = 0;
      let timer = 0;
      
      const interval = setInterval(() => {
        timer++;
        current += increment;
        
        if (timer >= steps || current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.min(current, score));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    } else {
      setAnimatedScore(score);
    }
  }, [score, showAnimation]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: circleSize, height: circleSize }}>
        <svg 
          width={circleSize} 
          height={circleSize} 
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          <circle 
            cx={circleSize / 2} 
            cy={circleSize / 2} 
            r={radius}
            className="stroke-muted/30"
            fill="none" 
            strokeWidth={thickness}
          />
          <circle 
            cx={circleSize / 2} 
            cy={circleSize / 2} 
            r={radius}
            fill="none" 
            stroke={getColor()}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            className={showAnimation ? "transition-all duration-1000" : ""}
          />
          <text 
            x="50%" 
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className={`${fontSize} font-bold`}
            fill="currentColor"
          >
            {Math.round(animatedScore)}
          </text>
          <text 
            x="50%" 
            y="65%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xs opacity-70"
            fill="currentColor"
          >
            /100
          </text>
        </svg>
      </div>
      {label && <p className={`${labelSize} text-center mt-2 font-medium`}>{label}</p>}
    </div>
  );
};

export default ScoreCircle;
