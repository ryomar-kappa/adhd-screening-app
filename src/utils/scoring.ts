import { Answer, PersonalityResult, Question } from '../types/index';
import { questions } from '../data/questions';

export function calculatePersonalityType(answers: Answer[]): PersonalityResult {
  // Initialize scores
  const scores = {
    E: 0, I: 0, // Extroversion vs Introversion
    S: 0, N: 0, // Sensing vs iNtuition
    T: 0, F: 0, // Thinking vs Feeling
    J: 0, P: 0  // Judging vs Perceiving
  };

  // Calculate scores based on answers
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const value = answer.value;
    
    switch (question.category) {
      case 'E/I':
        // For most E/I questions, positive values indicate Extroversion
        // Some questions are reverse-scored (check question text)
        if (isReverseScored(question)) {
          scores.E += -value;
          scores.I += value;
        } else {
          scores.E += value;
          scores.I += -value;
        }
        break;
        
      case 'S/N':
        // For most S/N questions, positive values indicate iNtuition
        if (isReverseScored(question)) {
          scores.S += value;
          scores.N += -value;
        } else {
          scores.S += -value;
          scores.N += value;
        }
        break;
        
      case 'T/F':
        // For most T/F questions, positive values indicate Feeling
        if (isReverseScored(question)) {
          scores.T += value;
          scores.F += -value;
        } else {
          scores.T += -value;
          scores.F += value;
        }
        break;
        
      case 'J/P':
        // For most J/P questions, positive values indicate Judging
        if (isReverseScored(question)) {
          scores.J += -value;
          scores.P += value;
        } else {
          scores.J += value;
          scores.P += -value;
        }
        break;
    }
  });

  // Determine personality type
  const type = [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');

  // Calculate percentages
  const totalE_I = Math.abs(scores.E) + Math.abs(scores.I);
  const totalS_N = Math.abs(scores.S) + Math.abs(scores.N);
  const totalT_F = Math.abs(scores.T) + Math.abs(scores.F);
  const totalJ_P = Math.abs(scores.J) + Math.abs(scores.P);

  const percentages = {
    E: totalE_I > 0 ? Math.max(0, Math.round((Math.abs(scores.E) / totalE_I) * 100)) : 50,
    I: totalE_I > 0 ? Math.max(0, Math.round((Math.abs(scores.I) / totalE_I) * 100)) : 50,
    S: totalS_N > 0 ? Math.max(0, Math.round((Math.abs(scores.S) / totalS_N) * 100)) : 50,
    N: totalS_N > 0 ? Math.max(0, Math.round((Math.abs(scores.N) / totalS_N) * 100)) : 50,
    T: totalT_F > 0 ? Math.max(0, Math.round((Math.abs(scores.T) / totalT_F) * 100)) : 50,
    F: totalT_F > 0 ? Math.max(0, Math.round((Math.abs(scores.F) / totalT_F) * 100)) : 50,
    J: totalJ_P > 0 ? Math.max(0, Math.round((Math.abs(scores.J) / totalJ_P) * 100)) : 50,
    P: totalJ_P > 0 ? Math.max(0, Math.round((Math.abs(scores.P) / totalJ_P) * 100)) : 50
  };

  return {
    type,
    percentages
  };
}

// Determine if a question should be reverse-scored based on its wording
function isReverseScored(question: Question): boolean {
  const reverseIndicators = [
    '大変だと感じる',
    '一人でいる',
    '少人数',
    '静かで',
    'ストレス',
    '避ける',
    '控える',
    '詳細',
    '具体的',
    '事実',
    '論理',
    '批判',
    '効率',
    '公正',
    '変更.*ストレス',
    '期限が近づく',
    '整理整頓',
    '計画',
    '決断を早め',
    '構造化'
  ];

  return reverseIndicators.some(indicator => 
    new RegExp(indicator).test(question.text)
  );
}