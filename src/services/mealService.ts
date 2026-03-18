import { Meal } from '../types';

const MOCK_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Oatmeal with berries, Greek yogurt',
    time: '8:30am',
    calories: 445,
    protein: 24,
    carbs: 58,
    fat: 12,
  },
  {
    id: '2',
    name: 'Grilled chicken salad, Whole grain bread',
    time: '12:45pm',
    calories: 620,
    protein: 45,
    carbs: 52,
    fat: 18,
  },
  {
    id: '3',
    name: 'Protein bar, Almonds',
    time: '3:15pm',
    calories: 320,
    protein: 22,
    carbs: 28,
    fat: 14,
  },
];

const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mealService = {
  async getMeals(): Promise<Meal[]> {
    await simulateDelay();
    return [...MOCK_MEALS];
  },

  async getMealById(id: string): Promise<Meal | null> {
    await simulateDelay();
    return MOCK_MEALS.find((meal) => meal.id === id) || null;
  },

  async createMeal(meal: Omit<Meal, 'id'>): Promise<Meal> {
    await simulateDelay();
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString(),
    };
    return newMeal;
  },

  async updateMeal(id: string, updates: Partial<Meal>): Promise<Meal> {
    await simulateDelay();
    const existing = MOCK_MEALS.find((meal) => meal.id === id);
    if (!existing) {
      throw new Error(`Meal with id ${id} not found`);
    }
    return { ...existing, ...updates };
  },

  async deleteMeal(id: string): Promise<void> {
    await simulateDelay();
    const index = MOCK_MEALS.findIndex((meal) => meal.id === id);
    if (index === -1) {
      throw new Error(`Meal with id ${id} not found`);
    }
  },
};
