import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import accountsReducer from './accountsSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    accounts: accountsReducer,
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
