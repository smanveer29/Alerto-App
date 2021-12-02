import axios from 'axios';
import { api } from './Api';
export default instance = axios.create({
    baseURL: api+'api',
});