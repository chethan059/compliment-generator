
import { Compliment, ComplimentCategory } from "@/types";

export const defaultCompliments: Record<ComplimentCategory, Compliment[]> = {
  motivational: [
    { id: '1m', text: "You're capable of amazing things. Keep pushing forward!", category: 'motivational', createdAt: Date.now(), isCustom: false },
    { id: '2m', text: "Your determination is inspiring. You've got what it takes to succeed.", category: 'motivational', createdAt: Date.now(), isCustom: false },
    { id: '3m', text: "Every step you take brings you closer to your goals. Keep going!", category: 'motivational', createdAt: Date.now(), isCustom: false },
    { id: '4m', text: "Your resilience in the face of challenges is remarkable.", category: 'motivational', createdAt: Date.now(), isCustom: false },
    { id: '5m', text: "Today is full of possibilities. Embrace them all!", category: 'motivational', createdAt: Date.now(), isCustom: false },
  ],
  funny: [
    { id: '1f', text: "You're so cool, Antarctica is getting jealous.", category: 'funny', createdAt: Date.now(), isCustom: false },
    { id: '2f', text: "If awesomeness was a currency, you'd be a billionaire.", category: 'funny', createdAt: Date.now(), isCustom: false },
    { id: '3f', text: "You're so bright, you make the sun look like it's on a dimmer switch.", category: 'funny', createdAt: Date.now(), isCustom: false },
    { id: '4f', text: "Your smile is so radiant, I need sunglasses indoors.", category: 'funny', createdAt: Date.now(), isCustom: false },
    { id: '5f', text: "You're more unique than a snowflake at a beach party.", category: 'funny', createdAt: Date.now(), isCustom: false },
  ],
  encouraging: [
    { id: '1e', text: "I believe in you, even when you don't believe in yourself.", category: 'encouraging', createdAt: Date.now(), isCustom: false },
    { id: '2e', text: "Your strength and courage inspire those around you.", category: 'encouraging', createdAt: Date.now(), isCustom: false },
    { id: '3e', text: "No matter how difficult today is, you have the power to get through it.", category: 'encouraging', createdAt: Date.now(), isCustom: false },
    { id: '4e', text: "Remember how far you've come, not just how far you have to go.", category: 'encouraging', createdAt: Date.now(), isCustom: false },
    { id: '5e', text: "You're allowed to make mistakes. That's how growth happens.", category: 'encouraging', createdAt: Date.now(), isCustom: false },
  ],
  professional: [
    { id: '1p', text: "Your attention to detail sets you apart from others.", category: 'professional', createdAt: Date.now(), isCustom: false },
    { id: '2p', text: "Your innovative thinking is an asset to any team.", category: 'professional', createdAt: Date.now(), isCustom: false },
    { id: '3p', text: "Your work ethic and dedication are truly admirable.", category: 'professional', createdAt: Date.now(), isCustom: false },
    { id: '4p', text: "The way you tackle challenges shows your exceptional problem-solving skills.", category: 'professional', createdAt: Date.now(), isCustom: false },
    { id: '5p', text: "Your leadership qualities inspire others to do their best.", category: 'professional', createdAt: Date.now(), isCustom: false },
  ],
  personal: [
    { id: '1pe', text: "Your kindness makes the world a better place.", category: 'personal', createdAt: Date.now(), isCustom: false },
    { id: '2pe', text: "Your authenticity is refreshing and inspiring.", category: 'personal', createdAt: Date.now(), isCustom: false },
    { id: '3pe', text: "The way you listen makes people feel truly heard and valued.", category: 'personal', createdAt: Date.now(), isCustom: false },
    { id: '4pe', text: "Your compassion for others is a beautiful quality.", category: 'personal', createdAt: Date.now(), isCustom: false },
    { id: '5pe', text: "Your presence brings joy to those around you.", category: 'personal', createdAt: Date.now(), isCustom: false },
  ],
};

export const getAllComplimentCategories = (): ComplimentCategory[] => {
  return Object.keys(defaultCompliments) as ComplimentCategory[];
};

export const getComplimentsByCategory = (category: ComplimentCategory): Compliment[] => {
  return defaultCompliments[category] || [];
};
