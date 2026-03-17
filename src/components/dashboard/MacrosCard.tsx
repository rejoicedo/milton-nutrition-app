import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface MacroItemProps {
  label: string;
  current: number;
  goal: number;
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const MacroItem: React.FC<MacroItemProps> = ({
  label,
  current,
  goal,
  color,
  icon,
}) => {
  const progress = Math.min(current / goal, 1);

  return (
    <View style={styles.macroItem}>
      <View style={[styles.iconCircle, { borderColor: color }]}>
        <MaterialCommunityIcons name={icon} size={22} color={colors.textLight} />
      </View>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroValue}>
        <Text style={styles.macroCurrent}>{current}g</Text>
        <Text style={styles.macroGoal}>/{goal}g</Text>
      </Text>
    </View>
  );
};

interface MacrosCardProps {
  protein: { current: number; goal: number };
  carbs: { current: number; goal: number };
  fat: { current: number; goal: number };
}

export const MacrosCard: React.FC<MacrosCardProps> = ({
  protein,
  carbs,
  fat,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="chart-line" size={18} color={colors.textLight} />
        <Text style={styles.title}>Macros</Text>
      </View>
      <View style={styles.macrosContainer}>
        <MacroItem
          label="Protein"
          current={protein.current}
          goal={protein.goal}
          color="#FFFFFF"
          icon="food-steak"
        />
        <MacroItem
          label="Carbs"
          current={carbs.current}
          goal={carbs.goal}
          color={colors.secondary}
          icon="barley"
        />
        <MacroItem
          label="Fats"
          current={fat.current}
          goal={fat.goal}
          color={colors.accent}
          icon="water"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    opacity: 0.9,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 8,
    opacity: 0.8,
  },
  macroValue: {
    marginTop: 4,
  },
  macroCurrent: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  macroGoal: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.6,
  },
});
