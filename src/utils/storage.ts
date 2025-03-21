
import { Compliment, ComplimentCategory, ScheduledCompliment, NotificationSettings } from "@/types";
import { defaultCompliments, allCompliments } from "@/data/compliments";

// Local Storage Keys
const COMPLIMENTS_KEY = 'compliments';
const SCHEDULED_COMPLIMENTS_KEY = 'scheduled_compliments';
const NOTIFICATION_SETTINGS_KEY = 'notification_settings';
const RANDOM_NOTIFICATIONS_KEY = 'random_notifications';
const LAST_RANDOM_NOTIFICATION_KEY = 'last_random_notification';

// Get all compliments from local storage
export const getCompliments = (): Record<ComplimentCategory, Compliment[]> => {
  const storedCompliments = localStorage.getItem(COMPLIMENTS_KEY);
  
  if (!storedCompliments) {
    // Initialize with default and additional compliments if none exist
    const complimentsByCategory: Record<ComplimentCategory, Compliment[]> = {
      motivational: [],
      funny: [],
      encouraging: [],
      professional: [],
      personal: [],
      general: []
    };
    
    // Categorize compliments
    allCompliments.forEach(compliment => {
      complimentsByCategory[compliment.category].push(compliment);
    });
    
    localStorage.setItem(COMPLIMENTS_KEY, JSON.stringify(complimentsByCategory));
    return complimentsByCategory;
  }
  
  return JSON.parse(storedCompliments);
};

// Save a new custom compliment
export const saveCustomCompliment = (compliment: Compliment): void => {
  const compliments = getCompliments();
  
  if (!compliments[compliment.category]) {
    compliments[compliment.category] = [];
  }
  
  compliments[compliment.category].push(compliment);
  localStorage.setItem(COMPLIMENTS_KEY, JSON.stringify(compliments));
};

// Delete a compliment
export const deleteCompliment = (id: string): void => {
  const compliments = getCompliments();
  
  // Search in all categories
  Object.keys(compliments).forEach((category) => {
    const categoryKey = category as ComplimentCategory;
    compliments[categoryKey] = compliments[categoryKey].filter(
      (comp) => comp.id !== id
    );
  });
  
  localStorage.setItem(COMPLIMENTS_KEY, JSON.stringify(compliments));
};

// Get random compliment (optionally from a specific category)
export const getRandomCompliment = (category?: ComplimentCategory): Compliment | null => {
  const compliments = getCompliments();
  
  if (category) {
    // Get from specific category
    const categoryCompliments = compliments[category] || [];
    if (categoryCompliments.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * categoryCompliments.length);
    return categoryCompliments[randomIndex];
  } else {
    // Get from any category
    const allCompliments: Compliment[] = [];
    Object.values(compliments).forEach(categoryCompliments => {
      allCompliments.push(...categoryCompliments);
    });
    
    if (allCompliments.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * allCompliments.length);
    return allCompliments[randomIndex];
  }
};

// Get all scheduled compliments
export const getScheduledCompliments = (): ScheduledCompliment[] => {
  const storedSchedules = localStorage.getItem(SCHEDULED_COMPLIMENTS_KEY);
  return storedSchedules ? JSON.parse(storedSchedules) : [];
};

// Save scheduled compliment
export const saveScheduledCompliment = (schedule: ScheduledCompliment): void => {
  const schedules = getScheduledCompliments();
  const existingIndex = schedules.findIndex(s => s.id === schedule.id);
  
  if (existingIndex >= 0) {
    // Update existing
    schedules[existingIndex] = schedule;
  } else {
    // Add new
    schedules.push(schedule);
  }
  
  localStorage.setItem(SCHEDULED_COMPLIMENTS_KEY, JSON.stringify(schedules));
};

// Delete scheduled compliment
export const deleteScheduledCompliment = (id: string): void => {
  const schedules = getScheduledCompliments().filter(s => s.id !== id);
  localStorage.setItem(SCHEDULED_COMPLIMENTS_KEY, JSON.stringify(schedules));
};

// Get notification settings
export const getNotificationSettings = (): NotificationSettings => {
  const settings = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
  return settings 
    ? JSON.parse(settings) 
    : { sound: true, vibration: true, silent: false };
};

// Save notification settings
export const saveNotificationSettings = (settings: NotificationSettings): void => {
  localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
};

// Get random notifications setting
export const getRandomNotificationSettings = (): boolean => {
  const enabled = localStorage.getItem(RANDOM_NOTIFICATIONS_KEY);
  return enabled ? JSON.parse(enabled) : false;
};

// Save random notifications setting
export const saveRandomNotificationSettings = (enabled: boolean): void => {
  localStorage.setItem(RANDOM_NOTIFICATIONS_KEY, JSON.stringify(enabled));
};

// Get last random notification timestamp
export const getLastRandomNotification = (): number => {
  const timestamp = localStorage.getItem(LAST_RANDOM_NOTIFICATION_KEY);
  return timestamp ? parseInt(timestamp, 10) : 0;
};

// Save last random notification timestamp
export const saveLastRandomNotification = (timestamp: number): void => {
  localStorage.setItem(LAST_RANDOM_NOTIFICATION_KEY, timestamp.toString());
};

// Export data as JSON
export const exportData = (): string => {
  const data = {
    compliments: getCompliments(),
    scheduledCompliments: getScheduledCompliments(),
    notificationSettings: getNotificationSettings(),
    randomNotificationsEnabled: getRandomNotificationSettings()
  };
  
  return JSON.stringify(data);
};

// Import data from JSON
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.compliments) {
      localStorage.setItem(COMPLIMENTS_KEY, JSON.stringify(data.compliments));
    }
    
    if (data.scheduledCompliments) {
      localStorage.setItem(SCHEDULED_COMPLIMENTS_KEY, JSON.stringify(data.scheduledCompliments));
    }
    
    if (data.notificationSettings) {
      localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(data.notificationSettings));
    }
    
    if (data.randomNotificationsEnabled !== undefined) {
      localStorage.setItem(RANDOM_NOTIFICATIONS_KEY, JSON.stringify(data.randomNotificationsEnabled));
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
