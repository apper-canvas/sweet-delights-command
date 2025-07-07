import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReviewSection from "@/components/organisms/ReviewSection";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Textarea from "@/components/atoms/Textarea";
import Input from "@/components/atoms/Input";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import PriceTag from "@/components/molecules/PriceTag";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import { productService } from "@/services/api/productService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getById(parseInt(id));
      setProduct(data);
      setSelectedSize(data.sizes[0]?.name || '');
      setSelectedFlavor(data.flavors[0] || '');
    } catch (err) {
      setError('Failed to load product. Please try again.');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
    const price = selectedSizeData?.price || product.basePrice;

    const cartItem = {
      productId: product.Id,
      quantity,
      size: selectedSize,
      flavor: selectedFlavor,
      customMessage,
      price
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return <Error message="Product not found" />;

  const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
  const currentPrice = selectedSizeData?.price || product.basePrice;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
          icon="ArrowLeft"
        >
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.customizable && (
                  <Badge variant="accent">Customizable</Badge>
                )}
              </div>
              <h1 className="text-3xl font-display gradient-text mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">
                {product.description}
              </p>
            </div>

            <PriceTag price={currentPrice} size="lg" />

            <Card variant="surface" className="space-y-4">
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <Select
                  label="Size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  required
                >
                  {product.sizes.map((size) => (
                    <option key={size.name} value={size.name}>
                      {size.name} - ${size.price}
                    </option>
                  ))}
                </Select>
              )}

              {/* Flavor Selection */}
              {product.flavors.length > 0 && (
                <Select
                  label="Flavor"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  required
                >
                  {product.flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </Select>
              )}

              {/* Custom Message */}
              {product.customizable && (
                <Textarea
                  label="Custom Message (Optional)"
                  placeholder="Add a personal message to your cake..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                />
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </div>
            </Card>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-display gradient-text">
                  ${(currentPrice * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="w-full"
              icon="ShoppingCart"
            >
              Add to Cart
            </Button>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" size={16} className="text-secondary" />
                <span className="text-sm text-gray-600">Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Award" size={16} className="text-secondary" />
                <span className="text-sm text-gray-600">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" size={16} className="text-secondary" />
                <span className="text-sm text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Heart" size={16} className="text-secondary" />
                <span className="text-sm text-gray-600">Made with Love</span>
              </div>
            </div>
</motion.div>
        </div>

        {/* Customer Reviews */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;