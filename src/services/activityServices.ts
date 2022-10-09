import http from "./axiosModule";

const url = "http://localhost:8080";

export default class ActivityServices {
    getAll() {
        console.log(`get ${url}/activities`)
        // return http.get(`${url}/activities`);
    }
    
    get(id : string) {
        console.log(`get ${url}/activity/${id}`)
        // return http.get(`${url}/activity/${id}`);
    }


}