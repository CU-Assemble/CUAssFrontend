import { createSlice } from "@reduxjs/toolkit";
import { Activity } from "../../models/activityTypes";

export interface activitiesState {
  activities: Activity []
}

const initialState: activitiesState = {
  activities: []
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: {}
})
