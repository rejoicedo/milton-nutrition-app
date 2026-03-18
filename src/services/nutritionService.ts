import { NutritionStats } from '../types';

const MOCK_STATS: NutritionStats = {
  calories: { current: 1847, goal: 2000 },
  protein: { current: 78, goal: 150 },
  carbs: { current: 186, goal: 250 },
  fat: { current: 46, goal: 67 },
  fiber: { current: 18, goal: 25 },
  water: { current: 6, goal: 8 },
};

const simulateDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const nutritionService = {
  async getDailyStats(): Promise<NutritionStats> {
    await simulateDelay();
    return { ...MOCK_STATS };
  },

  async updateWaterIntake(cups: number): Promise<NutritionStats> {
    await simulateDelay();
    return {
      ...MOCK_STATS,
      water: { ...MOCK_STATS.water, current: cups },
    };
  },

  calculateRemainingCalories(stats: NutritionStats): number {
    return Math.max(0, stats.calories.goal - stats.calories.current);
  },

  calculateMacroPercentage(current: number, goal: number): number {
    return Math.min(100, Math.round((current / goal) * 100));
  },
};
