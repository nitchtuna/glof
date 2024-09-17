import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font'; // For loading custom fonts
import * as SplashScreen from 'expo-splash-screen'; // New splash screen handling
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';
import MonitorScreen from './MonitorScreen';
import PredictScreen from './PredictScreen';
import EvacuationScreen from './EvacuationScreen';
import UserProfileScreen from './UserProfileScreen';
import LakeMap from './LakeMap';

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Monitor') {
            iconName = 'eye';
          } else if (route.name === 'Predict') {
            iconName = 'analytics';
          } else if (route.name === 'Evacuation') {
            iconName = 'exit';
          } else if (route.name === 'User Profile') {
            iconName = 'person';
          }

          // You can return any icon component from @expo/vector-icons here:
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Monitor" component={MonitorScreen} />
      <Tab.Screen name="Predict" component={PredictScreen} />
      <Tab.Screen name="Evacuation" component={EvacuationScreen} />
      <Tab.Screen name="User Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'HelveticaNeue-Medium': require('./assets/fonts/HelveticaNeue-Medium.ttf'),
    'HelveticaNeue-Bold': require('./assets/fonts/HelveticaNeue-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null; // While fonts are loading, render nothing
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LakeMap" 
        component={LakeMap} 
        options={{ title: 'Choose a Glacial Lake' }} />
        <Stack.Screen
          name="MonitorScreen"
          component={MonitorScreen}
          options={{ title: 'Monitor Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}