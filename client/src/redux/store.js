import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { reloadSlice } from './reload/slice';
import { currencyReducer } from './currency/slice';
import { accountsReducer } from './accounts/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'permission'],
};

const currencyPersistConfig = {
  key: 'currency',
  storage,
  whitelist: ['items'],
};

const accountsPersistConfig = {
  key: 'accounts',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    currency: persistReducer(currencyPersistConfig, currencyReducer),
    accounts: persistReducer(accountsPersistConfig, accountsReducer),
    reload: reloadSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
