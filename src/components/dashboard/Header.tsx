import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

interface HeaderProps {
  activeTab: 'today' | '30days';
  onTabChange: (tab: 'today' | '30days') => void;
  onMenuPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onMenuPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => onTabChange('today')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'today' && styles.activeTabText,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === '30days' && styles.activeTab]}
          onPress={() => onTabChange('30days')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === '30days' && styles.activeTabText,
            ]}
          >
            30 Days
          </Text>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row',
    alignItems: 'center',
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
    color: colors.textLight,
  },
  infoIcon: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.textSecondary,
  },
  menuButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: colors.textLight,
    marginVertical: 2,
    borderRadius: 1,
  },
});
