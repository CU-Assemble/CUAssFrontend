export interface Activity {
  id: string,
  name: string, //key?
  ownerID: string,
  location: string,
  maxParticipant: number,
  activityType: string [],
  date?: string,
  desc?: string,
  url?: string,
  participants?: string [],
  duration?: number,
  chatID?: string,
}

export interface ActivityResponseType {
  ActivityType: string [],
  Participant: string [],
  Name: string,
  Description: string,
  ImageProfile: string,
  OwnerId: string,
  Location: string,
  MaxParticipant: Number,
  Date: string,
  Duration: Number,
  ChatId: string,
  ActivityId: string
}

export interface NewActivity {
  ActivityId?: string,
  Name?: string,
  Description?: string,
  ImageProfile?: string,
  ActivityType?: string [],
  Location?: string,
  MaxParticipant?: number,
  Date?: string,
  Duration?: number,
  OwnerId?: string,
}

// activityName
// description
// imageProfile
// activityType
// ownerId
// location
// maxParticipant
// participant(list)
// date
// duration
// chatId
 