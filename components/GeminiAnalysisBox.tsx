import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { analyzeCompanyReviews } from '../services/geminiService';
import { Review } from '../types';

interface GeminiAnalysisBoxProps {
  companyName: string;
  reviews: Review[];
}

export const GeminiAnalysisBox: React.FC<GeminiAnalysisBoxProps> = ({ companyName, reviews }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    const result = await analyzeCompanyReviews(companyName, reviews);
    setAnalysis(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-brand-50 rounded-xl border border-brand-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-brand-600 h-5 w-5" />
          <h3 className="font-bold text-brand-900">Gemini AI Insights</h3>
        </div>
        {!analysis && !isLoading && (
          <button 
            onClick={handleAnalyze}
            className="text-xs font-semibold bg-white text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors shadow-sm"
          >
            Generate Summary
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-brand-700 text-sm animate-pulse">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Analyzing {reviews.filter(r => r.companyName === companyName).length} reviews for {companyName}...
        </div>
      ) : analysis ? (
        <div className="prose prose-sm prose-indigo text-slate-700 bg-white/50 p-4 rounded-lg border border-brand-100">
          <p className="whitespace-pre-line text-sm leading-6">{analysis}</p>
          <div className="mt-3 text-right">
             <button onClick={handleAnalyze} className="text-xs text-brand-500 hover:text-brand-700 underline">Refresh Analysis</button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          Unlock AI-powered insights to see the consensus on {companyName}'s work culture, strengths, and weaknesses based on verified employee data.
        </p>
      )}
    </div>
  );
};