import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import QuantitySelector from '@/components/molecules/QuantitySelector';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';

const CartDrawer = ({ isOpen, onClose }) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6 border-b-2 border-pink-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display gradient-text">
                  Shopping Cart
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col h-full">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="text-center">
                    <ApperIcon name="ShoppingCart" size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add some delicious cakes to get started!
                    </p>
                    <Button
                      variant="primary"
                      onClick={onClose}
                      asChild
                    >
                      <Link to="/">Browse Cakes</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 p-6 space-y-4">
                    {cart.map((item) => (
                      <Card key={item.productId} variant="surface" className="p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-50 to-yellow-50 rounded-lg flex-shrink-0">
                            {/* Product image would go here */}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              Product #{item.productId}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.size} • {item.flavor}
                            </p>
                            {item.customMessage && (
                              <p className="text-xs text-gray-500 italic">
                                "{item.customMessage}"
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <QuantitySelector
                                quantity={item.quantity}
                                onQuantityChange={(newQuantity) => 
                                  handleQuantityChange(item.productId, newQuantity)
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.productId)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <ApperIcon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t-2 border-pink-100 p-6 bg-surface">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-display gradient-text">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={onClose}
                      asChild
                    >
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;