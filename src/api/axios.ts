import axios from "axios";

import { API_CONFIG } from "../config/api";

export enum ApiMode {
  REAL_BACKEND = "realBackend",
  MOCK = "mock",
  POSTMAN = "postman",
}

export const currentApiMode = ApiMode.POSTMAN;

const getBaseUrl = () => {
  switch (currentApiMode) {
    case ApiMode.REAL_BACKEND:
      return API_CONFIG.BASE_URL;
    case ApiMode.POSTMAN:
      return API_CONFIG.POSTMAN_MOCK_URL;
    case ApiMode.MOCK:
    default:
      return API_CONFIG.BASE_URL;
  }
};

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const useMocks = currentApiMode === ApiMode.MOCK;
export const usePostman = currentApiMode === ApiMode.POSTMAN;
export const useRealBackend = currentApiMode === ApiMode.REAL_BACKEND;

console.log(`API Mode: ${currentApiMode}`);
