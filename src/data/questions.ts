import { Question } from '../types/index';

export const questions: Question[] = [
  // 不注意症状関連（8問）
  {
    id: 1,
    text: "細かい作業や書類作成で、うっかりミスをすることが多い。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 2,
    text: "長時間の会議や講義で、集中力を保つのが困難だ。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 3,
    text: "相手が直接話しかけているのに、聞いていないように見られることがある。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 4,
    text: "指示や説明を最後まで聞かずに、作業を始めてしまうことがある。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 5,
    text: "仕事や家事の段取りを立てたり、時間管理をするのが苦手だ。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 6,
    text: "重要な書類やカギ、スマートフォンなどをよく失くしたり、置き場所を忘れる。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 7,
    text: "集中が必要な作業（読書、報告書作成など）を避けたり、後回しにしがちだ。",
    category: "不注意",
    domain: "inattention"
  },
  {
    id: 8,
    text: "約束の時間や締切を忘れてしまうことがよくある。",
    category: "不注意",
    domain: "inattention"
  },

  // 多動性症状関連（6問）
  {
    id: 9,
    text: "会議や映画鑑賞中など、じっと座っていなければならない時にそわそわしてしまう。",
    category: "多動性",
    domain: "hyperactivity"
  },
  {
    id: 10,
    text: "手足をもじもじ動かしたり、椅子の上で身体を揺らしたりすることが多い。",
    category: "多動性",
    domain: "hyperactivity"
  },
  {
    id: 11,
    text: "適切ではない場面でも、席を立ったり動き回りたくなる。",
    category: "多動性",
    domain: "hyperactivity"
  },
  {
    id: 12,
    text: "休暇中でも、のんびりとリラックスして過ごすのが苦手だ。",
    category: "多動性",
    domain: "hyperactivity"
  },
  {
    id: 13,
    text: "まるでエンジンで動かされているように、常に活動していないと落ち着かない。",
    category: "多動性",
    domain: "hyperactivity"
  },
  {
    id: 14,
    text: "他の人から「落ち着きがない」「せっかち」だと言われることがある。",
    category: "多動性",
    domain: "hyperactivity"
  },

  // 衝動性症状関連（6問）
  {
    id: 15,
    text: "相手が質問を言い終わらないうちに、答えを言ってしまうことがある。",
    category: "衝動性",
    domain: "impulsivity"
  },
  {
    id: 16,
    text: "列に並んで順番を待つことや、信号待ちなどが非常にイライラする。",
    category: "衝動性",
    domain: "impulsivity"
  },
  {
    id: 17,
    text: "会話で相手の話を遮ったり、話に割り込んでしまうことがよくある。",
    category: "衝動性",
    domain: "impulsivity"
  },
  {
    id: 18,
    text: "衝動的に高額な買い物をしてしまい、後で後悔することがある。",
    category: "衝動性",
    domain: "impulsivity"
  },
  {
    id: 19,
    text: "感情的になると、考える前に言葉や行動に出してしまう。",
    category: "衝動性",
    domain: "impulsivity"
  },
  {
    id: 20,
    text: "長期的な計画よりも、今すぐに結果が得られることを優先してしまう。",
    category: "衝動性",
    domain: "impulsivity"
  }
];