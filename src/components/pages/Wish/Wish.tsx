import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import DonateDrawer from "@/components/pages/Donate/Donate.tsx";
import EditWishDrawer from "@/components/pages/EditWish/EditWishDrawer.tsx";
import { getWishFromWishlist } from "@/api/wishlist.ts";

const WishPage = () => {
  const { wishlistId, wishId } = useParams<{
    wishlistId: string;
    wishId: string;
  }>();
  const navigate = useNavigate();

  const [wish, setWish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const fetchWish = async () => {
      if (!wishlistId || !wishId) {
        setError("Invalid URL parameters");
        setLoading(false);

        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedWish = await getWishFromWishlist(wishlistId, wishId);

        setWish(fetchedWish);
      } catch (_err) {
        setError("Failed to load wish. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWish();
  }, [wishlistId, wishId]);

  if (loading) {
    return (
      <DefaultLayout overlayMode={"header"}>
        <div className={styles.content}>
          <div className={styles.loadingState}>
            <Icon height={64} icon="solar:loading-linear" width={64} />
            <h2>Loading Wish...</h2>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !wish) {
    return (
      <DefaultLayout overlayMode={"header"}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <Icon height={64} icon="solar:sad-circle-linear" width={64} />
            <h2>Wish not found</h2>
            <p>Please select a wish from the wishlist to view details.</p>
            <MyButton
              color="primary"
              radius="full"
              onClick={() => navigate(-1)}
            >
              Go Back
            </MyButton>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  const handleShareBtnClick = () => {
    onShareOpen();
  };

  const calculatePercentage = (current: number, target: number): number => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const percentage = calculatePercentage(wish.pol_amount, wish.pol_target);

  const handleOpenLink = () => {
    if (wish.wish_url) {
      window.open(wish.wish_url, "_blank");
    }
  };

  const handleCopyLink = () => {
    const wishUrl = `${window.location.origin}/wishlist/${wishlistId}/wish/${wishId}`;

    navigator.clipboard
      .writeText(wishUrl)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleShare = async (platform: string) => {
    const wishUrl = `${window.location.origin}/wishlist/${wishlistId}/wish/${wishId}`;
    const shareText = `Check out my wish: ${wish.name}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: wish.name,
          text: shareText,
          url: wishUrl,
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

  const handleEditSuccess = () => {
    console.log("Wish updated successfully!");
  };

  return (
    <DefaultLayout overlayMode={"banner_compact"}>
      <div className={styles.wishPage}>
        <Banner mode="compact" />
        <div className={styles.content}>
          <div>
            <div className={styles.header}>
              <div className={styles.wishName}>{wish.name}</div>
              <div className={styles.progress}>
                {wish.pol_amount}/{wish.pol_target} ETH
              </div>
            </div>

            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={
                  {
                    "--fill-percentage": `${percentage}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>

          {wish.description && (
            <div className={styles.description}>{wish.description}</div>
          )}

          <div className={styles.imageContainer}>
            <img
              alt={wish.name}
              className={styles.wishImage}
              src={wish.image || "/example.png"}
            />
          </div>

          <div className={styles.buttons}>
            {wish.wish_url && (
              <MyButton
                className="w-full"
                color="antivasily"
                radius="full"
                onClick={handleOpenLink}
              >
                Open item link
              </MyButton>
            )}
            <DonateDrawer />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <div className={styles.actionBtn}>
            <EditWishDrawer
              isPriority={wish.is_priority}
              wishUuid={wish.uuid}
              onSuccess={handleEditSuccess}
            />
          </div>
          <div className={styles.actionBtn}>
            <Button isIconOnly radius="full" size="lg" onPress={onShareOpen}>
              <Icon className={styles.actionIcon} icon="solar:share-bold" />
            </Button>
          </div>
        </div>

        {/* Share Drawer */}
        <Drawer
          hideCloseButton={true}
          isOpen={isShareOpen}
          placement="bottom"
          onOpenChange={onShareClose}
        >
          <DrawerContent className={styles.drawerContent}>
            {(onClose) => (
              <>
                <DrawerHeader className={styles.drawerHeader}>
                  <div>Share Wish</div>
                </DrawerHeader>
                <DrawerBody>
                  <div className={styles.shareOptions}>
                    <div
                      className={styles.shareOption}
                      onClick={() => {
                        handleShare("twitter");
                        onClose();
                      }}
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
                      onClick={() => {
                        handleShare("facebook");
                        onClose();
                      }}
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
                      onClick={() => {
                        handleShare("telegram");
                        onClose();
                      }}
                    >
                      <Icon
                        className={styles.shareIcon}
                        icon="mdi:telegram"
                        width={32}
                      />
                      <span>Telegram</span>
                    </div>
                    <div
                      className={styles.shareOption}
                      onClick={() => {
                        handleCopyLink();
                        onClose();
                      }}
                    >
                      <Icon
                        className={styles.shareIcon}
                        icon="mdi:content-copy"
                        width={32}
                      />
                      <span>{linkCopied ? "Copied!" : "Copy Link"}</span>
                    </div>
                  </div>
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </DefaultLayout>
  );
};

export default WishPage;
