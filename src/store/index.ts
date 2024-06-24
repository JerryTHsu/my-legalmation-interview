// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './slices/authorsSlice';
import booksReducer from './slices/booksSlice';

// Create the Redux store with authors and books reducers
const store = configureStore({
    reducer: {
        authors: authorsReducer,
        books: booksReducer,
    },
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
