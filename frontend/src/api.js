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

// Response interceptor
api.interceptors.response.use(
    (response) => {
      // Any status code that lies within the range of 2xx causes this function to trigger
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === 401) {
        // Handle token expiration or unauthorized access
        if(error.response.data.code === "token_not_valid"){
            localStorage.clear(); // Remove the token if it's expired or invalid
            window.location.href = '/login'; // Redirect to login page
        }
      }
      return Promise.reject(error);
    }
  );

export const routes = config.routes;

export default api;