// src/api/axiosConfig.js

import axios from 'axios';
import { getToken } from '../Services/AuthService';

// Create a single, centralized axios instance
const apiClient = axios.create({
    // Get the base URL from the environment variable
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Setup axios interceptors for JWT token handling
export const setupAxiosInterceptors = () => {
    // Request interceptor to add JWT token to every request
    apiClient.interceptors.request.use(
        config => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    // Response interceptor to handle errors
    apiClient.interceptors.response.use(
        response => response,
        error => {
            // Handle 401 Unauthorized errors
            if (error.response?.status === 401) {
                console.warn('⚠️ Unauthorized - clearing token and redirecting to login');
                localStorage.removeItem('jwtToken');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

export default apiClient;