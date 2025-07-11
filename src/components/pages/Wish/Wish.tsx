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
import { useState } from "react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { useAppSelector } from "@/stores/hooks.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { mockWishlistData } from "@/types/wishlist";
import DonateDrawer from "@/components/pages/Donate/Donate.tsx";
import EditWishDrawer from "@/components/pages/EditWish/EditWishDrawer.tsx";

const WishPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wishFromStore = useAppSelector((state) => state.wish.wish);

  const wish =
    wishFromStore || mockWishlistData.wishes.find((w) => w.uuid === id);

  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const [linkCopied, setLinkCopied] = useState(false);

  if (!wish) {
    return (
      <DefaultLayout overlayMode={"header"}>
        <div className={styles.content}>
          <div>Wish not found</div>
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
    const wishUrl = `${window.location.origin}/wish/${wish.uuid}`;

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
    const wishUrl = `${window.location.origin}/wish/${wish.uuid}`;
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
          isOpen={isShareOpen}
          placement="bottom"
          onOpenChange={onShareClose}
          hideCloseButton={true}
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
