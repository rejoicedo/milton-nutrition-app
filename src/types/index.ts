export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroData {
  current: number;
  goal: number;
  label: string;
  color: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface QuickReply {
  id: string;
  label: string;
}

export interface NutritionStats {
  calories: {
    current: number;
    goal: number;
  };
  protein: {
    current: number;
    goal: number;
  };
  carbs: {
    current: number;
    goal: number;
  };
  fat: {
    current: number;
    goal: number;
  };
  fiber: {
    current: number;
    goal: number;
  };
  water: {
    current: number;
    goal: number;
  };
}
