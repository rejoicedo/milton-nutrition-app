import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { ChatMessage as ChatMessageType, QuickReply } from '../types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const initialQuickReplies: QuickReply[] = [
  { id: '1', label: 'Feeling great' },
  { id: '2', label: 'Still hungry' },
  { id: '3', label: 'View my stats' },
];

interface ChatScreenProps {
  visible: boolean;
  onClose: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Great progress today! You've logged 1,847 calories across 4 meals. How are you feeling after lunch?",
      timestamp: new Date(),
    },
  ]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(initialQuickReplies);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      openSheet();
    }
  }, [visible]);

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuickReplies([]);
    setInputText('');

    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          "Based on your goals, I'd recommend a protein-rich snack. Here are some great options:\n\n• Greek yogurt with berries (180 cal, 18g protein)\n• Protein bar and almonds (250 cal, 15g protein)\n• Apple with peanut butter (200 cal, 8g protein)",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setQuickReplies([
        { id: '4', label: 'View my macros' },
        { id: '5', label: 'Get a recipe' },
        { id: '6', label: 'Plan dinner' },
      ]);
    }, 1000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    setInputText(reply.label);
    setTimeout(handleSendMessage, 100);
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={closeSheet}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        <View style={styles.handleContainer} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.content}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesScroll}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={
                  message.type === 'user'
                    ? styles.userBubble
                    : styles.assistantBubble
                }
              >
                <Text
                  style={
                    message.type === 'user'
                      ? styles.userText
                      : styles.assistantText
                  }
                >
                  {message.content}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <View style={styles.chipsRow}>
              {quickReplies.map((reply) => (
                <TouchableOpacity
                  key={reply.id}
                  style={styles.chip}
                  onPress={() => handleQuickReply(reply)}
                >
                  <Text style={styles.chipText}>{reply.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Input Area */}
          <SafeAreaView edges={['bottom']} style={styles.inputArea}>
            <View style={styles.inputRow}>
              <TouchableOpacity style={styles.iconBtn}>
                <MaterialIcons name="photo-camera" size={24} color={colors.textSecondary} />
              </TouchableOpacity>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Ask Milton anything..."
                  placeholderTextColor={colors.textSecondary}
                />
                <TouchableOpacity style={styles.micBtn}>
                  <MaterialIcons name="mic" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                onPress={handleSendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons name="send" size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.42,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  messagesScroll: {
    maxHeight: 120,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
    marginBottom: 8,
  },
  userText: {
    color: colors.textLight,
    fontSize: 15,
    lineHeight: 21,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    marginBottom: 8,
  },
  assistantText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.cardBg,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  inputArea: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.cardBg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  iconBtn: {
    padding: 6,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 24,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  micBtn: {
    padding: 4,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
});
