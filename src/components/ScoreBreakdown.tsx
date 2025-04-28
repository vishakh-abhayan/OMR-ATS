
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScoreCategory {
  name: string;
  score: number;
  description: string;
}

interface ScoreBreakdownProps {
  categories: ScoreCategory[];
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  
  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };
  
  // Color logic
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-resume-success';
    if (score >= 60) return 'text-resume-warning';
    return 'text-resume-error';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-resume-success';
    if (score >= 60) return 'bg-resume-warning';
    return 'bg-resume-error';
  };

  return (
    <div className="space-y-4 w-full">
      {categories.map((category) => (
        <div key={category.name} className="border rounded-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => toggleCategory(category.name)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{category.name}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{category.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm font-semibold min-w-[36px] text-right">
                <span className={getScoreColor(category.score)}>
                  {category.score}/100
                </span>
              </div>
              {expandedCategory === category.name ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="w-full h-1 overflow-hidden">
            <div 
              className={`h-full transition-all ${getScoreBarColor(category.score)}`}
              style={{ width: `${category.score}%` }}
            />
          </div>

          {/* Expanded content */}
          {expandedCategory === category.name && (
            <div className="p-4 bg-accent/30 animate-fade-in">
              <p className="text-sm text-muted-foreground">{category.description}</p>
              {/* Additional insights could go here */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreBreakdown;
