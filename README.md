# Milton Nutrition Tracker

A React Native nutrition tracking app with calorie/macro tracking, food logging, and an AI chat assistant.

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
npm install
```

### Running the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── ProgressBar.tsx
│   │   ├── CircularProgress.tsx
│   │   └── Button.tsx
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── Header.tsx
│   │   ├── CaloriesCard.tsx
│   │   ├── MacrosCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── FoodLogItem.tsx
│   │   ├── FoodLog.tsx
│   │   └── ChatFAB.tsx
│   ├── chat/            # Chat interface components
│   │   ├── ChatMessage.tsx
│   │   ├── QuickReplyChips.tsx
│   │   └── ChatInput.tsx
│   └── modals/          # Modal components
│       └── EditMealModal.tsx
├── screens/
│   ├── HomeScreen.tsx   # Main dashboard
│   └── ChatScreen.tsx   # AI chat bottom sheet
├── constants/
│   └── colors.ts        # Color palette
└── types/
    └── index.ts         # TypeScript interfaces
```

## Features

- **Calorie Tracking**: Visual progress bar showing daily calorie intake
- **Macro Tracking**: Circular progress rings for protein, carbs, and fats
- **Food Log**: Swipeable meal cards with edit/delete actions
- **Edit Meal Modal**: Form to modify meal details
- **AI Chat Assistant**: Bottom sheet chat with quick reply chips

## Dependencies

- `react-native-gesture-handler` - Swipe actions
- `react-native-reanimated` - Animations
- `react-native-svg` - Circular progress rings
- `react-native-safe-area-context` - Safe area handling
