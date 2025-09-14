import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Progress } from './ui/Progress';
import { PersonalityResult } from '../types';
import { RotateCcw, AlertTriangle, Brain, Activity, Zap, Heart, Download } from 'lucide-react';
import { AdmaxMainAd } from './ads/AdmaxAd';

interface ResultsPageProps {
  result: PersonalityResult;
  onRestart: () => void;
}

export function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const getRiskLevelColor = (level: 'low' | 'moderate' | 'high') => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getRiskLevelText = (level: 'low' | 'moderate' | 'high') => {
    switch (level) {
      case 'low': return '低リスク';
      case 'moderate': return '中リスク';
      case 'high': return '高リスク';
    }
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'inattention': return <Brain className="w-5 h-5" />;
      case 'hyperactivity': return <Activity className="w-5 h-5" />;
      case 'impulsivity': return <Zap className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  const getDomainName = (domain: string) => {
    switch (domain) {
      case 'inattention': return '不注意';
      case 'hyperactivity': return '多動性';
      case 'impulsivity': return '衝動性';
      default: return '';
    }
  };

  const getDomainDescription = (domain: string) => {
    switch (domain) {
      case 'inattention': return '注意を維持し、詳細に注意を払う能力';
      case 'hyperactivity': return '活動レベルの調整と落ち着きの維持';
      case 'impulsivity': return '行動や決定における自己制御力';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl font-bold rounded-full mb-6">
              {result.overallScore}%
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ADHD スクリーニング結果
            </h1>
            <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 ${getRiskLevelColor(result.riskLevel)} text-lg font-semibold`}>
              <AlertTriangle className="w-5 h-5 mr-2" />
              {getRiskLevelText(result.riskLevel)}
            </div>
          </div>

          {/* Overall Score */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>総合スコア</CardTitle>
              <CardDescription>
                ADHD様症状の全体的な程度を表示しています
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Progress value={result.overallScore} className="h-6" />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <span className="text-white font-bold text-sm">
                      {result.overallScore}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>症状なし</span>
                  <span>軽度</span>
                  <span>中度</span>
                  <span>重度</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domain Breakdown */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>症状領域別分析</CardTitle>
              <CardDescription>
                ADHD の3つの主要症状領域における結果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.percentages).map(([domain, percentage]) => (
                  <div key={domain} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600">
                        {getDomainIcon(domain)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-semibold text-lg">{getDomainName(domain)}</h3>
                          <span className="font-bold text-lg">{percentage}%</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {getDomainDescription(domain)}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={percentage} className="h-3" />
                      <div className="absolute right-2 top-0 bottom-0 flex items-center">
                        <span className="text-white text-xs font-medium">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600">個別アドバイス</CardTitle>
              <CardDescription>
                あなたの結果に基づく推奨事項
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 border-0 shadow-lg bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                重要な注意事項
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-800 space-y-3">
                <p className="font-semibold text-lg">{result.disclaimer}</p>
                <div className="space-y-2 text-sm">
                  <p>• この結果はスクリーニング（症状の初期評価）のためのものです</p>
                  <p>• 正式なADHD診断は、医師による総合的な評価が必要です</p>
                  <p>• 気になる症状がある場合は、精神科医・心療内科医にご相談ください</p>
                  <p>• 症状は様々な要因（ストレス、睡眠不足、他の疾患等）でも現れることがあります</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>次のステップ</CardTitle>
              <CardDescription>
                結果を活用するための推奨アクション
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">専門医への相談</h4>
                  <p className="text-sm text-gray-600">
                    精神科・心療内科での詳細な評価を受けることを検討してください
                  </p>
                </div>
                <div className="p-4 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-600 mb-2">生活環境の調整</h4>
                  <p className="text-sm text-gray-600">
                    日常生活でできる工夫や対策を試してみましょう
                  </p>
                </div>
                <div className="p-4 border-2 border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-2">情報収集</h4>
                  <p className="text-sm text-gray-600">
                    ADHDに関する正確な情報や支援について学びましょう
                  </p>
                </div>
                <div className="p-4 border-2 border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-600 mb-2">周囲のサポート</h4>
                  <p className="text-sm text-gray-600">
                    家族や職場での理解とサポートを得ることが重要です
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-6">結果を保存・共有</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  結果をPDF保存
                </Button>
                <Button variant="outline" size="lg" onClick={onRestart}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  もう一度テスト
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Final Disclaimer */}
          <div className="mt-8 text-center text-sm text-gray-500 max-w-3xl mx-auto">
            <p>
              このツールは教育・情報提供目的で開発されており、医学的診断の代替となるものではありません。
              ADHDの症状は個人差が大きく、専門的な評価が重要です。
              心配な症状がある場合は、必ず医療専門家にご相談ください。
            </p>
          </div>

          {/* 広告 */}
          <div className="mt-8 flex justify-center">
            <AdmaxMainAd className="max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
}