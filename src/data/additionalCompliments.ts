
import { Compliment } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Additional compliments for the app
export const additionalCompliments: Compliment[] = [
  // Motivational
  {
    id: uuidv4(),
    text: "Your resilience is inspiring. Even when times are tough, you keep pushing forward.",
    category: "motivational",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The way you tackle challenges head-on shows your incredible strength.",
    category: "motivational",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your positive attitude can change the energy of an entire room.",
    category: "motivational",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Great things never come from comfort zones, and you're proof of that.",
    category: "motivational",
    isCustom: false
  },
  
  // Professional
  {
    id: uuidv4(),
    text: "Your attention to detail makes your work stand out from the crowd.",
    category: "professional",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You have an incredible ability to find solutions where others see only problems.",
    category: "professional",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your leadership skills inspire others to reach their full potential.",
    category: "professional",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The passion you bring to your work is contagious and motivating.",
    category: "professional",
    isCustom: false
  },
  
  // Personal
  {
    id: uuidv4(),
    text: "Your kindness creates ripples of positivity that touch everyone around you.",
    category: "personal",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The way you listen and make people feel understood is a rare and valuable gift.",
    category: "personal",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your authenticity is refreshing in a world where many people wear masks.",
    category: "personal",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You have a beautiful way of making even ordinary moments feel special.",
    category: "personal",
    isCustom: false
  },
  
  // Funny
  {
    id: uuidv4(),
    text: "Your sense of humor is so good, it should come with a warning label for potential stomach cramps from laughing.",
    category: "funny",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "If there was an Olympic event for making people smile, you'd take gold every time.",
    category: "funny",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You're funnier than a cat video marathon, and that's saying something.",
    category: "funny",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your witty comebacks deserve their own highlight reel.",
    category: "funny",
    isCustom: false
  },
  
  // Achievement
  {
    id: uuidv4(),
    text: "The way you consistently show up and give your best is truly admirable.",
    category: "achievement",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your progress is proof of your dedication and hard work.",
    category: "achievement",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The obstacles you've overcome would have stopped many others in their tracks.",
    category: "achievement",
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your commitment to growth and self-improvement is inspiring.",
    category: "achievement",
    isCustom: false
  }
];
