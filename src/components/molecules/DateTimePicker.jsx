import React from 'react';
import { cn } from '@/utils/cn';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const DateTimePicker = ({ 
  date,
  time,
  onDateChange,
  onTimeChange,
  className,
  minDate
}) => {
  // Generate time slots from 9 AM to 8 PM
  const timeSlots = [];
  for (let hour = 9; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      timeSlots.push({ value: timeString, label: displayTime });
    }
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <Input
        type="date"
        label="Delivery/Pickup Date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        min={minDate}
        required
      />
      <Select
        label="Time"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        required
      >
        <option value="">Select time</option>
        {timeSlots.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default DateTimePicker;