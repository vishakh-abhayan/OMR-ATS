/* eslint-disable @typescript-eslint/no-explicit-any */

interface AnalysisResponse {
  analysisId: string;
  overall_score: number;
  score_breakdown: {
    content_analysis: ScoreSection;
    formatting: ScoreSection;
    ats_compatibility: ScoreSection;
    job_match?: ScoreSection;
  };
  improvements: Improvement[];
  detailed_insights: DetailedInsights;
  industry_insights: IndustryInsights;
  executive_summary: string;
  metadata: AnalysisMetadata;
}

interface ScoreSection {
  score: number;
  description: string;
}

interface Improvement {
  title: string;
  description: string;
  status: 'good' | 'warning' | 'poor';
  actionItem?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface DetailedInsights {
  ats_analysis: any;
  content_quality: any;
  extracted_information: any;
  job_matching?: any;
}

interface IndustryInsights {
  detected_industry: string;
  industry_trends: {
    hot_skills: string[];
    emerging_technologies: string[];
    declining_skills: string[];
  };
  benchmark_comparison: any;
  role_specific_insights: any;
  market_positioning: any;
  future_proofing: any;
}

interface AnalysisMetadata {
  analysis_version: string;
  ai_model: string;
  analysis_time: number;
  word_count: number;
}

export const analyzeResume = async (
  resumeFile: File,
  jobDescription?: File | string
): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  
  if (jobDescription) {
    if (typeof jobDescription === 'string') {
      formData.append('jobDescriptionText', jobDescription);
    } else {
      formData.append('jobDescription', jobDescription);
    }

  }

  const BASE_URL = import.meta.env.VITE_BACKEND_URL
  console.log(BASE_URL)

  const response = await fetch(`${BASE_URL}/api/resume/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Analysis failed');
  }

  return response.json();
};

export default {
  analyzeResume,
};