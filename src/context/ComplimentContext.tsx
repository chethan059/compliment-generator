
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Compliment, ComplimentCategory, ScheduledCompliment, NotificationSettings } from '@/types';
import { 
  getCompliments, 
  getRandomCompliment, 
  saveCustomCompliment,
  getScheduledCompliments, 
  saveScheduledCompliment,
  deleteScheduledCompliment,
  getNotificationSettings,
  saveNotificationSettings,
  getRandomNotificationSettings,
  saveRandomNotificationSettings
} from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

interface ComplimentContextType {
  compliments: Record<ComplimentCategory, Compliment[]>;
  scheduledCompliments: ScheduledCompliment[];
  notificationSettings: NotificationSettings;
  randomNotificationsEnabled: boolean;
  getRandomCompliment: (category?: ComplimentCategory) => Compliment | null;
  addCustomCompliment: (text: string, category: ComplimentCategory) => void;
  addScheduledCompliment: (scheduled: ScheduledCompliment) => void;
  removeScheduledCompliment: (id: string) => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
  toggleRandomNotifications: (enabled: boolean) => void;
  refreshCompliments: () => void;
}

const ComplimentContext = createContext<ComplimentContextType | undefined>(undefined);

export const ComplimentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compliments, setCompliments] = useState<Record<ComplimentCategory, Compliment[]>>({} as Record<ComplimentCategory, Compliment[]>);
  const [scheduledCompliments, setScheduledCompliments] = useState<ScheduledCompliment[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({ 
    sound: true, 
    vibration: true, 
    silent: false 
  });
  const [randomNotificationsEnabled, setRandomNotificationsEnabled] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      refreshCompliments();
      setScheduledCompliments(getScheduledCompliments());
      setNotificationSettings(getNotificationSettings());
      setRandomNotificationsEnabled(getRandomNotificationSettings());
    } catch (error) {
      console.error('Error initializing compliment context:', error);
    }
  }, []);

  const refreshCompliments = () => {
    try {
      setCompliments(getCompliments());
    } catch (error) {
      console.error('Error refreshing compliments:', error);
      setCompliments({} as Record<ComplimentCategory, Compliment[]>);
    }
  };

  const addCustomCompliment = (text: string, category: ComplimentCategory) => {
    try {
      const newCompliment: Compliment = {
        id: `custom-${Date.now()}`,
        text,
        category,
        createdAt: Date.now(),
        isCustom: true
      };

      saveCustomCompliment(newCompliment);
      refreshCompliments();
      toast({
        title: "Compliment added",
        description: "Your custom compliment has been saved.",
      });
    } catch (error) {
      console.error('Error adding custom compliment:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your compliment.",
        variant: "destructive"
      });
    }
  };

  const addScheduledCompliment = (scheduled: ScheduledCompliment) => {
    try {
      saveScheduledCompliment(scheduled);
      setScheduledCompliments(getScheduledCompliments());
      toast({
        title: scheduled.id ? "Schedule updated" : "Schedule created",
        description: "Your compliment schedule has been saved.",
      });
    } catch (error) {
      console.error('Error adding scheduled compliment:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your schedule.",
        variant: "destructive"
      });
    }
  };

  const removeScheduledCompliment = (id: string) => {
    try {
      deleteScheduledCompliment(id);
      setScheduledCompliments(getScheduledCompliments());
      toast({
        title: "Schedule removed",
        description: "The scheduled compliment has been deleted.",
      });
    } catch (error) {
      console.error('Error removing scheduled compliment:', error);
      toast({
        title: "Error",
        description: "There was a problem deleting your schedule.",
        variant: "destructive"
      });
    }
  };

  const updateNotificationSettings = (settings: NotificationSettings) => {
    try {
      saveNotificationSettings(settings);
      setNotificationSettings(settings);
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating notification settings:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    }
  };
  
  const toggleRandomNotifications = (enabled: boolean) => {
    try {
      saveRandomNotificationSettings(enabled);
      setRandomNotificationsEnabled(enabled);
      toast({
        title: "Random notifications " + (enabled ? "enabled" : "disabled"),
        description: enabled 
          ? "You will receive surprise compliments throughout the day." 
          : "You will no longer receive surprise compliments.",
      });
    } catch (error) {
      console.error('Error toggling random notifications:', error);
      toast({
        title: "Error",
        description: "There was a problem updating your notification settings.",
        variant: "destructive"
      });
    }
  };

  return (
    <ComplimentContext.Provider
      value={{
        compliments,
        scheduledCompliments,
        notificationSettings,
        randomNotificationsEnabled,
        getRandomCompliment,
        addCustomCompliment,
        addScheduledCompliment,
        removeScheduledCompliment,
        updateNotificationSettings,
        toggleRandomNotifications,
        refreshCompliments
      }}
    >
      {children}
    </ComplimentContext.Provider>
  );
};

export const useCompliments = () => {
  const context = useContext(ComplimentContext);
  if (context === undefined) {
    throw new Error('useCompliments must be used within a ComplimentProvider');
  }
  return context;
};
