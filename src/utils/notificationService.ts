
import { ScheduledCompliment, Compliment, NotificationSettings } from "@/types";
import { getRandomCompliment } from "@/utils/storage";
import { getLastRandomNotification, saveLastRandomNotification } from "@/utils/storage";

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

// Check if a random notification should be shown
export const checkForRandomNotification = (
  randomNotificationsEnabled: boolean,
  sendNotification: (compliment: Compliment) => void
): boolean => {
  if (!randomNotificationsEnabled) return false;
  
  const now = new Date();
  const currentHour = now.getHours();
  
  // Only show random notifications during waking hours (8 AM to 10 PM)
  if (currentHour < 8 || currentHour > 22) return false;
  
  // Get the last time a random notification was shown
  const lastShown = getLastRandomNotification();
  const hoursSinceLastNotification = (now.getTime() - lastShown) / (1000 * 60 * 60);
  
  // Decide whether to show a notification based on time passed and randomness
  // The longer it's been, the higher the chance
  const baseChance = 0.01; // 1% base chance per check (checks happen every 30 seconds)
  const timeMultiplier = Math.min(hoursSinceLastNotification, 4) / 4; // Max out at 4 hours
  const chance = baseChance + (0.04 * timeMultiplier); // Up to 5% chance
  
  if (Math.random() < chance) {
    const compliment = getRandomCompliment();
    if (compliment) {
      sendNotification(compliment);
      saveLastRandomNotification(now.getTime());
      return true;
    }
  }
  
  return false;
};

// Play notification sound based on settings
export const playNotificationSound = (settings: NotificationSettings) => {
  if (settings.sound && !settings.silent) {
    try {
      // Simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 200);
    } catch (e) {
      console.error('Could not play notification sound:', e);
    }
  }
};

// Trigger device vibration based on settings
export const triggerVibration = (settings: NotificationSettings) => {
  if (settings.vibration && !settings.silent && navigator.vibrate) {
    navigator.vibrate(200);
  }
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
