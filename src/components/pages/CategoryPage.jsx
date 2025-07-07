import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '@/components/organisms/ProductGrid';

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid category={category} />
      </div>
    </div>
  );
};

export default CategoryPage;