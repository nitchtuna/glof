import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MonitorScreen from './MonitorScreen'; // Create this screen
import PredictScreen from './PredictScreen'; // Create this screen
import EvacuationScreen from './EvacuationScreen'; // Create this screen
import UserProfileScreen from './UserProfileScreen'; // Create this screen
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Monitor"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Monitor':
              iconName = 'md-eye';
              break;
            case 'Predict':
              iconName = 'md-analytics';
              break;
            case 'Evacuation':
              iconName = 'md-compass';
              break;
            case 'UserProfile':
              iconName = 'md-person';
              break;
            default:
              iconName = 'md-information-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff', // Muted blue color
        tabBarInactiveTintColor: '#8a8a8a', // Muted gray color
        tabBarStyle: { backgroundColor: '#f5f5dc' }, // Light cream background
        headerShown: false,
      })}
    >
      <Tab.Screen name="Monitor" component={MonitorScreen} />
      <Tab.Screen name="Predict" component={PredictScreen} />
      <Tab.Screen name="Evacuation" component={EvacuationScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}
