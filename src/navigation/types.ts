export type RootStackParamList = {
  Home: undefined;
  MealDetail: { mealId: string };
  AddMeal: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Meals: undefined;
  Stats: undefined;
  Profile: undefined;
};

export type NavigationScreen = keyof RootStackParamList;
