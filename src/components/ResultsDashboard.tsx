/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ScoreCircle from './ScoreCircle';
import ScoreBreakdown from './ScoreBreakdown';
import ImprovementCard from './ImprovementCard';
import { Button } from '@/components/ui/button';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDashboardProps {
  score: number;
  analysisData: any;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ score, analysisData, onReset }) => {
  // Extract data from the backend response
  const scoreCategories = [
    {
      name: 'Content Analysis',
      score: analysisData?.score_breakdown?.content_analysis?.score || 0,
      description: analysisData?.score_breakdown?.content_analysis?.description || 'Evaluation of your resume content'
    },
    {
      name: 'Visual/Formatting',
      score: analysisData?.score_breakdown?.formatting?.score || 0,
      description: analysisData?.score_breakdown?.formatting?.description || 'Assessment of your resume layout'
    },
    {
      name: 'ATS Compatibility',
      score: analysisData?.score_breakdown?.ats_compatibility?.score || 0,
      description: analysisData?.score_breakdown?.ats_compatibility?.description || 'How well your resume can be parsed by ATS'
    }
  ];

  // Add job match score if available
  if (analysisData?.score_breakdown?.job_match) {
    scoreCategories.push({
      name: 'Job Match',
      score: analysisData.score_breakdown.job_match.score || 0,
      description: analysisData.score_breakdown.job_match.description || 'How well you match the job requirements'
    });
  }

  const improvementItems = analysisData?.improvements || [];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <ScoreCircle score={score} size="lg" label="Overall Resume Score" />
          
          {analysisData?.executive_summary && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {analysisData.executive_summary}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 mt-3">
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

        {/* Add metadata section if available */}
        {analysisData?.metadata && (
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <p>
               Completed in {(analysisData.metadata.analysis_time / 1000).toFixed(1)}s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;