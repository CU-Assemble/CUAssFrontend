import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockUpAct from "../../components/mockUpActivity";
import { Activity } from "../../models/activityTypes";
import activityServices from "../../services/activityServices";

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
  activities: []
};

export const getAllActivities = createAsyncThunk(
  'activity/getAll',
  async () => {
    const response = await activityServices.getAll();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

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

export const { setActivities } = activitySlice.actions;

export default activitySlice.reducer
