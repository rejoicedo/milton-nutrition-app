import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onCopy?: () => void;
  onSpeak?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onCopy,
  onSpeak,
}) => {
  const isUser = message.type === 'user';

  const renderContent = () => {
    const content = message.content;
    
    if (content.includes('•')) {
      const parts = content.split('\n');
      return (
        <View>
          {parts.map((part, index) => {
            if (part.startsWith('•')) {
              return (
                <Text key={index} style={styles.bulletPoint}>
                  {part}
                </Text>
              );
            }
            return (
              <Text
                key={index}
                style={isUser ? styles.userText : styles.assistantText}
              >
                {part}
              </Text>
            );
          })}
        </View>
      );
    }

    return (
      <Text style={isUser ? styles.userText : styles.assistantText}>
        {content}
      </Text>
    );
  };

  if (isUser) {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userBubble}>{renderContent()}</View>
      </View>
    );
  }

  return (
    <View style={styles.assistantContainer}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>🤖</Text>
      </View>
      <View style={styles.assistantContent}>
        <View style={styles.assistantBubble}>{renderContent()}</View>
        {(onCopy || onSpeak) && (
          <View style={styles.actions}>
            {onCopy && (
              <TouchableOpacity onPress={onCopy} style={styles.actionButton}>
                <Text style={styles.actionIcon}>📋</Text>
              </TouchableOpacity>
            )}
            {onSpeak && (
              <TouchableOpacity onPress={onSpeak} style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔊</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  userText: {
    color: colors.textLight,
    fontSize: 15,
    lineHeight: 22,
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatar: {
    fontSize: 18,
  },
  assistantContent: {
    flex: 1,
  },
  assistantBubble: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  assistantText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  bulletPoint: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  actionIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
});
