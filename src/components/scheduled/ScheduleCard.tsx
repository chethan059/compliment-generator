
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Trash2, Calendar, Edit } from "lucide-react";
import { ScheduledCompliment } from "@/types";
import { cn } from "@/lib/utils";
import { formatTimeDisplay, formatDaysDisplay } from "@/utils/notificationService";

interface ScheduleCardProps {
  schedule: ScheduledCompliment;
  onEdit: (schedule: ScheduledCompliment) => void;
  onDelete: (id: string) => void;
}

const ScheduleCard = ({ schedule, onEdit, onDelete }: ScheduleCardProps) => {
  // Calculate when the next compliment will be delivered
  const getNextOccurrence = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    const [scheduledHours, scheduledMinutes] = schedule.time.split(':').map(Number);
    
    // Find the next day this schedule will run
    let daysUntilNext = -1;
    let nextDay = -1;
    
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      if (schedule.days.includes(checkDay)) {
        // If same day, check if the time has passed
        if (i === 0) {
          const timeHasPassed = 
            currentHours > scheduledHours || 
            (currentHours === scheduledHours && currentMinutes >= scheduledMinutes);
          
          if (!timeHasPassed) {
            daysUntilNext = 0;
            nextDay = checkDay;
            break;
          }
        } else {
          daysUntilNext = i;
          nextDay = checkDay;
          break;
        }
      }
    }
    
    if (daysUntilNext === -1) return "Not scheduled";
    
    if (daysUntilNext === 0) {
      const minutesUntil = 
        (scheduledHours - currentHours) * 60 + 
        (scheduledMinutes - currentMinutes);
      
      if (minutesUntil < 60) {
        return `In ${minutesUntil} ${minutesUntil === 1 ? 'minute' : 'minutes'}`;
      } else {
        const hoursUntil = Math.floor(minutesUntil / 60);
        return `In ${hoursUntil} ${hoursUntil === 1 ? 'hour' : 'hours'}`;
      }
    } else if (daysUntilNext === 1) {
      return "Tomorrow";
    } else {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return `On ${dayNames[nextDay]}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center mr-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{formatTimeDisplay(schedule.time)}</h3>
                {schedule.complimentCategory && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full capitalize bg-secondary")}>
                    {schedule.complimentCategory}
                  </span>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDaysDisplay(schedule.days)}</span>
              </div>
              
              <div className="text-xs text-primary mt-1">
                Next: {getNextOccurrence()}
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(schedule)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(schedule.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScheduleCard;
