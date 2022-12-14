import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import activityReducer from '../features/activityPost/activitySlice';
import userReducer from '../features/user/userSlice';
import matchingReducer from '../features/matching/matchingSlice';

export const store = configureStore({
  reducer: {
    activityReducer,
    counterReducer,
    userReducer,
    matchingReducer
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
