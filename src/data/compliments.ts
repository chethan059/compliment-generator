import { Compliment } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { additionalCompliments } from "./additionalCompliments";

// Default compliments provided by the app
export const defaultCompliments: Compliment[] = [
  {
    id: uuidv4(),
    text: "You are awesome!",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You bring out the best in other people.",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You're a smart cookie!",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You are awesome!",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You bring out the best in other people.",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You're a smart cookie!",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You are awesome!",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You bring out the best in other people.",
    category: "general",
    isCustom: false,
  },
  {
    id: uuidv4(),
    text: "You're a smart cookie!",
    category: "general",
    isCustom: false,
  },
];

// Combine default and additional compliments
export const allCompliments = [...defaultCompliments, ...additionalCompliments];

// Get compliments by category
export const getComplimentsByCategory = (category: string): Compliment[] => {
  return allCompliments.filter(
    (compliment) => compliment.category.toLowerCase() === category.toLowerCase()
  );
};

// Get random compliment
export const getRandomCompliment = (): Compliment => {
  const randomIndex = Math.floor(Math.random() * allCompliments.length);
  return allCompliments[randomIndex];
};

// Get random compliment by category
export const getRandomComplimentByCategory = (category: string): Compliment => {
  const categoryCompliments = getComplimentsByCategory(category);
  const randomIndex = Math.floor(Math.random() * categoryCompliments.length);
  return categoryCompliments[randomIndex];
};
