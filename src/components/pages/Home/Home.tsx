import { Image } from "@heroui/image";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import { MyButton } from "@/components/custom/MyButton.tsx";

const HomePage = () => {
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
          <MyButton className={`${styles.topButton}`} radius="full" size="xl">
            Start donating
          </MyButton>
          <div className={styles.orDivider}>or</div>
          <MyButton
            className={`${styles.bottomButton}`}
            color="antivasily"
            radius="full"
            size="xl"
          >
            Become a streamer
          </MyButton>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
