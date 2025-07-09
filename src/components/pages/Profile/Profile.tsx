import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import Banner from "../../elements/Banner/Banner.tsx";

import styles from "./styles.module.scss";

import { MyButton } from "@/components/custom/MyButton.tsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import { routes } from "@/app/App.routes.ts";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleTransactionHistory = () => {
    navigate(routes.donathistory());
  };

  const handleMyWishes = () => {
    navigate(routes.wishlist("user123"));
  };

  const handleSettings = () => {
    navigate(routes.settings());
  };

  const handleWithdrawal = () => {
    navigate(routes.withdrawal());
  };

  return (
    <DefaultLayout overlayMode={"banner_compact"}>
      <div className={styles.ProfilePage}>
        <Banner mode="compact" />
        <div className={styles.content}>
          <div className={styles.profileOptions}>
            <div className={styles.option} onClick={handleMyWishes}>
              <Icon className={styles.icon} icon="solar:gift-line-duotone" />
              <div className={styles.text}>My wishes</div>
            </div>
            <div className={styles.option} onClick={handleTransactionHistory}>
              <Icon className={styles.icon} icon="solar:clock-circle-linear" />
              <div className={styles.text}>Transactions history</div>
            </div>
            <div className={styles.option}>
              <Icon
                className={styles.icon}
                icon="solar:diagram-up-bold-duotone"
              />
              <div className={styles.text}>Analytics</div>
            </div>
            <div className={styles.option} onClick={handleWithdrawal}>
              <Icon
                className={styles.icon}
                icon="solar:card-recive-line-duotone"
              />
              <div className={styles.text}>Withdrawal</div>
            </div>
            <Divider className="my-4" />
            <div className={styles.option} onClick={handleSettings}>
              <Icon className={styles.icon} icon="solar:settings-linear" />
              <div className={styles.text}>Settings</div>
            </div>
            <div className={styles.option}>
              <Icon
                className={styles.icon}
                icon="solar:paint-roller-line-duotone"
              />
              <div className={styles.text}>Appearance</div>
            </div>
          </div>
          <div className={styles.signOutBtn}>
            <MyButton className="w-full" color="danger" radius="full" size="xl">
              Sign out
            </MyButton>
          </div>
        </div>
        <div className={styles.copyBnt}>
          <Button isIconOnly radius="full" size="lg">
            <Icon className={styles.plusIcon} icon="solar:share-bold" />
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
