import { useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Button } from '../ui/Button';
import { Question, Answer } from '../../types/index';
import { cn } from '../../utils/cn';

type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

interface QuestionGroupProps {
  questions: Question[];
  currentPage: number;
  totalPages: number;
  answers: Answer[];
  onAnswersChange: (answers: Answer[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const answerOptions = [
  { value: -3, label: 'まったくそう思わない', shortLabel: 'まったくそう思わない', size: 'large', variant: 'purple' },
  { value: -2, label: 'あまりそう思わない', shortLabel: 'あまりそう思わない', size: 'medium', variant: 'purple' },
  { value: -1, label: 'そう思わない', shortLabel: 'そう思わない', size: 'small', variant: 'purple' },
  { value: 0, label: 'どちらでもない', shortLabel: '分からない', size: 'neutral', variant: 'neutral' },
  { value: 1, label: 'そう思う', shortLabel: 'そう思う', size: 'small', variant: 'green' },
  { value: 2, label: 'ややそう思う', shortLabel: 'ややそう思う', size: 'medium', variant: 'green' },
  { value: 3, label: 'とてもそう思う', shortLabel: 'とてもそう思う', size: 'large', variant: 'green' },
] as const;

export function QuestionGroup({
  questions,
  currentPage,
  totalPages,
  answers,
  onAnswersChange,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: QuestionGroupProps) {
  // ページ変更時に画面の上部にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // 指定した質問の回答を取得
  const getAnswerForQuestion = (questionId: number): AnswerValue | undefined => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.value;
  };

  // 質問の回答を更新
  const updateAnswer = (questionId: number, value: AnswerValue) => {
    const updatedAnswers = answers.filter(a => a.questionId !== questionId);
    updatedAnswers.push({ questionId, value });
    onAnswersChange(updatedAnswers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 text-center">
          <div className="text-sm text-gray-600 mb-2">
            ページ {currentPage}/{totalPages} ({questions.length * (currentPage - 1) + 1}-{Math.min(questions.length * currentPage, 60)}問 / 60問)
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions Group */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6 md:p-10">
            <div className="space-y-12">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-100 pb-10 last:border-b-0 last:pb-0">
                  {/* Question number and text */}
                  <div className="mb-8 text-center">
                    <div className="text-sm text-gray-500 mb-2">
                      質問 {questions.length * (currentPage - 1) + index + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                      {question.text}
                    </h3>
                  </div>

                  {/* Answer Options with 16personalities design */}
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-8 px-8">
                      <span>そう思わない</span>
                      <span>そう思う</span>
                    </div>
                    
                    <RadioGroup
                      value={getAnswerForQuestion(question.id)?.toString() || ''}
                      onValueChange={(val) => updateAnswer(question.id, parseInt(val) as AnswerValue)}
                      className="mb-6"
                    >
                      {answerOptions.map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          value={option.value.toString()}
                          size={option.size as any}
                          variant={option.variant as any}
                          aria-label={`${option.label} - ${question.text}`}
                        />
                      ))}
                    </RadioGroup>

                    {/* Selected option display */}
                    {getAnswerForQuestion(question.id) !== undefined && (
                      <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium animate-in fade-in duration-200">
                          選択中: {answerOptions.find(opt => opt.value === getAnswerForQuestion(question.id))?.label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="min-w-24 px-6 py-3"
          >
            ← 前へ
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">
              {canGoNext ? 
                '全ての質問に回答したら次のページへ' : 
                'すべての質問に回答してください'
              }
            </div>
            <div className="text-xs text-gray-400">
              {questions.filter(q => getAnswerForQuestion(q.id) !== undefined).length}/{questions.length} 問回答済み
            </div>
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
              "min-w-24 px-6 py-3",
              !canGoNext && "opacity-50 cursor-not-allowed"
            )}
          >
            {currentPage === totalPages ? '結果を見る' : '次へ'} →
          </Button>
        </div>
      </div>
    </div>
  );
}