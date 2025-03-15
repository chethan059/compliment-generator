
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useCompliments } from "@/context/ComplimentContext";
import { ScheduledCompliment, Compliment } from "@/types";
import ScheduleForm from "@/components/scheduled/ScheduleForm";
import ScheduleList from "@/components/scheduled/ScheduleList";
import ComplimentNotification from "@/components/notifications/ComplimentNotification";
import { checkScheduledCompliments } from "@/utils/notificationService";
import { showBrowserNotification, getNotificationPermission } from "@/utils/browserNotificationService";
import { isMobileDevice, sendNativeNotification } from "@/utils/mobileNotificationService";

const ScheduledCompliments = () => {
  const { scheduledCompliments, addScheduledCompliment, removeScheduledCompliment } = useCompliments();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduledCompliment | null>(null);
  const [activeNotification, setActiveNotification] = useState<Compliment | null>(null);
  
  // Check for scheduled compliments every minute
  useEffect(() => {
    const checkSchedules = () => {
      const updatedSchedules = checkScheduledCompliments(
        scheduledCompliments,
        (compliment) => {
          console.log('Scheduled compliment triggered:', compliment);
          
          // Display the in-app notification
          setActiveNotification(compliment);
          
          // Determine which notification system to use
          if (isMobileDevice()) {
            console.log('Using mobile notifications for scheduled compliment');
            // Use mobile native notifications
            sendNativeNotification(compliment);
          } else if (getNotificationPermission() === 'granted') {
            console.log('Using browser notifications for scheduled compliment');
            // Use browser notifications
            showBrowserNotification(compliment);
          }
        }
      );
      
      // Update any schedules with new lastTriggered timestamps
      updatedSchedules.forEach(schedule => {
        const original = scheduledCompliments.find(s => s.id === schedule.id);
        if (original && original.lastTriggered !== schedule.lastTriggered) {
          addScheduledCompliment(schedule);
        }
      });
    };
    
    // Check immediately on component mount
    checkSchedules();
    
    // Then check every 30 seconds
    const intervalId = setInterval(checkSchedules, 30 * 1000);
    
    return () => clearInterval(intervalId);
  }, [scheduledCompliments, addScheduledCompliment]);
  
  const handleSave = (schedule: ScheduledCompliment) => {
    addScheduledCompliment(schedule);
    resetForm();
  };

  const handleEdit = (schedule: ScheduledCompliment) => {
    setEditingSchedule(schedule);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    removeScheduledCompliment(id);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingSchedule(null);
  };

  return (
    <Layout title="Scheduled Compliments" showBackButton>
      <div className="max-w-3xl mx-auto">
        <ScheduleForm 
          onSave={handleSave}
          editingSchedule={editingSchedule}
          isEditing={isEditing}
          onCancelEdit={resetForm}
        />
        
        <ScheduleList 
          schedules={scheduledCompliments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        <ComplimentNotification 
          compliment={activeNotification}
          onClose={() => setActiveNotification(null)}
        />
      </div>
    </Layout>
  );
};

export default ScheduledCompliments;

