import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackProps>();
const LoginRegisterStack =
  createNativeStackNavigator<LoginAndRegisterStackProps>();
const LoginStack = createNativeStackNavigator<LoginStackProps>();
const RegisterStack = createNativeStackNavigator<RegisterStackProps>();

import HomeScreen from '@/views/Home';
import LoginMainScreen from '@/views/Login';
import LoginScreen from '@/views/Login/Login';
import RegisterScreen from '@/views/Login/Register';

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Server"
      screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Server" component={LoginScreen} />
      <LoginStack.Screen name="Email" component={LoginScreen} />
      <LoginStack.Screen name="Password" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}

function RegisterStackScreen() {
  return (
    <RegisterStack.Navigator
      initialRouteName="Email"
      screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen name="Email" component={RegisterScreen} />
      <RegisterStack.Screen name="Password" component={RegisterScreen} />
    </RegisterStack.Navigator>
  );
}

function LoginAndRegisterStackScreen() {
  return (
    <LoginRegisterStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      <LoginRegisterStack.Screen name="Main" component={LoginMainScreen} />
      <LoginRegisterStack.Screen name="Login" component={LoginStackScreen} />
      <LoginRegisterStack.Screen
        name="Register"
        component={RegisterStackScreen}
      />
    </LoginRegisterStack.Navigator>
  );
}

export default function RootStackScreen() {
  return (
    <RootStack.Navigator
      initialRouteName="LoginRegisterStack"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen
        name="LoginRegisterStack"
        component={LoginAndRegisterStackScreen}
      />
    </RootStack.Navigator>
  );
}
