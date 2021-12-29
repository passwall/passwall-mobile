import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const RootStack = createNativeStackNavigator<RootStackProps>();

const LoginStack = createNativeStackNavigator<LoginStackProps>();
const RegisterStack = createNativeStackNavigator<RegisterStackProps>();
const Tab = createBottomTabNavigator<HomeStackProps>();

import MainScreen from '@/views/Home/Main';
import SearchScreen from '@/views/Home/Search';
import SettingsScreen from '@/views/Home/Settings';
import FavoriteScreen from '@/views/Home/Favorite';

import InitalScreen from '@/views';

/* Logins */
import LoginServerScreen from '@/views/Login/Server';
import LoginEmailScreen from '@/views/Login/Email';
import LoginPasswordScreen from '@/views/Login/Password';

import RegisterScreen from '@/views/Register';
import { StatusBar } from 'react-native';
import { Tabbar } from '@/components';

const TabNavigationScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <Tabbar {...props} />}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

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
        <RootStack.Screen name="Home" component={TabNavigationScreen} />
        <RootStack.Screen name="Login" component={LoginStackScreen} />
        <RootStack.Screen name="Register" component={RegisterStackScreen} />
      </RootStack.Navigator>
    </>
  );
}
