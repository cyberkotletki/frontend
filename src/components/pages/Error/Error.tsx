import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";

const ErrorPage = () => {
  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.title}>404</h1>
          <video autoPlay loop muted playsInline className={styles.errorVideo}>
            <source src="/bun_minigun.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className={styles.welcomeText}>
            We tap something wrong and it broke. Sad :(
          </p>
        </div>
        <h1 className={styles.title}>./OKAK</h1>
      </div>
    </DefaultLayout>
  );
};

export default ErrorPage;
