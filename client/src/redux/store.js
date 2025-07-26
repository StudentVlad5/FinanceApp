import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import { reloadSlice } from './reload/slice';
// import { modalReducer } from './modal/slice';
// import { categoryReducer } from './category/slice';
// import { eventsReducer } from './events/slice';
// import { specialistsReducer } from './specialists/slice';
// import { activate_eventsReducer } from './activate_events/slice';
// import { ordersReducer } from './orders/slice';
// import { messagesReducer } from './messages/slice';

// Persisting token and role fields from auth slice to localstorage
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'permission'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // modal: modalReducer,
    // category: categoryReducer,
    // specialists: specialistsReducer,
    // events: eventsReducer,
    // activate_events: activate_eventsReducer,
    // orders: ordersReducer,
    // messages: messagesReducer,
    reload: reloadSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);