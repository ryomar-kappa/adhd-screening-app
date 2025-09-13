import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex items-center justify-center gap-2 sm:gap-3 lg:gap-4', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: 'neutral' | 'small' | 'medium' | 'large';
  variant?: 'green' | 'purple' | 'neutral';
}

const sizeVariants = {
  neutral: 'w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px]',
  small: 'w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] lg:w-[48px] lg:h-[48px]',
  medium: 'w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[64px] lg:h-[64px]',
  large: 'w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] lg:w-[80px] lg:h-[80px]',
};

const iconSizeVariants = {
  neutral: 'w-3 h-3 lg:w-3.5 lg:h-3.5',
  small: 'w-3.5 h-3.5 lg:w-4 lg:h-4',
  medium: 'w-4 h-4 lg:w-5 lg:h-5',
  large: 'w-5 h-5 lg:w-7 lg:h-7',
};

const colorVariants = {
  green: {
    border: 'border-green-300 data-[state=checked]:border-green-500',
    bg: 'data-[state=checked]:bg-green-500',
    hover: 'hover:border-green-400 hover:bg-green-50/50 hover:scale-110',
  },
  purple: {
    border: 'border-purple-300 data-[state=checked]:border-purple-500',
    bg: 'data-[state=checked]:bg-purple-500',
    hover: 'hover:border-purple-400 hover:bg-purple-50/50 hover:scale-110',
  },
  neutral: {
    border: 'border-gray-300 data-[state=checked]:border-gray-500',
    bg: 'data-[state=checked]:bg-gray-500',
    hover: 'hover:border-gray-400 hover:bg-gray-50/50 hover:scale-110',
  },
};

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size = 'medium', variant = 'neutral', ...props }, ref) => {
  const sizeClass = sizeVariants[size];
  const iconSizeClass = iconSizeVariants[size];
  const colorClass = colorVariants[variant];
  
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base styles
        'relative rounded-full border-3 transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer transform-gpu bg-white',
        'shadow-sm hover:shadow-md',
        // Size
        sizeClass,
        // Colors
        colorClass.border,
        colorClass.bg,
        colorClass.hover,
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full">
        <Check 
          className={cn(
            'text-white transition-all duration-200',
            iconSizeClass
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps };