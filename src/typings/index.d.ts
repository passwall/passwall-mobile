import type { NavigatorScreenParams } from '@react-navigation/native';
import store from '@/store';
declare global {
  type RootStackProps = {
    Home: NavigatorScreenParams<HomeStackProps>;
    Inital: undefined;
    Login: NavigatorScreenParams<LoginStackProps>;
    Register: NavigatorScreenParams<RegisterStackProps>;
  };

  type HomeStackProps = {
    Main: undefined;
    Search: undefined;
    Favorite: undefined;
    Settings: undefined;
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

  // Store
  // eslint-disable-next-line no-undef
  type RootStore = ReturnType<typeof store.getState>;
  // eslint-disable-next-line no-undef
  type AppDispatch = typeof store.dispatch;
}

export {};
