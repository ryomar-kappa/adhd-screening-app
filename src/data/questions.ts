import { Question } from '../types/index';

export const questions: Question[] = [
  // Extroversion vs Introversion (E/I)
  { id: 1, text: "定期的に新しい友人を作っている。", category: "E/I" },
  { id: 7, text: "人脈を広げたり、見知らぬ人に自分を売り込んだりするのは、とても大変だと感じる。", category: "E/I" },
  { id: 13, text: "パーティーや集まりで、多くの新しい人と話すことを楽しむ。", category: "E/I" },
  { id: 19, text: "一人でいる時間を過ごすことで、エネルギーを回復する。", category: "E/I" },
  { id: 25, text: "大勢の人がいる場所よりも、少人数の集まりを好む。", category: "E/I" },
  { id: 31, text: "考えを声に出して整理することが多い。", category: "E/I" },
  { id: 37, text: "新しい環境に入ると、積極的に人に話しかける。", category: "E/I" },
  { id: 43, text: "静かで落ち着いた環境での作業を好む。", category: "E/I" },
  { id: 49, text: "チームワークよりも個人での作業の方が生産性が高い。", category: "E/I" },
  { id: 55, text: "社交的な活動に参加することで活力を得る。", category: "E/I" },

  // Sensing vs iNtuition (S/N)
  { id: 2, text: "単純明快なアイデアよりも、複雑で斬新なアイデアのほうがワクワクする。", category: "S/N" },
  { id: 8, text: "物事を始める前に、すべての詳細を把握しておきたい。", category: "S/N" },
  { id: 14, text: "現実的で実用的な解決策を好む。", category: "S/N" },
  { id: 20, text: "抽象的な概念や理論について考えることを楽しむ。", category: "S/N" },
  { id: 26, text: "経験と実績に基づいた方法を信頼する。", category: "S/N" },
  { id: 32, text: "可能性や将来のビジョンについて考えることが多い。", category: "S/N" },
  { id: 38, text: "段階的で具体的な指示を好む。", category: "S/N" },
  { id: 44, text: "創造的で革新的なアプローチを取ることが多い。", category: "S/N" },
  { id: 50, text: "詳細よりも全体像を把握することを重視する。", category: "S/N" },
  { id: 56, text: "伝統的で確立された方法を使うことを好む。", category: "S/N" },

  // Thinking vs Feeling (T/F)
  { id: 3, text: "事実に基づいた議論よりも、感情的に響くものに説得力を感じる。", category: "T/F" },
  { id: 9, text: "決定を下す際、論理と合理性を最優先する。", category: "T/F" },
  { id: 15, text: "他人の感情や価値観を考慮して判断する。", category: "T/F" },
  { id: 21, text: "批判的思考と客観的分析を重視する。", category: "T/F" },
  { id: 27, text: "和やかな雰囲気を保つことを大切にする。", category: "T/F" },
  { id: 33, text: "効率性と結果を最も重要視する。", category: "T/F" },
  { id: 39, text: "他人の気持ちを傷つけないよう配慮することが多い。", category: "T/F" },
  { id: 45, text: "問題解決において、データと事実を基に判断する。", category: "T/F" },
  { id: 51, text: "人間関係の調和を維持することを優先する。", category: "T/F" },
  { id: 57, text: "公正で公平な判断を下すことを心がける。", category: "T/F" },

  // Judging vs Perceiving (J/P)
  { id: 4, text: "自分の生活と仕事の空間は、清潔で整理整頓されている。", category: "J/P" },
  { id: 10, text: "計画を立てるよりも、その場の状況に応じて行動する。", category: "J/P" },
  { id: 16, text: "締切りや約束を必ず守る。", category: "J/P" },
  { id: 22, text: "柔軟性を保ち、変化に適応することを好む。", category: "J/P" },
  { id: 28, text: "物事を事前に計画し、スケジュールに従って行動する。", category: "J/P" },
  { id: 34, text: "複数の選択肢を残しておくことを好む。", category: "J/P" },
  { id: 40, text: "決断を早めに下し、それに従って行動する。", category: "J/P" },
  { id: 46, text: "即興で対応することを楽しむ。", category: "J/P" },
  { id: 52, text: "構造化された環境で作業することを好む。", category: "J/P" },
  { id: 58, text: "新しい機会や可能性に対して開放的である。", category: "J/P" },

  // Additional questions for better accuracy
  { id: 5, text: "大きなプレッシャーがあっても通常、冷静でいられる。", category: "T/F" },
  { id: 6, text: "チームでの意思決定において、リーダーシップを取ることが多い。", category: "E/I" },
  { id: 11, text: "新しいアイデアや可能性を探求することに時間を費やす。", category: "S/N" },
  { id: 12, text: "他人との衝突を避けるために、自分の意見を控えることがある。", category: "T/F" },
  { id: 17, text: "直感的な判断よりも、詳細な分析を重視する。", category: "S/N" },
  { id: 18, text: "予定が変更されることにストレスを感じる。", category: "J/P" },
  { id: 23, text: "グループディスカッションで積極的に発言する。", category: "E/I" },
  { id: 24, text: "他人の感情の変化に敏感である。", category: "T/F" },
  { id: 29, text: "創造的な作業において、インスピレーションを重視する。", category: "S/N" },
  { id: 30, text: "期限が近づくとモチベーションが上がる。", category: "J/P" },
  { id: 35, text: "新しい状況や環境に適応するのが得意である。", category: "J/P" },
  { id: 36, text: "深く考え込む時間を取ることを好む。", category: "E/I" },
  { id: 41, text: "具体的な事実やデータに基づいて学習する。", category: "S/N" },
  { id: 42, text: "他人のニーズや感情を理解することが得意である。", category: "T/F" },
  { id: 47, text: "複数のタスクを同時に進行することを好む。", category: "J/P" },
  { id: 48, text: "一対一の会話を大勢での会話よりも好む。", category: "E/I" },
  { id: 53, text: "理論的なモデルやフレームワークに興味を持つ。", category: "S/N" },
  { id: 54, text: "感情よりも論理を優先して意思決定する。", category: "T/F" },
  { id: 59, text: "ルールや手続きに従うことを重要視する。", category: "J/P" },
  { id: 60, text: "エネルギッシュで活動的な環境を好む。", category: "E/I" }
];