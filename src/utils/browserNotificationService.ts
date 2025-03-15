
import { Compliment, NotificationPermissionStatus } from "@/types";

// Check if browser notifications are supported
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

// Request permission to show notifications
export const requestNotificationPermission = async (): Promise<NotificationPermissionStatus> => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  
  const permission = await Notification.requestPermission();
  return permission as NotificationPermissionStatus;
};

// Get current permission status
export const getNotificationPermission = (): NotificationPermissionStatus => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  
  return Notification.permission as NotificationPermissionStatus;
};

// Show a notification
export const showBrowserNotification = (compliment: Compliment): boolean => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }
  
  try {
    const notification = new Notification('Bright Mind Message', {
      body: compliment.text,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: `compliment-${compliment.id}`,
      timestamp: compliment.createdAt
    });
    
    // Handle notification click
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    return true;
  } catch (error) {
    console.error('Error showing notification:', error);
    return false;
  }
};
