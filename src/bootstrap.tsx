import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReduxStore, { persistor } from '@/store';

import RootStackScreen from './navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';

export default function Bootstrap() {
  return (
    <Provider store={ReduxStore}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
