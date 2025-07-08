import styles from './styles.module.scss';
import {Button} from "@heroui/react";
import { Image } from "@heroui/image";

const BackIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
        </svg>
    )
}

const Header = () => {
    const isStreamer = false;

    return (
        <div className={styles.header}>
            <Button startContent={<BackIcon/>} className={styles.backButton}>
            </Button>

            <div className={styles.profileInfo}>
                {isStreamer && (
                    <div className={styles.count}>
                        300$
                    </div>
                )}
                <div className={styles.avatar}>
                    <Image
                        src="/logo.png"
                        alt="User Avatar"
                        width={40}
                        height={40}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;