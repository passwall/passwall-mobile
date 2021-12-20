import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import ReduxStore, { persistor } from '@/store';
import RootStackScreen from './navigation';

const queryClient = new QueryClient();

export default function Bootstrap() {
  return (
    <Provider store={ReduxStore}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootStackScreen />
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
