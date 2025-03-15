
import { LocalNotifications } from '@capacitor/local-notifications';
import { Compliment } from '@/types';

// Initialize notifications
export const initializeNotifications = async () => {
  try {
    // Request permission
    const permStatus = await LocalNotifications.requestPermissions();
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
    // Schedule a notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: compliment.isCustom ? 'Your Compliment' : 'Surprise Compliment',
          body: compliment.text,
          id: Date.now(),
          schedule: { at: new Date(Date.now()) },
          sound: 'beep.wav',
          smallIcon: 'ic_stat_icon_config_sample',
          actionTypeId: '',
          extra: {
            complimentId: compliment.id,
            category: compliment.category
          }
        }
      ]
    });
    return true;
  } catch (error) {
    console.error('Error sending native notification:', error);
    return false;
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
