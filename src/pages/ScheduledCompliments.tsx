
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Clock, 
  Trash2, 
  Calendar, 
  Edit, 
  X,
  Check
} from "lucide-react";
import { useCompliments } from "@/context/ComplimentContext";
import { ScheduledCompliment, ComplimentCategory } from "@/types";
import { getAllComplimentCategories } from "@/data/compliments";
import { cn } from "@/lib/utils";

<lov-add-dependency>uuid@latest</lov-add-dependency>

const ScheduledCompliments = () => {
  const { scheduledCompliments, addScheduledCompliment, removeScheduledCompliment } = useCompliments();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduledCompliment | null>(null);
  
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
      
      addScheduledCompliment(schedule);
      resetForm();
    }
  };

  const handleEdit = (schedule: ScheduledCompliment) => {
    setEditingSchedule(schedule);
    setTime(schedule.time);
    setSelectedDays(schedule.days);
    setCategory(schedule.complimentCategory);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    removeScheduledCompliment(id);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingSchedule(null);
    setTime("09:00");
    setSelectedDays([1, 2, 3, 4, 5]);
    setCategory(undefined);
  };

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
    <Layout title="Scheduled Compliments" showBackButton>
      <div className="max-w-3xl mx-auto">
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
                    <SelectItem value="">Any category</SelectItem>
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
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-4">Your Scheduled Compliments</h2>
          
          <AnimatePresence initial={false}>
            {scheduledCompliments.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <p>You don't have any scheduled compliments.</p>
                <p>Create one using the form above!</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {scheduledCompliments.map((schedule) => (
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
                              onClick={() => handleEdit(schedule)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(schedule.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduledCompliments;
