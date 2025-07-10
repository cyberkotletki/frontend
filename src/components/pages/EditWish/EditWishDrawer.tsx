import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Switch,
} from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

import styles from "./styles.module.scss";

import { MyButton } from "@/components/custom/MyButton";
import Uploader from "@/components/elements/Uploader/Uploader";
import { editWish, EditWishRequest } from "@/api/wishlist";

interface EditWishDrawerProps {
  wishUuid: string;
  isPriority: boolean;
  onSuccess?: () => void;
}

const EditWishDrawer: React.FC<EditWishDrawerProps> = ({
  wishUuid,
  isPriority,
  onSuccess,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState<Partial<EditWishRequest>>({
    wish_uuid: wishUuid,
    is_priority: isPriority,
  });
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);

  const handlePriorityChange = (isSelected: boolean) => {
    setEditedData((prev) => ({
      ...prev,
      is_priority: isSelected,
    }));
  };

  const handleImageUploaded = (imageUrl: string, imageId: number) => {
    console.log("Image uploaded in EditWish:", imageUrl, imageId);
    setUploadedImageId(String(imageId));
    setEditedData((prev) => ({
      ...prev,
      image: String(imageId),
    }));
  };

  const handleDeleteImage = () => {
    setUploadedImageId(null);
    setEditedData((prev) => {
      const newData = { ...prev };

      delete newData.image;

      return newData;
    });
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!wishUuid) {
      return;
    }

    setIsLoading(true);

    try {
      const requestData: EditWishRequest = {
        wish_uuid: wishUuid,
        ...editedData,
      };

      await editWish(requestData);
      console.log("Wish edited successfully");

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Error editing wish:", error);
      alert(
        "Произошла ошибка при редактировании желания. Пожалуйста, попробуйте снова.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        className={styles.actionBtn}
        radius="full"
        size="lg"
        onPress={onOpen}
      >
        <Icon className={styles.actionIcon} icon="solar:pen-bold" />
      </Button>

      <Drawer isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <DrawerContent className={styles.drawerContent}>
          {(onClose) => (
            <>
              <DrawerHeader className={styles.drawerHeader}>
                <div>Edit Wish</div>
              </DrawerHeader>
              <DrawerBody>
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <Uploader
                      onImageDeleted={handleDeleteImage}
                      onImageUploaded={handleImageUploaded}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Switch
                      color="secondary"
                      isSelected={editedData.is_priority}
                      size="lg"
                      onValueChange={handlePriorityChange}
                    >
                      <div className={styles.switchContent}>
                        <span className={styles.switchLabel}>
                          Priority wish
                        </span>
                      </div>
                    </Switch>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className={styles.drawerFooter}>
                <div className={styles.footerButtons}>
                  <MyButton
                    className={styles.footerButton}
                    color="antivasily"
                    radius="full"
                    onClick={onClose}
                  >
                    Cancel
                  </MyButton>
                  <MyButton
                    className={styles.footerButton}
                    color="vasily"
                    isLoading={isLoading}
                    radius="full"
                    onClick={() => handleSubmit(onClose)}
                  >
                    Save
                  </MyButton>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditWishDrawer;
