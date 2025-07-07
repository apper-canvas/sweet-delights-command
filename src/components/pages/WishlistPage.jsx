import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import PriceTag from '@/components/molecules/PriceTag';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success('Item removed from wishlist!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  const handleAddToCart = (product) => {
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
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Empty
          title="Your wishlist is empty"
          description="Save your favorite cakes to find them easily later!"
          actionText="Browse Cakes"
          onAction={() => navigate('/')}
          icon="Heart"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display gradient-text">
              My Wishlist
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              icon="ArrowLeft"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="gradient" className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative">
                    <div className="aspect-square w-full bg-gradient-to-br from-pink-50 to-yellow-50 rounded-xl mb-4 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Remove from wishlist button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product.Id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <ApperIcon name="X" size={14} />
                    </button>

                    {product.customizable && (
                      <Badge 
                        variant="accent" 
                        className="absolute top-3 left-3"
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

                    <PriceTag 
                      price={product.basePrice} 
                      size="sm"
                      rotated
                    />

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/product/${product.Id}`}>
                          <ApperIcon name="Eye" size={14} />
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex-1"
                      >
                        <ApperIcon name="Plus" size={14} />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Wishlist Summary */}
          <div className="mt-12 text-center">
            <Card variant="surface" className="inline-block">
              <div className="flex items-center gap-3">
                <ApperIcon name="Heart" size={20} className="text-red-500" />
                <span className="text-lg font-medium">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
                </span>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;