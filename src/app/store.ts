import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/counter/login/loginSlice';
import galReducer from '../features/counter/gal/galSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    gal: galReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
