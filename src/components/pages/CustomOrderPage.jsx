import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const CustomOrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    servings: '',
    flavor: '',
    design: '',
    colors: '',
    message: '',
    budget: '',
    date: '',
    additionalNotes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log('Custom order submitted:', formData);
    
    toast.success('Custom order request submitted! We\'ll contact you within 24 hours.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      occasion: '',
      servings: '',
      flavor: '',
      design: '',
      colors: '',
      message: '',
      budget: '',
      date: '',
      additionalNotes: ''
    });
  };

  // Get minimum date (1 week from today)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display gradient-text mb-4">
              Custom Cake Order
            </h1>
            <p className="text-lg text-gray-600">
              Let's create something special together! Tell us about your dream cake.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="User" size={20} />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
                <Input
                  label="Needed By Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={minDateString}
                  required
                />
              </div>
            </Card>

            {/* Cake Details */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Cake" size={20} />
                Cake Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Occasion"
                  value={formData.occasion}
                  onChange={(e) => handleInputChange('occasion', e.target.value)}
                  required
                >
                  <option value="">Select occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="wedding">Wedding</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="graduation">Graduation</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </Select>
                <Select
                  label="Number of Servings"
                  value={formData.servings}
                  onChange={(e) => handleInputChange('servings', e.target.value)}
                  required
                >
                  <option value="">Select servings</option>
                  <option value="6-8">6-8 people</option>
                  <option value="10-12">10-12 people</option>
                  <option value="15-20">15-20 people</option>
                  <option value="25-30">25-30 people</option>
                  <option value="35-40">35-40 people</option>
                  <option value="50+">50+ people</option>
                </Select>
                <Select
                  label="Flavor"
                  value={formData.flavor}
                  onChange={(e) => handleInputChange('flavor', e.target.value)}
                  required
                >
                  <option value="">Select flavor</option>
                  <option value="vanilla">Vanilla</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="red-velvet">Red Velvet</option>
                  <option value="lemon">Lemon</option>
                  <option value="carrot">Carrot</option>
                  <option value="funfetti">Funfetti</option>
                  <option value="other">Other/Custom</option>
                </Select>
                <Select
                  label="Budget Range"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  required
                >
                  <option value="">Select budget</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300-500">$300 - $500</option>
                  <option value="500+">$500+</option>
                </Select>
              </div>
            </Card>

            {/* Design Details */}
            <Card variant="gradient">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Palette" size={20} />
                Design Details
              </h3>
              <div className="space-y-4">
                <Textarea
                  label="Design Description"
                  placeholder="Describe your vision for the cake design..."
                  value={formData.design}
                  onChange={(e) => handleInputChange('design', e.target.value)}
                  rows={4}
                  required
                />
                <Input
                  label="Color Preferences"
                  placeholder="e.g., Pink and gold, Blue and white, etc."
                  value={formData.colors}
                  onChange={(e) => handleInputChange('colors', e.target.value)}
                />
                <Input
                  label="Custom Message (if any)"
                  placeholder="Text to be written on the cake"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
                <Textarea
                  label="Additional Notes"
                  placeholder="Any other details, dietary restrictions, or special requests..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={3}
                />
              </div>
            </Card>

            {/* Process Info */}
            <Card variant="surface">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ApperIcon name="Info" size={20} />
                What Happens Next?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Consultation</div>
                    <div className="text-gray-600">
                      We'll contact you within 24 hours to discuss your design
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Design & Quote</div>
                    <div className="text-gray-600">
                      We'll create a design mockup and provide a detailed quote
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-yellow-800 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Creation & Delivery</div>
                    <div className="text-gray-600">
                      Once approved, we'll create your masterpiece
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon="Send"
            >
              Submit Custom Order Request
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomOrderPage;