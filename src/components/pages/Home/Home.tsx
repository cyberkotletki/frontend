import { Image } from "@heroui/image";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { routes } from "@/app/App.routes.ts";
import navigateTo from "@/funcs/navigateTo.ts";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(routes.register());
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
            onClick={() => navigateTo("/register")}
          >
            Start donating
          </MyButton>
          <div className={styles.orDivider}>or</div>
          <MyButton
            className={`${styles.bottomButton}`}
            color="antivasily"
            radius="full"
            size="xl"
            onClick={handleRegisterClick}
          >
            Become a streamer
          </MyButton>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
