import { Meal } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateMeal(meal: Partial<Meal>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!meal.name?.trim()) {
    errors.name = 'Meal name is required';
  }

  if (!meal.time?.trim()) {
    errors.time = 'Time is required';
  }

  if (meal.calories !== undefined && (meal.calories < 0 || isNaN(meal.calories))) {
    errors.calories = 'Calories must be a positive number';
  }

  if (meal.protein !== undefined && (meal.protein < 0 || isNaN(meal.protein))) {
    errors.protein = 'Protein must be a positive number';
  }

  if (meal.carbs !== undefined && (meal.carbs < 0 || isNaN(meal.carbs))) {
    errors.carbs = 'Carbs must be a positive number';
  }

  if (meal.fat !== undefined && (meal.fat < 0 || isNaN(meal.fat))) {
    errors.fat = 'Fat must be a positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isValidNumber(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
}

export function parseNumberOrDefault(value: string, defaultValue: number = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : Math.max(0, parsed);
}
