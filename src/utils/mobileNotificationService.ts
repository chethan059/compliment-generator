
import { LocalNotifications } from '@capacitor/local-notifications';
import { Compliment } from '@/types';

// Initialize notifications
export const initializeNotifications = async () => {
  try {
    // Check if the plugin is available
    if (!('Capacitor' in window) || !(window as any).Capacitor.isPluginAvailable('LocalNotifications')) {
      console.log('LocalNotifications plugin not available');
      return false;
    }
    
    // Request permission
    const permStatus = await LocalNotifications.requestPermissions();
    console.log('Notification permission status:', permStatus);
    return permStatus.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

// Check if platform is mobile
export const isMobileDevice = () => {
  return typeof window !== 'undefined' && 
         'Capacitor' in window && 
         (window as any).Capacitor?.isNativePlatform();
};

// Send a native notification
export const sendNativeNotification = async (compliment: Compliment) => {
  if (!isMobileDevice()) return false;
  
  try {
    console.log('Sending native notification for:', compliment);
    
    // Schedule a notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: compliment.isCustom ? 'Your Compliment' : 'Surprise Compliment',
          body: compliment.text,
          id: Date.now(),
          schedule: { at: new Date(Date.now()) },
          sound: null, // Use default sound
          smallIcon: 'ic_stat_icon_config_sample',
          largeIcon: null,
          channelId: 'bright-mind-compliments',
          extra: {
            complimentId: compliment.id,
            category: compliment.category
          }
        }
      ]
    });
    
    console.log('Native notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending native notification:', error);
    return false;
  }
};

// Setup notification channel (Android specific)
export const setupNotificationChannel = async () => {
  if (!isMobileDevice()) return;
  
  try {
    if ('createChannel' in LocalNotifications) {
      await (LocalNotifications as any).createChannel({
        id: 'bright-mind-compliments',
        name: 'Bright Mind Compliments',
        description: 'Notifications for compliments and affirmations',
        importance: 4, // HIGH
        visibility: 1, // PUBLIC
        lights: true,
        vibration: true
      });
      console.log('Notification channel created');
    }
  } catch (error) {
    console.error('Error creating notification channel:', error);
  }
};

// Handle notification click
export const setupNotificationHandlers = () => {
  if (!isMobileDevice()) return;
  
  LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
    console.log('Notification action performed', notification);
    // Handle notification tap here
  });
};

