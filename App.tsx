import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const colors = {
  primary: '#2D8B7B',
  primaryDark: '#1E6B5E',
  secondary: '#8BC34A',
  accent: '#4ECDC4',
  background: '#F0F4F3',
  cardBg: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',
  fiber: '#5BA89A',
  water: '#A8E6CF',
  border: '#E5E7EB',
  error: '#EF4444',
};

type Meal = {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const initialMeals: Meal[] = [
  { id: '1', name: 'Oatmeal with berries, Greek yogurt', time: '8:30am', calories: 445, protein: 24, carbs: 58, fat: 12 },
  { id: '2', name: 'Grilled chicken salad, Whole grain bread', time: '12:45pm', calories: 620, protein: 45, carbs: 52, fat: 18 },
  { id: '3', name: 'Protein bar, Almonds', time: '3:15pm', calories: 320, protein: 22, carbs: 28, fat: 14 },
];

// Simple Header
const Header = () => (
  <View style={styles.header}>
    <View style={styles.tabContainer}>
      <View style={[styles.tab, styles.activeTab]}>
        <Text style={styles.activeTabText}>Today</Text>
      </View>
      <View style={styles.tab}>
        <Text style={styles.tabText}>30 Days</Text>
      </View>
    </View>
    <View style={styles.menuButton}>
      <Text style={styles.menuIcon}>☰</Text>
    </View>
  </View>
);

// Calories Card
const CaloriesCard = () => (
  <View style={styles.caloriesCard}>
    <Text style={styles.cardLabel}>⚡ Calories</Text>
    <View style={styles.caloriesRow}>
      <Text style={styles.caloriesValue}>1,847<Text style={styles.caloriesGoal}>/2,000 kcal</Text></Text>
      <Text style={styles.caloriesLeft}>153 kcal left</Text>
    </View>
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: '92%' }]} />
    </View>
  </View>
);

// Macros Card
const MacrosCard = () => (
  <View style={styles.macrosCard}>
    <Text style={styles.cardLabelDark}>📊 Macros</Text>
    <View style={styles.macrosRow}>
      <View style={styles.macroItem}>
        <View style={[styles.macroCircle, { borderColor: '#fff' }]}>
          <Text style={styles.macroIcon}>🥩</Text>
        </View>
        <Text style={styles.macroLabel}>Protein</Text>
        <Text style={styles.macroValue}>78g<Text style={styles.macroGoal}>/150g</Text></Text>
      </View>
      <View style={styles.macroItem}>
        <View style={[styles.macroCircle, { borderColor: colors.secondary }]}>
          <Text style={styles.macroIcon}>🌾</Text>
        </View>
        <Text style={styles.macroLabel}>Carbs</Text>
        <Text style={styles.macroValue}>186g<Text style={styles.macroGoal}>/250g</Text></Text>
      </View>
      <View style={styles.macroItem}>
        <View style={[styles.macroCircle, { borderColor: colors.accent }]}>
          <Text style={styles.macroIcon}>💧</Text>
        </View>
        <Text style={styles.macroLabel}>Fats</Text>
        <Text style={styles.macroValue}>46g<Text style={styles.macroGoal}>/67g</Text></Text>
      </View>
    </View>
  </View>
);

// Stat Cards
const StatCards = () => (
  <View style={styles.statCardsRow}>
    <View style={[styles.statCard, { backgroundColor: colors.fiber }]}>
      <Text style={styles.statLabel}>Fiber</Text>
      <Text style={styles.statValue}>18<Text style={styles.statGoal}>/25g</Text></Text>
    </View>
    <View style={[styles.statCard, { backgroundColor: colors.water }]}>
      <Text style={styles.statLabel}>Water</Text>
      <Text style={styles.statValue}>6<Text style={styles.statGoal}>/8 cups</Text></Text>
    </View>
  </View>
);

