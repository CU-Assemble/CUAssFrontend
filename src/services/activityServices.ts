import http from "./axiosModule";
import { NewActivity } from "../models/activityTypes";

const url = "https://6343af8fb9ab4243cad57d7d.mockapi.io"; //gateway
// const url = "http://10.144.30.83:8000/"

class ActivityServices { 

    getAll() {
        const data = http.get(`${url}/activitys`);
        return data;
    }
    
    get(id : string) {
        const data = http.get(`${url}/activitys/${id}`);
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

    join(aid: string) {
        return http.post(
            '/attendActivity',
            JSON.stringify({
                aid: aid
            })
        )
    }

    leave(aid: string) {
        return http.post(
            '/leaveActivity',
            JSON.stringify({
                aid: aid
            })
        )
    }

}

export default new ActivityServices();