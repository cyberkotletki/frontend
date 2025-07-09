import { Avatar } from "@heroui/react";

import styles from "./styles.module.scss";

interface BannerProps {
  mode?: "compact" | "full";
}

const Banner = ({ mode = "compact" }: BannerProps) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.profileInfo}>
        <div className={`${styles.banner} ${styles[mode]}`}>
          <img alt="Banner" className={styles.bannerImage} src="/example.png" />
        </div>
        <div className={`${styles.user} ${styles[`user_${mode}`]}`}>
          <div className={styles.avatar}>
            <Avatar
              className={
                mode === "full"
                  ? "w-24 h-24 text-large"
                  : "w-20 h-20 text-large"
              }
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            />
          </div>
          <div className={styles.name}>Mr Bublik</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
