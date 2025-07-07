import React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const QuantitySelector = ({ 
  quantity = 1, 
  onQuantityChange, 
  min = 1, 
  max = 10,
  className 
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 p-0"
      >
        <ApperIcon name="Minus" size={16} />
      </Button>
      <span className="text-lg font-semibold min-w-[2rem] text-center">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 p-0"
      >
        <ApperIcon name="Plus" size={16} />
      </Button>
    </div>
  );
};

export default QuantitySelector;