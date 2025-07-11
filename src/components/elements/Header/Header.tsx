import { Button, cn } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Decimal from "decimal.js";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

import { routes } from "@/app/App.routes.ts";
import { useAppSelector } from "@/stores/hooks";
import { getUserProfile as getUserProfileSelector } from "@/stores/userSlice";


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
  const userProfile = useAppSelector(getUserProfileSelector);
  const [balance] = useState<Decimal>(new Decimal(0));

  /*
  useEffect(() => {
    async function fetchBalance() {
      const contract = await getContract();
      const balance = (await contract.users(address)).currentBalance;

      setBalance(toPOL(balance));
    }
    fetchBalance();
  }, []);
*/
  const isStreamer = !!userProfile;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAvatarClick = () => {
    if (userProfile) {
      navigate(routes.profile());
    } else {
      navigate(routes.home());
    }
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

        {userProfile && (
          <div className={styles.avatar} onClick={handleAvatarClick}>
            <Icon
              className={styles.avatarImage}
              height={40}
              icon="solar:user-linear"
              width={40}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
