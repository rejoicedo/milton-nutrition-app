import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';

interface StatCardProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
  backgroundColor: string;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  current,
  goal,
  unit,
  backgroundColor,
  style,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        <Text style={styles.current}>{current}</Text>
        <Text style={styles.goal}>/{goal}</Text>
        <Text style={styles.unit}> {unit}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 80,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  current: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  goal: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryDark,
    opacity: 0.7,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryDark,
    opacity: 0.7,
  },
});
