
import { ScheduledCompliment, Compliment } from "@/types";
import { getRandomCompliment } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

// Check if a scheduled time is due based on the current time
export const isScheduleDue = (schedule: ScheduledCompliment): boolean => {
  const now = new Date();
  const currentDay = now.getDay(); // 0-6 (Sunday to Saturday)
  
  // Check if today is in the scheduled days
  if (!schedule.days.includes(currentDay)) {
    return false;
  }
  
  // Get current time in HH:MM format
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;
  
  // Get scheduled time
  const [scheduledHours, scheduledMinutes] = schedule.time.split(':');
  
  // Only check minute precision (for testing purposes)
  return currentHours === scheduledHours && currentMinutes === scheduledMinutes;
};

// Check all scheduled compliments and trigger notifications if due
export const checkScheduledCompliments = (
  scheduledCompliments: ScheduledCompliment[],
  sendNotification: (compliment: Compliment) => void
) => {
  const now = new Date();
  
  // Get active schedules for the current day
  const activeSchedules = scheduledCompliments.filter(
    schedule => schedule.active && schedule.days.includes(now.getDay())
  );
  
  // Check each schedule
  activeSchedules.forEach(schedule => {
    if (isScheduleDue(schedule)) {
      // Don't trigger if already triggered in the last minute
      const lastTriggered = schedule.lastTriggered || 0;
      const oneMinuteAgo = now.getTime() - 60 * 1000;
      
      if (lastTriggered < oneMinuteAgo) {
        // Get a compliment based on the schedule category
        const compliment = getRandomCompliment(schedule.complimentCategory);
        
        if (compliment) {
          // Send the notification
          sendNotification(compliment);
          
          // Update the last triggered time (this needs to be saved)
          schedule.lastTriggered = now.getTime();
        }
      }
    }
  });
  
  return scheduledCompliments.map(s => {
    // Find if this schedule was updated
    const updated = activeSchedules.find(as => as.id === s.id);
    return updated || s;
  });
};

// Format time for display (12-hour format)
export const formatTimeDisplay = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hour12}:${minutes} ${ampm}`;
};

// Format days for display
export const formatDaysDisplay = (days: number[]): string => {
  if (days.length === 7) return "Every day";
  if (days.length === 0) return "Never";
  if (JSON.stringify(days.sort()) === JSON.stringify([1, 2, 3, 4, 5])) return "Weekdays";
  if (JSON.stringify(days.sort()) === JSON.stringify([0, 6])) return "Weekends";
  
  return days
    .map(day => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day])
    .join(", ");
};
