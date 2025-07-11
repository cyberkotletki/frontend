import { Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.scss";

import { useUserProfile } from "@/hooks/useUserProfile.ts";
import { UserProfileResponse } from "@/types/user.ts";
import { getUserProfile } from "@/api/user.ts";

interface BannerProps {
  mode?: "compact" | "full";
  showName?: boolean;
}

const Banner = ({ mode = "compact", showName = true }: BannerProps) => {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("uuid");

  const { userProfile: localProfile } = useUserProfile();

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uuid) {
        setProfile(localProfile);
      } else {
        try {
          const fetched = await getUserProfile(uuid);

          setProfile(fetched);
        } catch (e) {
          console.error("Failed to fetch profile:", e);
        }
      }
    };

    fetchProfile();
  }, [uuid, localProfile]);

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.profileInfo}>
        <div className={`${styles.banner} ${styles[mode]}`}>
          <img
            alt="Banner"
            className={styles.bannerImage}
            src={profile?.banner || "/example.png"}
          />
        </div>
        <div className={`${styles.user} ${styles[`user_${mode}`]}`}>
          <div className={styles.avatar}>
            <Avatar
              className={
                mode === "full"
                  ? "w-24 h-24 text-large"
                  : "w-20 h-20 text-large"
              }
              src={profile?.avatar || "/example.png"}
            />
          </div>
          {showName && (
            <div className={styles.name}>{profile?.name || "Anonymous"}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
