/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import AnalysisProgress from '@/components/AnalysisProgress';
import ResultsDashboard from '@/components/ResultsDashboard';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const Index = () => {
  const [appState, setAppState] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string>('');

  const handleAnalyzeStart = async (resumeFile: File, jobDesc: File | string | null) => {
    setAppState('analyzing');
    setAnalysisStatus('Preparing documents for analysis...');
    
    try {
      // Create form data for the API request
      const formData = new FormData();
      formData.append('resume', resumeFile);
      
      if (jobDesc) {
        if (typeof jobDesc === 'string') {
          formData.append('jobDescriptionText', jobDesc);
        } else {
          formData.append('jobDescription', jobDesc);
        }
      }

      setAnalysisStatus('Uploading documents to server...');

       const BASE_URL = import.meta.env.VITE_BACKEND_URL
       console.log(BASE_URL)

      // Make API request to backend
      const response = await fetch(`${BASE_URL}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setAnalysisStatus('Processing with AI...');
      
      const data = await response.json();
      console.log('Analysis response:', data);
      
      // Store the analysis data
      setAnalysisData(data);
      
      setAnalysisStatus('Analysis complete!');
      
      // Small delay to show completion status
      setTimeout(() => {
        setAppState('results');
      }, 500);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze resume. Please try again.');
      setAppState('upload');
    }
  };

  const resetApp = () => {
    setAppState('upload');
    setAnalysisData(null);
    setAnalysisStatus('');
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
              <AnalysisProgress 
                status={analysisStatus}
                onComplete={() => setAppState('results')} 
              />
            )}
            
            {appState === 'results' && analysisData && (
              <ResultsDashboard 
                score={analysisData.overall_score || 0} 
                analysisData={analysisData}
                onReset={resetApp} 
              />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Ohmyresume Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;