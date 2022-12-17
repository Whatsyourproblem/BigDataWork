import axios from 'axios';
let instance = axios.create({
    //baseURL: 'http://localhost:9099',
    baseURL: 'http://43.139.123.66:9099',
})
export default instance;
