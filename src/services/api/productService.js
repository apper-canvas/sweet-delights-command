import mockProducts from '@/services/mockData/products.json';

export const productService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockProducts];
  },

  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = mockProducts.find(p => p.Id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },

  create: async (product) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newProduct = {
      ...product,
      Id: Math.max(...mockProducts.map(p => p.Id)) + 1
    };
    
    mockProducts.push(newProduct);
    return { ...newProduct };
  },

  update: async (id, productData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockProducts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return { ...mockProducts[index] };
  },

  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockProducts.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts.splice(index, 1);
    return { success: true };
  }
};