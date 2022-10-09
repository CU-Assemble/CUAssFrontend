export interface Activity {
  name: string, //key?
  ownerID: string,
  location: string,
  maxParticipant: number,
  activityType: string,
  date?: number,
  desc?: string,
  url?: string,
  participants?: string [],
  duration?: number,
  chatID?: string
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
 