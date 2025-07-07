import mockOrders from '@/services/mockData/orders.json';

export const availabilityService = {
  getAvailability: async (date) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!date) {
      throw new Error('Date is required');
    }
    
    // Parse the date
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Generate realistic availability based on day of week and existing orders
    const existingOrders = mockOrders.filter(order => 
      order.scheduledDate === date
    );
    
    // Count orders per time slot
    const timeSlotCounts = {};
    existingOrders.forEach(order => {
      const time = order.scheduledTime;
      timeSlotCounts[time] = (timeSlotCounts[time] || 0) + 1;
    });
    
    // Generate time slots with availability (9 AM to 8 PM)
    const timeSlots = [];
    for (let hour = 9; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        // Calculate availability based on day type and existing bookings
        let maxCapacity = 8; // Base capacity
        
        // Weekend has higher capacity
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          maxCapacity = 12;
        }
        
        // Peak hours (12-2 PM, 6-8 PM) have higher demand
        if ((hour >= 12 && hour <= 14) || (hour >= 18 && hour <= 20)) {
          maxCapacity = Math.floor(maxCapacity * 0.7);
        }
        
        const bookedCount = timeSlotCounts[timeString] || 0;
        const available = bookedCount < maxCapacity;
        const availableSpots = Math.max(0, maxCapacity - bookedCount);
        
        timeSlots.push({
          time: timeString,
          displayTime,
          available,
          availableSpots,
          maxCapacity,
          bookedCount
        });
      }
    }
    
    // Calculate overall day availability
    const totalAvailable = timeSlots.filter(slot => slot.available).length;
    const totalSlots = timeSlots.length;
    const availabilityPercentage = Math.round((totalAvailable / totalSlots) * 100);
    
    let status = 'available';
    if (availabilityPercentage < 20) {
      status = 'busy';
    } else if (availabilityPercentage < 50) {
      status = 'limited';
    }
    
    return {
      date,
      status, // 'available', 'limited', 'busy'
      availabilityPercentage,
      totalSlots,
      availableSlots: totalAvailable,
      timeSlots
    };
  },

  // Get availability for multiple dates (useful for calendar view)
  getAvailabilityRange: async (startDate, endDate) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const availabilityMap = {};
    
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      const availability = await availabilityService.getAvailability(dateString);
      availabilityMap[dateString] = availability;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return availabilityMap;
  }
};