import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import MMKVStorage from 'react-native-mmkv-storage';
import FlipperRedux from 'redux-flipper';

import userSlice from './user';

const storage = new MMKVStorage.Loader().initialize();

const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: 'user',
      storage,
    },
    userSlice.reducer,
  ),
});

const middlewares: any[] = [];

if (__DEV__) {
  middlewares.push(FlipperRedux());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middlewares),
});

export default store;
export const persistor = persistStore(store);
