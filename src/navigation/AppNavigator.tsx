import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen, ChatScreen } from '../screens';
import { colors } from '../constants';

export const AppNavigator: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleOpenChat = () => setIsChatVisible(true);
  const handleCloseChat = () => setIsChatVisible(false);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <HomeScreen onOpenChat={handleOpenChat} />
        <ChatScreen visible={isChatVisible} onClose={handleCloseChat} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
