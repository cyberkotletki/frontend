import { Checkbox, Input, Textarea } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import Uploader from "@/components/elements/Uploader/Uploader.tsx";
import { MyButton } from "@/components/custom/MyButton";
import { createWish } from "@/api/wishlist";
import { routes } from "@/app/App.routes.ts";
import { CreateWishRequest } from "@/types/wishlist";

const AddWish = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateWishRequest>>({
    name: "",
    description: "",
    wish_url: "",
    pol_target: 0.01,
    is_priority: false,
    image: "",
  });
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Boolean(
      formData.name &&
        formData.pol_target &&
        formData.pol_target > 0 &&
        uploadedImageId,
    );

    setIsFormValid(isValid);
    console.log("Form validation:", {
      name: Boolean(formData.name),
      pol_target: Boolean(formData.pol_target),
      pol_target_value: formData.pol_target,
      uploadedImageId,
      isValid,
    });
  }, [formData.name, formData.pol_target, uploadedImageId]);

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

  const handleImageUploaded = (imageUrl: string, imageId: number) => {
    console.log("Image uploaded in AddWish:", imageUrl, imageId);
    setUploadedImageId(String(imageId));
    setFormData((prev) => ({
      ...prev,
      image: String(imageId),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.pol_target || !uploadedImageId) {
      alert("Пожалуйста, заполните все обязательные поля");

      return;
    }

    if (formData.pol_target <= 0) {
      alert("Цена должна быть больше нуля");

      return;
    }

    setIsLoading(true);

    try {
      const wishData: CreateWishRequest = {
        name: formData.name!,
        description: formData.description,
        wish_url: formData.wish_url,
        pol_target: formData.pol_target!,
        is_priority: formData.is_priority!,
        image: uploadedImageId,
      };

      const response = await createWish(wishData);

      console.log("Wish created successfully:", response);

      navigate(routes.wishlist("user123"));
    } catch (error) {
      console.error("Error creating wish:", error);
      alert(
        "Произошла ошибка при создании желания. Пожалуйста, попробуйте снова.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImageId(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.AddWishPage}>
        <div className={styles.content}>
          <div className={styles.form}>
            <h2 className={styles.formTitle}>Add new wish</h2>
            <Input
              isRequired
              label="Link"
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
              label="Description"
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
