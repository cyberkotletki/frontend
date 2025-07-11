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
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useRealBackend = currentApiMode === ApiMode.REAL_BACKEND;
export const usePostman = currentApiMode === ApiMode.POSTMAN;


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
