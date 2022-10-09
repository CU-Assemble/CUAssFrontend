import http from "./axiosModule";

const url = ""; //gateway

class ActivityServices { 

    getAll() {
        console.log(`get ${url}/activities`)
        return http.get(`${url}/activities`);
    }
    
    get(id : string) {
        console.log(`get ${url}/activity/${id}`)
        return http.get(`${url}/activity/${id}`);
    }

}

export default new ActivityServices();