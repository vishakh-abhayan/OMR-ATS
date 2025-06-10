import React, { useState } from 'react';
import FileUploader from './FileUploader';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';

interface UploadSectionProps {
  onAnalyzeStart: (resumeFile: File, jobDescription: File | string | null) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onAnalyzeStart }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jobDescText, setJobDescText] = useState<string>('');
  const [jobDescType, setJobDescType] = useState<'file' | 'text'>('text');

  const handleAnalyzeClick = () => {
    if (!resumeFile) {
      toast.error("Please upload your resume to continue.");
      return;
    }

    // Pass either the file or text based on the selected tab
    const jobDescription = jobDescType === 'file' ? jobDescFile : jobDescText || null;
    onAnalyzeStart(resumeFile, jobDescription);
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Upload Your Documents</h2>
          <p className="text-muted-foreground ">
          Let our AI analyze your CV<span className='hidden md:inline'> and provide personalized feedback to help you land your dream job.</span>
          </p>
        </div>
        
        <FileUploader
          label="Resume"
          description="Upload your resume in PDF or Word format (max 5MB)"
          required={true}
          onChange={setResumeFile}
        />
        
        <div className="space-y-4">
          <Label>Job Description (Optional)</Label>
          <Tabs defaultValue="text" onValueChange={(value) => setJobDescType(value as 'file' | 'text')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Paste Text</TabsTrigger>
              <TabsTrigger value="file">Upload File</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-2">
              <Textarea
                placeholder="Paste the job description here..."
                className="min-h-[200px]"
                value={jobDescText}
                onChange={(e) => setJobDescText(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="file">
              <FileUploader
                label=""
                description="Upload the job description file (PDF, Word, or Text)"
                required={false}
                onChange={setJobDescFile}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleAnalyzeClick}
            className="w-full bg-black hover:bg-black text-white"
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