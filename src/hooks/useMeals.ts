import { useState, useCallback, useEffect } from 'react';
import { Meal } from '../types';
import { mealService } from '../services';

interface UseMealsState {
  meals: Meal[];
  isLoading: boolean;
  error: Error | null;
  isSaving: boolean;
}

interface UseMealsResult extends UseMealsState {
  fetchMeals: () => Promise<void>;
  addMeal: (meal: Omit<Meal, 'id'>) => Promise<void>;
  updateMeal: (meal: Meal) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
  clearError: () => void;
}

export function useMeals(): UseMealsResult {
  const [state, setState] = useState<UseMealsState>({
    meals: [],
    isLoading: false,
    error: null,
    isSaving: false,
  });

  const fetchMeals = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const meals = await mealService.getMeals();
      setState((prev) => ({ ...prev, meals, isLoading: false }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch meals'),
      }));
    }
  }, []);

  const addMeal = useCallback(async (meal: Omit<Meal, 'id'>) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));
    try {
      const newMeal = await mealService.createMeal(meal);
      setState((prev) => ({
        ...prev,
        meals: [...prev.meals, newMeal],
        isSaving: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err : new Error('Failed to add meal'),
      }));
      throw err;
    }
  }, []);

  const updateMeal = useCallback(async (meal: Meal) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));
    try {
      const updated = await mealService.updateMeal(meal.id, meal);
      setState((prev) => ({
        ...prev,
        meals: prev.meals.map((m) => (m.id === meal.id ? updated : m)),
        isSaving: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err : new Error('Failed to update meal'),
      }));
      throw err;
    }
  }, []);

  const deleteMeal = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));
    try {
      await mealService.deleteMeal(id);
      setState((prev) => ({
        ...prev,
        meals: prev.meals.filter((m) => m.id !== id),
        isSaving: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err : new Error('Failed to delete meal'),
      }));
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return {
    ...state,
    fetchMeals,
    addMeal,
    updateMeal,
    deleteMeal,
    clearError,
  };
}
