import { Button } from "@heroui/react";
import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import { routes } from "@/app/App.routes.ts";

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
  const isStreamer = false;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAvatarClick = () => {
    navigate(routes.profile());
  };

  return (
    <div className={styles.header}>
      <Button
        className={styles.backButton}
        startContent={<BackIcon />}
        onClick={handleBackClick}
      />

      <div className={styles.profileInfo}>
        {isStreamer && <div className={styles.count}>300$</div>}
        <div className={styles.avatar} onClick={handleAvatarClick}>
          <Image alt="User Avatar" height={40} src="/logo.png" width={40} />
        </div>
      </div>
    </div>
  );
};

export default Header;
