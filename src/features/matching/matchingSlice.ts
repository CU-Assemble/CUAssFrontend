import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Activity } from "../../models/activityTypes";
import { Matching, MatchingDict, MatchingResponseType } from "../../models/matchingTypes";
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

export const fetchMatchingByActivityId = createAsyncThunk(
    'matching/getByActivityId',
    async (aid : string) => {
      const response = await matchingService.getMatchingByActivity(aid);
      if (response.status === 200) {
        return response.data;
      } else {
        return null
      }
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
            console.log(action.payload);
            state.matching = MatchingResponseAdapter(action.payload)
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

export default matchingSlice.reducer