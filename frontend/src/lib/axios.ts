// API client configuration
// Install axios: npm install axios

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  baseURL: API_BASE_URL,
};
