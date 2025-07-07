import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Head Baker & Founder',
      description: 'With 15 years of baking experience, Sarah brings artistry and passion to every cake.',
      icon: 'Crown'
    },
    {
      name: 'Mike Chen',
      role: 'Pastry Chef',
      description: 'Specialized in wedding cakes and intricate sugar work, Mike creates edible masterpieces.',
      icon: 'Award'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Decorator',
      description: 'Our creative decorator who brings your wildest cake dreams to life with stunning designs.',
      icon: 'Palette'
    }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We use only the finest ingredients and time-tested techniques to ensure every cake is perfect.',
      icon: 'Star'
    },
    {
      title: 'Made Fresh Daily',
      description: 'All our cakes are baked fresh to order, never frozen or mass-produced.',
      icon: 'Clock'
    },
    {
      title: 'Custom Creations',
      description: 'Every cake is unique, tailored to your specific vision and celebration.',
      icon: 'Heart'
    },
    {
      title: 'Community Focused',
      description: 'We\'re proud to be part of this community and celebrate life\'s special moments with you.',
      icon: 'Users'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display gradient-text mb-4">
            About Sweet Delights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creating sweet memories one cake at a time since 2010
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card variant="gradient" className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display gradient-text mb-4">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  Sweet Delights started as a small home bakery in 2010 when Sarah Johnson 
                  decided to turn her lifelong passion for baking into a business. What began 
                  as making birthday cakes for friends and family has grown into the area's 
                  premier custom cake shop.
                </p>
                <p className="text-gray-600 mb-4">
                  We believe that every celebration deserves a cake that's as special as the 
                  occasion itself. That's why we never use shortcuts or mass production – 
                  every cake is handcrafted with love and attention to detail.
                </p>
                <p className="text-gray-600">
                  From intimate birthday parties to grand weddings, we've been privileged to 
                  be part of thousands of celebrations, and we can't wait to be part of yours!
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <ApperIcon name="Cake" size={120} className="text-primary" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display gradient-text text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={member.name} variant="gradient" className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={member.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display gradient-text text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} variant="surface" className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <ApperIcon name={value.icon} size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card variant="gradient" className="text-center">
            <h2 className="text-2xl font-display gradient-text mb-6">
              Visit Our Bakery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="MapPin" size={20} className="text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-600">123 Baker Street<br />Sweet Town, ST 12345</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="Phone" size={20} className="text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">(555) 123-CAKE</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="Clock" size={20} className="text-primary" />
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-gray-600">Mon-Sat: 8AM-6PM<br />Sun: 10AM-4PM</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;