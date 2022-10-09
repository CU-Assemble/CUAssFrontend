import { Activity } from "../models/activityTypes";

const date = new Date();

const mockUpAct : Activity = {
    id: "activity0",
    name: "mockupAct",
    date: Date.now(),
    desc: "mockupDESC",
    url: "https://i.pinimg.com/originals/f7/c2/77/f7c277d2794b25f98970d96d07e45048.jpg",
    ownerID: 'id_0',
    location: 'location_0',
    maxParticipant: 5,
    activityType: 'type_0'
}

export default mockUpAct;