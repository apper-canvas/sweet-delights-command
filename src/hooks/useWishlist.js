import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('sweetDelightsWishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweetDelightsWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(currentWishlist => {
      const isAlreadyInWishlist = currentWishlist.some(item => item.Id === product.Id);
      if (!isAlreadyInWishlist) {
        return [...currentWishlist, product];
      }
      return currentWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(currentWishlist => 
      currentWishlist.filter(item => item.Id !== productId)
    );
  };

  const toggleWishlist = (product) => {
    const isInList = isInWishlist(product.Id);
    if (isInList) {
      removeFromWishlist(product.Id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.Id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  };
};