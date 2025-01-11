import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/reducer';
import ingredientsReducer from './slices/ingredients/reducer';
import orderReducer from './slices/order/reducer';
import burgerConstructorSlice from './slices/burger-constructor/reducer';
import feedsReducer from './slices/feeds/reducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feeds: feedsReducer,
  burgerConstructor: burgerConstructorSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
