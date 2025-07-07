import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';
import { availabilityService } from '@/services/api/availabilityService';
import { toast } from 'react-toastify';

const DateTimePicker = ({ 
  date,
  time,
  onDateChange,
  onTimeChange,
  className,
  minDate
}) => {
  const [availability, setAvailability] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Check availability when date changes
  useEffect(() => {
    if (date) {
      checkAvailability(date);
    }
  }, [date]);

  const checkAvailability = async (selectedDate) => {
    setLoadingAvailability(true);
    try {
      const result = await availabilityService.getAvailability(selectedDate);
      setAvailability(result);
      
      // Show availability feedback
      if (result.status === 'busy') {
        toast.warning(`Limited availability on ${new Date(selectedDate).toLocaleDateString()}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (result.status === 'available') {
        toast.success(`Good availability on ${new Date(selectedDate).toLocaleDateString()}`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Could not check availability for selected date', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoadingAvailability(false);
    }
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'limited': return 'text-warning';
      case 'busy': return 'text-error';
      default: return 'text-gray-500';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'limited': return 'AlertTriangle';
      case 'busy': return 'XCircle';
      default: return 'Clock';
    }
  };

  const getAvailabilityMessage = (availability) => {
    if (!availability) return '';
    
    const { status, availableSlots, totalSlots, availabilityPercentage } = availability;
    
    switch (status) {
      case 'available':
        return `Great availability! ${availableSlots}/${totalSlots} time slots available`;
      case 'limited':
        return `Limited availability - ${availableSlots}/${totalSlots} time slots available`;
      case 'busy':
        return `Very busy day - only ${availableSlots}/${totalSlots} time slots available`;
      default:
        return '';
    }
  };

  // Generate available time slots based on availability data
  const getTimeSlots = () => {
    if (!availability) {
      // Fallback to default time slots if no availability data
      const timeSlots = [];
      for (let hour = 9; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          timeSlots.push({ value: timeString, label: displayTime, available: true });
        }
      }
      return timeSlots;
    }
    
    return availability.timeSlots.map(slot => ({
      value: slot.time,
      label: `${slot.displayTime} ${slot.available ? '' : '(Fully Booked)'}`,
      available: slot.available,
      availableSpots: slot.availableSpots
    }));
  };

  const timeSlots = getTimeSlots();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            type="date"
            label="Delivery/Pickup Date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            min={minDate}
            required
          />
          
          {/* Availability indicator */}
          {date && (
            <div className="flex items-center gap-2 text-sm">
              {loadingAvailability ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin" />
                  <span className="text-gray-600">Checking availability...</span>
                </>
              ) : availability ? (
                <>
                  <ApperIcon 
                    name={getAvailabilityIcon(availability.status)} 
                    size={16} 
                    className={getAvailabilityColor(availability.status)}
                  />
                  <span className={cn("font-medium", getAvailabilityColor(availability.status))}>
                    {getAvailabilityMessage(availability)}
                  </span>
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Select
            label="Time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            required
            disabled={!date}
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option 
                key={slot.value} 
                value={slot.value}
                disabled={!slot.available}
                className={slot.available ? '' : 'text-gray-400'}
              >
                {slot.label}
                {slot.available && slot.availableSpots !== undefined && (
                  ` (${slot.availableSpots} spots left)`
                )}
              </option>
            ))}
          </Select>
          
          {/* Time slot availability hint */}
          {date && availability && (
            <div className="text-xs text-gray-600">
              <ApperIcon name="Info" size={12} className="inline mr-1" />
              Time slots show remaining capacity
            </div>
          )}
        </div>
      </div>

      {/* Availability summary card */}
      {availability && (
        <div className="bg-surface rounded-lg p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ApperIcon name="Calendar" size={16} className="text-gray-600" />
            <span className="font-medium text-gray-800">
              Availability for {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">{availability.availableSlots}</div>
              <div className="text-gray-600">Available Slots</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{availability.totalSlots}</div>
              <div className="text-gray-600">Total Slots</div>
            </div>
            <div className="text-center">
              <div className={cn("font-semibold", getAvailabilityColor(availability.status))}>
                {availability.availabilityPercentage}%
              </div>
              <div className="text-gray-600">Available</div>
            </div>
          </div>
          
          {/* Availability progress bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-300", {
                  'bg-success': availability.status === 'available',
                  'bg-warning': availability.status === 'limited',
                  'bg-error': availability.status === 'busy'
                })}
                style={{ width: `${availability.availabilityPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;