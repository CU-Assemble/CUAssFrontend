import http from "./axiosModule";

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

}

export default new ActivityServices();