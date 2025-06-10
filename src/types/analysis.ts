/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AnalysisResponse {
  analysisId: string;
  overall_score: number;
  score_breakdown: {
    content_analysis: ScoreSection;
    formatting: ScoreSection;
    ats_compatibility: ScoreSection;
    job_match?: ScoreSection;
  };
  improvements: Improvement[];
  detailed_insights: any;
  industry_insights: any;
  executive_summary: string;
  metadata: {
    analysis_version: string;
    ai_model: string;
    analysis_time: number;
    word_count: number;
  };
}

export interface ScoreSection {
  score: number;
  description: string;
}

export interface Improvement {
  title: string;
  description: string;
  status: 'good' | 'warning' | 'poor';
  actionItem?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}// src/types/analysis.ts
export interface AnalysisResponse {
  analysisId: string;
  overall_score: number;
  score_breakdown: {
    content_analysis: ScoreSection;
    formatting: ScoreSection;
    ats_compatibility: ScoreSection;
    job_match?: ScoreSection;
  };
  improvements: Improvement[];
  detailed_insights: any;
  industry_insights: any;
  executive_summary: string;
  metadata: {
    analysis_version: string;
    ai_model: string;
    analysis_time: number;
    word_count: number;
  };
}

export interface ScoreSection {
  score: number;
  description: string;
}

export interface Improvement {
  title: string;
  description: string;
  status: 'good' | 'warning' | 'poor';
  actionItem?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}