import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen'; // Your login/register screen
import MonitorScreen from './MonitorScreen'; // Example screen
import PredictScreen from './PredictScreen'; // Example screen
import EvacuationScreen from './EvacuationScreen'; // Example screen
import UserProfileScreen from './UserProfileScreen'; // Example screen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Monitor" component={MonitorScreen} />
      <Tab.Screen name="Predict" component={PredictScreen} />
      <Tab.Screen name="Evacuation" component={EvacuationScreen} />
      <Tab.Screen name="User Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

// This should be the only App function
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
