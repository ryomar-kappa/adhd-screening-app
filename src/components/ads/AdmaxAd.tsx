import { useEffect } from 'react'

interface AdmaxAdProps {
  id: string
  className?: string
}

export const AdmaxAd: React.FC<AdmaxAdProps> = ({ id, className = '' }) => {
  useEffect(() => {
    // スクリプトが既に存在するかチェック
    const existingScript = document.querySelector(`script[src="https://adm.shinobi.jp/s/${id}"]`)
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = `https://adm.shinobi.jp/s/${id}`
      script.async = true
      
      // スクリプトを挿入
      const adContainer = document.getElementById(`admax-${id}`)
      if (adContainer) {
        adContainer.appendChild(script)
      }
    }
  }, [id])

  return (
    <div className={`admax-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-2">広告</div>
      <div 
        id={`admax-${id}`} 
        className="admax-ad min-h-[100px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg"
      >
        {/* Admax広告がここに表示されます */}
        <div className="text-gray-400 text-sm">Advertisement</div>
      </div>
    </div>
  )
}

// 指定されたAdmax広告ID用の専用コンポーネント
export const AdmaxMainAd: React.FC<{ className?: string }> = ({ className }) => {
  return <AdmaxAd id="659c918930b899049e48a83e02770a9b" className={className} />
}