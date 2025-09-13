// Answer value type
export type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

// Question interface for ADHD screening
export interface Question {
  id: number;
  text: string;
  category: '不注意' | '多動性' | '衝動性';
  domain: 'inattention' | 'hyperactivity' | 'impulsivity';
}

// Answer interface  
export interface Answer {
  questionId: number;
  value: AnswerValue;
}

// ADHD assessment result interface
export interface PersonalityResult {
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  domainScores: {
    inattention: number;
    hyperactivity: number;
    impulsivity: number;
  };
  percentages: {
    inattention: number;
    hyperactivity: number;
    impulsivity: number;
  };
  recommendations: string[];
  disclaimer: string;
}

// Legacy type for compatibility (unused in ADHD context)
export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famous: string[];
}