import axios from "axios";

const http =  axios.create({
    //baseURL: 'http://localhost:3100',
    baseURL: 'http://ec2-3-86-94-154.compute-1.amazonaws.com:8000/',
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