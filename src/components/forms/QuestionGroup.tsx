import React from 'react';
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
  { value: -3, label: 'まったくそう思わない', shortLabel: '全く思わない' },
  { value: -2, label: 'あまりそう思わない', shortLabel: '思わない' },
  { value: -1, label: 'そう思わない', shortLabel: '少し思わない' },
  { value: 0, label: 'どちらでもない', shortLabel: '分からない' },
  { value: 1, label: 'そう思う', shortLabel: '少し思う' },
  { value: 2, label: 'ややそう思う', shortLabel: '思う' },
  { value: 3, label: 'とてもそう思う', shortLabel: '強く思う' },
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
  // 指定した質問の回答を取得
  const getAnswerForQuestion = (questionId: string): AnswerValue | undefined => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.value;
  };

  // 質問の回答を更新
  const updateAnswer = (questionId: string, value: AnswerValue) => {
    const updatedAnswers = answers.filter(a => a.questionId !== questionId);
    updatedAnswers.push({ questionId, value });
    onAnswersChange(updatedAnswers);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 text-center">
          <div className="text-sm text-gray-600 mb-2">
            ページ {currentPage}/{totalPages}
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
          <CardContent className="p-6 md:p-8">
            <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
                  {/* Question text */}
                  <div className="mb-6">
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                      {question.text}
                    </h3>
                  </div>

                  {/* Answer Options */}
                  <div className="max-w-xl">
                    {/* Scale labels */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-2">
                      <span>そう思わない</span>
                      <span>そう思う</span>
                    </div>
                    
                    <RadioGroup
                      value={getAnswerForQuestion(question.id)?.toString() || ''}
                      onValueChange={(val) => updateAnswer(question.id, parseInt(val) as AnswerValue)}
                      className="flex justify-between items-center gap-2"
                    >
                      {answerOptions.map((option) => {
                        const isSelected = getAnswerForQuestion(question.id) === option.value;
                        return (
                          <div key={option.value} className="flex flex-col items-center space-y-2">
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value.toString()}
                                id={`q${question.id}-option-${option.value}`}
                                className={cn(
                                  'w-6 h-6 md:w-8 md:h-8 border-2 transition-all duration-200 cursor-pointer',
                                  isSelected
                                    ? 'border-blue-600 bg-blue-600'
                                    : 'border-gray-300 hover:border-blue-400'
                                )}
                              />
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                            <label
                              htmlFor={`q${question.id}-option-${option.value}`}
                              className="text-xs text-gray-600 text-center cursor-pointer leading-tight hidden md:block max-w-16"
                            >
                              {option.shortLabel}
                            </label>
                          </div>
                        );
                      })}
                    </RadioGroup>

                    {/* Mobile selected label */}
                    <div className="mt-3 md:hidden">
                      {getAnswerForQuestion(question.id) !== undefined && (
                        <div className="text-xs text-blue-600 font-medium">
                          選択中: {answerOptions.find(opt => opt.value === getAnswerForQuestion(question.id))?.label}
                        </div>
                      )}
                    </div>
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
            className="min-w-24"
          >
            前へ
          </Button>
          
          <div className="text-sm text-gray-600">
            {canGoNext ? 
              '次のページに進む' : 
              'すべての質問に回答してください'
            }
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="min-w-24"
          >
            {currentPage === totalPages ? '結果を見る' : '次へ'}
          </Button>
        </div>
      </div>
    </div>
  );
}