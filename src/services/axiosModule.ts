import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3100',
    //timeout: 2000,
    // headers: { 'X-Custom-Header': 'bezkoder' }
    headers: { 
        'Content-Type': 'application/json'
      }
});