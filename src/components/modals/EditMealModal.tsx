import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../../constants';
import { Meal } from '../../types';
import { Button } from '../common/Button';
import { validateMeal, parseNumberOrDefault } from '../../utils';

interface EditMealModalProps {
  visible: boolean;
  meal: Meal;
  onSave: (meal: Meal) => Promise<void>;
  onClose: () => void;
  isSaving?: boolean;
}

export const EditMealModal: React.FC<EditMealModalProps> = ({
  visible,
  meal,
  onSave,
  onClose,
  isSaving = false,
}) => {
  const [name, setName] = useState(meal.name);
  const [time, setTime] = useState(meal.time);
  const [calories, setCalories] = useState(meal.calories.toString());
  const [protein, setProtein] = useState(meal.protein.toString());
  const [carbs, setCarbs] = useState(meal.carbs.toString());
  const [fat, setFat] = useState(meal.fat.toString());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setName(meal.name);
    setTime(meal.time);
    setCalories(meal.calories.toString());
    setProtein(meal.protein.toString());
    setCarbs(meal.carbs.toString());
    setFat(meal.fat.toString());
    setErrors({});
  }, [meal]);

  const handleSave = async () => {
    const updatedMeal: Meal = {
      ...meal,
      name: name.trim(),
      time: time.trim(),
      calories: parseNumberOrDefault(calories),
      protein: parseNumberOrDefault(protein),
      carbs: parseNumberOrDefault(carbs),
      fat: parseNumberOrDefault(fat),
    };

    const validation = validateMeal(updatedMeal);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    await onSave(updatedMeal);
  };

  const getMealType = () => {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 11) return 'Breakfast';
    if (hour < 15) return 'Lunch';
    if (hour < 18) return 'Snack';
    return 'Dinner';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.backdrop} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit {getMealType()}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={styles.label}>Meal Description</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors((e) => ({ ...e, name: '' }));
                }}
                placeholder="Enter meal description"
                placeholderTextColor={colors.textSecondary}
                editable={!isSaving}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={[styles.input, errors.time && styles.inputError]}
                value={time}
                onChangeText={(text) => {
                  setTime(text);
                  if (errors.time) setErrors((e) => ({ ...e, time: '' }));
                }}
                placeholder="e.g., 8:30am"
                placeholderTextColor={colors.textSecondary}
                editable={!isSaving}
              />
              {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Calories</Text>
                <TextInput
                  style={[styles.input, errors.calories && styles.inputError]}
                  value={calories}
                  onChangeText={setCalories}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  editable={!isSaving}
                />
                {errors.calories && <Text style={styles.errorText}>{errors.calories}</Text>}
              </View>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Protein (g)</Text>
                <TextInput
                  style={[styles.input, errors.protein && styles.inputError]}
                  value={protein}
                  onChangeText={setProtein}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  editable={!isSaving}
                />
                {errors.protein && <Text style={styles.errorText}>{errors.protein}</Text>}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Carbs (g)</Text>
                <TextInput
                  style={[styles.input, errors.carbs && styles.inputError]}
                  value={carbs}
                  onChangeText={setCarbs}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  editable={!isSaving}
                />
                {errors.carbs && <Text style={styles.errorText}>{errors.carbs}</Text>}
              </View>
              <View style={[styles.field, styles.halfField]}>
                <Text style={styles.label}>Fat (g)</Text>
                <TextInput
                  style={[styles.input, errors.fat && styles.inputError]}
                  value={fat}
                  onChangeText={setFat}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  editable={!isSaving}
                />
                {errors.fat && <Text style={styles.errorText}>{errors.fat}</Text>}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttons}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="secondary"
              style={styles.cancelButton}
              disabled={isSaving}
            />
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color={colors.textLight} />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  container: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textLight,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
