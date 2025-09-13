import React from 'react';
import { cn } from '../../utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50', className)}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Logo placeholder - you can replace with actual logo */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
          <span className="font-semibold text-lg text-gray-900">性格診断テスト</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            テストについて
          </a>
          <a 
            href="#" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            性格タイプ
          </a>
        </nav>
      </div>
    </header>
  );
}