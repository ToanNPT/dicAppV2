import axios from "axios";

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
    baseURL: !isServer
        ? 'http://localhost:8080/api' // Use the full API URL on the server side
        : '/api',  // Use relative path for client-side (to utilize the proxy)
    withCredentials: true,  // Ensure cookies are included
});

export default axiosInstance;