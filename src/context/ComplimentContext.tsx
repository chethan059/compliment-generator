
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
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({ sound: true, vibration: true, silent: false });
  const [randomNotificationsEnabled, setRandomNotificationsEnabled] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    refreshCompliments();
    setScheduledCompliments(getScheduledCompliments());
    setNotificationSettings(getNotificationSettings());
    setRandomNotificationsEnabled(getRandomNotificationSettings());
  }, []);

  const refreshCompliments = () => {
    setCompliments(getCompliments());
  };

  const addCustomCompliment = (text: string, category: ComplimentCategory) => {
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
  };

  const addScheduledCompliment = (scheduled: ScheduledCompliment) => {
    saveScheduledCompliment(scheduled);
    setScheduledCompliments(getScheduledCompliments());
    toast({
      title: scheduled.id ? "Schedule updated" : "Schedule created",
      description: "Your compliment schedule has been saved.",
    });
  };

  const removeScheduledCompliment = (id: string) => {
    deleteScheduledCompliment(id);
    setScheduledCompliments(getScheduledCompliments());
    toast({
      title: "Schedule removed",
      description: "The scheduled compliment has been deleted.",
    });
  };

  const updateNotificationSettings = (settings: NotificationSettings) => {
    saveNotificationSettings(settings);
    setNotificationSettings(settings);
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const toggleRandomNotifications = (enabled: boolean) => {
    saveRandomNotificationSettings(enabled);
    setRandomNotificationsEnabled(enabled);
    toast({
      title: "Random notifications " + (enabled ? "enabled" : "disabled"),
      description: enabled 
        ? "You will receive surprise compliments throughout the day." 
        : "You will no longer receive surprise compliments.",
    });
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
