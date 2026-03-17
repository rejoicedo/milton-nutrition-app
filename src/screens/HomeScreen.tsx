import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { Meal, NutritionStats } from '../types';
import {
  Header,
  CaloriesCard,
  MacrosCard,
  StatCard,
  FoodLog,
  ChatFAB,
} from '../components/dashboard';
import { EditMealModal } from '../components/modals/EditMealModal';

const mockStats: NutritionStats = {
  calories: { current: 1847, goal: 2000 },
  protein: { current: 78, goal: 150 },
  carbs: { current: 186, goal: 250 },
  fat: { current: 46, goal: 67 },
  fiber: { current: 18, goal: 25 },
  water: { current: 6, goal: 8 },
};

const mockMeals: Meal[] = [
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

interface HomeScreenProps {
  onOpenChat: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'today' | '30days'>('today');
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleViewAllMeals = () => {
    console.log('View all meals');
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setIsModalVisible(true);
  };

  const handleDeleteMeal = (meal: Meal) => {
    setMeals((prev) => prev.filter((m) => m.id !== meal.id));
  };

  const handleSaveMeal = (updatedMeal: Meal) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === updatedMeal.id ? updatedMeal : m))
    );
    setIsModalVisible(false);
    setEditingMeal(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingMeal(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuPress={handleMenuPress}
        />

        <CaloriesCard
          current={mockStats.calories.current}
          goal={mockStats.calories.goal}
        />

        <MacrosCard
          protein={mockStats.protein}
          carbs={mockStats.carbs}
          fat={mockStats.fat}
        />

        <View style={styles.statsRow}>
          <StatCard
            title="Fiber"
            current={mockStats.fiber.current}
            goal={mockStats.fiber.goal}
            unit="g"
            backgroundColor={colors.fiber}
            style={styles.statCard}
          />
          <StatCard
            title="Water"
            current={mockStats.water.current}
            goal={mockStats.water.goal}
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
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
  },
});
