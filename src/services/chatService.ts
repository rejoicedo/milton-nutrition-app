import { ChatMessage } from '../types';

interface ChatResponse {
  message: string;
  quickReplies?: string[];
}

const AI_RESPONSES: Record<string, ChatResponse> = {
  'feeling great': {
    message:
      "That's wonderful to hear! Based on your goals, I'd recommend a protein-rich snack. Here are some great options:\n\n• Greek yogurt with berries (180 cal, 18g protein)\n• Protein bar and almonds (250 cal, 15g protein)\n• Apple with peanut butter (200 cal, 8g protein)",
    quickReplies: ['View my macros', 'Get a recipe', 'Plan dinner'],
  },
  'still hungry': {
    message:
      "It's normal to feel hungry between meals! You have 153 calories left for today. Here are some filling, low-calorie options:\n\n• Vegetable sticks with hummus (100 cal)\n• Air-popped popcorn (30 cal/cup)\n• Hard-boiled egg (78 cal)",
    quickReplies: ['Log a snack', 'Drink water', 'View my stats'],
  },
  'view my stats': {
    message:
      "Here's your daily summary:\n\n🔥 Calories: 1,847/2,000 (92%)\n🥩 Protein: 78g/150g (52%)\n🌾 Carbs: 186g/250g (74%)\n💧 Fat: 46g/67g (69%)\n\nYou're doing great! Focus on getting more protein in your next meal.",
    quickReplies: ['Log a meal', 'Get suggestions', 'Set reminder'],
  },
  default: {
    message:
      "I'm here to help you reach your nutrition goals! You can ask me about meal suggestions, view your stats, or log your food intake.",
    quickReplies: ['Feeling great', 'Still hungry', 'View my stats'],
  },
};

const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const chatService = {
  async sendMessage(content: string): Promise<ChatResponse> {
    await simulateDelay();
    const normalizedContent = content.toLowerCase().trim();
    return AI_RESPONSES[normalizedContent] || AI_RESPONSES.default;
  },

  async getInitialMessage(): Promise<ChatMessage> {
    return {
      id: '1',
      type: 'assistant',
      content:
        "Great progress today! You've logged 1,847 calories across 4 meals. How are you feeling after lunch?",
      timestamp: new Date(),
    };
  },

  getInitialQuickReplies(): string[] {
    return ['Feeling great', 'Still hungry', 'View my stats'];
  },
};
