import { retrieveRawInitData } from "@telegram-apps/sdk";

import { TelegramUser } from "@/components/elements/TelegramAuth/TelegramAuth.tsx";
import { ApiError, axiosInstance, currentApiMode, ApiMode } from "@/api/axios.ts";
import { API_CONFIG } from "@/config/api.ts";
import { UserDTO } from "@/types/user.ts";

export interface RegisterUserResponse {
  streamer_uuid: string;
}

export const postVerifyTelegram = async (
  tg: TelegramUser,
): Promise<boolean> => {
  try {
    const resp = await axiosInstance.post(
      `${API_CONFIG.ENDPOINTS.WISHLIST}/telegram`,
      tg,
    );

    return resp.data;
  } catch (e: any) {
    throw new ApiError(
      "failed to verify telegram",
      e?.response?.status,
      e?.response?.data,
    );
  }
};

export const postRegisterUser = async (user: UserDTO): Promise<string> => {
  let headers: Record<string, string> = {};

  try {
    const initDataRaw = retrieveRawInitData();

    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }
  } catch {}

  try {
    const resp = await axiosInstance.post<RegisterUserResponse>(
      `${API_CONFIG.ENDPOINTS.USER}/streamer/register`,
      user,
      {
        headers,
      },
    );

    // Возвращаем только streamer_uuid из ответа
    return resp.data.streamer_uuid;
  } catch (e: any) {
    throw new ApiError(
      "failed to register user",
      e?.response?.status,
      e?.response?.data,
    );
  }
};

export const loginUsingTelegramHeaders = async (): Promise<any> => {
  let headers: Record<string, string> = {};

  try {
    const initDataRaw = retrieveRawInitData();

    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }
  } catch {
    // ...
  }

  try {
    const resp = await axiosInstance.post(
      `${API_CONFIG.ENDPOINTS.USER}/streamer/login`,
      {},
      {
        headers,
      }
    );

    return resp;
  } catch (e: any) {
    throw new ApiError(
      "failed to login",
      e?.response?.status,
      e?.response?.data,
    );
  }
};
