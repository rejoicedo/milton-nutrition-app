import { useState, useCallback, useEffect } from 'react';
import { NutritionStats } from '../types';
import { nutritionService } from '../services';

interface UseNutritionState {
  stats: NutritionStats | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseNutritionResult extends UseNutritionState {
  fetchStats: () => Promise<void>;
  updateWaterIntake: (cups: number) => Promise<void>;
  remainingCalories: number;
  getMacroPercentage: (current: number, goal: number) => number;
}

const DEFAULT_STATS: NutritionStats = {
  calories: { current: 0, goal: 2000 },
  protein: { current: 0, goal: 150 },
  carbs: { current: 0, goal: 250 },
  fat: { current: 0, goal: 67 },
  fiber: { current: 0, goal: 25 },
  water: { current: 0, goal: 8 },
};

export function useNutrition(): UseNutritionResult {
  const [state, setState] = useState<UseNutritionState>({
    stats: null,
    isLoading: false,
    error: null,
  });

  const fetchStats = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const stats = await nutritionService.getDailyStats();
      setState({ stats, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch stats'),
      }));
    }
  }, []);

  const updateWaterIntake = useCallback(async (cups: number) => {
    try {
      const updated = await nutritionService.updateWaterIntake(cups);
      setState((prev) => ({ ...prev, stats: updated }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error ? err : new Error('Failed to update water intake'),
      }));
    }
  }, []);

  const remainingCalories = nutritionService.calculateRemainingCalories(
    state.stats || DEFAULT_STATS
  );

  const getMacroPercentage = useCallback((current: number, goal: number) => {
    return nutritionService.calculateMacroPercentage(current, goal);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    ...state,
    fetchStats,
    updateWaterIntake,
    remainingCalories,
    getMacroPercentage,
  };
}
