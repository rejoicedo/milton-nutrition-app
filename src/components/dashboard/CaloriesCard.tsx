import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { ProgressBar } from '../common/ProgressBar';

interface CaloriesCardProps {
  current: number;
  goal: number;
}

export const CaloriesCard: React.FC<CaloriesCardProps> = ({ current, goal }) => {
  const remaining = goal - current;
  const progress = current / goal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="bolt" size={18} color={colors.textLight} />
        <Text style={styles.title}>Calories</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.valueContainer}>
          <Text style={styles.currentValue}>{current.toLocaleString()}</Text>
          <Text style={styles.goalValue}>/{goal.toLocaleString()} kcal</Text>
        </View>
        <Text style={styles.remaining}>{remaining} kcal left</Text>
      </View>
      <ProgressBar
        progress={progress}
        height={10}
        backgroundColor={colors.primaryDark}
        fillColor="#4ADE80"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    opacity: 0.9,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textLight,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight,
    opacity: 0.8,
  },
  remaining: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.8,
  },
});
