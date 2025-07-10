import { Button } from "@heroui/react";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from "./styles.module.scss";

import { routes } from "@/app/App.routes.ts";
import { getUserProfile } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getUserProfile as getUserProfileSelector,
  setUserProfile,
} from "@/stores/userSlice";
import { UserTopics } from "@/types/user";

const BackIcon = () => {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(getUserProfileSelector);

  const isStreamer = !!userProfile;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const streamerUuid = "c35281bd-4740-48e4-b4b3-af05bad16383";
        const profileData = await getUserProfile(streamerUuid);

        dispatch(setUserProfile(profileData));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAvatarClick = () => {
    navigate(routes.profile());
  };

  const formatBalance = (balance: number): string => {
    return balance.toFixed(2);
  };

  const getTopicEmoji = (topicName: string): string => {
    const topic = UserTopics.find((t) => t.text === topicName);

    return topic ? topic.emoji : "🌍";
  };

  return (
    <div className={styles.header}>
      <Button
        className={styles.backButton}
        startContent={<BackIcon />}
        onClick={handleBackClick}
      />

      <div className={styles.profileInfo}>
        {isStreamer && userProfile && (
          <div className={styles.balance}>
            {formatBalance(userProfile.balance)} POL
          </div>
        )}

        <div className={styles.avatar} onClick={handleAvatarClick}>
          {userProfile ? (
            <Image
              alt={userProfile.name}
              className={styles.avatarImage}
              height={40}
              src={userProfile.avatar}
              width={40}
            />
          ) : (
            <Image
              alt="User Avatar"
              className={styles.avatarImage}
              height={40}
              src="/logo.png"
              width={40}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
