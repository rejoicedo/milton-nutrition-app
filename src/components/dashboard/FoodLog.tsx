import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodLogItem } from './FoodLogItem';
import { colors } from '../../constants/colors';
import { Meal } from '../../types';

interface FoodLogProps {
  meals: Meal[];
  onViewAll: () => void;
  onEditMeal: (meal: Meal) => void;
  onDeleteMeal: (meal: Meal) => void;
}

export const FoodLog: React.FC<FoodLogProps> = ({
  meals,
  onViewAll,
  onEditMeal,
  onDeleteMeal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Log</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {meals.map((meal) => (
          <FoodLogItem
            key={meal.id}
            meal={meal}
            onEdit={onEditMeal}
            onDelete={onDeleteMeal}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  list: {
    gap: 8,
  },
});
