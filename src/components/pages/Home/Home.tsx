import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";
import { useState } from "react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { routes } from "@/app/App.routes.ts";
import { loginUsingTelegramHeaders } from "@/api/auth.ts";
import { useUserProfile } from "@/hooks/useUserProfile.ts";
import { getUserProfile, getCurrentUserProfile } from "@/api/user.ts";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateUserProfile } = useUserProfile();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const resp = await loginUsingTelegramHeaders();

      const status = resp.status;

      if (status === 404) {
        addToast({
          title: "account doesn't exist title",
          description: "Toast displayed successfully",
        });
      } else if (status !== 200 && status !== 204) {
        addToast({
          title: "Oops..",
          description: "something went wrong",
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const currentUser = await getCurrentUserProfile();

        if (currentUser?.streamer_uuid) {
          localStorage.setItem('streamer_uuid', currentUser.streamer_uuid);

          const profile = await getUserProfile(currentUser.streamer_uuid);
          updateUserProfile(profile);
        }

        navigate(routes.profile());
      }
    } catch (e) {
      console.error(e);
      addToast({
        title: "Oops..",
        description: "something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout overlayMode={"none"}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.title}>Donly</h1>
          <Image alt="Donly" src="/logo.png" width={246} />
          <p className={styles.welcomeText}>
            Welcome to the safest streamer donation platform
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <MyButton
            className={`${styles.topButton}`}
            radius="full"
            size="xl"
            onClick={() => navigate(routes.register())}
          >
            Create an account
          </MyButton>
          <div className={styles.orDivider}>or</div>
          <MyButton
            className={`${styles.bottomButton}`}
            color="antivasily"
            isLoading={isLoading}
            radius="full"
            size="xl"
            onClick={handleLogin}
          >
            Log in
          </MyButton>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
