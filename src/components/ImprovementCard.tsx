// src/components/ImprovementCard.tsx
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ImprovementCardProps {
  title: string;
  description: string;
  status: 'good' | 'warning' | 'poor';
  actionItem?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
}

const ImprovementCard: React.FC<ImprovementCardProps> = ({
  title,
  description,
  status,
  actionItem,
  priority,
  category
}) => {
  const statusConfig = {
    good: {
      icon: <CheckCircle className="h-5 w-5 text-resume-success" />,
      bgColor: 'bg-resume-success/5',
      borderColor: 'border-resume-success/20'
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-resume-warning" />,
      bgColor: 'bg-resume-warning/5',
      borderColor: 'border-resume-warning/20'
    },
    poor: {
      icon: <XCircle className="h-5 w-5 text-resume-error" />,
      bgColor: 'bg-resume-error/5',
      borderColor: 'border-resume-error/20'
    }
  };

  const priorityColors = {
    high: 'bg-resume-error text-white',
    medium: 'bg-resume-warning text-white',
    low: 'bg-gray-500 text-white'
  };

  const { icon, bgColor, borderColor } = statusConfig[status];

  return (
    <div className={cn(
      "p-4 border rounded-lg transition-all animate-fade-in hover:shadow-md",
      bgColor,
      borderColor
    )}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {icon}
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{title}</h3>
            <div className="flex items-center space-x-2">
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              {priority && (
                <Badge className={cn("text-xs", priorityColors[priority])}>
                  {priority}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          
          {actionItem && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-resume-primary">Recommendation</span>
                {status !== 'good' && (
                  <a href="https://ohmyresume.com">
                    <button className="text-xs text-resume-primary hover:underline">
                    Apply Fix
                  </button>
                  </a>
                )}
              </div>
              <p className="text-xs italic bg-background/50 p-2 rounded border">
                {actionItem}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovementCard;