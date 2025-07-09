import styles from "./styles.module.scss";
import DefaultLayout from "@/layouts/DefaultLayout";
import Banner from "@/components/elements/Banner/Banner";
import { mockWishlistData, Wish } from "@/types/wishlist";
import { Icon } from '@iconify/react';

const WishlistPage = () => {
    const calculatePercentage = (current: number, target: number): number => {
        return Math.min(Math.round((current / target) * 100), 100);
    };

    const WishItem = ({ wish }: { wish: Wish }) => {
        const percentage = calculatePercentage(wish.pol_amount, wish.pol_target);

        return (
            <div
                className={styles.wish}
                style={{ '--fill-percentage': `${percentage}%` } as React.CSSProperties}
            >
                {wish.is_priority && (
                    <div className={styles.priorityIcon}>
                        <Icon icon="solar:fire-bold" />
                    </div>
                )}

                <div className={styles.wishImage}>
                    <img src="/example.png" alt={wish.name} />
                </div>

                <div className={styles.wishInfo}>
                    <div className={styles.wishDetails}>
                        <div className={styles.wishTitle}>{wish.name}</div>
                        {wish.description && (
                            <div className={styles.wishDescription}>{wish.description}</div>
                        )}
                    </div>

                    <div className={styles.wishFill}>
                        <div className={styles.wishPercentage}>{percentage}%</div>
                        <div className={styles.wishCurrent}>
                            {wish.pol_amount}/{wish.pol_target} ETH
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <DefaultLayout hasBanner bannerMode="full">
            <div className={styles.wishlistPage}>
                <Banner mode="full" />
                <div className={styles.content}>
                    <div className={styles.wishlist}>
                        {mockWishlistData.wishes.map((wish, index) => (
                            <WishItem key={index} wish={wish} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default WishlistPage;