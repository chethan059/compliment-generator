
import { useState } from "react";
import Layout from "@/components/Layout";
import { useCompliments } from "@/context/ComplimentContext";
import { ScheduledCompliment } from "@/types";
import ScheduleForm from "@/components/scheduled/ScheduleForm";
import ScheduleList from "@/components/scheduled/ScheduleList";

const ScheduledCompliments = () => {
  const { scheduledCompliments, addScheduledCompliment, removeScheduledCompliment } = useCompliments();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduledCompliment | null>(null);
  
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
      </div>
    </Layout>
  );
};

export default ScheduledCompliments;
