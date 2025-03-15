
import { Compliment } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Create a base timestamp for all compliments
const baseTimestamp = Date.now();

// Additional compliments for the app
export const additionalCompliments: Compliment[] = [
  // Motivational
  {
    id: uuidv4(),
    text: "Your resilience is inspiring. Even when times are tough, you keep pushing forward.",
    category: "motivational",
    createdAt: baseTimestamp - 1000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The way you tackle challenges head-on shows your incredible strength.",
    category: "motivational",
    createdAt: baseTimestamp - 2000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your positive attitude can change the energy of an entire room.",
    category: "motivational",
    createdAt: baseTimestamp - 3000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Great things never come from comfort zones, and you're proof of that.",
    category: "motivational",
    createdAt: baseTimestamp - 4000000,
    isCustom: false
  },
  
  // Professional
  {
    id: uuidv4(),
    text: "Your attention to detail makes your work stand out from the crowd.",
    category: "professional",
    createdAt: baseTimestamp - 5000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You have an incredible ability to find solutions where others see only problems.",
    category: "professional",
    createdAt: baseTimestamp - 6000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your leadership skills inspire others to reach their full potential.",
    category: "professional",
    createdAt: baseTimestamp - 7000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The passion you bring to your work is contagious and motivating.",
    category: "professional",
    createdAt: baseTimestamp - 8000000,
    isCustom: false
  },
  
  // Personal
  {
    id: uuidv4(),
    text: "Your kindness creates ripples of positivity that touch everyone around you.",
    category: "personal",
    createdAt: baseTimestamp - 9000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The way you listen and make people feel understood is a rare and valuable gift.",
    category: "personal",
    createdAt: baseTimestamp - 10000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your authenticity is refreshing in a world where many people wear masks.",
    category: "personal",
    createdAt: baseTimestamp - 11000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You have a beautiful way of making even ordinary moments feel special.",
    category: "personal",
    createdAt: baseTimestamp - 12000000,
    isCustom: false
  },
  
  // Funny
  {
    id: uuidv4(),
    text: "Your sense of humor is so good, it should come with a warning label for potential stomach cramps from laughing.",
    category: "funny",
    createdAt: baseTimestamp - 13000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "If there was an Olympic event for making people smile, you'd take gold every time.",
    category: "funny",
    createdAt: baseTimestamp - 14000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "You're funnier than a cat video marathon, and that's saying something.",
    category: "funny",
    createdAt: baseTimestamp - 15000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your witty comebacks deserve their own highlight reel.",
    category: "funny",
    createdAt: baseTimestamp - 16000000,
    isCustom: false
  },
  
  // Encouraging
  {
    id: uuidv4(),
    text: "The way you consistently show up and give your best is truly admirable.",
    category: "encouraging",
    createdAt: baseTimestamp - 17000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your progress is proof of your dedication and hard work.",
    category: "encouraging",
    createdAt: baseTimestamp - 18000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "The obstacles you've overcome would have stopped many others in their tracks.",
    category: "encouraging",
    createdAt: baseTimestamp - 19000000,
    isCustom: false
  },
  {
    id: uuidv4(),
    text: "Your commitment to growth and self-improvement is inspiring.",
    category: "encouraging",
    createdAt: baseTimestamp - 20000000,
    isCustom: false
  }
];
