import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(({ 
  className, 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-gradient-to-r from-primary/10 to-pink-500/10 text-primary border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-teal-500/10 text-secondary border-secondary/20",
    accent: "bg-gradient-to-r from-accent/20 to-yellow-400/20 text-yellow-800 border-accent/30",
    success: "bg-gradient-to-r from-success/10 to-green-500/10 text-green-800 border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-orange-500/10 text-orange-800 border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-500/10 text-red-800 border-error/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;