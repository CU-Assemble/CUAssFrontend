import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Activity } from "../../models/activityTypes";
import { Matching, MatchingDict, MatchingResponseType } from "../../models/matchingTypes";
import { User, UserResponseFromMatching } from "../../models/userTypes";
import activityServices from "../../services/activityServices";
import matchingService from "../../services/matchingService";


export interface MatchingState {
    matching: Matching,
    matchings: MatchingDict,
    status: {
        fetchMatchingById:{
            message: string;
            loading: boolean;
            error: string;
        },
        fetchMatchingByActivityId: {
            message: string;
            loading: boolean;
            error: string;
        },
        fetchMatchingByIds:{
            message: string;
            loading: boolean;
            error: string;
        },
        deleteMatchingAsync: {
          message: string;
          loading: boolean;
          error: string;
      }

    }
}

const initialState: MatchingState = {
    matching: {
        activity: {
            activityType:[],
            id: "",
            location: "",
            maxParticipant: 1,
            name: "",
            ownerID: "",
        },
        activityId: "",
        matchingId: "",
        participants: []
    },
    matchings : {},
    status: {
        fetchMatchingById: {
            message: "idle",
            loading: false,
            error: "",
        },
        fetchMatchingByActivityId: {
            message: "idle",
            loading: false,
            error: "",
        },
        fetchMatchingByIds: {
            message: "idle",
            loading: false,
            error: "",
        },
        deleteMatchingAsync: {
            message: "idle",
            loading: false,
            error: "",
        }
    }
}

const MatchingResponseAdapter = (e: MatchingResponseType) => <Matching>{
    // activity: e.Activity,
    activityId: e.ActivityId.slice(10,-2),
    matchingId: e.MatchingId.slice(10,-2),
    participants: e.ParticipantId
}

const UserMatchingResponseAdapter = (e: UserResponseFromMatching) => <User>{
    faculty: e.Faculty,
    email: e.Email,
    name: e.Name,
    nickname: e.Nickname,
    studentId: e.StudentId,
    tel: e.Tel
}

export const fetchMatchingById = createAsyncThunk(
    'matching/getById',
    async (id : string) => {
      const response = await matchingService.get(id);
      if (response.status === 200) {
        return response.data;
      } else {
        return null
      }
    }
);

export const fetchMatchingByActivityId = createAsyncThunk(
    'matching/getByActivityId',
    async (aid : string) => {
      const response = await matchingService.getMatchingByActivity(aid);
      if (response.status === 200) {
        const responseActivity = await activityServices.get(aid);
        if (responseActivity.status === 200) {
          return {matching: response.data, activity: responseActivity.data}
        }
      }
      return null
    }
);

export const fetchMatchingByIds = createAsyncThunk(
    'matching/getByIds',
    async (mids : string []) => {
        let responses = []
        for (let i=0; i<mids.length; i++) {
            let id = mids[i]
            const response = await matchingService.get(id);
            if (response.status === 200) {
                responses.push(response.data)
            } else {
                console.log("load matching failed")
                responses.push(null)
            }
        }
        return responses
    }
);

export const deleteMatchingAsync = createAsyncThunk(
  "matching/deleteMatching",
  async (mid: string) => {
    const response = await matchingService.delete(mid);
    return response.data;
  }
);


