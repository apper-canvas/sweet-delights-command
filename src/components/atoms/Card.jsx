import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className, 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-white border-gray-200",
    elevated: "bg-white border-gray-200 shadow-xl",
    surface: "bg-surface border-pink-100",
    gradient: "bg-gradient-to-br from-white to-surface border-pink-100"
  };

  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg scalloped-border",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;