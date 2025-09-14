import { useState, useEffect } from 'react';
import { QuestionGroup } from './forms/QuestionGroup';
import { ResultsPage } from './ResultsPage';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle, CardDescription } from './ui/Card';
import { questions } from '../data/questions';
import { Answer, PersonalityResult } from '../types';

import { calculatePersonalityType } from '../utils/scoring';
import { Header } from './layout/Header';
import { SEOHead } from './layout/SEOHead';
import { AdmaxMainAd } from './ads/AdmaxAd';
import { createMedicalWebPageSchema, createWebsiteSchema, createMedicalTestSchema } from '../utils/structuredData';

export function PersonalityTest() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<PersonalityResult | null>(null);

  // SEO メタデータを各ステップに応じて設定
  const getSEOData = () => {
    switch (currentStep) {
      case 'intro':
        return {
          title: 'ADHD診断・セルフチェック | 無料オンライン診断ツール',
          description: 'ADHD（注意欠陥多動性障害）の無料セルフチェック診断。DSM-5基準に基づく18項目の質問で症状を評価。専門医監修の信頼できる診断ツールです。',
          url: 'https://adhd-check.app/',
          keywords: ['ADHD 診断', 'ADHD チェック', 'セルフチェック', '注意欠陥多動性障害', '無料診断'],
          structuredData: createWebsiteSchema()
        };
      case 'test':
        return {
          title: 'ADHD診断テスト | 18項目の詳細チェック',
          description: 'DSM-5基準に基づくADHD診断テスト。18項目の質問で不注意、多動性、衝動性を評価します。約5分で完了する無料診断。',
          url: 'https://adhd-check.app/questionnaire',
          keywords: ['ADHD テスト', 'ADHD 質問', '診断テスト', 'DSM-5'],
          structuredData: createMedicalTestSchema()
        };
      case 'results':
        return {
          title: 'ADHD診断結果 | 症状評価と推奨アクション',
          description: 'ADHD診断テストの結果表示。症状の詳細分析と専門医への相談推奨。個別化された結果レポートをPDFでダウンロード可能。',
          url: 'https://adhd-check.app/results',
          keywords: ['ADHD 結果', '診断結果', '専門医相談', '症状分析'],
          structuredData: createMedicalWebPageSchema('ADHD診断結果', 'ADHD診断テストの詳細結果', 'https://adhd-check.app/results')
        };
      default:
        return {
          title: 'ADHD診断・セルフチェック',
          description: 'ADHD症状のセルフチェック診断ツール',
          url: 'https://adhd-check.app/',
          keywords: ['ADHD'],
          structuredData: createWebsiteSchema()
        };
    }
  };

  // ステップ変更時に画面上部にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);
  
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

  const seoData = getSEOData();

  // Intro screen
  if (currentStep === 'intro') {
    return (
      <>
        <SEOHead {...seoData} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          <Header />
          <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and title */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ADHD スクリーニングテスト
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                成人向け自己評価ツール
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">症状を評価</h3>
                <p className="text-gray-600">
                  ADHD の主要な症状について、正直に回答してください。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">結果を確認</h3>
                <p className="text-gray-600">
                  不注意・多動性・衝動性の3領域での評価結果を確認しましょう。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">次のステップ</h3>
                <p className="text-gray-600">
                  結果に基づいて、適切な対応や専門医への相談を検討しましょう。
                </p>
              </div>
            </div>

            {/* Start button */}
            <Card className="max-w-md mx-auto border-0 shadow-lg">
              <CardContent className="p-8">
                <CardTitle className="text-2xl mb-4">準備はいいですか？</CardTitle>
                <CardDescription className="mb-6">
                  所要時間: 約5-10分<br />
                  質問数: {questions.length}問
                </CardDescription>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setCurrentPageIndex(0);
                    setCurrentStep('test');
                  }}
                >
                  スクリーニングを開始する
                </Button>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-3xl mx-auto">
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-2">⚠️ 重要な注意事項</p>
                <ul className="space-y-1 text-xs">
                  <li>• このツールは医学的診断ではありません</li>
                  <li>• 正式なADHD診断は医師のみが実施できます</li>
                  <li>• 結果は参考情報として利用し、気になる症状がある場合は専門医（精神科医・心療内科医）にご相談ください</li>
                  <li>• このツールは医学的診断の代替となるものではありません</li>
                </ul>
              </div>
            </div>

            {/* 広告 */}
            <div className="mt-8 flex justify-center">
              <AdmaxMainAd className="max-w-md" />
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Test screen
  if (currentStep === 'test') {
    return (
      <>
        <SEOHead {...seoData} />
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
        <SEOHead {...seoData} />
        <Header />
        <ResultsPage result={result} onRestart={resetTest} />
      </>
    );
  }

  return null;
}