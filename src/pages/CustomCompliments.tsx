
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getAllComplimentCategories } from "@/data/compliments";
import { useCompliments } from "@/context/ComplimentContext";
import { Compliment, ComplimentCategory } from "@/types";
import ComplimentCard from "@/components/ComplimentCard";

const CustomCompliments = () => {
  const { compliments, addCustomCompliment, refreshCompliments } = useCompliments();
  const [text, setText] = useState("");
  const [category, setCategory] = useState<ComplimentCategory>("personal");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addCustomCompliment(text.trim(), category);
      setText("");
    }
  };

  // Get only custom compliments across all categories
  const customCompliments = Object.values(compliments)
    .flat()
    .filter(c => c.isCustom)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <Layout title="Custom Compliments" showBackButton>
      <div className="max-w-3xl mx-auto">
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Create a Custom Compliment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="compliment-text">Compliment Text</Label>
                <Textarea
                  id="compliment-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a positive affirmation or compliment..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as ComplimentCategory)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllComplimentCategories().map(cat => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Add Compliment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-4">Your Custom Compliments</h2>
          
          {customCompliments.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>You haven't created any custom compliments yet.</p>
              <p>Add one using the form above!</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {customCompliments.map((compliment: Compliment) => (
                <ComplimentCard 
                  key={compliment.id} 
                  compliment={compliment} 
                  onDelete={refreshCompliments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomCompliments;
