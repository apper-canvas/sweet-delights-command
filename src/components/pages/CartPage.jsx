import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import QuantitySelector from '@/components/molecules/QuantitySelector';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    toast.success('Cart updated!', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
    });
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Empty
          title="Your cart is empty"
          description="Add some delicious cakes to get started!"
          actionText="Browse Cakes"
          onAction={() => navigate('/')}
          icon="ShoppingCart"
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
              Shopping Cart
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              icon="ArrowLeft"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.productId} variant="gradient" className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-50 to-yellow-50 rounded-xl flex-shrink-0">
                      {/* Product image would go here */}
                      <div className="w-full h-full flex items-center justify-center">
                        <ApperIcon name="Cake" size={32} className="text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Product #{item.productId}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {item.size} • {item.flavor}
                          </p>
                          {item.customMessage && (
                            <p className="text-sm text-gray-500 italic mt-1">
                              Message: "{item.customMessage}"
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(newQuantity) => 
                            handleQuantityChange(item.productId, newQuantity)
                          }
                        />
                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </div>
                          <div className="text-xl font-bold gradient-text">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card variant="surface" className="sticky top-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ApperIcon name="Receipt" size={20} />
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items):</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery fee:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax:</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/checkout">
                    <ApperIcon name="CreditCard" size={20} />
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="mt-4 text-center">
                  <Link 
                    to="/" 
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;