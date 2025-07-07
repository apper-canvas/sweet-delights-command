import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 animate-pulse">
        Loading delicious cakes...
      </p>
    </div>
  );
};

export default Loading;