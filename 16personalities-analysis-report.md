# 16personalities Radio Button Design Analysis & Implementation Guide

## 🎯 Key Design Findings

Based on the Playwright analysis of 16personalities.com, here are the critical design patterns and implementation recommendations for your ADHD diagnostic app.

## 📊 Core Design Patterns Identified

### 1. **Progressive Sizing System**
- **Concept**: Radio buttons use different sizes to indicate intensity/strength of response
- **Sizes Found**: 
  - `size--36` (smallest - neutral/unsure): 26px → 36px
  - `size--46` (small agreement/disagreement): 32px → 46px  
  - `size--56` (medium agreement/disagreement): 38px → 56px
  - `size--70` (strongest agreement/disagreement): 46px → 70px

### 2. **Color-Coded Response Scale**
- **Green Spectrum**: Agreement responses (`color--green`)
- **Purple Spectrum**: Disagreement responses (`color--purple`) 
- **Neutral Gray**: Uncertain/middle responses (`color--neutral`)

### 3. **Visual Hierarchy Through Size**
- Larger circles = stronger opinions
- Smaller circles = weaker/uncertain responses  
- Creates intuitive visual mapping of response intensity

## 🎨 Technical Implementation Details

### HTML Structure
```html
<div class="radios len--7">
  <span class="size--70 color--green sp-radio is--slim">
    <input type="radio" value="-3" aria-label="とてもそう思う">
    <span class="radio__tick">
      <span class="radio__icon">
        <!-- Checkmark SVG -->
      </span>
    </span>
  </span>
  <!-- More radio buttons... -->
</div>
```

### Key CSS Properties
```css
/* Radio input itself is 70px x 70px but hidden */
input[type="radio"] {
  width: 70px;
  height: 70px;
  appearance: auto;
  border: 0;
  background: transparent;
}

/* Visual tick container */
.radio__tick {
  width: 46px;
  height: 46px;
  /* Responsive: huge:tw-w-[70px] huge:tw-h-[70px] */
}

/* Icon sizing */
.radio__icon {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  /* Responsive: huge:tw-w-[30px] huge:tw-h-[30px] */
}
```

## 🚀 React + Radix UI + Tailwind Implementation

### 1. **Enhanced RadioGroup Component**

```tsx
// src/components/ui/LikertScale.tsx
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LikertScaleProps {
  name: string;
  value?: string;
  onValueChange: (value: string) => void;
  question: string;
  labels?: {
    left: string;
    right: string;
  };
  className?: string;
}

const scaleOptions = [
  { value: '-3', size: 'large', color: 'green', label: 'とてもそう思う' },
  { value: '-2', size: 'medium', color: 'green', label: 'ややそう思う' },
  { value: '-1', size: 'small', color: 'green', label: 'そう思う' },
  { value: '0', size: 'neutral', color: 'neutral', label: '分からない' },
  { value: '1', size: 'small', color: 'purple', label: 'そう思わない' },
  { value: '2', size: 'medium', color: 'purple', label: 'あまりそう思わない' },
  { value: '3', size: 'large', color: 'purple', label: 'まったくそう思わない' },
];

const sizeVariants = {
  large: 'w-[46px] h-[46px] lg:w-[70px] lg:h-[70px]',
  medium: 'w-[38px] h-[38px] lg:w-[56px] lg:h-[56px]',
  small: 'w-[32px] h-[32px] lg:w-[46px] lg:h-[46px]',
  neutral: 'w-[26px] h-[26px] lg:w-[36px] lg:h-[36px]',
};

const colorVariants = {
  green: {
    border: 'border-green-200 data-[state=checked]:border-green-500',
    bg: 'data-[state=checked]:bg-green-500',
    hover: 'hover:border-green-300 hover:bg-green-50',
  },
  purple: {
    border: 'border-purple-200 data-[state=checked]:border-purple-500',
    bg: 'data-[state=checked]:bg-purple-500',
    hover: 'hover:border-purple-300 hover:bg-purple-50',
  },
  neutral: {
    border: 'border-gray-200 data-[state=checked]:border-gray-400',
    bg: 'data-[state=checked]:bg-gray-400',
    hover: 'hover:border-gray-300 hover:bg-gray-50',
  },
};

export function LikertScale({
  name,
  value,
  onValueChange,
  question,
  labels = { left: 'そう思う', right: 'そう思わない' },
  className,
}: LikertScaleProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h3 className="text-lg font-medium text-gray-900 text-center leading-relaxed">
        {question}
      </h3>
      
      <RadioGroup.Root
        value={value}
        onValueChange={onValueChange}
        name={name}
        className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4"
      >
        {scaleOptions.map((option) => {
          const sizeClass = sizeVariants[option.size as keyof typeof sizeVariants];
          const colorClass = colorVariants[option.color as keyof typeof colorVariants];
          
          return (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              className={cn(
                // Base styles
                'relative rounded-full border-2 transition-all duration-200',
                'focus:outline-none focus:ring-4 focus:ring-blue-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer group',
                // Size
                sizeClass,
                // Colors
                colorClass.border,
                colorClass.bg,
                colorClass.hover,
              )}
              aria-label={option.label}
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full">
                <Check 
                  className={cn(
                    'text-white transition-all duration-200',
                    option.size === 'large' ? 'w-5 h-5 lg:w-7 lg:h-7' :
                    option.size === 'medium' ? 'w-4 h-4 lg:w-5 lg:h-5' :
                    option.size === 'small' ? 'w-3.5 h-3.5 lg:w-4 lg:h-4' :
                    'w-3 h-3 lg:w-3.5 lg:h-3.5'
                  )}
                />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
      
      {/* Labels */}
      <div className="flex justify-between text-sm text-gray-500 px-2">
        <span>{labels.left}</span>
        <span>{labels.right}</span>
      </div>
    </div>
  );
}
```

