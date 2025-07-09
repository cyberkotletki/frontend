import { Divider } from "@heroui/react";
import Banner from "../../elements/Banner/Banner.tsx";
import styles from "./styles.module.scss";
import { Icon } from '@iconify/react';
import { MyButton } from "@/components/elements/MyComponents/MyButton.tsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { routes } from "@/app/App.routes.ts";

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleTransactionHistory = () => {
        navigate(routes.donathistory());
    };

    const handleMyWishes = () => {
        navigate(routes.wishlist("user123"));
    };

    return (
        <DefaultLayout hasBanner bannerMode="compact">
            <div className={styles.ProfilePage}>
                <Banner mode="compact" />
                <div className={styles.content}>
                    <div className={styles.profileOptions}>
                        <div className={styles.option} onClick={handleMyWishes}>
                            <Icon icon="solar:gift-line-duotone" className={styles.icon}/>
                            <div className={styles.text}>My wishes</div>
                        </div>
                        <div className={styles.option} onClick={handleTransactionHistory}>
                            <Icon icon="solar:clock-circle-linear" className={styles.icon}/>
                            <div className={styles.text}>Transactions history</div>
                        </div>
                        <div className={styles.option}>
                            <Icon icon="solar:diagram-up-bold-duotone" className={styles.icon}/>
                            <div className={styles.text}>Analytics</div>
                        </div>
                        <div className={styles.option}>
                            <Icon icon="solar:card-recive-line-duotone" className={styles.icon}/>
                            <div className={styles.text}>Withdrawal</div>
                        </div>
                        <Divider className="my-4"/>
                        <div className={styles.option}>
                            <Icon icon="solar:settings-linear" className={styles.icon}/>
                            <div className={styles.text}>Settings</div>
                        </div>
                        <div className={styles.option}>
                            <Icon icon="solar:paint-roller-line-duotone" className={styles.icon}/>
                            <div className={styles.text}>Appearance</div>
                        </div>
                    </div>
                    <div>
                        <MyButton radius="full" color="danger" size="xl" className="w-full">Sign out</MyButton>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ProfilePage;
