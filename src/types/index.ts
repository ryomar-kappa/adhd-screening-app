// Answer value type
export type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

// Question interface
export interface Question {
  id: number;
  text: string;
  category: 'E/I' | 'S/N' | 'T/F' | 'J/P';
}

// Answer interface  
export interface Answer {
  questionId: number;
  value: AnswerValue;
}

// Personality result interface
export interface PersonalityResult {
  type: string;
  percentages: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

// Personality type information
export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famous: string[];
}