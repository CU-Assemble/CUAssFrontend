import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import mockUpAct from "../../components/mockUpActivity";
import { Activity } from "../../models/activityTypes";
import activityServices from "../../services/activityServices";

import { ActivityResponseType, NewActivity } from "../../models/activityTypes";

export interface activitiesState {
  activity: Activity
  activities: Activity[]
  status: {
    create: {
      message: string;
      loading: boolean;
      error: string;
    };
    edit: {
      message: string;
      loading: boolean;
      error: string;
    };
  };
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
  activities: [],
  status: {
    create: {
      message: "idle",
      loading: false,
      error: "",
    },
    edit: {
      message: "idle",
      loading: false,
      error: "",
    },
  },
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

export const createActivityAsync = createAsyncThunk(
  'activity/createActivity',
  async (input: NewActivity) => {
    const response = await activityServices.create(input);
    return response.data;
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = [...action.payload];
    },
    setCreateError: (state, action: PayloadAction<string>) => {
      state.status.create.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivities.fulfilled,(state, action:PayloadAction<ActivityResponseType[]>) => {
      state.activities = action.payload.map((e : ActivityResponseType) => ActivityResponseAdapter(e))
    })
    .addCase(fetchActivityById.fulfilled, (state, action: PayloadAction<ActivityResponseType>) => {
      state.activity = ActivityResponseAdapter(action.payload)
    })

    .addCase(createActivityAsync.pending, (state) => {
      state.status.create.message = "loading";
      state.status.create.loading = true;
    })
    .addCase(createActivityAsync.fulfilled, (state, action) => {
      state.status.create.message = "success";
      state.status.create.loading = false;
      console.log(action.payload);
    })
    .addCase(createActivityAsync.rejected, (state, action) => {
      state.status.create.message = "failed";
      state.status.create.loading = false;

      const errorMessage = action.error.message;
      state.status.create.error = errorMessage
        ? errorMessage
        : "Fail to create a new activity.";
    });
  }
})

export const { setActivities, setCreateError } = activitySlice.actions;

export const selectCreateLoading = (state: RootState) =>
  state.activityReducer.status.create.loading;
export const selectCreateMessage = (state: RootState) =>
  state.activityReducer.status.create.message;
export const selectCreateError = (state: RootState) =>
  state.activityReducer.status.create.error;


export default activitySlice.reducer