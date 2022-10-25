import http from "./axiosModule";
import { NewActivity } from "../models/activityTypes";

// const url = "https://6343af8fb9ab4243cad57d7d.mockapi.io"; //gateway
const url = ""

class ActivityServices { 

    getAll() {
        const data = http.get(`${url}/activitys`);
        console.log(data)
        return data;
    }
    
    get(id : string) {
        //const data = http.get(`${url}/activitys/${id}`);
        const data = http.get(`/activity/${id}`);
        return data;
    }

    getMyActivities(sid: string) {
        const data = http.get(`${url}/getActivitiesByParticipant/${sid}`);
        return data;
    }

    create(data: NewActivity) {
        return http.post('/activity', JSON.stringify(data))
    }

    edit(data: NewActivity) {
        return http.put(`/activity/${data.ActivityId}`, JSON.stringify(data))
    }

    join(aid: string, sid: string) {
        return http.post(
            `/attendActivity/${aid}`,
            JSON.stringify({
                userId: sid
            })
        )
    }

    leave(aid: string, sid: string) {
        return http.post(
            `/leaveActivity/${aid}`,
            JSON.stringify({
                userId: sid
            })
        )
    }

    // getActivitiesByParticipant(pid: string) {
    //     return http.get(
    //         `/getActivitiesByParticipant/${pid}`
    //     )
    // }

}

export default new ActivityServices();