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

export const editActivityAsync = createAsyncThunk(
  "activity/editActivity",
  async (input: NewActivity) => {
    const response = await activityServices.edit(input);
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
    setEditError: (state, action: PayloadAction<string>) => {
      state.status.edit.error = action.payload;
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
    })

    .addCase(editActivityAsync.pending, (state) => {
      state.status.edit.message = "loading";
      state.status.edit.loading = true;
    })
    .addCase(editActivityAsync.fulfilled, (state, action) => {
      state.status.edit.message = "success";
      state.status.edit.loading = false;
    })
    .addCase(editActivityAsync.rejected, (state, action) => {
      state.status.edit.message = "failed";
      state.status.edit.loading = false;
    
      const errorMessage = action.error.message;
      state.status.edit.error = errorMessage
        ? errorMessage
        : "Fail to edit an activity.";
    });
  }
})

export const { setActivities, setCreateError, setEditError } = activitySlice.actions;

export const selectActivity = (state: RootState) =>
  state.activityReducer.activity;

export const selectCreateLoading = (state: RootState) =>
  state.activityReducer.status.create.loading;
export const selectCreateMessage = (state: RootState) =>
  state.activityReducer.status.create.message;
export const selectCreateError = (state: RootState) =>
  state.activityReducer.status.create.error;

export const selectEditLoading = (state: RootState) =>
  state.activityReducer.status.edit.loading;
export const selectEditMessage = (state: RootState) =>
  state.activityReducer.status.edit.message;
export const selectEditError = (state: RootState) =>
  state.activityReducer.status.edit.error;


export default activitySlice.reducer