import React from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import ProductGrid from '@/components/organisms/ProductGrid';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductGrid />
      </div>
    </div>
  );
};

export default HomePage;