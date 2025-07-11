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
import { getUserProfile } from "@/api/user.ts";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateUserProfile } = useUserProfile();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const resp = await loginUsingTelegramHeaders();

      if (resp.status === 404) {
        addToast({
          title: "account doesn't exist title",
          description: "Toast displayed successfully",
        });
      } else if (resp.status != 200) {
        addToast({
          title: "Oops..",
          description: "something went wrong",
        });
      } else {
        const profile = await getUserProfile(resp);

        updateUserProfile(profile);
        navigate(routes.profile());
      }
    } catch (e) {
      console.error(e);
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
