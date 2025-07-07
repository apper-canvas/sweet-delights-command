import React from 'react';
import { cn } from '@/utils/cn';

const PriceTag = ({ 
  price, 
  originalPrice,
  className,
  size = 'md',
  rotated = false
}) => {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-400 text-gray-800 px-4 py-2 rounded-full font-bold shadow-lg",
      rotated && "transform rotate-3",
      className
    )}>
      <span className={cn("font-display", sizes[size])}>
        ${price}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm line-through opacity-70">
          ${originalPrice}
        </span>
      )}
    </div>
  );
};

export default PriceTag;