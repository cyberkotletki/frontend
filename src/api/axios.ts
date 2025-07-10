import axios from "axios";

import { API_CONFIG } from "../config/api";

export enum ApiMode {
  REAL_BACKEND = "realBackend",
  POSTMAN = "postman",
}

export const currentApiMode = ApiMode.POSTMAN;

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
});

export const useRealBackend = currentApiMode === ApiMode.REAL_BACKEND;
export const usePostman = currentApiMode === ApiMode.POSTMAN;

console.log(`API Mode: ${currentApiMode}, Base URL: ${getBaseUrl()}`);