### 2. **Question Card Component**

```tsx
// src/components/forms/QuestionCard.tsx
import { LikertScale } from '@/components/ui/LikertScale';
import { Card, CardContent } from '@/components/ui/Card';

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    category: 'inattention' | 'hyperactivity' | 'impulsivity';
  };
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function QuestionCard({ 
  question, 
  value, 
  onValueChange, 
  className 
}: QuestionCardProps) {
  return (
    <Card className={cn('w-full max-w-4xl mx-auto', className)}>
      <CardContent className="p-8 lg:p-12">
        <LikertScale
          name={question.id}
          value={value}
          onValueChange={onValueChange}
          question={question.text}
          labels={{
            left: 'そう思う',
            right: 'そう思わない'
          }}
        />
      </CardContent>
    </Card>
  );
}
```

### 3. **Enhanced Styling with Tailwind Config**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 16personalities inspired palette
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main green
          600: '#16a34a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Main purple
          600: '#9333ea',
        }
      },
      spacing: {
        '18': '4.5rem', // 72px
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
};
```

## 🎨 Color Psychology & Accessibility

### **Color Mapping Strategy**
```css
/* Green: Positive/Agreement responses */
.color--green {
  --border-color: #22c55e;
  --bg-color: #22c55e;
  --hover-border: #16a34a;
  --hover-bg: #f0fdf4;
}

/* Purple: Negative/Disagreement responses */  
.color--purple {
  --border-color: #a855f7;
  --bg-color: #a855f7;
  --hover-border: #9333ea;
  --hover-bg: #faf5ff;
}

/* Neutral: Uncertain responses */
.color--neutral {
  --border-color: #6b7280;
  --bg-color: #6b7280;
  --hover-border: #4b5563;
  --hover-bg: #f9fafb;
}
```

### **Accessibility Enhancements**
```tsx
// Enhanced with proper ARIA labels and keyboard navigation
<RadioGroup.Item
  value={option.value}
  aria-label={`${option.label} - ${question.text}`}
  className={cn(
    'focus:ring-4 focus:ring-blue-200 focus:ring-offset-2',
    'focus-visible:outline-none',
  )}
>
```

## 📱 Responsive Behavior

```css
/* Mobile-first approach */
.likert-scale {
  /* Mobile: Smaller, closer spacing */
  gap: 0.5rem; /* 8px */
}

.radio-item {
  /* Base mobile sizes */
  width: 26px;
  height: 26px;
}

/* Tablet and up */
@media (min-width: 640px) {
  .likert-scale {
    gap: 0.75rem; /* 12px */
  }
}

/* Desktop */  
@media (min-width: 1024px) {
  .likert-scale {
    gap: 1rem; /* 16px */
  }
  
  .radio-item--large {
    width: 70px;
    height: 70px;
  }
}
```

## 🚀 Performance Optimizations

### **Bundle Size Considerations**
- Use `@radix-ui/react-radio-group` (lightweight, accessible)
- Leverage Tailwind's purging for minimal CSS
- Consider `lucide-react` icons (tree-shakeable)

### **Animation Performance**
```css
/* GPU-accelerated transitions */
.radio-item {
  transform: translateZ(0); /* Force GPU layer */
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.radio-item:hover {
  transform: scale(1.05) translateZ(0);
}
```

## 📋 Implementation Checklist

- [ ] Install required dependencies (`@radix-ui/react-radio-group`, `lucide-react`)
- [ ] Update Tailwind config with custom colors and animations  
- [ ] Create `LikertScale` component with progressive sizing
- [ ] Implement color-coded response system (green/purple/neutral)
- [ ] Add proper ARIA labels for screen readers
- [ ] Test keyboard navigation (Tab, Arrow keys, Space/Enter)
- [ ] Verify color contrast ratios meet WCAG AA standards
- [ ] Test responsive behavior across device sizes
- [ ] Add smooth transitions and hover effects
- [ ] Implement focus management for form progression

## 🎯 Key Takeaways

1. **Progressive Sizing**: Use different circle sizes to indicate response strength
2. **Color Psychology**: Green for agreement, purple for disagreement, gray for neutral  
3. **Accessibility First**: Proper ARIA labels, keyboard navigation, focus management
4. **Mobile Optimization**: Ensure touch targets meet minimum size requirements (44px)
5. **Smooth Interactions**: Subtle animations enhance user experience without being distracting

This implementation will give you a professional, accessible, and visually appealing radio button system that matches the quality and user experience of 16personalities.com while being perfectly suited for your ADHD diagnostic application.