// Medical Web Page Schema for ADHD diagnosis application

export const createMedicalWebPageSchema = (
  pageName: string,
  pageDescription: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": pageName,
  "description": pageDescription,
  "url": url,
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "ADHD",
    "alternateName": [
      "注意欠陥多動性障害",
      "Attention Deficit Hyperactivity Disorder"
    ],
    "description": "ADHDは注意力、多動性、衝動性に関する神経発達障害です。",
    "code": {
      "@type": "MedicalCode",
      "code": "F90",
      "codingSystem": "ICD-10"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "ADHD診断アプリ",
    "url": "https://adhd-check.app/"
  },
  "datePublished": new Date().toISOString().split('T')[0],
  "dateModified": new Date().toISOString().split('T')[0],
  "inLanguage": "ja",
  "isAccessibleForFree": true
})

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ADHD診断・セルフチェック",
  "alternateName": "ADHD診断アプリ",
  "description": "ADHD（注意欠陥多動性障害）の無料セルフチェック診断ツール。DSM-5基準に基づく信頼できる診断。",
  "url": "https://adhd-check.app/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://adhd-check.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ADHD診断アプリ",
    "url": "https://adhd-check.app/"
  },
  "inLanguage": "ja"
})

export const createMedicalTestSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalTest",
  "name": "ADHD診断テスト",
  "description": "DSM-5基準に基づくADHD症状のセルフチェック診断テスト。18項目の質問で不注意、多動性、衝動性を評価します。",
  "testType": "SelfAssessment",
  "usedToDiagnose": {
    "@type": "MedicalCondition",
    "name": "ADHD",
    "alternateName": "注意欠陥多動性障害"
  },
  "normalRange": "症状の程度により評価",
  "preparation": "特別な準備は必要ありません。正直に回答してください。",
  "procedure": "18項目の質問に5段階で回答",
  "expectedDuration": "PT5M",
  "isAccessibleForFree": true,
  "inLanguage": "ja"
})

export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const createFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})