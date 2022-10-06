import http from "./axiosModule";

export default class ActivityServices {
    getAll() {
        return http.get("/activities");
    }
    
    get(id : number) {
        return http.get("/activity/:id");
    }
}