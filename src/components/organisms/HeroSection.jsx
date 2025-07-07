import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-yellow-50 to-teal-50 sprinkle-pattern">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display gradient-text leading-tight">
                Sweet Delights
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mt-4">
                Where every cake tells a story
              </p>
            </div>
            
            <p className="text-lg text-gray-600 max-w-md">
              Handcrafted with love, our premium cakes are perfect for your special moments. 
              From birthdays to weddings, we create memories one slice at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                asChild
              >
                <Link to="/category/birthday">
                  <ApperIcon name="Gift" size={20} />
                  Order Birthday Cake
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
              >
                <Link to="/custom">
                  <ApperIcon name="Palette" size={20} />
                  Custom Design
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-display gradient-text">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display gradient-text">50+</div>
                <div className="text-sm text-gray-600">Cake Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display gradient-text">5★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full p-8">
                <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center">
                  <ApperIcon name="Cake" size={120} className="text-primary" />
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent to-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <ApperIcon name="Star" size={24} className="text-yellow-800" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-secondary to-teal-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <ApperIcon name="Heart" size={18} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;