import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Progress } from './ui/Progress';
import { PersonalityResult } from '../types';
import { personalityTypes } from '../data/personalityTypes';
import { RotateCcw, Share2, Download } from 'lucide-react';

interface ResultsPageProps {
  result: PersonalityResult;
  onRestart: () => void;
}

export function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const personalityInfo = personalityTypes[result.type];

  if (!personalityInfo) {
    return <div>エラー: 性格タイプが見つかりません</div>;
  }

  const dominantTraits = [
    { key: result.type[0], name: result.type[0] === 'E' ? '外向型' : '内向型', value: result.type[0] === 'E' ? result.percentages.E : result.percentages.I },
    { key: result.type[1], name: result.type[1] === 'S' ? '現実型' : '直感型', value: result.type[1] === 'S' ? result.percentages.S : result.percentages.N },
    { key: result.type[2], name: result.type[2] === 'T' ? '論理型' : '感情型', value: result.type[2] === 'T' ? result.percentages.T : result.percentages.F },
    { key: result.type[3], name: result.type[3] === 'J' ? '計画型' : '柔軟型', value: result.type[3] === 'J' ? result.percentages.J : result.percentages.P },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl font-bold rounded-full mb-6">
              {result.type}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {personalityInfo.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {personalityInfo.description}
            </p>
          </div>

          {/* Personality Breakdown */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>あなたの性格特性</CardTitle>
              <CardDescription>
                各特性の傾向を確認してみましょう
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dominantTraits.map((trait, index) => {
                  const oppositeValue = 100 - trait.value;
                  const oppositeNames = [
                    trait.key === 'E' ? '内向型' : '外向型',
                    trait.key === 'S' ? '直感型' : '現実型', 
                    trait.key === 'T' ? '感情型' : '論理型',
                    trait.key === 'J' ? '柔軟型' : '計画型'
                  ];
                  
                  return (
                    <div key={trait.key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{oppositeNames[index]}</span>
                        <span className="font-medium">{trait.name}</span>
                      </div>
                      <div className="relative">
                        <Progress value={trait.value} className="h-3" />
                        <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white font-medium">
                          <span>{oppositeValue}%</span>
                          <span>{trait.value}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-600">強み</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {personalityInfo.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Weaknesses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-600">成長領域</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {personalityInfo.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Career Suggestions */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>適性のあるキャリア</CardTitle>
              <CardDescription>
                あなたの性格タイプに適している職業の例
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {personalityInfo.careers.map((career, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Famous People */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>同じタイプの著名人</CardTitle>
              <CardDescription>
                あなたと同じ性格タイプの有名人
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {personalityInfo.famous.map((person, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent-100 text-accent-700"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">結果をシェアしますか？</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  シェア
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  PDFダウンロード
                </Button>
                <Button variant="outline" size="lg" onClick={onRestart}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  もう一度テスト
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              この結果は一般的な傾向を示すものであり、個人の複雑さをすべて表現するものではありません。
              より詳しい分析や相談が必要な場合は、専門家にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}