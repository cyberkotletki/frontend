import {
  CreateWishRequest,
  CreateWishResponse,
  WishlistResponse,
} from "../types/wishlist";
import { API_CONFIG } from "../config/api";

import { axiosInstance } from "./axios";

export interface EditWishRequest {
  wish_uuid: string;
  image?: string;
  is_priority?: boolean;
}

export const getWishlist = async (
  streamerUuid: string,
): Promise<WishlistResponse> => {
  try {
    const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.WISHLIST, {
      params: { streamer_uuid: streamerUuid },
    });

    if (!response.data || !response.data.wishes) {
      console.error("Invalid response format, wishes array not found");

      return { wishes: [] };
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);

    return { wishes: [] };
  }
};

export const getStreamerWishlist = async (
  streamerUuid: string,
): Promise<WishlistResponse> => {
  try {
    const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.WISHLIST, {
      params: { streamer_uuid: streamerUuid },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching streamer wishlist:", error);

    return { wishes: [] };
  }
};

export const createWish = async (
  wishData: CreateWishRequest,
): Promise<CreateWishResponse> => {
  try {
    const response = await axiosInstance.post(
      API_CONFIG.ENDPOINTS.WISHLIST,
      wishData,
    );

    return response.data;
  } catch (error) {
    console.error("Error creating wish:", error);
    throw error;
  }
};

export const editWish = async (editData: EditWishRequest): Promise<void> => {
  try {
    await axiosInstance.put(API_CONFIG.ENDPOINTS.WISHLIST, editData);
  } catch (error) {
    console.error("Error editing wish:", error);
    throw error;
  }
};

export const getWishFromWishlist = async (
  wishlistId: string,
  wishId: string,
): Promise<any> => {
  try {
    console.log("Requesting wish from wishlist:", { wishlistId, wishId });

    const wishlistResponse = await getWishlist(wishlistId);

    const wish = wishlistResponse.wishes.find((w) => w.uuid === wishId);

    if (!wish) {
      throw new Error(
        `Wish with id ${wishId} not found in wishlist ${wishlistId}`,
      );
    }

    return wish;
  } catch (error) {
    console.error("Error fetching wish from wishlist:", error);
    throw error;
  }
};
