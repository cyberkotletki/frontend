import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { useAppSelector } from "@/stores/hooks.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { mockWishlistData } from "@/types/wishlist";

const WishPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wishFromStore = useAppSelector((state) => state.wish.wish);

  const wish = wishFromStore || mockWishlistData.wishes.find((w) => w.id === id);

  if (!wish) {
    return (
      <DefaultLayout overlayMode={"header"}>
        <div className={styles.content}>
          <div>Wish not found</div>
        </div>
      </DefaultLayout>
    );
  }

  const calculatePercentage = (current: number, target: number): number => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const percentage = calculatePercentage(wish.pol_amount, wish.pol_target);

  const handleOpenLink = () => {
    if (wish.wish_url) {
      window.open(wish.wish_url, "_blank");
    }
  };

  const handleDonate = () => {
    // TODO: donate functionality
    console.log("Donate to wish:", wish.id);
  };

  return (
    <DefaultLayout overlayMode={"banner_compact"}>
      <div className={styles.wishPage}>
        <Banner mode="compact" />
        <div className={styles.content}>
          {/* Название и прогресс НАД полоской */}
          <div className={styles.header}>
            <div className={styles.wishName}>{wish.name}</div>
            <div className={styles.progress}>
              {wish.pol_amount}/{wish.pol_target} ETH
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ "--fill-percentage": `${percentage}%` } as React.CSSProperties}
            />
          </div>

          {wish.description && <div className={styles.description}>{wish.description}</div>}

          <div className={styles.imageContainer}>
            <img src="/example.png" alt={wish.name} className={styles.wishImage} />
          </div>

          <div className={styles.buttons}>
            {wish.wish_url && (
              <MyButton
                color="vasily"
                radius="full"
                className="w-full"
                onClick={handleOpenLink}
              >
                Open item link
              </MyButton>
            )}
            <MyButton
              color="vasily"
              radius="full"
              className="w-full"
              onClick={handleDonate}
            >
              Donate
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default WishPage;
