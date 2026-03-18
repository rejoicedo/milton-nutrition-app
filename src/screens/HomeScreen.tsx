import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../constants';
import { Meal } from '../types';
import { useMeals, useNutrition } from '../hooks';
import {
  Header,
  CaloriesCard,
  MacrosCard,
  StatCard,
  FoodLog,
  ChatFAB,
} from '../components/dashboard';
import { EditMealModal } from '../components/modals/EditMealModal';
import { FullScreenLoader } from '../components/ui';

interface HomeScreenProps {
  onOpenChat: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'today' | '30days'>('today');
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    meals,
    isLoading: mealsLoading,
    error: mealsError,
    isSaving,
    updateMeal,
    deleteMeal,
    fetchMeals,
    clearError,
  } = useMeals();

  const {
    stats,
    isLoading: statsLoading,
    fetchStats,
  } = useNutrition();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchMeals(), fetchStats()]);
    setRefreshing(false);
  }, [fetchMeals, fetchStats]);

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleViewAllMeals = () => {
    console.log('View all meals');
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsModalVisible(true);
    clearError();
  };

  const handleDeleteMeal = async (meal: Meal) => {
    try {
      await deleteMeal(meal.id);
    } catch {
      console.error('Failed to delete meal');
    }
  };

  const handleSaveMeal = async (updatedMeal: Meal) => {
    try {
      await updateMeal(updatedMeal);
      setIsModalVisible(false);
      setEditingMeal(null);
    } catch {
      console.error('Failed to save meal');
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingMeal(null);
  };

  const isInitialLoading = (mealsLoading || statsLoading) && !refreshing && meals.length === 0;

  if (isInitialLoading) {
    return <FullScreenLoader message="Loading your nutrition data..." />;
  }

  const currentStats = stats || {
    calories: { current: 0, goal: 2000 },
    protein: { current: 0, goal: 150 },
    carbs: { current: 0, goal: 250 },
    fat: { current: 0, goal: 67 },
    fiber: { current: 0, goal: 25 },
    water: { current: 0, goal: 8 },
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuPress={handleMenuPress}
        />

        {mealsError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>
              Something went wrong. Pull to refresh.
            </Text>
          </View>
        )}

        <CaloriesCard
          current={currentStats.calories.current}
          goal={currentStats.calories.goal}
        />

        <MacrosCard
          protein={currentStats.protein}
          carbs={currentStats.carbs}
          fat={currentStats.fat}
        />

        <View style={styles.statsRow}>
          <StatCard
            title="Fiber"
            current={currentStats.fiber.current}
            goal={currentStats.fiber.goal}
            unit="g"
            backgroundColor={colors.fiber}
            style={styles.statCard}
          />
          <StatCard
            title="Water"
            current={currentStats.water.current}
            goal={currentStats.water.goal}
            unit="cups"
            backgroundColor={colors.water}
            style={styles.statCard}
          />
        </View>

        <FoodLog
          meals={meals}
          onViewAll={handleViewAllMeals}
          onEditMeal={handleEditMeal}
          onDeleteMeal={handleDeleteMeal}
        />
      </ScrollView>

      <ChatFAB onPress={onOpenChat} />

      {editingMeal && (
        <EditMealModal
          visible={isModalVisible}
          meal={editingMeal}
          onSave={handleSaveMeal}
          onClose={handleCloseModal}
          isSaving={isSaving}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  statCard: {
    flex: 1,
  },
  errorBanner: {
    backgroundColor: colors.error,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: spacing.sm,
  },
  errorText: {
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '500',
  },
});
