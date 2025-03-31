import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import incidentsReducer from './slices/incidentsSlice';
import uiReducer from './slices/uiSlice';
import notificationsReducer from './slices/notificationsSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

// Combine all reducers
const rootReducer = combineReducers({
  incidents: incidentsReducer,
  ui: uiReducer,
  notifications: notificationsReducer,
  userPreferences: userPreferencesReducer,
});

// Configure the store with middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
