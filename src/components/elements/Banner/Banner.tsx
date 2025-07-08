import Header from "@/components/elements/Header/Header.tsx";
import styles from "./styles.module.scss";
import { Image } from "@heroui/image";
import {Avatar} from "@heroui/react";

const Banner = () => {
    return (
        <div className={styles.bannerContainer}>
            <Header/>
            <div className={styles.profileInfo}>
                <div className={styles.banner}>
                    <Image
                        alt="Banner"
                        src="/example.png"
                    />
                </div>

                <div className={styles.user}>

                    <div className={styles.avatar}>
                        <Avatar
                            className="w-20 h-20 text-large"
                            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        />

                    </div>
                    <div className={styles.name}>
                        Mr Bublik
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;