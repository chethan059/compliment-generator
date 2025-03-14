
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Plus, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCompliments } from "@/context/ComplimentContext";
import ComplimentCard from "@/components/ComplimentCard";
import { Compliment, ComplimentCategory } from "@/types";
import { getAllComplimentCategories } from "@/data/compliments";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { getRandomCompliment } = useCompliments();
  const [currentCompliment, setCurrentCompliment] = useState<Compliment | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ComplimentCategory | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const generateCompliment = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const compliment = getRandomCompliment(selectedCategory);
      setCurrentCompliment(compliment);
      setIsGenerating(false);
    }, 600);
  };

  const handleCategorySelect = (category?: ComplimentCategory) => {
    setSelectedCategory(category);
  };

  return (
    <Layout title="Compliment Generator">
      <div className="max-w-3xl mx-auto">
        <Card className="glass-card mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-light mb-2">Welcome to your</h2>
            <h1 className="text-4xl font-bold mb-4 text-primary">Daily Positivity App</h1>
            <p className="text-muted-foreground mb-6">
              Generate random compliments, create custom ones, or schedule them for later.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <Button 
                variant={selectedCategory === undefined ? "default" : "outline"}
                className="rounded-full"
                onClick={() => handleCategorySelect(undefined)}
              >
                All
              </Button>
              
              {getAllComplimentCategories().map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="rounded-full capitalize"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <Button 
              size="lg" 
              onClick={generateCompliment}
              disabled={isGenerating}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Compliment
              </span>
              <span className="absolute inset-0 bg-primary/20 transform group-hover:translate-y-full transition-transform duration-300"></span>
            </Button>
          </CardContent>
        </Card>
        
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-40"
            >
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary animate-pulse-subtle" />
                <span className="absolute top-0 left-0 w-full h-full bg-primary/20 animate-ping rounded-full"></span>
              </div>
            </motion.div>
          ) : currentCompliment ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ComplimentCard compliment={currentCompliment} />
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
              <Card className="hover:shadow-md transition-shadow duration-300 group cursor-pointer" onClick={() => navigate('/custom')}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Plus className="w-8 h-8 mr-4 text-primary" />
                      <div>
                        <h3 className="text-lg font-medium">Create Custom</h3>
                        <p className="text-sm text-muted-foreground">Add your own compliments</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1 duration-300" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow duration-300 group cursor-pointer" onClick={() => navigate('/scheduled')}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 mr-4 text-primary" />
                      <div>
                        <h3 className="text-lg font-medium">Schedule</h3>
                        <p className="text-sm text-muted-foreground">Set timed compliments</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1 duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Index;
