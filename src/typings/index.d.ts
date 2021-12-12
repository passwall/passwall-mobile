import type { NavigatorScreenParams } from '@react-navigation/native';

declare global {
  type RootStackProps = {
    LoginRegisterStack: NavigatorScreenParams<LoginAndRegisterStackProps>;
    Home: undefined;
  };

  type LoginAndRegisterStackProps = {
    Main: undefined;
    Login: NavigatorScreenParams<LoginStackProps>;
    Register: NavigatorScreenParams<RegisterStackProps>;
  };

  type LoginStackProps = {
    Server: undefined;
    Email: undefined;
    Password: undefined;
  };

  type RegisterStackProps = {
    Email: undefined;
    Password: undefined;
  };
}

export {};
