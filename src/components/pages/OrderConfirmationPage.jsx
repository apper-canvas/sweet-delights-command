import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { orderService } from '@/services/api/orderService';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await orderService.getById(parseInt(id));
      setOrder(data);
    } catch (err) {
      setError('Failed to load order details. Please try again.');
      console.error('Error loading order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadOrder} />;
  if (!order) return <Error message="Order not found" />;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-success to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="CheckCircle" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display gradient-text mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We'll start preparing your cake right away!
            </p>
          </div>

          {/* Order Details */}
          <Card variant="gradient" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <Badge variant="success" className="text-sm">
                {order.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600">Order Number</div>
                <div className="font-semibold">#{order.Id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="font-semibold text-lg gradient-text">
                  ${order.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Info */}
            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon 
                  name={order.deliveryType === 'delivery' ? 'Truck' : 'MapPin'} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="font-medium capitalize">
                  {order.deliveryType}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(order.scheduledDate)} at {formatTime(order.scheduledTime)}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon name="User" size={16} className="text-primary" />
                <span className="font-medium">Customer Information</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{order.customerInfo.name}</div>
                <div>{order.customerInfo.email}</div>
                <div>{order.customerInfo.phone}</div>
                {order.deliveryType === 'delivery' && (
                  <div>
                    {order.customerInfo.address}, {order.customerInfo.city} {order.customerInfo.zipCode}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Order Items */}
          <Card variant="surface" className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium">Product #{item.productId}</div>
                    <div className="text-sm text-gray-600">
                      {item.size} • {item.flavor} • Qty: {item.quantity}
                    </div>
                    {item.customMessage && (
                      <div className="text-xs text-gray-500 italic">
                        Message: "{item.customMessage}"
                      </div>
                    )}
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Next Steps */}
          <Card variant="gradient" className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ApperIcon name="Clock" size={20} />
              What's Next?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium">Order Confirmation</div>
                  <div className="text-gray-600">
                    You'll receive an email confirmation shortly
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium">Cake Preparation</div>
                  <div className="text-gray-600">
                    Our bakers will start preparing your cake
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-800 text-xs font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium">
                    {order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
                  </div>
                  <div className="text-gray-600">
                    {order.deliveryType === 'delivery' 
                      ? 'Your cake will be delivered to your address'
                      : 'Your cake will be ready for pickup'
                    }
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              asChild
            >
              <Link to="/">
                <ApperIcon name="Home" size={20} />
                Back to Shop
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.print()}
            >
              <ApperIcon name="Printer" size={20} />
              Print Order
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;