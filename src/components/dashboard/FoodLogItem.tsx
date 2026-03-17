import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { Meal } from '../../types';

interface FoodLogItemProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
}

export const FoodLogItem: React.FC<FoodLogItemProps> = ({
  meal,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);

  const handlePress = () => {
    setShowActions(!showActions);
  };

  const handleEdit = () => {
    setShowActions(false);
    onEdit(meal);
  };

  const handleDelete = () => {
    setShowActions(false);
    onDelete(meal);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.mealName} numberOfLines={1}>
              {meal.name}
            </Text>
            <Text style={styles.time}>{meal.time}</Text>
          </View>
          <View style={styles.macros}>
            <View style={styles.macroItem}>
              <MaterialCommunityIcons name="fire" size={14} color="#F97316" />
              <Text style={styles.macroValue}>{meal.calories} kcal</Text>
            </View>
            <View style={styles.macroItem}>
              <MaterialCommunityIcons name="food-steak" size={14} color="#EF4444" />
              <Text style={styles.macroValue}>{meal.protein}g</Text>
            </View>
            <View style={styles.macroItem}>
              <MaterialCommunityIcons name="barley" size={14} color="#22C55E" />
              <Text style={styles.macroValue}>{meal.carbs}g</Text>
            </View>
            <View style={styles.macroItem}>
              <MaterialCommunityIcons name="water" size={14} color="#3B82F6" />
              <Text style={styles.macroValue}>{meal.fat}g</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
            activeOpacity={0.8}
          >
            <MaterialIcons name="edit" size={20} color={colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <MaterialIcons name="close" size={22} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mealName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  time: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  macros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  macroValue: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 6,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
});
