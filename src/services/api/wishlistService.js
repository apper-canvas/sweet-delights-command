import mockWishlistData from '@/services/mockData/wishlist.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const wishlistService = {
  async getAll() {
    await delay(200);
    return [...mockWishlistData];
  },

  async getById(id) {
    await delay(200);
    const item = mockWishlistData.find(item => item.Id === parseInt(id));
    if (!item) {
      throw new Error('Wishlist item not found');
    }
    return { ...item };
  },

  async create(item) {
    await delay(300);
    const newId = mockWishlistData.length > 0 
      ? Math.max(...mockWishlistData.map(item => item.Id)) + 1 
      : 1;
    
    const newItem = {
      ...item,
      Id: newId,
      addedAt: new Date().toISOString()
    };
    
    mockWishlistData.push(newItem);
    return { ...newItem };
  },

  async update(id, data) {
    await delay(300);
    const index = mockWishlistData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Wishlist item not found');
    }
    
    mockWishlistData[index] = {
      ...mockWishlistData[index],
      ...data,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...mockWishlistData[index] };
  },

  async delete(id) {
    await delay(200);
    const index = mockWishlistData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Wishlist item not found');
    }
    
    const deletedItem = { ...mockWishlistData[index] };
    mockWishlistData.splice(index, 1);
    return deletedItem;
  }
};