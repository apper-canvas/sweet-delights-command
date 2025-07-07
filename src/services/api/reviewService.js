import mockReviews from '@/services/mockData/reviews.json';

export const reviewService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockReviews];
  },

  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const review = mockReviews.find(r => r.Id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return { ...review };
  },

  getByProductId: async (productId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const productReviews = mockReviews.filter(r => r.productId === productId);
    // Sort by date (newest first)
    return productReviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(review => ({ ...review }));
  },

  create: async (review) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newReview = {
      ...review,
      Id: Math.max(...mockReviews.map(r => r.Id)) + 1,
      date: new Date().toISOString()
    };
    
    mockReviews.push(newReview);
    return { ...newReview };
  },

  update: async (id, reviewData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockReviews.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }
    
    mockReviews[index] = { ...mockReviews[index], ...reviewData };
    return { ...mockReviews[index] };
  },

  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockReviews.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Review not found');
    }
    
    mockReviews.splice(index, 1);
    return { success: true };
  }
};