
import React, { useState, useEffect } from "react";
import { Compliment } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComplimentNotificationProps {
  compliment: Compliment | null;
  onClose: () => void;
}

const ComplimentNotification: React.FC<ComplimentNotificationProps> = ({ 
  compliment, 
  onClose 
}) => {
  const [visible, setVisible] = useState(!!compliment);
  const isMobile = useIsMobile();

  useEffect(() => {
    setVisible(!!compliment);
    
    // Auto close after 10 seconds
    if (compliment) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [compliment]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Give animation time to complete
  };
  
  if (!compliment) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed z-50 max-w-xs w-full ${isMobile ? 'top-4 left-1/2 -translate-x-1/2' : 'bottom-4 right-4'}`}
          initial={{ opacity: 0, y: isMobile ? -50 : 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    {compliment.isCustom ? "Your Compliment" : "Surprise Compliment"}
                  </h3>
                  <p className="text-sm">{compliment.text}</p>
                  <p className="text-xs text-muted-foreground mt-2 capitalize">
                    {compliment.category}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="-mr-2 -mt-2" 
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComplimentNotification;
