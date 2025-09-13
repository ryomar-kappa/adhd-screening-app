import { Card, CardContent } from '../ui/Card';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Question } from '../../types/index';

type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;

interface QuestionCardProps {
  question: Question;
  currentPage: number;
  totalPages: number;
  value?: AnswerValue;
  onValueChange: (value: AnswerValue) => void;
}

const answerOptions = [
  { value: 3, label: 'とてもそう思う', shortLabel: 'とてもそう思う', size: 'large', variant: 'green' },
  { value: 2, label: 'ややそう思う', shortLabel: 'ややそう思う', size: 'medium', variant: 'green' },
  { value: 1, label: 'そう思う', shortLabel: 'そう思う', size: 'small', variant: 'green' },
  { value: 0, label: 'どちらでもない', shortLabel: '分からない', size: 'neutral', variant: 'neutral' },
  { value: -1, label: 'そう思わない', shortLabel: 'そう思わない', size: 'small', variant: 'purple' },
  { value: -2, label: 'あまりそう思わない', shortLabel: 'あまりそう思わない', size: 'medium', variant: 'purple' },
  { value: -3, label: 'まったくそう思わない', shortLabel: 'まったくそう思わない', size: 'large', variant: 'purple' },
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
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-8 px-8">
                <span>そう思う</span>
                <span>そう思わない</span>
              </div>
              
              <RadioGroup
                value={value?.toString()}
                onValueChange={(val) => onValueChange(parseInt(val) as AnswerValue)}
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
              {value !== undefined && (
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium animate-in fade-in duration-200">
                    選択中: {answerOptions.find(opt => opt.value === value)?.label}
                  </div>
                </div>
              )}
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