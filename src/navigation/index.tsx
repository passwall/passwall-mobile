import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackProps>();

const LoginStack = createNativeStackNavigator<LoginStackProps>();
const RegisterStack = createNativeStackNavigator<RegisterStackProps>();

import HomeScreen from '@/views/Home';
import InitalScreen from '@/views';

/* Logins */
import LoginServerScreen from '@/views/Login/Server';
import LoginEmailScreen from '@/views/Login/Email';
import LoginPasswordScreen from '@/views/Login/Password';

import RegisterScreen from '@/views/Register';
import { StatusBar } from 'react-native';

function LoginStackScreen() {
  return (
    <LoginStack.Navigator
      initialRouteName="Server"
      screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Server" component={LoginServerScreen} />
      <LoginStack.Screen name="Email" component={LoginEmailScreen} />
      <LoginStack.Screen name="Password" component={LoginPasswordScreen} />
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

export default function RootStackScreen() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Inital" component={InitalScreen} />
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Login" component={LoginStackScreen} />
        <RootStack.Screen name="Register" component={RegisterStackScreen} />
      </RootStack.Navigator>
    </>
  );
}
