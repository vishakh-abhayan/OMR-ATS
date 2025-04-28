
import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import AnalysisProgress from '@/components/AnalysisProgress';
import ResultsDashboard from '@/components/ResultsDashboard';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [appState, setAppState] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [score, setScore] = useState(0);

  const handleAnalyzeStart = (resumeFile: File, jobDesc: File | string | null) => {
    setAppState('analyzing');
    
    // In a real app, we'd send these files to an API
    console.log('Analyzing resume:', resumeFile.name);
    if (jobDesc) {
      if (typeof jobDesc === 'string') {
        console.log('With job description text:', jobDesc.substring(0, 100) + '...');
      } else {
        console.log('With job description file:', jobDesc.name);
      }
    }
    
    // Mock a random score between 60-90 for demo purposes
    setScore(Math.floor(Math.random() * 31) + 60);
  };

  const handleAnalysisComplete = () => {
    setAppState('results');
  };

  const resetApp = () => {
    setAppState('upload');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="container py-8 flex-1 flex flex-col">
          <div className="my-auto py-8">
            {appState === 'upload' && (
              <UploadSection onAnalyzeStart={handleAnalyzeStart} />
            )}
            
            {appState === 'analyzing' && (
              <AnalysisProgress onComplete={handleAnalysisComplete} />
            )}
            
            {appState === 'results' && (
              <ResultsDashboard score={score} onReset={resetApp} />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Resume ATS Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
