import type { NavigatorScreenParams } from '@react-navigation/native';

declare global {
  type RootStack = {
    LoginStack: NavigatorScreenParams<LoginStack>;
    Home: undefined;
  };

  type LoginStack = {
    Main: undefined;
    Login: undefined;
    Register: undefined;
  };
}

export {};