const matchingSlice = createSlice({
    name: "matching",
    initialState,
    reducers: {
    //   setActivities: (state, action: PayloadAction<Activity[]>) => {
    //     state.activities = [...action.payload];
    //   }
    setMatching: (state, action: PayloadAction<Matching>) => {
        state.matching = action.payload;
      },
    
      setMatchings: (state, action: PayloadAction<Matching []>) => {
        let tmp:MatchingDict = {}
        for (let i=0; i<action.payload.length; i++) {
            tmp[`${action.payload[i].matchingId}`] = action.payload[i] 
        }
        state.matchings = tmp;
      },
    },
    extraReducers: (builder) => {
          builder.addCase(fetchMatchingById.pending, (state) => {
            state.status.fetchMatchingById.message = "loading";
            state.status.fetchMatchingById.loading = true;
          })
          .addCase(fetchMatchingById.rejected, (state, action) => {
            state.status.fetchMatchingById.message = "failed";
            state.status.fetchMatchingById.loading = false;
          })
          .addCase(fetchMatchingById.fulfilled, (state, action) => {
            state.status.fetchMatchingById.message = "success";
            state.status.fetchMatchingById.loading = false;
            console.log(action.payload);
            state.matching = MatchingResponseAdapter(action.payload)
          })

          .addCase(fetchMatchingByActivityId.pending, (state) => {
            state.status.fetchMatchingByActivityId.message = "loading";
            state.status.fetchMatchingByActivityId.loading = true;
          })
          .addCase(fetchMatchingByActivityId.rejected, (state, action) => {
            state.status.fetchMatchingByActivityId.message = "failed";
            state.status.fetchMatchingByActivityId.loading = false;
          })
          .addCase(fetchMatchingByActivityId.fulfilled, (state, action) => {
            state.status.fetchMatchingByActivityId.message = "success";
            state.status.fetchMatchingByActivityId.loading = false;
            console.log(action.payload?.matching.data.data);
            console.log(action.payload?.activity);
            let tmp = action.payload?.matching.data.data
            tmp.ParticipantId = tmp.ParticipantId.map((e : UserResponseFromMatching)=>UserMatchingResponseAdapter(e))
            state.matching = MatchingResponseAdapter(tmp)
            state.matching.activity = action.payload?.activity
            console.log(state.matching)
            // state.matching.participants = state.matching.participants.map((e : UserResponseFromMatching)=>UserMatchingResponseAdapter(e))
          })

          .addCase(fetchMatchingByIds.pending, (state) => {
            state.status.fetchMatchingByIds.message = "loading";
            state.status.fetchMatchingByIds.loading = true;
          })
          .addCase(fetchMatchingByIds.rejected, (state, action) => {
            state.status.fetchMatchingByIds.message = "failed";
            state.status.fetchMatchingByIds.loading = false;
          })
          .addCase(fetchMatchingByIds.fulfilled, (state, action) => {
            state.status.fetchMatchingByIds.message = "success";
            state.status.fetchMatchingByIds.loading = false;
            console.log(action.payload);
            setMatchings(action.payload.map((e : MatchingResponseType) => MatchingResponseAdapter(e)))
          })
          .addCase(deleteMatchingAsync.pending, (state) => {
            state.status.deleteMatchingAsync.message = "loading";
            state.status.deleteMatchingAsync.loading = true;
          })
          .addCase(deleteMatchingAsync.rejected, (state, action) => {
            state.status.deleteMatchingAsync.message = "failed";
            state.status.deleteMatchingAsync.loading = false;
          })
          .addCase(deleteMatchingAsync.fulfilled, (state, action) => {
            state.status.deleteMatchingAsync.message = "success";
            state.status.deleteMatchingAsync.loading = false;
            console.log(action.payload);
            setMatching(initialState.matching)
          })
          ;
    }
    })
  
export const { setMatching, setMatchings } = matchingSlice.actions;

export const selectMatching = (state: RootState) =>
    state.matchingReducer.matching;

export const selectMatchings = (state: RootState) =>
    state.matchingReducer.matchings;

export const selectActivityFromMatching = (state: RootState) =>
    state.matchingReducer.matching.activity;

export const selectParticipantsFromMatching = (state: RootState) =>
    state.matchingReducer.matching.participants;

export const selectMatchingId = (state: RootState) =>
    state.matchingReducer.matching.matchingId;

export const selectfetchMatchingByActivityIdLoading = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByActivityId.loading;
export const selectfetchMatchingByActivityIdMessage = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByActivityId.message;
export const selectfetchMatchingByActivityIdError = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByActivityId.error;

export const selectfetchMatchingByIdLoading = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingById.loading;
export const selectfetchMatchingByIdMessage = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingById.message;
export const selectfetchMatchingByIdError = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingById.error;

export const selectfetchMatchingByIdsLoading = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByIds.loading;
export const selectfetchMatchingByIdsMessage = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByIds.message;
export const selectfetchMatchingByIdsError = (state: RootState) =>
  state.matchingReducer.status.fetchMatchingByIds.error;

export const selectDeleteMatchingAsyncLoading = (state: RootState) =>
  state.matchingReducer.status.deleteMatchingAsync.loading;
export const selectDeleteMatchingAsyncMessage = (state: RootState) =>
  state.matchingReducer.status.deleteMatchingAsync.message;
export const selectDeleteMatchingAsyncError = (state: RootState) =>
  state.matchingReducer.status.deleteMatchingAsync.error;

export default matchingSlice.reducer