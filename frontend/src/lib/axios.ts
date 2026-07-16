// API client configuration
// Install axios: npm install axios
import { getApiBaseUrl } from './apiBase';

const API_BASE_URL = getApiBaseUrl();

export const api = {
  baseURL: API_BASE_URL,
};
