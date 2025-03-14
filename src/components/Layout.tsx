
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Home, 
  Plus, 
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isNavVisible, setIsNavVisible] = useState(!isMobile);

  const routes = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/custom", label: "Custom", icon: <Plus className="w-5 h-5" /> },
    { path: "/scheduled", label: "Scheduled", icon: <Clock className="w-5 h-5" /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="flex h-full w-full">
      {/* Navigation */}
      <AnimatePresence mode="wait">
        {isNavVisible && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? "70%" : 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed md:relative z-30 h-full bg-white shadow-md dark:bg-gray-900",
              isMobile ? "max-w-[250px]" : ""
            )}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8 mt-4">
                <h1 className="text-xl font-semibold">Daily Positivity</h1>
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleNav}
                    className="md:hidden"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {routes.map((route) => (
                  <Button
                    key={route.path}
                    variant={location.pathname === route.path ? "default" : "ghost"}
                    className={cn(
                      "justify-start",
                      location.pathname === route.path 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => {
                      navigate(route.path);
                      if (isMobile) setIsNavVisible(false);
                    }}
                  >
                    <div className="flex items-center">
                      {route.icon}
                      <span className="ml-3">{route.label}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-auto">
                <div className="glass-card rounded-lg p-4 mt-8">
                  <p className="text-sm text-muted-foreground">
                    Boost your day with positive affirmations and compliments.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when mobile nav is open */}
      {isMobile && isNavVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setIsNavVisible(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full overflow-auto">
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b p-4 flex items-center">
          {isMobile && !isNavVisible && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleNav}
              className="mr-2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
          
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          <h1 className="text-xl font-medium">{title}</h1>
        </div>
        
        <main className="flex-1 p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
