import React from 'react';
import { cn } from '@/utils/cn';

const Textarea = React.forwardRef(({ 
  className, 
  label,
  error,
  required = false,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-sm transition-colors duration-200 resize-vertical",
          "placeholder:text-gray-500",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;