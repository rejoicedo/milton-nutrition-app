import { Meal, NutritionStats } from '../types';

export function calculateTotalCalories(meals: Meal[]): number {
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

export function calculateTotalMacros(meals: Meal[]) {
  return meals.reduce(
    (totals, meal) => ({
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 }
  );
}

export function calculateProgress(current: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(1, current / goal);
}

export function calculateProgressPercentage(current: number, goal: number): number {
  return Math.round(calculateProgress(current, goal) * 100);
}

export function calculateRemainingMacros(
  stats: NutritionStats
): Record<string, number> {
  return {
    calories: Math.max(0, stats.calories.goal - stats.calories.current),
    protein: Math.max(0, stats.protein.goal - stats.protein.current),
    carbs: Math.max(0, stats.carbs.goal - stats.carbs.current),
    fat: Math.max(0, stats.fat.goal - stats.fat.current),
  };
}

export function generateMealId(): string {
  return `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
