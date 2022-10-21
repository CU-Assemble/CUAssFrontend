import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockUpAct from "../../components/mockUpActivity";
import { Activity } from "../../models/activityTypes";
import activityServices from "../../services/activityServices";

import { ActivityResponseType } from "../../models/activityTypes";

export interface activitiesState {
  activity: Activity
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

const ActivityResponseAdapter = (e: ActivityResponseType) => <Activity>{
  id: e.ActivityId,
  name: e.Name,
  ownerID: e.OwnerId,
  location: e.Location,
  maxParticipant: Number(e.MaxParticipant),
  activityType: e.Type,
  participants: e.Participant,
  chatID: e.ChatId,
  date: e.Date,
  desc: e.Description,
  duration: Number(e.Duration),
  url: e.ImageProfile
}

const initialState: activitiesState = {
  activity: {
    id: "",
    name: "",
    ownerID: "",
    location: "",
    maxParticipant: 0,
    activityType: [""]
  },
  activities: []
};

export const fetchActivities = createAsyncThunk(
  'activity/getAll',
  async () => {
    const response = await activityServices.getAll();
    // The value we return becomes the `fulfilled` action payload
    if (response.status == 200) {
      return response.data;
    } else {
      return null
    }
  }
);

export const fetchActivityById = createAsyncThunk(
  'activity/getById',
  async (id : string) => {
    const response = await activityServices.get(id);
    if (response.status == 200) {
      return response.data;
    } else {
      return null
    }
  }
);

export const fetchMyActivities = createAsyncThunk(
  'activity/getMyActivities',
  async (sid : string) => {
    const response = await activityServices.getMyActivities(sid);
    if (response.status == 200) {
      return response.data;
    } else {
      return null
    }
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
  extraReducers: (builder) => {
    builder.addCase(fetchActivities.fulfilled,(state, action:PayloadAction<ActivityResponseType[]>) => {
      state.activities = action.payload.map((e : ActivityResponseType) => ActivityResponseAdapter(e))
    })
    .addCase(fetchActivityById.fulfilled, (state, action: PayloadAction<ActivityResponseType>) => {
      state.activity = ActivityResponseAdapter(action.payload)
    })
  }
})

export const { setActivities } = activitySlice.actions;

export default activitySlice.reducer