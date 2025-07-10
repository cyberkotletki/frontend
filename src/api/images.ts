import { API_CONFIG } from "../config/api";

import { axiosInstance, useMocks } from "./axios";

export type ImageType = "avatar" | "banner" | "background" | "wish";

export interface UploadImageResponse {
  id: number;
}

export const uploadImage = async (
  file: File,
  type: ImageType,
): Promise<number> => {
  if (useMocks) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const img = new Image();

        img.onload = function () {
          if (type === "avatar" && (img.width < 128 || img.height < 128)) {
            reject({
              error:
                "Изображение типа avatar должно быть минимум 128 на 128 пикселей",
            });
          } else {
            const imageId = Math.floor(Math.random() * 1000) + 1;

            resolve(imageId);
          }
        };
        img.onerror = function () {
          reject({ error: "Невозможно загрузить изображение" });
        };

        const objectUrl = URL.createObjectURL(file);

        img.src = objectUrl;
      }, 700);
    });
  }

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
