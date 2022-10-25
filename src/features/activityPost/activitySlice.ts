import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
    fetchActivityById : {
      message: string;
      loading: boolean;
      error: string;
    };
    joinActivityAsync : {
      message: string;
      loading: boolean;
      error: string;
    };
    leaveActivityAsync : {
      message: string;
      loading: boolean;
      error: string;
    }
  };
}

const ActivityResponseAdapter = (e: ActivityResponseType) => <Activity>{
  id: e.ActivityId,
  name: e.Name,
  ownerID: e.OwnerId,
  location: e.Location,
  maxParticipant: Number(e.MaxParticipant),
  activityType: e.ActivityType,
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
    fetchActivityById : {
      message: "idle",
      loading: false,
      error: "",
    },
    joinActivityAsync : {
      message: "idle",
      loading: false,
      error: "",
    },
    leaveActivityAsync : {
      message: "idle",
      loading: false,
      error: "",
    }
  },
};

export const fetchActivities = createAsyncThunk(
  'activity/getAll',
  async () => {
    const response = await activityServices.getAll();
    // The value we return becomes the `fulfilled` action payload
    if (response.status === 200) {
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
    if (response.status === 200) {
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
    if (response.status === 200) {
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

export const joinActivityAsync = createAsyncThunk(
  "activity/joinActivity",
  async (aid: string) => {
    const response = await activityServices.join(aid);
    return response.data;
  }
);

export const leaveActivityAsync = createAsyncThunk(
  "activity/leaveActivity",
  async (aid: string) => {
    const response = await activityServices.leave(aid);
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
    builder.addCase(fetchActivities.fulfilled,(state, action) => {
      console.log(action.payload)
      state.activities = action.payload.data.map((e : ActivityResponseType) => ActivityResponseAdapter(e))
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
    })
    .addCase(fetchActivityById.pending, (state) => {
      state.status.fetchActivityById.message = "loading";
      state.status.fetchActivityById.loading = true;
    })
    .addCase(fetchActivityById.fulfilled, (state, action) => {
      console.log("finished loading")
      console.log(action.payload)
      state.status.fetchActivityById.message = "success";
      state.status.fetchActivityById.loading = false;
      state.activity = ActivityResponseAdapter(action.payload)
    })
    .addCase(fetchActivityById.rejected, (state, action) => {
      state.status.fetchActivityById.message = "failed";
      state.status.fetchActivityById.loading = false;
    })
    .addCase(joinActivityAsync.pending, (state) => {
      state.status.joinActivityAsync.message = "loading";
      state.status.joinActivityAsync.loading = true;
    })
    .addCase(joinActivityAsync.fulfilled, (state, action) => {
      console.log("finished joining")
      console.log(action.payload)
      state.status.joinActivityAsync.message = "success";
      state.status.joinActivityAsync.loading = false;
    })
    .addCase(joinActivityAsync.rejected, (state, action) => {
      state.status.joinActivityAsync.message = "failed";
      state.status.joinActivityAsync.loading = false;
    })
    .addCase(leaveActivityAsync.pending, (state) => {
      state.status.leaveActivityAsync.message = "loading";
      state.status.leaveActivityAsync.loading = true;
    })
    .addCase(leaveActivityAsync.fulfilled, (state, action) => {
      console.log("finished joining")
      console.log(action.payload)
      state.status.leaveActivityAsync.message = "success";
      state.status.leaveActivityAsync.loading = false;
    })
    .addCase(leaveActivityAsync.rejected, (state, action) => {
      state.status.leaveActivityAsync.message = "failed";
      state.status.leaveActivityAsync.loading = false;
    })
    ;
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

export const selectFetchActivityByIdLoading = (state: RootState) =>
  state.activityReducer.status.fetchActivityById.loading;
export const selectFetchActivityByIdMessage = (state: RootState) =>
  state.activityReducer.status.fetchActivityById.message;
export const selectFetchActivityByIdError = (state: RootState) =>
  state.activityReducer.status.fetchActivityById.error;

export const selectJoinActivityLoading = (state: RootState) =>
  state.activityReducer.status.joinActivityAsync.loading;
export const selectJoinActivityMessage = (state: RootState) =>
  state.activityReducer.status.joinActivityAsync.message;
export const selectJoinActivityError = (state: RootState) =>
  state.activityReducer.status.joinActivityAsync.error;

export const selectLeaveActivityLoading = (state: RootState) =>
  state.activityReducer.status.leaveActivityAsync.loading;
export const selectLeaveActivityMessage = (state: RootState) =>
  state.activityReducer.status.leaveActivityAsync.message;
export const selectLeaveActivityError = (state: RootState) =>
  state.activityReducer.status.leaveActivityAsync.error;

export default activitySlice.reducer