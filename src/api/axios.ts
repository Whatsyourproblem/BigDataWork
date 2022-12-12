import axios from 'axios';
let instance = axios.create({
    baseURL: 'http://localhost:8081',
})
export default instance;
