import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and improve error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Improve error messages for network errors
    if (!error.response) {
      // Network error (server not running, CORS, etc.)
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        const networkError = new Error('Network Error: Unable to connect to the server. Please make sure the backend server is running on http://localhost:5000');
        return Promise.reject(networkError);
      }
      // Other network issues
      const networkError = new Error(error.message || 'Network Error: Unable to reach the server');
      return Promise.reject(networkError);
    }
    
    // Server responded with error status
    const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'An error occurred';
    const customError = new Error(errorMessage);
    return Promise.reject(customError);
  }
);