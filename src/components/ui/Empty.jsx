import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = 'No items found', 
  description = 'Try adjusting your search or filters.',
  actionText = 'Browse All',
  onAction,
  icon = 'Search'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-secondary to-teal-500 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      {onAction && (
        <Button
          variant="primary"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;