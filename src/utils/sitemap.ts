// Sitemap generation utility for ADHD diagnosis app

export interface SitemapPage {
  url: string
  lastmod: string
  priority: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

export const sitemapPages: SitemapPage[] = [
  {
    url: 'https://adhd-check.app/',
    lastmod: new Date().toISOString().split('T')[0],
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    url: 'https://adhd-check.app/questionnaire',
    lastmod: new Date().toISOString().split('T')[0],
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    url: 'https://adhd-check.app/results',
    lastmod: new Date().toISOString().split('T')[0],
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    url: 'https://adhd-check.app/resources',
    lastmod: new Date().toISOString().split('T')[0],
    priority: '0.6',
    changefreq: 'weekly'
  }
]

export const generateXMLSitemap = (pages: SitemapPage[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const urlsetEnd = '</urlset>'
  
  const urls = pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')
  
  return `${xmlHeader}\n${urlsetStart}${urls}\n${urlsetEnd}`
}

// Generate and save sitemap (for build process)
export const saveSitemap = () => {
  const sitemapContent = generateXMLSitemap(sitemapPages)
  
  // For Vite build, this would typically be handled by a plugin
  // For now, we'll create the content that can be saved to public/sitemap.xml
  return sitemapContent
}