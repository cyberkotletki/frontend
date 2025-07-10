import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  Checkbox,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { useAppSelector } from "@/stores/hooks.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { mockWishlistData, Wish } from "@/types/wishlist";
import DonateDrawer from "@/components/pages/Donate/Donate.tsx";
import Uploader from "@/components/elements/Uploader/Uploader.tsx";

const WishPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wishFromStore = useAppSelector((state) => state.wish.wish);

  const wish =
    wishFromStore || mockWishlistData.wishes.find((w) => w.id === id);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose,
  } = useDisclosure();
  const [editedWish, setEditedWish] = useState<Partial<Wish>>(wish || {});
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

  const handleEditBtnClick = () => {
    setEditedWish(wish);
    onEditOpen();
  };

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

  const handleSaveEdit = () => {
    console.log("Saving edited wish:", editedWish);
    onEditClose();
  };

  const handleCopyLink = () => {
    const wishUrl = `${window.location.origin}/wish/${wish.id}`;

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
    const wishUrl = `${window.location.origin}/wish/${wish.id}`;
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
              src="/example.png"
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
          <div className={styles.actionBtn} onClick={handleEditBtnClick}>
            <Button isIconOnly radius="full" size="lg">
              <Icon className={styles.actionIcon} icon="solar:pen-bold" />
            </Button>
          </div>
          <div className={styles.actionBtn} onClick={handleShareBtnClick}>
            <Button isIconOnly radius="full" size="lg">
              <Icon className={styles.actionIcon} icon="solar:share-bold" />
            </Button>
          </div>
        </div>

        {/* Edit Drawer */}
        <Drawer
          backdrop="blur"
          className={styles.drawerContent}
          isOpen={isEditOpen}
          placement="bottom"
          size="3xl"
          onClose={onEditClose}
        >
          <DrawerContent>
            <DrawerHeader className={styles.drawerHeader}>
              <div>Edit Wish</div>
            </DrawerHeader>
            <DrawerBody>
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <Uploader
                    defaultImage="/example.png"
                    onImageUploaded={(url) =>
                      setEditedWish({ ...editedWish, image_url: url })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <Checkbox
                    classNames={{
                      label: "text-white",
                    }}
                    defaultSelected={wish.is_priority}
                    size="lg"
                    onChange={(isSelected) =>
                      setEditedWish({ ...editedWish, is_priority: isSelected })
                    }
                  >
                    Priority wish
                  </Checkbox>
                </div>
                <div className={styles.formGroup}>
                  <Input
                    classNames={{
                      input: "text-white",
                      inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                      label: "text-white",
                    }}
                    defaultValue={wish.name}
                    label="Name"
                    placeholder="Enter wish name"
                    onChange={(e) =>
                      setEditedWish({ ...editedWish, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    classNames={{
                      input: "text-white",
                      inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                      label: "text-white",
                    }}
                    defaultValue={wish.description}
                    label="Description"
                    placeholder="Enter wish description"
                    onChange={(e) =>
                      setEditedWish({
                        ...editedWish,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    classNames={{
                      input: "text-white",
                      inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                      label: "text-white",
                    }}
                    defaultValue={wish.wish_url}
                    label="Link to item"
                    placeholder="https://example.com/item"
                    onChange={(e) =>
                      setEditedWish({ ...editedWish, wish_url: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    classNames={{
                      input: "text-white",
                      inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                      label: "text-white",
                    }}
                    defaultValue={wish.pol_target.toString()}
                    label="Target amount (ETH)"
                    placeholder="1.0"
                    type="number"
                    onChange={(e) =>
                      setEditedWish({
                        ...editedWish,
                        pol_target: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter className={styles.drawerFooter}>
              <div className={styles.footerButtons}>
                <MyButton
                  className={styles.footerButton}
                  color="antivasily"
                  radius="full"
                  onClick={onEditClose}
                >
                  Cancel
                </MyButton>
                <MyButton
                  className={styles.footerButton}
                  color="vasily"
                  radius="full"
                  onClick={handleSaveEdit}
                >
                  Save
                </MyButton>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

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
              <div>Share Wish</div>
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

export default WishPage;
