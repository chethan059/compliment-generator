
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
import { showBrowserNotification, requestNotificationPermission } from "@/utils/browserNotificationService";
import { 
  isMobileDevice, 
  sendNativeNotification, 
  setupNotificationHandlers, 
  initializeNotifications,
  setupNotificationChannel 
} from "@/utils/mobileNotificationService";

// Import all the page components
import Index from "@/pages/Index";
import CustomCompliments from "@/pages/CustomCompliments";
import ScheduledCompliments from "@/pages/ScheduledCompliments";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppNotifications() {
  const { randomNotificationsEnabled, notificationSettings } = useCompliments();
  const [randomCompliment, setRandomCompliment] = useState<Compliment | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);
  const [mobileNotificationsEnabled, setMobileNotificationsEnabled] = useState<boolean>(false);
  
  // Initialize notifications when app starts
  useEffect(() => {
    const initNotifications = async () => {
      try {
        if (isMobileDevice()) {
          // Initialize mobile notifications
          console.log('Initializing mobile notifications');
          await setupNotificationChannel();
          const mobilePermission = await initializeNotifications();
          console.log('Mobile notification permission:', mobilePermission);
          setMobileNotificationsEnabled(mobilePermission);
          setupNotificationHandlers();
        } else {
          // Initialize browser notifications
          const permission = await requestNotificationPermission();
          setNotificationPermission(permission === 'granted');
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };
    
    initNotifications();
  }, []);

  useEffect(() => {
    // Check for random notifications every 30 seconds
    const checkInterval = setInterval(() => {
      if (randomNotificationsEnabled) {
        const notificationShown = checkForRandomNotification(
          randomNotificationsEnabled,
          async (compliment) => {
            try {
              // Play sound and vibrate based on user settings
              playNotificationSound(notificationSettings);
              triggerVibration(notificationSettings);
              
              // Set in-app notification
              setRandomCompliment(compliment);
              
              if (isMobileDevice() && mobileNotificationsEnabled) {
                // Show mobile notification
                await sendNativeNotification(compliment);
              } else if (notificationPermission) {
                // Show browser notification
                showBrowserNotification(compliment);
              }
            } catch (error) {
              console.error('Error showing notification:', error);
            }
          }
        );
      }
    }, 30 * 1000);

    return () => clearInterval(checkInterval);
  }, [randomNotificationsEnabled, notificationSettings, notificationPermission, mobileNotificationsEnabled]);

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
