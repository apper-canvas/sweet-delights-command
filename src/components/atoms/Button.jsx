import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  asChild = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'hover:bg-primary/10 text-primary',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  const iconElement = icon && (
    <ApperIcon 
      name={icon} 
      size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} 
    />
  )

  const content = (
    <>
      {loading && <ApperIcon name="Loader2" size={16} className="animate-spin" />}
      {!loading && iconPosition === 'left' && iconElement}
      {children}
      {!loading && iconPosition === 'right' && iconElement}
    </>
  )

  // If asChild is true, render the first child and clone it with button props
  if (asChild) {
    const child = React.Children.only(children)
    return React.cloneElement(child, {
      className: cn(buttonClasses, child.props.className),
      ref,
      ...props
    })
  }

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

export default Button