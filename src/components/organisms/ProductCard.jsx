import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import PriceTag from '@/components/molecules/PriceTag';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      productId: product.Id,
      quantity: 1,
      size: product.sizes[0]?.name || 'Regular',
      flavor: product.flavors[0] || 'Vanilla',
      customMessage: '',
      price: product.sizes[0]?.price || product.basePrice
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.Id}`}>
        <Card variant="gradient" className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="relative">
            <div className="aspect-square w-full bg-gradient-to-br from-pink-50 to-yellow-50 rounded-xl mb-4 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {product.customizable && (
              <Badge 
                variant="accent" 
                className="absolute top-2 right-2"
              >
                Customizable
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ApperIcon name="Tag" size={14} />
              <span className="capitalize">{product.category}</span>
            </div>

            <div className="flex items-center justify-between">
              <PriceTag 
                price={product.basePrice} 
                size="sm"
                rotated
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleQuickAdd}
                className="shrink-0"
              >
                <ApperIcon name="Plus" size={14} />
                Quick Add
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;