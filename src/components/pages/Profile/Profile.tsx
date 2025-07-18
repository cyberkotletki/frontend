import { Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "@reown/appkit/react";

import Banner from "../../elements/Banner/Banner.tsx";

import styles from "./styles.module.scss";

import { MyButton } from "@/components/custom/MyButton.tsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import { routes } from "@/app/App.routes.ts";
import { logout } from "@/stores/userSlice.tsx";
import { useUserProfile } from "@/hooks/useUserProfile.ts";
import { getCurrentUserProfile } from "@/api/user.ts";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { userProfile } = useUserProfile();

  const handleDisconnect = async () => {
    await disconnect();
    localStorage.removeItem("registrationData");
    localStorage.setItem("logout", "true");
    logout();
    navigate(routes.home());
  };

  const handleTransactionHistory = () => {
    navigate(routes.donathistory());
  };

  const handleMyWishes = async () => {
    let streamerUuidFromStorage = localStorage.getItem('streamer_uuid');

    if (!streamerUuidFromStorage) {
      try {
        const currentUser = await getCurrentUserProfile();

        if (currentUser?.streamer_uuid) {
          localStorage.setItem('streamer_uuid', currentUser.streamer_uuid);
          streamerUuidFromStorage = currentUser.streamer_uuid;
        }
      } catch (error) {
        console.error("Error fetching /me:", error);
      }
    }

    const streamerUuid = streamerUuidFromStorage || userProfile?.uuid;

    if (streamerUuid) {
      navigate(routes.wishlist(streamerUuid));
    } else {
      console.error("Streamer UUID not available");
    }
  };

  const handleSettings = () => {
    navigate(routes.settings());
  };

  const handleWithdrawal = () => {
    navigate(routes.withdrawal());
  };

  return (
    <DefaultLayout overlayMode={"banner_compact"}>
      {userProfile?.background_color && (
        <img
          alt={"/profile_image"}
          className={"min-w-screen min-h-screen absolute"}
        />
      )}
      {userProfile?.background_image && (
        <img
          alt={"/profile_image"}
          className={"min-w-screen min-h-screen absolute"}
        />
      )}

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
          </div>
          <div className={styles.signOutBtn}>
            <MyButton
              className={`w-full ${
                userProfile?.button_text_color
                  ? `text-[${userProfile.button_text_color}]`
                  : ""
              } ${
                userProfile?.button_background_color
                  ? `bg-[${userProfile.button_background_color}]`
                  : ""
              }`}
              color="danger"
              radius="full"
              size="xl"
              onClick={handleDisconnect}
            >
              Sign out
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
