
import React, { useState } from 'react';
import FileUploader from './FileUploader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface UploadSectionProps {
  onAnalyzeStart: (resumeFile: File, jobDescFile: File | null) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onAnalyzeStart }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);

  const handleAnalyzeClick = () => {
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to continue.",
        variant: "destructive"
      });
      return;
    }

    onAnalyzeStart(resumeFile, jobDescFile);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Upload Your Documents</h2>
          <p className="text-muted-foreground">
            Let our AI analyze your resume and provide personalized feedback to help you land your dream job.
          </p>
        </div>
        
        <FileUploader
          label="Resume"
          description="Upload your resume in PDF or Word format (max 5MB)"
          required={true}
          onChange={setResumeFile}
        />
        
        <FileUploader
          label="Job Description (Optional)"
          description="For more tailored feedback, upload the job description"
          required={false}
          onChange={setJobDescFile}
        />
        
        <div className="pt-4">
          <Button 
            onClick={handleAnalyzeClick}
            className="w-full bg-resume-primary hover:bg-resume-secondary text-white"
            disabled={!resumeFile}
            size="lg"
          >
            Analyze Resume
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Analysis takes approximately 15-30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
