import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import Card from '@/components/atoms/Card';
import DateTimePicker from '@/components/molecules/DateTimePicker';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/hooks/useCart';
import { orderService } from '@/services/api/orderService';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryType: 'delivery',
    scheduledDate: '',
    scheduledTime: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    },
    specialRequests: ''
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart,
        deliveryType: formData.deliveryType,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        customerInfo: formData.customerInfo,
        specialRequests: formData.specialRequests,
        totalPrice: getCartTotal(),
        status: 'pending'
      };

      const order = await orderService.create(orderData);
      clearCart();
      
      toast.success('Order placed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });

      navigate(`/order-confirmation/${order.Id}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      console.error('Order submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal();
  const deliveryFee = formData.deliveryType === 'delivery' ? 5.99 : 0;
  const tax = (total + deliveryFee) * 0.08;
  const finalTotal = total + deliveryFee + tax;

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-display gradient-text mb-8 text-center">
          Complete Your Order
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Type */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Truck" size={20} />
                Delivery Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={formData.deliveryType === 'delivery'}
                    onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-gray-600">$5.99 fee</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={formData.deliveryType === 'pickup'}
                    onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                    className="text-primary"
                  />
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-sm text-gray-600">Free</div>
                  </div>
                </label>
              </div>
            </Card>

{/* Schedule */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Calendar" size={20} />
                Schedule & Availability
              </h3>
              <div className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <ApperIcon name="Clock" size={16} />
                    Real-time Availability
                  </div>
                  <p className="text-xs text-gray-600">
                    Select a date to see available time slots and current booking capacity
                  </p>
                </div>
                
                <DateTimePicker
                  date={formData.scheduledDate}
                  time={formData.scheduledTime}
                  onDateChange={(date) => handleInputChange('scheduledDate', date)}
                  onTimeChange={(time) => handleInputChange('scheduledTime', time)}
                  minDate={minDate}
                />
              </div>
            </Card>

            {/* Customer Information */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="User" size={20} />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.customerInfo.name}
                  onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.customerInfo.email}
                  onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.customerInfo.phone}
                  onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                  required
                />
                <Input
                  label="ZIP Code"
                  value={formData.customerInfo.zipCode}
                  onChange={(e) => handleInputChange('customerInfo.zipCode', e.target.value)}
                  required
                />
              </div>
              
              {formData.deliveryType === 'delivery' && (
                <div className="space-y-4 mt-4">
                  <Input
                    label="Address"
                    value={formData.customerInfo.address}
                    onChange={(e) => handleInputChange('customerInfo.address', e.target.value)}
                    required
                  />
                  <Input
                    label="City"
                    value={formData.customerInfo.city}
                    onChange={(e) => handleInputChange('customerInfo.city', e.target.value)}
                    required
                  />
                </div>
              )}
            </Card>

            {/* Special Requests */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="MessageSquare" size={20} />
                Special Requests
              </h3>
              <Textarea
                label="Additional Notes"
                placeholder="Any special instructions or requests..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={4}
              />
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="surface" className="sticky top-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Receipt" size={20} />
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">Product #{item.productId}</div>
                      <div className="text-sm text-gray-600">
                        {item.size} • {item.flavor} • Qty: {item.quantity}
                      </div>
                      {item.customMessage && (
                        <div className="text-xs text-gray-500 italic">
                          "{item.customMessage}"
                        </div>
                      )}
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {formData.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}:
                  </span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="gradient-text">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-6"
                loading={loading}
                disabled={cart.length === 0}
              >
                Place Order
              </Button>
            </Card>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutForm;