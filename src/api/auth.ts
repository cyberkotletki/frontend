import { TelegramUser } from "@/components/elements/TelegramAuth/TelegramAuth.tsx";
import { ApiError, axiosInstance } from "@/api/axios.ts";
import { API_CONFIG } from "@/config/api.ts";
import { UserDTO } from "@/types/user.ts";

export const postVerifyTelegram = async (
  tg: TelegramUser,
): Promise<boolean> => {
  try {
    const resp = await axiosInstance.post(
      `${API_CONFIG.ENDPOINTS}/streamer/telegram`,
      tg,
    );

    return resp.data;
  } catch (e: any) {
    throw new ApiError(
      "failed to register user",
      e?.response?.status,
      e?.response?.data,
    );
  }
};

export const postRegisterUser = async (user: UserDTO): Promise<string> => {
  try {
    const resp = await axiosInstance.post(
      `${API_CONFIG.ENDPOINTS.USER}/streamer/register`,
      user,
    );

    return resp.data;
  } catch (e: any) {
    throw new ApiError(
      "failed to register user",
      e?.response?.status,
      e?.response?.data,
    );
  }
};
