import axios from "axios"
import { ACCESS_TOKEN } from "./constants";
import config from './config.json';

const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL || config.apiBaseURL
})

api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const routes = config.routes;

export default api;