import React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/atoms/Button';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex-shrink-0"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;