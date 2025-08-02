import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { currencyReducer } from './currency/slice';
import { accountsReducer } from './accounts/slice';
import { groupReducer } from './group/slice';
import { typesReducer } from './types/slice';
import { reloadSlice } from './reload/slice';
import { reestrReducer } from './reestr/slice';
import { contragentsReducer } from './contragents/slice';
import { tagsReducer } from './tags/slice';

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

const groupPersistConfig = {
  key: 'group',
  storage,
  whitelist: ['items'],
};

const typesPersistConfig = {
  key: 'types',
  storage,
  whitelist: ['items'],
};

const reestrPersistConfig = {
  key: 'reestr',
  storage,
  whitelist: ['items'],
};

const contragentsPersistConfig = {
  key: 'contragents',
  storage,
  whitelist: ['items'],
};

const tagsPersistConfig = {
  key: 'tags',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    currency: persistReducer(currencyPersistConfig, currencyReducer),
    accounts: persistReducer(accountsPersistConfig, accountsReducer),
    group: persistReducer(groupPersistConfig, groupReducer),
    types: persistReducer(typesPersistConfig, typesReducer),
    reestr: persistReducer(reestrPersistConfig, reestrReducer),
    contragents: persistReducer(contragentsPersistConfig, contragentsReducer),
    tags: persistReducer(tagsPersistConfig, tagsReducer),
    reload: reloadSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
