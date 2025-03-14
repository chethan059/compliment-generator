
import React, { useState, useEffect } from "react";
import { Compliment } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComplimentNotificationProps {
  compliment: Compliment | null;
  onClose: () => void;
}

const ComplimentNotification: React.FC<ComplimentNotificationProps> = ({ 
  compliment, 
  onClose 
}) => {
  const [visible, setVisible] = useState(!!compliment);

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
          className="fixed bottom-4 right-4 z-50 max-w-xs w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Your Compliment</h3>
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
