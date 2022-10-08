import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import activityReducer from '../features/activityPost/activitySlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    activityReducer,
    counterReducer,
    userReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
