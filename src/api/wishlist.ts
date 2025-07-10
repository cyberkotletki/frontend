import { axiosInstance } from './axios';
import { CreateWishRequest, CreateWishResponse, WishlistResponse } from '../types/wishlist';
import { API_CONFIG } from '../config/api';

export const getWishlist = async (userId: string): Promise<WishlistResponse> => {
  try {
    console.log('Requesting wishlist for user:', userId);
    console.log('Request URL:', `${axiosInstance.defaults.baseURL}${API_CONFIG.ENDPOINTS.WISHLIST}?userId=${userId}`);

    const response = await axiosInstance.get(
      API_CONFIG.ENDPOINTS.WISHLIST,
      {
        params: { userId }
      }
    );

    console.log('Wishlist response data:', response.data);

    if (!response.data || !response.data.wishes) {
      console.error('Invalid response format, wishes array not found');
      return { wishes: [] };
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { wishes: [] };
  }
};

export const getStreamerWishlist = async (streamerUuid: string): Promise<WishlistResponse> => {
  try {
    const response = await axiosInstance.get(
      API_CONFIG.ENDPOINTS.WISHLIST,
      {
        params: { streamer_uuid: streamerUuid }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching streamer wishlist:', error);
    return { wishes: [] };
  }
};

export const createWish = async (wishData: CreateWishRequest): Promise<CreateWishResponse> => {
  try {
    const response = await axiosInstance.post(
      API_CONFIG.ENDPOINTS.WISHLIST,
      wishData
    );

    return response.data;
  } catch (error) {
    console.error('Error creating wish:', error);
    throw error;
  }
};

export const getWishDetails = async (wishId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_CONFIG.ENDPOINTS.WISHLIST}/${wishId}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching wish details:', error);
    return null;
  }
};
