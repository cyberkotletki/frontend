import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import DefaultLayout from "@/layouts/DefaultLayout";

import styles from "./styles.module.scss";

const HomePage = () => {
  return (
    <DefaultLayout>
      <div className={styles.homePage}>
        <div className={styles.content}>
          <div className={styles.description}>
            <h1 className={styles.title}>Donly</h1>
            <Image alt="Donly" src="/logo.png" width={246} />
            <p className={styles.welcomeText}>
              Welcome to the safest streamer donation platform
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <Button className={`${styles.topButton}`} size="lg" radius="full">
              Start donating
            </Button>
            <div className={styles.orDivider}>or</div>
            <Button className={`${styles.bottomButton}`} size="lg" radius="full">
              Become a streamer
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
