import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../constants/colors';
import { QuickReply } from '../../types';

interface QuickReplyChipsProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export const QuickReplyChips: React.FC<QuickReplyChipsProps> = ({
  replies,
  onSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {replies.map((reply) => (
        <TouchableOpacity
          key={reply.id}
          style={styles.chip}
          onPress={() => onSelect(reply)}
          activeOpacity={0.7}
        >
          <Text style={styles.chipText}>{reply.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
});
