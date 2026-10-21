import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { MainTabParamList, RootStackParamList } from './types';

// Navigators are intentionally declared but not mounted until app screens exist.
export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const MainTabs = createBottomTabNavigator<MainTabParamList>();

export type { MainTabParamList, RootStackParamList } from './types';
