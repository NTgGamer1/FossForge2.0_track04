import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppHeader } from '../components/AppHeader';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgrammesScreen } from '../screens/ProgrammesScreen';
import { ProgrammeDetailScreen } from '../screens/ProgrammeDetailScreen';
import { OpportunitiesScreen } from '../screens/OpportunitiesScreen';
import { MediaScreen } from '../screens/MediaScreen';
import { GetInvolvedScreen } from '../screens/GetInvolvedScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { fontFamilies, theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import type { MainTabParamList, ProgrammesStackParamList, AuthStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const ProgrammesStack = createNativeStackNavigator<ProgrammesStackParamList>();
const RootStack = createNativeStackNavigator<AuthStackParamList & { MainTabs: undefined }>();

function ProgrammesStackNavigator() {
  return (
    <ProgrammesStack.Navigator screenOptions={{ headerShown: false }}>
      <ProgrammesStack.Screen name="ProgrammesList" component={ProgrammesScreen} />
      <ProgrammesStack.Screen name="ProgrammeDetail" component={ProgrammeDetailScreen} />
    </ProgrammesStack.Navigator>
  );
}

function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const { lang } = useLanguage();
  const isHi = lang === 'hi';

  const tabLabels = {
    Home: isHi ? 'होम' : 'Home',
    Programmes: isHi ? 'कार्यक्रम' : 'Programmes',
    Opportunities: isHi ? 'अवसर' : 'Opportunities',
    Media: isHi ? 'मीडिया' : 'Media',
    GetInvolved: isHi ? 'जुड़ें' : 'Get Involved',
  };

  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: theme.colors.borderSubtle,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: isHi ? fontFamilies.devanagariSemiBold : fontFamilies.interSemiBold,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: tabLabels.Home,
          tabBarLabel: tabLabels.Home,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Programmes"
        component={ProgrammesStackNavigator}
        options={{
          title: tabLabels.Programmes,
          tabBarLabel: tabLabels.Programmes,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Opportunities"
        component={OpportunitiesScreen}
        options={{
          title: tabLabels.Opportunities,
          tabBarLabel: tabLabels.Opportunities,
          tabBarActiveTintColor: theme.colors.eduanchorsTeal,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.iconWrapper}>
              <Ionicons name={focused ? 'school' : 'school-outline'} size={size} color={color} />
              <View style={styles.tealDot} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Media"
        component={MediaScreen}
        options={{
          title: tabLabels.Media,
          tabBarLabel: tabLabels.Media,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'images' : 'images-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GetInvolved"
        component={GetInvolvedScreen}
        options={{
          title: tabLabels.GetInvolved,
          tabBarLabel: tabLabels.GetInvolved,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'heart-circle' : 'heart-circle-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      <RootStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerTintColor: theme.colors.primary,
        }}
      />
      <RootStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'My Profile',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
          headerTintColor: theme.colors.primary,
        }}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tealDot: {
    position: 'absolute',
    top: 1,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.eduanchorsTeal,
  },
});
