
import { AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScheduledCompliment } from "@/types";
import ScheduleCard from "./ScheduleCard";

interface ScheduleListProps {
  schedules: ScheduledCompliment[];
  onEdit: (schedule: ScheduledCompliment) => void;
  onDelete: (id: string) => void;
}

const ScheduleList = ({ schedules, onEdit, onDelete }: ScheduleListProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-medium mb-4">Your Scheduled Compliments</h2>
      
      <AnimatePresence initial={false}>
        {schedules.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>You don't have any scheduled compliments.</p>
            <p>Create one using the form above!</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <ScheduleCard 
                key={schedule.id}
                schedule={schedule}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScheduleList;
