import { STORAGE_USER_PROFILE_KEY } from "../api/user";
import { UserProfileResponse } from "../types/user";

import { useLocalStorage } from "./useLocalStorage";

export function useUserProfile() {
  const [userProfile, setUserProfile, removeUserProfile] =
    useLocalStorage<UserProfileResponse | null>(STORAGE_USER_PROFILE_KEY, null);

  const updateUserProfile = (newProfile: UserProfileResponse | null) => {
    setUserProfile(newProfile);
  };

  const updatePartialUserProfile = (
    partialProfile: Partial<UserProfileResponse>,
  ) => {
    setUserProfile((prev) => {
      if (!prev) return partialProfile as UserProfileResponse;

      return { ...prev, ...partialProfile };
    });
  };

  return {
    userProfile,
    updateUserProfile,
    updatePartialUserProfile,
    removeUserProfile,
  };
}
