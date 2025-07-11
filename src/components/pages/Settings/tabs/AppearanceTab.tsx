import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Input,
  Divider,
} from "@heroui/react";
import { addToast } from "@heroui/toast";

import styles from "../styles.module.scss";

import { MyButton } from "@/components/custom/MyButton";
import Uploader from "@/components/elements/Uploader/Uploader";
import { uploadImage, getImageUrl } from "@/api/images";
import { updateUserAppearance, AppearanceSettings } from "@/api/user";
import { UserProfileResponse } from "@/types/user";
import { useUserProfile } from "@/hooks/useUserProfile";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
  return (
    <div className={styles.colorPickerContainer}>
      {label && <div className={styles.colorPickerLabel}>{label}</div>}
      <div className={styles.colorPicker}>
        <Input
          className={styles.colorInput}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          className={styles.colorText}
          placeholder="#RRGGBB"
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

interface AppearanceTabProps {
  userProfile: UserProfileResponse | null;
}

const AppearanceTab = ({ userProfile }: AppearanceTabProps) => {
  const { updatePartialUserProfile } = useUserProfile();
  const [bannerImage, setBannerImage] = useState<number | null>(null);
  const [avatarImage, setAvatarImage] = useState<number | null>(null);
  const [username, setUsername] = useState(userProfile?.name || "Username");
  const [backgroundColor, setBackgroundColor] = useState(
    userProfile?.background_color || "#1E1E1E",
  );
  const [backgroundImage, setBackgroundImage] = useState<number | null>(null);
  const [buttonBgColor, setButtonBgColor] = useState(
    userProfile?.button_background_color || "#7272FD",
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    userProfile?.button_text_color || "#FFFFFF",
  );
  const [isChanged, setIsChanged] = useState(false);

  const initialStateRef = useRef({
    bannerImage: null as number | null,
    avatarImage: null as number | null,
    username: userProfile?.name || "Username",
    backgroundColor: userProfile?.background_color || "#1E1E1E",
    backgroundImage: null as number | null,
    buttonBgColor: userProfile?.button_background_color || "#7272FD",
    buttonTextColor: userProfile?.button_text_color || "#FFFFFF",
  });

  const [tempBackgroundColor, setTempBackgroundColor] = useState("#1E1E1E");
  const [tempButtonBgColor, setTempButtonBgColor] = useState("#7272FD");
  const [tempButtonTextColor, setTempButtonTextColor] = useState("#FFFFFF");

  const {
    isOpen: isBannerOpen,
    onOpen: onBannerOpen,
    onClose: onBannerClose,
  } = useDisclosure();

  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();

  const {
    isOpen: isUsernameOpen,
    onOpen: onUsernameOpen,
    onClose: onUsernameClose,
  } = useDisclosure();

  const {
    isOpen: isBackgroundOpen,
    onOpen: onBackgroundOpen,
    onClose: onBackgroundClose,
  } = useDisclosure();

  const {
    isOpen: isButtonStyleOpen,
    onOpen: onButtonStyleOpen,
    onClose: onButtonStyleClose,
  } = useDisclosure();

  useEffect(() => {
    if (isBackgroundOpen) {
      setTempBackgroundColor(backgroundColor);
    }
  }, [isBackgroundOpen, backgroundColor]);

  useEffect(() => {
    if (isButtonStyleOpen) {
      setTempButtonBgColor(buttonBgColor);
      setTempButtonTextColor(buttonTextColor);
    }
  }, [isButtonStyleOpen, buttonBgColor, buttonTextColor]);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.name || "Username");
      setBackgroundColor(userProfile.background_color || "#1E1E1E");
      setButtonBgColor(userProfile.button_background_color || "#7272FD");
      setButtonTextColor(userProfile.button_text_color || "#FFFFFF");

      initialStateRef.current = {
        bannerImage: null,
        avatarImage: null,
        username: userProfile.name || "Username",
        backgroundColor: userProfile.background_color || "#1E1E1E",
        backgroundImage: null,
        buttonBgColor: userProfile.button_background_color || "#7272FD",
        buttonTextColor: userProfile.button_text_color || "#FFFFFF",
      };
    } else {
      setButtonBgColor("#7272FD");
      setButtonTextColor("#FFFFFF");
      initialStateRef.current.buttonBgColor = "#7272FD";
      initialStateRef.current.buttonTextColor = "#FFFFFF";
    }
  }, [userProfile]);

  const handleBannerUpload = async (file: File) => {
    try {
      const response = await uploadImage(file, "banner");

      setBannerImage(response.id);
      setIsChanged(true);
      onBannerClose();
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const response = await uploadImage(file, "avatar");

      setAvatarImage(response.id);
      setIsChanged(true);
      onAvatarClose();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleBackgroundImageUpload = async (file: File) => {
    try {
      const response = await uploadImage(file, "background");

      setBackgroundImage(response.id);
      setIsChanged(true);
    } catch (error) {
      console.error("Error uploading background:", error);
    }
  };

  const applyBackgroundSettings = () => {
    setBackgroundColor(tempBackgroundColor);
    document.documentElement.style.setProperty(
      "--background-color",
      tempBackgroundColor,
    );
    setIsChanged(true);
    onBackgroundClose();
  };

  const applyButtonSettings = () => {
    setButtonBgColor(tempButtonBgColor);
    setButtonTextColor(tempButtonTextColor);
    setIsChanged(true);
    onButtonStyleClose();
  };

  const cancelBackgroundSettings = () => {
    setTempBackgroundColor(backgroundColor);
    onBackgroundClose();
  };

  const cancelButtonSettings = () => {
    setTempButtonBgColor(buttonBgColor);
    setTempButtonTextColor(buttonTextColor);
    onButtonStyleClose();
  };

  const handleSave = async () => {
    try {
      const payload: AppearanceSettings = {
        name: username,
        button_background_color: buttonBgColor,
        button_text_color: buttonTextColor,
      };

      if (bannerImage) {
        payload.banner = bannerImage;
      }

      if (avatarImage) {
        payload.avatar = avatarImage;
      }

      if (backgroundImage) {
        payload.background_image = backgroundImage;
      } else {
        payload.background_color = backgroundColor;
      }

      if (userProfile?.topics) {
        payload.topics = userProfile.topics;
      }

      const updatedProfile = await updateUserAppearance(payload);

      updatePartialUserProfile(updatedProfile);

      initialStateRef.current = {
        bannerImage,
        avatarImage,
        username,
        backgroundColor,
        backgroundImage,
        buttonBgColor,
        buttonTextColor,
      };

      document.documentElement.style.setProperty(
        "--background-color",
        backgroundColor,
      );

      setIsChanged(false);
      addToast({
        title: "Settings saved!",
        description: "Your profile has been updated with new style",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      addToast({
        title: "Save error",
        description: "Failed to save appearance settings",
      });
    }
  };

  const handleRevert = () => {
    setBannerImage(initialStateRef.current.bannerImage);
    setAvatarImage(initialStateRef.current.avatarImage);
    setUsername(initialStateRef.current.username);
    setBackgroundColor(initialStateRef.current.backgroundColor);

    document.documentElement.style.setProperty(
      "--background-color",
      initialStateRef.current.backgroundColor,
    );

    setBackgroundImage(initialStateRef.current.backgroundImage);
    setButtonBgColor(initialStateRef.current.buttonBgColor);
    setButtonTextColor(initialStateRef.current.buttonTextColor);
    setIsChanged(false);
  };

  useEffect(() => {
    const currentBgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--background-color")
      .trim();

    if (currentBgColor) {
      setBackgroundColor(currentBgColor);
      initialStateRef.current.backgroundColor = currentBgColor;
      setTempBackgroundColor(currentBgColor);
    }
  }, []);

  const handleSetDefaults = () => {
    const defaultSettings = {
      backgroundColor: "#000000",
      buttonBgColor: "#7272FD",
      buttonTextColor: "#FFFFFF",
    };

    setBackgroundColor(defaultSettings.backgroundColor);
    setButtonBgColor(defaultSettings.buttonBgColor);
    setButtonTextColor(defaultSettings.buttonTextColor);

    document.documentElement.style.setProperty(
      "--background-color",
      defaultSettings.backgroundColor,
    );

    setIsChanged(true);
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Banner</h2>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerPreview}>
            <img
              alt="Banner"
              src={
                bannerImage
                  ? getImageUrl(bannerImage)
                  : userProfile?.banner
                    ? getImageUrl(userProfile.banner)
                    : "/example.png"
              }
            />
            <button className={styles.editBannerBtn} onClick={onBannerOpen}>
              <Icon className={styles.editIcon} icon="solar:pen-bold" />
              Change banner
            </button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <img
                alt="Avatar"
                src={
                  avatarImage
                    ? getImageUrl(avatarImage)
                    : userProfile?.avatar
                      ? getImageUrl(userProfile.avatar)
                      : "/example.png"
                }
              />
              <button className={styles.editAvatarBtn} onClick={onAvatarOpen}>
                <Icon className={styles.editIcon} icon="solar:pen-bold" />
              </button>
            </div>
            <div className={styles.usernameContainer}>
              <h3 className={styles.username}>{username}</h3>
              <button className={styles.editNameBtn} onClick={onUsernameOpen}>
                <Icon className={styles.editIcon} icon="solar:pen-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Button Styles</h2>
        <div className={styles.buttonStyles}>
          <div className={styles.buttonPreview}>
            <MyButton
              color="custom"
              radius="full"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              vasily
            </MyButton>
          </div>

          <button
            className={styles.editButtonStyleBtn}
            onClick={onButtonStyleOpen}
          >
            Change button style
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Page Background</h2>
        <div
          className={styles.backgroundPreview}
          style={{
            backgroundColor: backgroundColor,
            backgroundImage:
              backgroundImage && userProfile?.background_image
                ? `url('${getImageUrl(backgroundImage)}')`
                : userProfile?.background_image
                  ? `url('${getImageUrl(userProfile.background_image)}')`
                  : "none",
          }}
        >
          <button
            className={styles.editBackgroundBtn}
            onClick={onBackgroundOpen}
          >
            Change background
          </button>
        </div>
      </div>

      <div className={styles.tabActionButtons}>
        <MyButton
          color="primary"
          disabled={!isChanged}
          radius="full"
          size="lg"
          onClick={handleSave}
        >
          Save
        </MyButton>
        <MyButton
          color="secondary"
          radius="full"
          size="lg"
          onClick={handleSetDefaults}
        >
          Set defaults
        </MyButton>
      </div>

      <Drawer
        hideCloseButton={true}
        isOpen={isBannerOpen}
        placement="bottom"
        size="3xl"
        onClose={onBannerClose}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <div>Change Banner</div>
          </DrawerHeader>
          <DrawerBody>
            <Uploader
              type="banner"
              onCancel={onBannerClose}
              onUpload={handleBannerUpload}
            />
            <div className={styles.drawerButtons}>
              <MyButton
                color="primary"
                radius="full"
                onClick={() => {
                  if (bannerImage) {
                    setIsChanged(true);
                  }
                  onBannerClose();
                }}
              >
                Save
              </MyButton>
              <MyButton color="danger" radius="full" onClick={onBannerClose}>
                Cancel
              </MyButton>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        hideCloseButton={true}
        isOpen={isAvatarOpen}
        placement="bottom"
        size="3xl"
        onClose={onAvatarClose}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <div>Change Avatar</div>
          </DrawerHeader>
          <DrawerBody>
            <Uploader
              type="avatar"
              onCancel={onAvatarClose}
              onUpload={handleAvatarUpload}
            />
            <div className={styles.drawerButtons}>
              <MyButton
                color="primary"
                radius="full"
                onClick={() => {
                  if (avatarImage) {
                    setIsChanged(true);
                  }
                  onAvatarClose();
                }}
              >
                Save
              </MyButton>
              <MyButton color="danger" radius="full" onClick={onAvatarClose}>
                Cancel
              </MyButton>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        hideCloseButton={true}
        isOpen={isUsernameOpen}
        placement="bottom"
        size="3xl"
        onClose={onUsernameClose}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <div>Change Username</div>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.drawerForm}>
              <Input
                className={styles.input}
                label="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsChanged(true);
                }}
              />
              <div className={styles.drawerButtons}>
                <MyButton
                  color="primary"
                  radius="full"
                  onClick={onUsernameClose}
                >
                  Save
                </MyButton>
                <MyButton
                  color="danger"
                  radius="full"
                  onClick={onUsernameClose}
                >
                  Cancel
                </MyButton>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        hideCloseButton={true}
        isOpen={isBackgroundOpen}
        placement="bottom"
        size="3xl"
        onClose={cancelBackgroundSettings}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <div>Change Background</div>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.drawerForm}>
              <div className={styles.tabOptions}>
                <h4 className={styles.optionTitle}>Background Color</h4>
                <ColorPicker
                  color={tempBackgroundColor}
                  onChange={(color) => {
                    setTempBackgroundColor(color);
                  }}
                />

                <Divider className="my-4" />

                <h4 className={styles.optionTitle}>Background Image</h4>
                <Uploader
                  type="background"
                  onUpload={handleBackgroundImageUpload}
                />
              </div>

              <div className={styles.drawerButtons}>
                <MyButton
                  color="primary"
                  radius="full"
                  onClick={applyBackgroundSettings}
                >
                  Apply
                </MyButton>
                <MyButton
                  color="danger"
                  radius="full"
                  onClick={cancelBackgroundSettings}
                >
                  Cancel
                </MyButton>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        hideCloseButton={true}
        isOpen={isButtonStyleOpen}
        placement="bottom"
        size="3xl"
        onClose={cancelButtonSettings}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <div>Change Button Style</div>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.drawerForm}>
              <ColorPicker
                color={tempButtonBgColor}
                label="Button Background Color"
                onChange={(color) => {
                  setTempButtonBgColor(color);
                }}
              />

              <ColorPicker
                color={tempButtonTextColor}
                label="Button Text Color"
                onChange={(color) => {
                  setTempButtonTextColor(color);
                }}
              />

              <div className={styles.buttonPreviewLarge}>
                <MyButton
                  color="vasily"
                  radius="full"
                  style={{
                    backgroundColor: tempButtonBgColor || "#7272FD",
                    color: tempButtonTextColor || "#FFFFFF",
                  }}
                >
                  Button Preview
                </MyButton>
              </div>

              <div className={styles.drawerButtons}>
                <MyButton
                  color="primary"
                  radius="full"
                  onClick={applyButtonSettings}
                >
                  Apply
                </MyButton>
                <MyButton
                  color="danger"
                  radius="full"
                  onClick={cancelButtonSettings}
                >
                  Cancel
                </MyButton>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AppearanceTab;
