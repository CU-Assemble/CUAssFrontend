import http from "./axiosModule";

const url = "https://6343af8fb9ab4243cad57d7d.mockapi.io"; //gateway

class ActivityServices { 

    getAll() {
        const data = http.get(`${url}/activitys`);
        return data;
    }
    
    get(id : string) {
        const data = http.get(`${url}/activitys/${id}`);
        return data;
    }

}

export default new ActivityServices();