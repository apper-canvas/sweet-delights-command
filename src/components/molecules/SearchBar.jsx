import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  className, 
  placeholder = "Search cakes...",
  onSearch,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-md", className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-gray-200 bg-white text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        {...props}
      />
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      />
    </form>
  );
};

export default SearchBar;