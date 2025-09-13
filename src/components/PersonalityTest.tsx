import React, { useState, useEffect } from 'react';
import { QuestionGroup } from './forms/QuestionGroup';
import { ResultsPage } from './ResultsPage';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { questions } from '../data/questions';
import { Answer, PersonalityResult } from '../types';

type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;
import { calculatePersonalityType } from '../utils/scoring';
import { Header } from './layout/Header';

export function PersonalityTest() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<PersonalityResult | null>(null);

  // ページング設定
  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  
  // 現在のページの質問を取得
  const getCurrentPageQuestions = () => {
    const startIndex = currentPageIndex * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
    return questions.slice(startIndex, endIndex);
  };
  
  // 現在のページが完了しているかチェック
  const isCurrentPageComplete = () => {
    const currentQuestions = getCurrentPageQuestions();
    return currentQuestions.every(q => 
      answers.some(a => a.questionId === q.id)
    );
  };

  // Handle answer changes for the current page
  const handleAnswersChange = (newAnswers: Answer[]) => {
    setAnswers(newAnswers);
  };

  // Handle next page navigation
  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      // 最終ページ → 結果計算
      const personalityResult = calculatePersonalityType(answers);
      setResult(personalityResult);
      setCurrentStep('results');
    }
  };

  // Handle previous page navigation
  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  // Reset test
  const resetTest = () => {
    setCurrentStep('intro');
    setCurrentPageIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // Intro screen
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and title */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i < 4 ? 'bg-purple-300' :
                        i < 8 ? 'bg-blue-300' :
                        i < 12 ? 'bg-yellow-300' : 'bg-green-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                無料性格診断テスト
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                NERIS Type Explorer<sup>®</sup>
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">テストを完了</h3>
                <p className="text-gray-600">
                  自分の性格タイプを突き止めるために、ありのままの自分で正直に回答してください。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">詳細な結果を見る</h3>
                <p className="text-gray-600">
                  人生の数多くの場面において、自分の性格タイプがどのような影響を及ぼしているか学びましょう。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">可能性を解き放とう</h3>
                <p className="text-gray-600">
                  結果を活用して、なりたい自分に成長しましょう。
                </p>
              </div>
            </div>

            {/* Start button */}
            <Card className="max-w-md mx-auto border-0 shadow-lg">
              <CardContent className="p-8">
                <CardTitle className="text-2xl mb-4">準備はいいですか？</CardTitle>
                <CardDescription className="mb-6">
                  所要時間: 約10分<br />
                  質問数: {questions.length}問
                </CardDescription>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setCurrentStep('test')}
                >
                  テストを開始する
                </Button>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-8 text-sm text-gray-500 max-w-2xl mx-auto">
              <p>
                このテストは教育目的で作成されており、心理学的評価や診断の代替となるものではありません。
                より詳しい分析が必要な場合は、資格を持つ専門家にご相談ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test screen
  if (currentStep === 'test') {
    return (
      <>
        <Header />
        <QuestionGroup
          questions={getCurrentPageQuestions()}
          currentPage={currentPageIndex + 1}
          totalPages={totalPages}
          answers={answers}
          onAnswersChange={handleAnswersChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={isCurrentPageComplete()}
          canGoPrevious={currentPageIndex > 0}
        />
      </>
    );
  }

  // Results screen
  if (currentStep === 'results' && result) {
    return (
      <>
        <Header />
        <ResultsPage result={result} onRestart={resetTest} />
      </>
    );
  }

  return null;
}