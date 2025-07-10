import { API_CONFIG } from "../config/api";

import { axiosInstance } from "./axios";

export type ImageType = "avatar" | "banner" | "background" | "wish";

export interface UploadImageResponse {
  id: number;
}

export const uploadImage = async (
  file: File,
  type: ImageType,
): Promise<number> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);

  const response = await axiosInstance.post<UploadImageResponse>(
    `${API_CONFIG.ENDPOINTS.UPLOAD_IMAGE}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.id;
};

export const getImageUrl = (imageId: number): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATIC}/${imageId}`;
};
