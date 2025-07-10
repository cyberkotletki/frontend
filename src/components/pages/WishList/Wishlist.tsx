import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/react";

import styles from "./styles.module.scss";

import Spinner from "@/components/elements/Spinner/Spinner";
import DefaultLayout from "@/layouts/DefaultLayout";
import Banner from "@/components/elements/Banner/Banner";
import { mockWishlistData, Wish } from "@/types/wishlist";
import { useAppDispatch } from "@/stores/hooks.tsx";
import { setWish } from "@/stores/wishSlice.tsx";
import { routes } from "@/app/App.routes.ts";
import { getWishlist } from "@/api/wishlist";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const [, setSelectedWish] = useState<Wish | null>(null);
  const navigate = useNavigate();
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const [linkCopied, setLinkCopied] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        const userId = "user123";

        console.log("Starting wishlist fetch for user:", userId);

        const response = await getWishlist(userId);

        console.log("Wishlist response in component:", response);

        if (
          response &&
          response.wishes &&
          Array.isArray(response.wishes) &&
          response.wishes.length > 0
        ) {
          console.log("Setting wishes in state:", response.wishes);
          setWishes(response.wishes);
        } else {
          console.warn("No wishes found in response or empty array");
          setWishes([]);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
        alert("Произошла ошибка при загрузке списка желаний");
        setWishes(mockWishlistData.wishes);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

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
    navigate(routes.wish(wish.uuid));
  };

  const handleAddBtnClick = () => {
    console.log("Navigating to addwish route");
    navigate(routes.addwish());
  };

  const handleShareBtnClick = () => {
    onShareOpen();
  };

  const handleCopyLink = () => {
    const wishlistUrl = window.location.href;

    navigator.clipboard
      .writeText(wishlistUrl)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleShare = async (platform: string) => {
    const wishlistUrl = window.location.href;
    const shareText = "Check out my wishlist!";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Wishlist",
          text: shareText,
          url: wishlistUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }

    onShareClose();
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
          {isLoading ? (
            <Spinner fullPage size="lg" />
          ) : (
            <div className={styles.wishlist}>
              {sortWishesByPriority(wishes).map((wish) => (
                <WishItem key={wish.uuid} wish={wish} />
              ))}
              {wishes.length === 0 && (
                <div className={styles.emptyState}>
                  No wishes found. Add your first wish!
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.btnGroup}>
          <div className={styles.actionBtn}>
            <Button
              isIconOnly
              radius="full"
              size="lg"
              onPress={handleAddBtnClick}
            >
              <Icon
                className={styles.actionIcon}
                icon="solar:add-circle-linear"
              />
            </Button>
          </div>
          <div className={styles.actionBtn}>
            <Button
              isIconOnly
              radius="full"
              size="lg"
              onPress={handleShareBtnClick}
            >
              <Icon className={styles.actionIcon} icon="solar:share-bold" />
            </Button>
          </div>
        </div>

        {/* Share Drawer */}
        <Drawer
          backdrop="blur"
          className={styles.drawerContent}
          isOpen={isShareOpen}
          placement="bottom"
          size="3xl"
          onClose={onShareClose}
        >
          <DrawerContent>
            <DrawerHeader className={styles.drawerHeader}>
              <div>Share Wishlist</div>
            </DrawerHeader>
            <DrawerBody>
              <div className={styles.shareOptions}>
                <div
                  className={styles.shareOption}
                  onClick={() => handleShare("twitter")}
                >
                  <Icon
                    className={styles.shareIcon}
                    icon="mdi:twitter"
                    width={32}
                  />
                  <span>Twitter</span>
                </div>
                <div
                  className={styles.shareOption}
                  onClick={() => handleShare("facebook")}
                >
                  <Icon
                    className={styles.shareIcon}
                    icon="mdi:facebook"
                    width={32}
                  />
                  <span>Facebook</span>
                </div>
                <div
                  className={styles.shareOption}
                  onClick={() => handleShare("telegram")}
                >
                  <Icon
                    className={styles.shareIcon}
                    icon="mdi:telegram"
                    width={32}
                  />
                  <span>Telegram</span>
                </div>
                <div className={styles.shareOption} onClick={handleCopyLink}>
                  <Icon
                    className={styles.shareIcon}
                    icon="mdi:content-copy"
                    width={32}
                  />
                  <span>{linkCopied ? "Copied!" : "Copy Link"}</span>
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </DefaultLayout>
  );
};

export default WishlistPage;
