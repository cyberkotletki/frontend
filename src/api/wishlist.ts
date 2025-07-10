import { axiosInstance, useMocks, usePostman } from './axios';
import { CreateWishRequest, CreateWishResponse, WishlistResponse } from '../types/wishlist';
import { API_CONFIG } from '../config/api';
import { mockWishlistData } from '../types/wishlist';

export const getWishlist = async (userId: string): Promise<WishlistResponse> => {
  if (useMocks) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWishlistData), 500);
    });
  }

  try {
    console.log('Requesting wishlist for user:', userId);
    console.log('API URL:', axiosInstance.defaults.baseURL);

    const response = await axiosInstance.get(
      `${API_CONFIG.ENDPOINTS.WISHLIST}`,
      {
        params: { userId }
      }
    );

    console.log('Raw API response:', response);
    console.log('API response data:', response.data);

    let wishlistData: WishlistResponse;

    if (usePostman && response.data) {
      if (response.data.wishes) {
        wishlistData = response.data;
      } else {
        const rawData = response.data;
        console.log('Trying to parse data:', rawData);

        if (typeof rawData === 'string') {
          try {
            wishlistData = JSON.parse(rawData);
          } catch (err) {
            console.error('Failed to parse response as JSON:', err);
            throw new Error('Invalid response format');
          }
        } else if (rawData && typeof rawData === 'object') {
          wishlistData = { wishes: Array.isArray(rawData) ? rawData : [] };
        } else {
          console.error('Unexpected response format');
          throw new Error('Invalid response format');
        }
      }
    } else {
      wishlistData = response.data;
    }

    console.log('Processed wishlist data:', wishlistData);

    if (!wishlistData.wishes || !Array.isArray(wishlistData.wishes)) {
      console.error('Response does not contain valid wishes array');
      wishlistData.wishes = [];
    }

    return wishlistData;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const getStreamerWishlist = async (
  streamerUuid: string,
): Promise<WishlistResponse> => {
  if (useMocks) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWishlistData), 500);
    });
  }

  const response = await axiosInstance.get<WishlistResponse>(
    `${API_CONFIG.ENDPOINTS.WISHLIST}`,
    {
      params: { streamer_uuid: streamerUuid },
    },
  );

  return response.data;
};

export const createWish = async (
  wishData: CreateWishRequest,
): Promise<CreateWishResponse> => {
  if (useMocks) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          wish_uuid: `0197ec91-c0ee-729e-a85f-${Date.now().toString(16)}`,
        });
      }, 700);
    });
  }

  const response = await axiosInstance.post<CreateWishResponse>(
    `${API_CONFIG.ENDPOINTS.WISHLIST}`,
    wishData,
  );

  return response.data;
};

export const getWishDetails = async (wishId: string) => {
  if (useMocks) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const wish = mockWishlistData.wishes.find((w) => w.uuid === wishId);

        resolve(wish || null);
      }, 300);
    });
  }

  const response = await axiosInstance.get(
    `${API_CONFIG.ENDPOINTS.WISHLIST}/${wishId}`,
  );

  return response.data;
};
