import { ReactNode, useEffect, useState, useRef } from "react";

import { useAppDispatch } from "@/stores/hooks";
import { getCurrentUserProfile, getUserProfile } from "@/api/user";
import { setUserProfile } from "@/stores/userSlice";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfileResponse } from "@/types/user";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch = useAppDispatch();
  const { userProfile, updateUserProfile } = useUserProfile();
  const [, setIsLoading] = useState(true);
  const fetchInProgressRef = useRef(false);

  const applyUserAppearanceSettings = (profile: UserProfileResponse) => {
    if (profile.background_color) {
      document.documentElement.style.setProperty(
        "--background-color",
        profile.background_color,
      );
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (fetchInProgressRef.current) {
        return;
      }

      try {
        fetchInProgressRef.current = true;
        setIsLoading(true);

        const currentUserInfo = await getCurrentUserProfile();

        if (currentUserInfo && currentUserInfo.streamer_uuid) {
          const fullProfile = await getUserProfile(
            currentUserInfo.streamer_uuid,
          );

          if (fullProfile) {
            const profileWithUuid = {
              ...fullProfile,
              uuid: currentUserInfo.streamer_uuid,
            };

            dispatch(setUserProfile(profileWithUuid));

            updateUserProfile(profileWithUuid);

            applyUserAppearanceSettings(profileWithUuid);
          }
        } else if (userProfile) {
          dispatch(setUserProfile(userProfile));
          applyUserAppearanceSettings(userProfile);
        }
      } catch (error) {
        // E...кк
      } finally {
        setIsLoading(false);
        fetchInProgressRef.current = false;
      }
    };

    fetchUserProfile();
  }, []);

  return <>{children}</>;
};

export default UserProvider;
