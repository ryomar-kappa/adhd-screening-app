import { useEffect } from 'react'

interface SEOHeadProps {
  title: string
  description: string
  url?: string
  type?: string
  image?: string
  keywords?: string[]
  structuredData?: object
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  url = 'https://adhd-check.app/',
  type = 'website',
  image = '/og-image.png',
  keywords = [],
  structuredData
}) => {
  const fullTitle = title.includes('ADHD') ? title : `${title} | ADHD診断・セルフチェック`
  
  const defaultKeywords = [
    'ADHD',
    '診断',
    'チェック',
    'セルフチェック',
    '注意欠陥多動性障害',
    '無料診断',
    'オンライン診断'
  ]
  
  const allKeywords = [...new Set([...keywords, ...defaultKeywords])]

  useEffect(() => {
    // Set document title
    document.title = fullTitle
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Basic SEO
    updateMetaTag('description', description)
    updateMetaTag('keywords', allKeywords.join(', '))
    
    // Open Graph
    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:url', url, 'property')
    updateMetaTag('og:type', type, 'property')
    updateMetaTag('og:image', image, 'property')
    updateMetaTag('og:site_name', 'ADHD診断・セルフチェック', 'property')
    updateMetaTag('og:locale', 'ja_JP', 'property')
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    
    // Additional meta tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('language', 'Japanese')
    updateMetaTag('revisit-after', '7 days')
    updateMetaTag('author', 'ADHD診断アプリ')
    updateMetaTag('theme-color', '#3B82F6')

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }
  }, [fullTitle, description, url, type, image, allKeywords, structuredData])

  return null
}