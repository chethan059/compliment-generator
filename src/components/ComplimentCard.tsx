
import { Compliment } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, Quote, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteCompliment } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

interface ComplimentCardProps {
  compliment: Compliment;
  onDelete?: () => void;
  className?: string;
}

const ComplimentCard = ({ compliment, onDelete, className }: ComplimentCardProps) => {
  const { toast } = useToast();

  const categoryColors: Record<string, string> = {
    motivational: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    funny: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    encouraging: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    professional: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    personal: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    motivational: <Star className="w-3 h-3" />,
    funny: <Star className="w-3 h-3" />,
    encouraging: <Heart className="w-3 h-3" />,
    professional: <Star className="w-3 h-3" />,
    personal: <Heart className="w-3 h-3" />,
  };

  const handleDelete = () => {
    deleteCompliment(compliment.id);
    toast({
      title: "Compliment deleted",
      description: "The compliment has been removed from your collection."
    });
    if (onDelete) onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn("w-full", className)}
    >
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className={cn("text-xs px-2 py-1 rounded-md flex items-center gap-1", categoryColors[compliment.category])}>
              {categoryIcons[compliment.category]}
              <span className="capitalize">{compliment.category}</span>
            </div>
            
            {compliment.isCustom && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-70 hover:opacity-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex items-start mb-2">
            <Quote className="w-5 h-5 mt-1 mr-2 text-primary/70" />
            <p className="text-base">{compliment.text}</p>
          </div>
          
          {compliment.isCustom && (
            <div className="text-xs text-muted-foreground mt-3 text-right">
              Added on {new Date(compliment.createdAt).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComplimentCard;
