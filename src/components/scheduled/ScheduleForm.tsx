
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScheduledCompliment, ComplimentCategory } from "@/types";
import { getAllComplimentCategories } from "@/data/compliments";

interface ScheduleFormProps {
  onSave: (schedule: ScheduledCompliment) => void;
  editingSchedule: ScheduledCompliment | null;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const ScheduleForm = ({ onSave, editingSchedule, isEditing, onCancelEdit }: ScheduleFormProps) => {
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState<ComplimentCategory | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri by default
  
  const days = [
    { value: 0, label: "Sun" },
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
  ];

  // Update form when editing an existing schedule
  useEffect(() => {
    if (editingSchedule) {
      setTime(editingSchedule.time);
      setSelectedDays(editingSchedule.days);
      setCategory(editingSchedule.complimentCategory);
    }
  }, [editingSchedule]);

  const handleDayToggle = (dayValue: number) => {
    if (selectedDays.includes(dayValue)) {
      setSelectedDays(selectedDays.filter(d => d !== dayValue));
    } else {
      setSelectedDays([...selectedDays, dayValue].sort());
    }
  };

  const handleSave = () => {
    if (time && selectedDays.length > 0) {
      const schedule: ScheduledCompliment = {
        id: editingSchedule?.id || uuidv4(),
        time,
        days: selectedDays,
        active: true,
        complimentCategory: category,
      };
      
      onSave(schedule);
      resetForm();
    }
  };

  const resetForm = () => {
    if (!isEditing) {
      setTime("09:00");
      setSelectedDays([1, 2, 3, 4, 5]);
      setCategory(undefined);
    }
    
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Schedule" : "Create Schedule"}</CardTitle>
        <CardDescription>
          Set up times to receive compliment notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
          
          <div>
            <Label className="mb-2 block">Days</Label>
            <div className="flex flex-wrap gap-2">
              {days.map(day => (
                <Button
                  key={day.value}
                  type="button"
                  variant={selectedDays.includes(day.value) ? "default" : "outline"}
                  className="h-9 px-3"
                  onClick={() => handleDayToggle(day.value)}
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="category">Category (Optional)</Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as ComplimentCategory || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any category</SelectItem>
                {getAllComplimentCategories().map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button onClick={handleSave} disabled={!time || selectedDays.length === 0}>
              {isEditing ? "Update" : "Save"} Schedule
            </Button>
            
            {isEditing && (
              <Button variant="outline" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleForm;
