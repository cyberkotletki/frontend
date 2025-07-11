import { Checkbox, Input, Textarea } from "@heroui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { addToast } from "@heroui/toast";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import Uploader from "@/components/elements/Uploader/Uploader.tsx";
import { MyButton } from "@/components/custom/MyButton";
import { createWish } from "@/api/wishlist";
import { CreateWishRequest } from "@/types/wishlist";
import { getUserProfile } from "@/stores/userSlice.tsx";
import { WishDto } from "@/types/transaction-types/wish-dto.ts";
import { useGetContract } from "@/hooks/useWallet.ts";

const AddWish = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateWishRequest>>({
    name: "",
    description: "",
    wish_url: "",
    pol_target: 0.01,
    is_priority: false,
  });
  const [uploadedImageUuid, setUploadedImageUuid] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { getContract } = useGetContract();
  const userProfile = useSelector(getUserProfile);

  useEffect(() => {
    const isValid = Boolean(
      formData.name &&
        formData.pol_target &&
        formData.pol_target > 0 &&
        uploadedImageUuid !== null,
    );

    setIsFormValid(isValid);
  }, [formData.name, formData.pol_target, uploadedImageUuid]); // Обновили зависимость

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handlePriorityChange = (isSelected: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_priority: isSelected,
    }));
  };

  const handleImageUploaded = (imageUrl: string, imageUuid?: string) => {
    // Устанавливаем imageUuid только если он валидный
    if (imageUuid !== undefined && imageUuid !== null) {
      setUploadedImageUuid(imageUuid); // Сохраняем UUID
    }
  };

  const sendWishAndGetUUID = async (): Promise<string> => {
    if (!formData.name || !formData.pol_target || uploadedImageUuid === null) {
      addToast({
        title: "Fill all fields",
        description: "Please fill all required fields before adding a wish",
      });
      throw new Error("fields not filled right");
    }

    try {
      const wishData: CreateWishRequest = {
        name: formData.name,
        description: formData.description || "",
        wish_url: formData.wish_url || undefined,
        pol_target: formData.pol_target,
        is_priority: formData.is_priority || false,
        image: uploadedImageUuid, // Отправляем UUID изображения напрямую
      };

      const response = await createWish(wishData);

      return response.wish_uuid;
    } catch (error) {
      console.error("Error creating wish:", error);
      addToast({
        title: "Error creating wish",
        description: "Failed to create wish. Check connection and try again",
      });
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.pol_target || uploadedImageUuid === null) {
      addToast({
        title: "Fill all fields",
        description: "Please fill all required fields",
      });

      return;
    }

    if (!userProfile) {
      addToast({
        title: "Authorization error",
        description: "User not registered. Please sign in to the system",
      });

      return;
    }

    if (formData.pol_target <= 0) {
      addToast({
        title: "Invalid price",
        description: "Price must be greater than zero",
      });

      return;
    }
    setIsLoading(true);

    try {
      const uuid: string = await sendWishAndGetUUID();

      addToast({
        title: "Wish created!",
        description: "Your wish has been successfully added to the system",
      });

      try {
        const contract = await getContract();

        if (!contract) {
          console.warn("Contract not available, but API creation succeeded");
          addToast({
            title: "Partially ready",
            description:
              "Wish created, blockchain registration will be completed later",
          });
          setFormData({
            name: "",
            description: "",
            wish_url: "",
            pol_target: 0.01,
            is_priority: false,
          });
          setUploadedImageUuid(null);

          return;
        }

        // Затем добавляем в блокчейн
        const transactionWish: WishDto = {
          userUUID: userProfile.uuid,
          uuid: uuid,
          currentBalance: 0,
          price: formData.pol_target,
          name: formData.name,
          link: formData.wish_url || "",
          description: formData.description || "",
          completed: false,
        };

        const tx = await contract.addWish([
          uuid,
          transactionWish.uuid,
          transactionWish.currentBalance,
          ethers.parseEther(transactionWish.price.toString()),
          transactionWish.name,
          transactionWish.link,
          transactionWish.description,
          transactionWish.completed,
        ]);

        await tx.wait();

        addToast({
          title: "All set! ",
          description: "Wish fully added to system and blockchain",
        });
      } catch (blockchainError) {
        console.warn(
          "Blockchain operation failed, but API creation succeeded:",
          blockchainError,
        );
        addToast({
          title: "Almost ready!",
          description:
            "Wish created, blockchain part will be completed automatically - Blockchain operation failed",
        });
      }

      setFormData({
        name: "",
        description: "",
        wish_url: "",
        pol_target: 0.01,
        is_priority: false,
      });
      setUploadedImageUuid(null);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      addToast({
        title: "Something went wrong",
        description: "Please try again in a few seconds",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImageUuid(null);
  };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.AddWishPage}>
        <div className={styles.content}>
          <div className={styles.form}>
            <h2 className={styles.formTitle}>Add new wish</h2>

            <Input
              label="Link (Optional)"
              name="wish_url"
              placeholder="Enter your wish link"
              value={formData.wish_url || ""}
              onChange={handleInputChange}
            />

            <Input
              isRequired
              label="Name"
              name="name"
              placeholder="Enter the name of your wish"
              value={formData.name || ""}
              onChange={handleInputChange}
            />

            <Textarea
              label="Description (Optional)"
              minRows={3}
              name="description"
              placeholder="Enter the description of your wish"
              value={formData.description || ""}
              onChange={handleInputChange}
            />

            <Uploader
              onImageDeleted={handleDeleteImage}
              onImageUploaded={handleImageUploaded}
            />

            <Input
              isRequired
              endContent={<div className="text-white">POL</div>}
              label="Price"
              min="0.01"
              name="pol_target"
              placeholder="From 0.01 POL to 100 POL"
              step="0.01"
              type="number"
              value={String(formData.pol_target || "")}
              onChange={handleNumberInputChange}
            />

            <Checkbox
              color="primary"
              isSelected={formData.is_priority}
              onValueChange={handlePriorityChange}
            >
              Priority wish
            </Checkbox>

            <MyButton
              color="vasily"
              isDisabled={!isFormValid}
              isLoading={isLoading}
              radius="full"
              onClick={handleSubmit}
            >
              {isLoading ? "Saving..." : "Add"}
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddWish;
