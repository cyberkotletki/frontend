import { Button, cn } from "@heroui/react";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { routes } from "@/app/App.routes.ts";
import { getUserProfile } from "@/api/user";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getUserProfile as getUserProfileSelector,
  setUserProfile,
} from "@/stores/userSlice";
import { UserTopics } from "@/types/user";
import { useGetContract } from "@/hooks/useWallet.ts";
import {useAppKitAccount} from "@reown/appkit/react";
import toPOL from "@/funcs/toPOL.ts";
import Decimal from "decimal.js";

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
  const [balance, setBalance] = useState<Decimal>(new Decimal(0));
  const {address} = useAppKitAccount();
  const { getContract } = useGetContract();

  useEffect(() => {
    async function fetchBalance() {
      const contract = await getContract()
      const balance = (await contract.users(address)).currentBalance;

      setBalance(toPOL(balance));
    }
    fetchBalance();
  }, [getContract]);

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
          <span className={cn(styles.balance, "font-bold")}>
            {balance.toString()} POL
          </span>
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
