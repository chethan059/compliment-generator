
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9f556b875b1742c0a088bf0c8b1edbff',
  appName: 'bright-mind-messages',
  webDir: 'dist',
  server: {
    url: 'https://9f556b87-5b17-42c0-a088-bf0c8b1edbff.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: null,
      channelId: "bright-mind-compliments",
      channelName: "Bright Mind Compliments"
    },
  }
};

export default config;

