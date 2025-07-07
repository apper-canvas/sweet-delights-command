import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { productService } from '@/services/api/productService';

const ProductGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'birthday', name: 'Birthday' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'custom', name: 'Custom' }
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProducts} />;

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-display gradient-text">
          {selectedCategory === 'all' ? 'All Cakes' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Cakes`}
        </h2>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Empty
          title="No cakes found"
          description={`We don't have any ${selectedCategory === 'all' ? '' : selectedCategory + ' '}cakes available right now.`}
          actionText="Browse All Cakes"
          onAction={() => setSelectedCategory('all')}
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;