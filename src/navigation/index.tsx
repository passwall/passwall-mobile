import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStack>();
const LoginStack = createNativeStackNavigator<LoginStack>();

import HomeScreen from '@/views/Home';
import LoginMainScreen from '@/views/Login';
import LoginScreen from '@/views/Login/Login';
import RegitserScreen from '@/views/Login/Register';

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Main" component={LoginMainScreen} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegitserScreen} />
    </LoginStack.Navigator>
  );
}

export default function RootStackScreen() {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="LoginStack" component={LoginStackScreen} />
    </RootStack.Navigator>
  );
}
