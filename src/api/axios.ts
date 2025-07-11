import axios from "axios";

import { API_CONFIG } from "../config/api";

export enum ApiMode {
  REAL_BACKEND = "backend",
  POSTMAN = "postman",
}

export const currentApiMode = import.meta.env.VITE_API_MODE;

const getBaseUrl = () => {
  switch (currentApiMode) {
    case ApiMode.REAL_BACKEND:
      return API_CONFIG.BASE_URL;
    case ApiMode.POSTMAN:
    default:
      return API_CONFIG.POSTMAN_MOCK_URL;
  }
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: currentApiMode === ApiMode.REAL_BACKEND,
});

axiosInstance.interceptors.request.use((config) => {
  console.log('Request:', config.method?.toUpperCase(), config.url);

  if (currentApiMode === ApiMode.POSTMAN) {
    const token = localStorage.getItem('jwt_token');
    console.log('JWT Token from localStorage:', token ? 'EXISTS' : 'NOT FOUND');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added Authorization header for Postman mode');
    }
  } else {
    console.log('Using withCredentials for real backend - cookies will be sent automatically');
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized request detected');
    }
    console.error('Request failed:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export const useRealBackend = currentApiMode === ApiMode.REAL_BACKEND;
export const usePostman = currentApiMode === ApiMode.POSTMAN;

console.log(`API Mode: ${currentApiMode}, Base URL: ${getBaseUrl()}`);

export class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
