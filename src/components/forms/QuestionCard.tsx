import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Question } from '../../types/index';

type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;
import { cn } from '../../utils/cn';

interface QuestionCardProps {
  question: Question;
  currentPage: number;
  totalPages: number;
  value?: AnswerValue;
  onValueChange: (value: AnswerValue) => void;
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

export function QuestionCard({
  question,
  currentPage,
  totalPages,
  value,
  onValueChange,
}: QuestionCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 text-center">
          <div className="text-sm text-gray-600 mb-2">
            質問 {currentPage}/{totalPages}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                {question.text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                <span>そう思わない</span>
                <span>そう思う</span>
              </div>
              
              <RadioGroup
                value={value?.toString()}
                onValueChange={(val) => onValueChange(parseInt(val) as AnswerValue)}
                className="flex justify-between items-center"
              >
                {answerOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`option-${option.value}`}
                        className={cn(
                          'w-8 h-8 border-2 transition-all duration-200',
                          value === option.value
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300 hover:border-blue-400'
                        )}
                      />
                      {value === option.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor={`option-${option.value}`}
                      className="text-xs text-gray-600 text-center cursor-pointer leading-tight hidden md:block"
                    >
                      {option.shortLabel}
                    </label>
                  </div>
                ))}
              </RadioGroup>

              {/* Mobile labels */}
              <div className="mt-4 md:hidden">
                {value !== undefined && (
                  <div className="text-center text-sm text-gray-600">
                    選択中: {answerOptions.find(opt => opt.value === value)?.label}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation hint */}
        <div className="text-center text-sm text-gray-600">
          回答を選択すると自動的に次の質問に進みます
        </div>
      </div>
    </div>
  );
}