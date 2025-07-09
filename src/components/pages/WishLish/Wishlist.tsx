import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import Banner from "@/components/elements/Banner/Banner";
import { mockWishlistData, Wish } from "@/types/wishlist";
import { useAppDispatch } from "@/stores/hooks.tsx";
import { setWish } from "@/stores/wishSlice.tsx";
import { routes } from "@/app/App.routes.ts";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const [, setSelectedWish] = useState<Wish | null>(null);
  const navigate = useNavigate();

  const calculatePercentage = (current: number, target: number): number => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const sortWishesByPriority = (wishes: Wish[]): Wish[] => {
    return wishes.sort((a, b) => {
      if (a.is_priority && !b.is_priority) return -1;
      if (!a.is_priority && b.is_priority) return 1;
      return 0;
    });
  };

  const handleOnWishClick = (wish: Wish) => {
    dispatch(setWish(wish));
    setSelectedWish(wish);
    navigate(routes.wish(wish.id));
  };

  const WishItem = ({ wish }: { wish: Wish }) => {
    const percentage = calculatePercentage(wish.pol_amount, wish.pol_target);

    return (
      <div
        className={styles.wish}
        style={{ "--fill-percentage": `${percentage}%` } as React.CSSProperties}
        onClick={() => handleOnWishClick(wish)}
      >
        {wish.is_priority && (
          <div className={styles.priorityIcon}>
            <Icon icon="solar:fire-bold" />
          </div>
        )}

        <div className={styles.wishImage}>
          <img alt={wish.name} src="/example.png" />
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
    <DefaultLayout overlayMode={"banner_full"}>
      <div className={styles.wishlistPage}>
        <Banner mode="full" />
        <div className={styles.content}>
          <div className={styles.wishlist}>
            {sortWishesByPriority(mockWishlistData.wishes).map((wish) => (
              <WishItem key={wish.id} wish={wish} />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default WishlistPage;
