# Milton Nutrition App

Your personal AI-powered nutrition companion.

A mobile application built with React Native and Expo that helps users track their daily food intake, monitor macronutrients, and receive personalized nutrition advice through an AI assistant.

## Features

- **Calorie Tracking** - Visual progress bar showing daily calorie consumption vs. goal
- **Macros Dashboard** - Track protein, carbs, and fats with circular progress indicators
- **Additional Metrics** - Monitor fiber intake and water consumption
- **Food Log** - View, edit, and delete logged meals with full nutritional breakdown
- **AI Chat Assistant** - Get personalized nutrition advice, snack recommendations, and meal planning help
- **Quick Replies** - Pre-defined response chips for fast interaction with the AI

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.73.0 | Cross-platform mobile framework |
| Expo | ~50.0.0 | Development toolchain and runtime |
| TypeScript | ^5.1.0 | Type safety |
| React | 18.2.0 | UI library |
| React Native Reanimated | ~3.6.0 | Smooth animations |
| React Native Gesture Handler | ~2.14.0 | Touch gestures |
| React Native SVG | 14.1.0 | SVG rendering |
| Expo Vector Icons | ^15.1.1 | Icon library |

## Project Structure

```
├── App.tsx                    # Main app entry point
├── src/
│   ├── components/
│   │   ├── chat/              # Chat-related components
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── QuickReplyChips.tsx
│   │   ├── common/            # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── CircularProgress.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── CaloriesCard.tsx
│   │   │   ├── MacrosCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── FoodLog.tsx
│   │   │   ├── FoodLogItem.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ChatFAB.tsx
│   │   └── modals/
│   │       └── EditMealModal.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx     # Main dashboard screen
│   │   └── ChatScreen.tsx     # AI chat bottom sheet
│   ├── constants/
│   │   └── colors.ts          # App color palette
│   └── types/
│       └── index.ts           # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd milton-nutrition-app

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
npm run ios      # Run on iOS simulator
npm run android  # Run on Android emulator
npm run web      # Run in web browser
```

## Data Models

### Meal

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Meal description |
| time | string | Time of meal |
| calories | number | Calorie count |
| protein | number | Protein in grams |
| carbs | number | Carbohydrates in grams |
| fat | number | Fat in grams |

### NutritionStats

Tracks daily progress for calories, protein, carbs, fat, fiber, and water. Each metric contains `current` and `goal` values.

### ChatMessage

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| type | 'user' \| 'assistant' | Message sender |
| content | string | Message text |
| timestamp | Date | When message was sent |

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#2D8B7B` | Main brand color |
| Primary Dark | `#1E6B5E` | Secondary accents |
| Secondary | `#8BC34A` | Success states |
| Accent | `#4ECDC4` | Highlights |
| Background | `#F0F4F3` | App background |
| Fiber | `#5BA89A` | Fiber stat card |
| Water | `#A8E6CF` | Water stat card |

## Future Enhancements

- User authentication
- Backend API integration
- Barcode scanning for food items
- Recipe database
- Weekly/monthly progress reports
- Notifications and reminders
- Dark mode support

## License

This project is private and proprietary.