// Food Log Item
const FoodLogItem = ({ 
  meal, 
  onEdit, 
  onDelete 
}: { 
  meal: Meal; 
  onEdit: (meal: Meal) => void; 
  onDelete: (id: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <View style={styles.foodItemRow}>
      <TouchableOpacity 
        style={styles.foodItem} 
        onPress={() => setShowActions(!showActions)}
        activeOpacity={0.7}
      >
        <View style={styles.foodHeader}>
          <Text style={styles.foodName}>{meal.name}</Text>
          <Text style={styles.foodTime}>{meal.time}</Text>
        </View>
        <View style={styles.foodMacros}>
          <Text style={styles.foodMacro}>🔥 {meal.calories} kcal</Text>
          <Text style={styles.foodMacro}>🥩 {meal.protein}g</Text>
          <Text style={styles.foodMacro}>🌾 {meal.carbs}g</Text>
          <Text style={styles.foodMacro}>💧 {meal.fat}g</Text>
        </View>
      </TouchableOpacity>
      {showActions && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => {
              setShowActions(false);
              onEdit(meal);
            }}
          >
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => {
              setShowActions(false);
              onDelete(meal.id);
            }}
          >
            <Text style={styles.actionIconX}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Edit Modal
const EditMealModal = ({ 
  visible, 
  meal, 
  onSave, 
  onClose 
}: { 
  visible: boolean; 
  meal: Meal | null; 
  onSave: (meal: Meal) => void; 
  onClose: () => void;
}) => {
  const [name, setName] = useState(meal?.name || '');
  const [time, setTime] = useState(meal?.time || '');
  const [calories, setCalories] = useState(meal?.calories.toString() || '');
  const [protein, setProtein] = useState(meal?.protein.toString() || '');
  const [carbs, setCarbs] = useState(meal?.carbs.toString() || '');
  const [fat, setFat] = useState(meal?.fat.toString() || '');

  React.useEffect(() => {
    if (meal) {
      setName(meal.name);
      setTime(meal.time);
      setCalories(meal.calories.toString());
      setProtein(meal.protein.toString());
      setCarbs(meal.carbs.toString());
      setFat(meal.fat.toString());
    }
  }, [meal]);

  const handleSave = () => {
    if (meal) {
      onSave({
        ...meal,
        name,
        time,
        calories: parseInt(calories) || 0,
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fat: parseInt(fat) || 0,
      });
    }
  };

  if (!visible || !meal) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Breakfast</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Meal Description</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter meal description"
          />

          <Text style={styles.inputLabel}>Time</Text>
          <TextInput
            style={styles.textInput}
            value={time}
            onChangeText={setTime}
            placeholder="8:30am"
          />

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput
                style={styles.textInput}
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Protein (g)</Text>
              <TextInput
                style={styles.textInput}
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Carbs (g)</Text>
              <TextInput
                style={styles.textInput}
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>Fat (g)</Text>
              <TextInput
                style={styles.textInput}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Chat FAB
const ChatFAB = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress}>
    <Text style={styles.fabIcon}>🤖</Text>
  </TouchableOpacity>
);

// Chat Message Types
type ChatMessage = {
  id: string;
  type: 'user' | 'assistant';
  content: string;
};

// Chat Bottom Sheet
const ChatSheet = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Great progress today! You've logged 1,847 calories across 4 meals. Your protein intake is excellent at 135g. How are you feeling after lunch?",
    },
  ]);
  const [quickReplies, setQuickReplies] = useState([
    'Feeling great',
    'Still hungry', 
    'View my stats',
  ]);
  const [inputText, setInputText] = useState('');

  const handleQuickReply = (reply: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: reply === 'Feeling great' ? 'Feeling great! What should I have for my snack?' : reply,
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Based on your goals, I'd recommend a protein-rich snack. Here are some great options:\n\n• Greek yogurt with berries (180 cal, 18g protein)\n• Protein bar and almonds (250 cal, 15g protein)\n• Apple with peanut butter (200 cal, 8g protein)",
      };
      setMessages(prev => [...prev, aiResponse]);
      setQuickReplies(['View my macros', 'Get a recipe', 'Plan dinner']);
    }, 500);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setQuickReplies([]);
  };

  if (!visible) return null;
  
  return (
    <View style={styles.chatOverlay}>
      <TouchableOpacity style={styles.chatBackdrop} onPress={onClose} />
      <View style={styles.chatSheet}>
        <View style={styles.chatHandle} />
        
        <ScrollView style={styles.chatMessages} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View key={msg.id}>
              {msg.type === 'assistant' ? (
                <View style={styles.assistantRow}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarIcon}>🤖</Text>
                  </View>
                  <View style={styles.assistantBubble}>
                    <Text style={styles.assistantText}>{msg.content}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{msg.content}</Text>
                </View>
              )}
              {msg.type === 'assistant' && msg.id === '1' && (
                <View style={styles.messageActions}>
                  <Text style={styles.actionBtn}>📋</Text>
                  <Text style={styles.actionBtn}>🔊</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {quickReplies.length > 0 && (
          <View style={styles.quickReplies}>
            {quickReplies.map((reply, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.chip}
                onPress={() => handleQuickReply(reply)}
              >
                <Text style={styles.chipText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.chatInputRow}>
          <Text style={styles.cameraIcon}>📷</Text>
          <View style={styles.chatInputBox}>
            <TextInput
              style={styles.chatTextInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask Milton anything..."
              placeholderTextColor={colors.textSecondary}
            />
            <Text style={styles.micIcon}>🎤</Text>
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setEditModalVisible(true);
  };

  const handleSaveMeal = (updatedMeal: Meal) => {
    setMeals(meals.map(m => m.id === updatedMeal.id ? updatedMeal : m));
    setEditModalVisible(false);
    setEditingMeal(null);
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <CaloriesCard />
          <MacrosCard />
          <StatCards />
          
          {/* Food Log */}
          <View style={styles.foodLog}>
            <View style={styles.foodLogHeader}>
              <Text style={styles.foodLogTitle}>Food Log</Text>
              <Text style={styles.viewAll}>View All</Text>
            </View>
            {meals.map(meal => (
              <FoodLogItem 
                key={meal.id}
                meal={meal}
                onEdit={handleEditMeal}
                onDelete={handleDeleteMeal}
              />
            ))}
          </View>
        </ScrollView>
        
        <ChatFAB onPress={() => setChatVisible(true)} />
        <ChatSheet visible={chatVisible} onClose={() => setChatVisible(false)} />
        <EditMealModal 
          visible={editModalVisible}
          meal={editingMeal}
          onSave={handleSaveMeal}
          onClose={() => {
            setEditModalVisible(false);
            setEditingMeal(null);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  menuButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
  },
  menuIcon: {
    color: colors.textLight,
    fontSize: 18,
  },
  // Calories Card
  caloriesCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: 8,
  },
  caloriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textLight,
  },
  caloriesGoal: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  caloriesLeft: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.8,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.primaryDark,
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 5,
  },
  // Macros Card
  macrosCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cardLabelDark: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: 16,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  macroIcon: {
    fontSize: 22,
  },
  macroLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 8,
    opacity: 0.8,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
    marginTop: 4,
  },
  macroGoal: {
    fontWeight: '400',
    opacity: 0.6,
  },
  // Stat Cards
  statCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  statGoal: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  // Food Log
  foodLog: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  foodLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodLogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  foodItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodItem: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 6,
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
  actionIconX: {
    fontSize: 18,
    color: colors.textLight,
    fontWeight: '600',
  },
  foodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  foodName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  foodTime: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  foodMacros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  foodMacro: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: colors.cardBg,
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
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
  closeButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
    color: colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  // Chat FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 26,
  },
  // Chat Sheet
  chatOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  chatBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  chatSheet: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 12,
    maxHeight: '70%',
  },
  chatHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  chatMessages: {
    maxHeight: 300,
    marginBottom: 12,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarIcon: {
    fontSize: 18,
  },
  assistantBubble: {
    flex: 1,
    backgroundColor: colors.cardBg,
  },
  assistantText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 12,
    marginLeft: 46,
    marginBottom: 12,
  },
  actionBtn: {
    fontSize: 16,
    opacity: 0.5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
    marginBottom: 12,
  },
  userText: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 21,
  },
  quickReplies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cameraIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  chatInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
  },
  chatTextInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  micIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 18,
    color: colors.textLight,
  },
});
