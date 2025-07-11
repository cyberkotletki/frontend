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
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: currentApiMode === ApiMode.REAL_BACKEND,
});

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
