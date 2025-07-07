import mockOrders from '@/services/mockData/orders.json';

export const orderService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockOrders];
  },

  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const order = mockOrders.find(o => o.Id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return { ...order };
  },

  create: async (order) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newOrder = {
      ...order,
      Id: Math.max(...mockOrders.map(o => o.Id)) + 1
    };
    
    mockOrders.push(newOrder);
    return { ...newOrder };
  },

  update: async (id, orderData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockOrders.findIndex(o => o.Id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    mockOrders[index] = { ...mockOrders[index], ...orderData };
    return { ...mockOrders[index] };
  },

  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockOrders.findIndex(o => o.Id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    mockOrders.splice(index, 1);
    return { success: true };
  }
};