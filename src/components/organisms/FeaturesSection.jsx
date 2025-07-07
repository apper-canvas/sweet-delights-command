import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Palette',
      title: 'Custom Designs',
      description: 'Create unique cakes tailored to your vision with our custom design service.',
      color: 'from-primary to-pink-500'
    },
    {
      icon: 'Clock',
      title: 'Fast Delivery',
      description: 'Same-day delivery available for orders placed before 2 PM.',
      color: 'from-secondary to-teal-500'
    },
    {
      icon: 'Award',
      title: 'Premium Quality',
      description: 'Made with the finest ingredients and attention to every detail.',
      color: 'from-accent to-yellow-400'
    },
    {
      icon: 'Heart',
      title: 'Made with Love',
      description: 'Every cake is handcrafted with passion and care by our expert bakers.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display gradient-text mb-4">
            Why Choose Sweet Delights?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're passionate about creating the perfect cake for your special moments. 
            Here's what makes us different.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient" className="text-center h-full hover:shadow-2xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <ApperIcon name={feature.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;