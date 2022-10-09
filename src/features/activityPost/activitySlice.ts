import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockUpAct from "../../components/mockUpActivity";
import { Activity } from "../../models/activityTypes";

export interface activitiesState {
  activities: Activity[]
}

//sample
const sampleCardData: Activity[] = [
  mockUpAct,
  mockUpAct,
  mockUpAct,
  mockUpAct,
  mockUpAct,
  mockUpAct,
  mockUpAct
];

const initialState: activitiesState = {
  activities: sampleCardData
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = [...action.payload];
    }
  },
  extraReducers: {}
})

// export const getAllActivities = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const { setActivities } = activitySlice.actions;

export default activitySlice.reducer
