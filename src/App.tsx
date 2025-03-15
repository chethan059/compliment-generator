
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComplimentProvider } from "@/context/ComplimentContext";
import { useEffect, useState } from "react";
import { useCompliments } from "@/context/ComplimentContext";
import ComplimentNotification from "@/components/notifications/ComplimentNotification";
import { Compliment } from "@/types";
import { checkForRandomNotification, playNotificationSound, triggerVibration } from "@/utils/notificationService";
import { initializeNotifications, sendNativeNotification, setupNotificationHandlers, isMobileDevice } from "@/utils/mobileNotificationService";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCompliments from "./pages/CustomCompliments";
import ScheduledCompliments from "./pages/ScheduledCompliments";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

function AppNotifications() {
  const { randomNotificationsEnabled, notificationSettings } = useCompliments();
  const [randomCompliment, setRandomCompliment] = useState<Compliment | null>(null);
  const [notificationsInitialized, setNotificationsInitialized] = useState(false);

  // Initialize mobile notifications when app starts
  useEffect(() => {
    const initNotifs = async () => {
      if (isMobileDevice()) {
        const initialized = await initializeNotifications();
        if (initialized) {
          setNotificationsInitialized(true);
          setupNotificationHandlers();
        }
      } else {
        // Web notifications
        if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
          Notification.requestPermission();
        }
      }
    };
    
    initNotifs();
  }, []);

  useEffect(() => {
    // Check for random notifications every 30 seconds
    const checkInterval = setInterval(() => {
      if (randomNotificationsEnabled) {
        const notificationShown = checkForRandomNotification(
          randomNotificationsEnabled,
          async (compliment) => {
            setRandomCompliment(compliment);
            
            // Play sound and vibrate based on user settings
            playNotificationSound(notificationSettings);
            triggerVibration(notificationSettings);
            
            // Send native notification on mobile
            if (isMobileDevice() && notificationsInitialized) {
              await sendNativeNotification(compliment);
            } 
            // Show browser notification on web
            else if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Your Surprise Compliment', { 
                body: compliment.text,
                icon: '/favicon.ico'
              });
            }
          }
        );
      }
    }, 30 * 1000);

    return () => clearInterval(checkInterval);
  }, [randomNotificationsEnabled, notificationSettings, notificationsInitialized]);

  return (
    <ComplimentNotification 
      compliment={randomCompliment}
      onClose={() => setRandomCompliment(null)}
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ComplimentProvider>
        <Toaster />
        <Sonner />
        <AppNotifications />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/custom" element={<CustomCompliments />} />
            <Route path="/scheduled" element={<ScheduledCompliments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ComplimentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
