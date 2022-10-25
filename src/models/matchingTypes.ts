import { User } from "./userTypes";
import { Activity } from "./activityTypes";
import ActivityCard from "../components/Dashboard/ActivityCard";

export interface Matching {
    activity: Activity,
    matchingId: string,
    participants: User[]
}

export interface MatchingResponseType {
    Activity: Activity,
    MatchingId: string,
    ParticipantId: User[]
}

export interface MatchingDict {
    [matchingId : string] : Matching
}

