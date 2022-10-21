import axios from "axios";

const http =  axios.create({
    baseURL: 'http://localhost:3100',
    //baseURL: 'http://10.144.30.83:8000/',
    //timeout: 2000,
    // headers: { 'X-Custom-Header': 'bezkoder' }
    headers: { 
        'Content-Type': 'application/json',
      }
});

http.interceptors.request.use(
  config => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http;