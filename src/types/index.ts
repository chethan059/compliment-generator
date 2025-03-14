
export interface Compliment {
  id: string;
  text: string;
  category: ComplimentCategory;
  createdAt: number;
  isCustom: boolean;
}

export type ComplimentCategory = 
  | 'motivational' 
  | 'funny' 
  | 'encouraging' 
  | 'professional' 
  | 'personal';

export interface ScheduledCompliment {
  id: string;
  time: string; // Format: HH:MM in 24-hour format
  days: number[]; // 0-6 (Sunday to Saturday)
  active: boolean;
  complimentCategory?: ComplimentCategory;
  lastTriggered?: number;
}

export interface NotificationSettings {
  sound: boolean;
  vibration: boolean;
  silent: boolean;
}
