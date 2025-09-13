import { Answer, PersonalityResult } from '../types/index';
import { questions } from '../data/questions';

export function calculatePersonalityType(answers: Answer[]): PersonalityResult {
  // Initialize domain scores
  const domainScores = {
    inattention: 0,
    hyperactivity: 0,
    impulsivity: 0
  };

  // Calculate raw scores for each domain
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    // Convert answer value (-3 to +3) to ADHD symptom score (0 to 4)
    // Higher positive values indicate stronger ADHD symptoms
    // -3 (まったくそう思わない) = 0 points
    // -2 (あまりそう思わない) = 1 point
    // -1 (そう思わない) = 1 point
    // 0 (分からない) = 2 points
    // +1 (そう思う) = 2 points
    // +2 (ややそう思う) = 3 points
    // +3 (とてもそう思う) = 4 points
    
    const symptomScore = convertToSymptomScore(answer.value);
    domainScores[question.domain] += symptomScore;
  });

  // Calculate maximum possible scores for each domain
  const inattentionQuestions = questions.filter(q => q.domain === 'inattention').length;
  const hyperactivityQuestions = questions.filter(q => q.domain === 'hyperactivity').length;
  const impulsivityQuestions = questions.filter(q => q.domain === 'impulsivity').length;

  const maxScores = {
    inattention: inattentionQuestions * 4, // 8 questions * 4 points = 32
    hyperactivity: hyperactivityQuestions * 4, // 6 questions * 4 points = 24
    impulsivity: impulsivityQuestions * 4 // 6 questions * 4 points = 24
  };

  // Calculate percentages
  const percentages = {
    inattention: Math.round((domainScores.inattention / maxScores.inattention) * 100),
    hyperactivity: Math.round((domainScores.hyperactivity / maxScores.hyperactivity) * 100),
    impulsivity: Math.round((domainScores.impulsivity / maxScores.impulsivity) * 100)
  };

  // Calculate overall score (weighted average)
  const totalQuestions = questions.length;
  const overallScore = Math.round(
    ((domainScores.inattention + domainScores.hyperactivity + domainScores.impulsivity) / 
     (totalQuestions * 4)) * 100
  );

  // Determine risk level based on overall score
  let riskLevel: 'low' | 'moderate' | 'high';
  if (overallScore < 30) {
    riskLevel = 'low';
  } else if (overallScore < 60) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'high';
  }

  // Generate recommendations based on scores
  const recommendations = generateRecommendations(domainScores, percentages, riskLevel);

  return {
    overallScore,
    riskLevel,
    domainScores,
    percentages,
    recommendations,
    disclaimer: "この結果は医学的診断ではありません。気になる症状がある場合は、専門医（精神科医・心療内科医）にご相談ください。"
  };
}

// Convert answer value to ADHD symptom score
function convertToSymptomScore(value: number): number {
  switch (value) {
    case -3: return 0; // まったくそう思わない
    case -2: return 1; // あまりそう思わない
    case -1: return 1; // そう思わない
    case 0: return 2;  // 分からない
    case 1: return 2;  // そう思う
    case 2: return 3;  // ややそう思う
    case 3: return 4;  // とてもそう思う
    default: return 2;
  }
}

// Generate personalized recommendations
function generateRecommendations(
  _domainScores: { inattention: number; hyperactivity: number; impulsivity: number },
  percentages: { inattention: number; hyperactivity: number; impulsivity: number },
  riskLevel: 'low' | 'moderate' | 'high'
): string[] {
  const recommendations: string[] = [];

  // Overall recommendations based on risk level
  switch (riskLevel) {
    case 'low':
      recommendations.push('現在の症状レベルは比較的低いようです。今の生活習慣を継続し、ストレス管理に注意してください。');
      break;
    case 'moderate':
      recommendations.push('いくつかのADHD様症状が見られます。生活環境の調整や専門医への相談をお考えください。');
      break;
    case 'high':
      recommendations.push('多くのADHD様症状が見られます。専門医（精神科医・心療内科医）への相談を強くお勧めします。');
      break;
  }

  // Domain-specific recommendations
  if (percentages.inattention > 60) {
    recommendations.push('不注意症状: スケジュール管理アプリの活用、ToDoリストの作成、集中できる環境作りをお試しください。');
  }

  if (percentages.hyperactivity > 60) {
    recommendations.push('多動性症状: 定期的な運動、リラクゼーション技法の実践、適度な休憩の取り方を心がけてください。');
  }

  if (percentages.impulsivity > 60) {
    recommendations.push('衝動性症状: 意思決定前の一呼吸、衝動買い防止策、感情調整技術の習得をお勧めします。');
  }

  // General lifestyle recommendations
  if (riskLevel !== 'low') {
    recommendations.push('規則的な生活リズム、十分な睡眠、バランスの取れた食事を心がけてください。');
    recommendations.push('周囲の理解とサポートを得ることも重要です。必要に応じて家族や職場に相談してください。');
  }

  return recommendations;
}