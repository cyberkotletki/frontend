import { Button } from "@heroui/react";
import styles from './styles.module.scss';
import { Image } from "@heroui/image";

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.content}>
                <div className={styles.description}>
                    <h1 className={styles.title}>Donly</h1>
                    <Image
                        alt="Donly"
                        src="/logo.png"
                        width={246}
                    />
                    <p className={styles.welcomeText}>
                        Welcome to the safest streamer donation platform
                    </p>
                </div>

                <div className={styles.buttonContainer}>
                    <Button radius="none" className={`${styles.topButton} rounded-none`}>
                        Start donating
                    </Button>
                    <div className={styles.orDivider}>or</div>
                    <Button radius="lg" className={`${styles.bottomButton} rounded-lg`}>
                        Become a streamer
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;