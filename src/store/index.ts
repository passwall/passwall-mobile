import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
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

import userSlice from './user.slice';
import CryptoUtils from '@/utils/crypto';

const storage = new MMKVStorage.Loader().initialize();

const rootReducer = combineReducers({
  user: persistReducer(
    {
      key: 'user',
      storage,
      blacklist: ['loading'],
    },
    userSlice.reducer,
  ),
});

const middlewares: Middleware[] = [];

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
    }).concat(middlewares),
});

export default store;
export const persistor = persistStore(store, {}, () => {
  // Load hash and tansmission key from storage
  CryptoUtils.encryptKey = store.getState().user.master_hash;
  CryptoUtils.transmissionKey = store.getState().user.transmission_key;
});
