import axios from 'axios';
export default instance = axios.create({
    baseURL: 'http://192.168.1.5:8000/api',
});