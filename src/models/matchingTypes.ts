import { User } from "./userTypes";
import { Activity } from "./activityTypes";
import ActivityCard from "../components/Dashboard/ActivityCard";

export interface Matching {
    activityId: string,
    activity: Activity,
    matchingId: string,
    participants: User[]
}

export interface MatchingResponseType {
    ActivityId: string,
    MatchingId: string,
    ParticipantId: User[]
}

export interface MatchingDict {
    [matchingId : string] : Matching
}

