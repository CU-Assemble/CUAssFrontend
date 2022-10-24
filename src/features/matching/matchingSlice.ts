import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Activity } from "../../models/activityTypes";
import { Matching, MatchingResponseType } from "../../models/matchingTypes";
import activityServices from "../../services/activityServices";
import matchingService from "../../services/matchingService";

export interface MatchingState {
    matching: Matching,
    status: {
        fetchMatchingById:{
            message: string;
            loading: boolean;
            error: string;
        }
    }
}

const initialState: MatchingState = {
    matching :{
        activity: {
            id: "",
            name: "",
            ownerID: "",
            location: "",
            maxParticipant: 0,
            activityType: [""]
        },
        matchingId: "",
        participants: []
    },
    status: {
        fetchMatchingById: {
            message: "idle",
            loading: false,
            error: "",
        }
    }
}

const MatchingResponseAdapter = (e: MatchingResponseType) => <Matching>{
    activity: e.Activity,
    matchingId: e.MatchingId,
    participants: e.ParticipantId
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
          ;
    }
    })
  
export const { setMatching } = matchingSlice.actions;

export const selectMatching = (state: RootState) =>
    state.matchingReducer.matching;

export const selectActivityFromMatching = (state: RootState) =>
    state.matchingReducer.matching.activity;

export const selectParticipantsFromMatching = (state: RootState) =>
    state.matchingReducer.matching.participants;

export const selectMatchingId = (state: RootState) =>
    state.matchingReducer.matching.matchingId;


export default matchingSlice.reducer