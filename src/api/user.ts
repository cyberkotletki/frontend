import { API_CONFIG } from "../config/api";
import { HistoryResponse } from "../types/history";
import { UserProfileResponse } from "../types/user";

import { axiosInstance, currentApiMode } from "./axios";

export interface UserMeResponse {
  streamer_uuid: string;
}

export const getCurrentUserProfile =
  async (): Promise<UserMeResponse | null> => {
    try {
      const response = await axiosInstance.get(
        `${API_CONFIG.ENDPOINTS.USER}/me`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching current user profile:", error);

      return null;
    }
  };

export const getUserProfile = async (
  streamerUuid?: string,
): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.USER}`, {
      params: streamerUuid ? { streamer_uuid: streamerUuid } : {},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserHistory = async (
  page: number = 1,
): Promise<HistoryResponse> => {
  try {
    const url = `${API_CONFIG.ENDPOINTS.USER}/history`;

    const response = await axiosInstance.get(url, {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
};

export interface AppearanceSettings {
  banner?: number;
  name?: string;
  background_color?: string;
  background_image?: number;
  button_background_color?: string;
  button_text_color?: string;
  avatar?: number;
  topics?: string[];
}

export const updateUserAppearance = async (
  settings: AppearanceSettings,
): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.put(
      `${API_CONFIG.ENDPOINTS.USER}`,
      settings,
    );

    return response.data;
  } catch (error) {
    console.error("Error updating appearance:", error);
    throw error;
  }
};

export const STORAGE_USER_PROFILE_KEY = "user_profile";
