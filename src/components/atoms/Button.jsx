import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-pink-500 text-white hover:from-pink-500 hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-primary/50",
    secondary: "bg-gradient-to-r from-secondary to-teal-500 text-white hover:from-teal-500 hover:to-secondary shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-secondary/50",
    accent: "bg-gradient-to-r from-accent to-yellow-400 text-gray-800 hover:from-yellow-400 hover:to-accent shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-accent/50",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary/50",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-pink-500 hover:to-red-500 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-red-500/50"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-full",
    md: "h-11 px-6 text-base rounded-full",
    lg: "h-13 px-8 text-lg rounded-full"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader" className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;