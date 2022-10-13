import http from "./axiosModule";
import { LoginInput, RegisterInput } from '../models/userTypes';

class UserServices {
    getAll() {
        return http.get("/users");
    }

    getById(studentId: string) {
        return http.get(`/user/${studentId}`);
    }

    login(data: LoginInput) {
        return http.post("/login", JSON.stringify(data));
    }

    register(data: RegisterInput) {
        return http.post("/user", JSON.stringify(data));
    }

    editProfile(data: RegisterInput) {
        return http.put(`/user/${data.studentId}`, JSON.stringify(data))
    }
}

export default new UserServices();
