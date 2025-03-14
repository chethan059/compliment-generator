
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScheduledCompliment } from "@/types";
import { Clock, Calendar, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
  schedule: ScheduledCompliment;
  onEdit: (schedule: ScheduledCompliment) => void;
  onDelete: (id: string) => void;
}

const ScheduleCard = ({ schedule, onEdit, onDelete }: ScheduleCardProps) => {
  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDaysDisplay = (days: number[]) => {
    if (days.length === 7) return "Every day";
    if (days.length === 0) return "Never";
    if (JSON.stringify(days.sort()) === JSON.stringify([1, 2, 3, 4, 5])) return "Weekdays";
    if (JSON.stringify(days.sort()) === JSON.stringify([0, 6])) return "Weekends";
    
    return days
      .map(day => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day])
      .join(", ");
  };

  return (
    <motion.div
      key={schedule.id}
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
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full capitalize bg-secondary"
                  )}>
                    {schedule.complimentCategory}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDaysDisplay(schedule.days)}</span>
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
