import { API_CONFIG } from "../config/api";
import { UserProfileResponse } from "../types/user";

import { axiosInstance } from "./axios";

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
