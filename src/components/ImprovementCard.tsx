
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImprovementCardProps {
  title: string;
  description: string;
  status: 'good' | 'warning' | 'poor';
  actionItem?: string;
}

const ImprovementCard: React.FC<ImprovementCardProps> = ({
  title,
  description,
  status,
  actionItem
}) => {
  const statusConfig = {
    good: {
      icon: <CheckCircle className="h-5 w-5 text-resume-success" />,
      bgColor: 'bg-resume-success/5',
      borderColor: 'border-resume-success/20'
    },
    warning: {
      icon: <CheckCircle className="h-5 w-5 text-resume-warning" />,
      bgColor: 'bg-resume-warning/5',
      borderColor: 'border-resume-warning/20'
    },
    poor: {
      icon: <XCircle className="h-5 w-5 text-resume-error" />,
      bgColor: 'bg-resume-error/5',
      borderColor: 'border-resume-error/20'
    }
  };

  const { icon, bgColor, borderColor } = statusConfig[status];

  return (
    <div className={cn(
      "p-4 border rounded-lg transition-all animate-fade-in",
      bgColor,
      borderColor
    )}>
      <div className="flex items-start space-x-3">
        <div className="mt-0.5">
          {icon}
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
          
          {actionItem && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Action Item</span>
                <button className="text-xs text-resume-primary hover:underline">
                  Apply Fix
                </button>
              </div>
              <p className="text-xs mt-1 italic">{actionItem}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImprovementCard;
