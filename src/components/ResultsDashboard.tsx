
import React from 'react';
import ScoreCircle from './ScoreCircle';
import ScoreBreakdown from './ScoreBreakdown';
import ImprovementCard from './ImprovementCard';
import { Button } from '@/components/ui/button';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDashboardProps {
  score: number;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ score, onReset }) => {
  // Mock data
  const scoreCategories = [
    {
      name: 'Content Analysis',
      score: 75,
      description: 'Evaluation of your resume content, including keywords, skills alignment, and overall narrative strength.'
    },
    {
      name: 'Visual/Formatting',
      score: 85,
      description: 'Assessment of your resume layout, font choices, spacing, and overall visual impression.'
    },
    {
      name: 'ATS Compatibility',
      score: 62,
      description: 'How well your resume can be parsed by Applicant Tracking Systems commonly used by employers.'
    }
  ];

  const improvementItems = [
    {
      title: 'Low Keyword Match',
      description: 'Your resume lacks several key terms found in similar job descriptions for your target role.',
      status: 'poor',
      actionItem: 'Incorporate industry-standard terms like "data analysis", "project management", and "stakeholder communication".'
    },
    {
      title: 'Good Use of Action Verbs',
      description: 'Your resume effectively uses strong action verbs to describe your achievements.',
      status: 'good'
    },
    {
      title: 'Missing Quantifiable Results',
      description: 'Your experience descriptions would be stronger with specific metrics and outcomes.',
      status: 'warning',
      actionItem: 'Add numbers to demonstrate impact, e.g., "Increased sales by 20%" or "Reduced costs by $50K".'
    },
    {
      title: 'Complex Formatting Detected',
      description: 'Some elements in your resume may cause parsing issues with ATS systems.',
      status: 'poor',
      actionItem: 'Remove tables, headers/footers, and complex formatting elements. Use standard headings and bullet points.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <ScoreCircle score={score} size="lg" label="Overall Resume Score" />
          
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Download Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share Results
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={onReset}
            >
              <RefreshCw className="h-4 w-4" /> Analyze New Resume
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
              <ScoreBreakdown categories={scoreCategories} />
            </div>
          </div>
          
          <div className="md:col-span-7">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Key Findings</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                  <TabsTrigger value="improvements">Improvements</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid gap-4">
                  {improvementItems.map((item, index) => (
                    <ImprovementCard
                      key={index}
                      title={item.title}
                      description={item.description}
                      status={item.status}
                      actionItem={item.actionItem}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="critical" className="mt-0">
                <div className="grid gap-4">
                  {improvementItems
                    .filter(item => item.status === 'poor')
                    .map((item, index) => (
                      <ImprovementCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        status={item.status}
                        actionItem={item.actionItem}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="improvements" className="mt-0">
                <div className="grid gap-4">
                  {improvementItems
                    .filter(item => item.status === 'warning')
                    .map((item, index) => (
                      <ImprovementCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        status={item.status}
                        actionItem={item.actionItem}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
