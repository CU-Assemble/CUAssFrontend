import axios from "axios";

export default axios.create({
    baseURL: 'https://localhost:8080',
    timeout: 2000,
    // headers: { 'X-Custom-Header': 'bezkoder' }
});