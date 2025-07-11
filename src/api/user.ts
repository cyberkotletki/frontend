import { API_CONFIG } from "../config/api";
import { HistoryResponse } from "../types/history";
import { UserProfileResponse } from "../types/user";

import { axiosInstance, currentApiMode } from "./axios";

export const getUserProfile = async (
  streamerUuid: string,
): Promise<UserProfileResponse> => {
  try {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.USER}`, {
      params: { streamer_uuid: streamerUuid },
    });

    console.log("User profile data:", response.data);

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

    console.log(
      `Fetching history from: ${url}, page: ${page}, mode: ${currentApiMode}`,
    );

    const response = await axiosInstance.get(url, {
      params: { page },
    });

    console.log("User history data:", response.data);

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
}

export const updateUserAppearance = async (
  settings: AppearanceSettings,
): Promise<any> => {
  try {
    const response = await axiosInstance.put(
      `${API_CONFIG.ENDPOINTS.USER}`,
      settings,
    );

    console.log("Updated appearance settings:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating appearance:", error);
    throw error;
  }
};
