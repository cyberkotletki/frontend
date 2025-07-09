import { Checkbox, Input, Textarea } from "@heroui/react";
import { Image } from "@heroui/react";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import Uploader from "@/components/elements/Uploader/Uploader.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";

const AddWish = () => {
  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.AddWishPage}>
        <div className={styles.content}>
          <div className={styles.form}>
            <h2 className={styles.formTitle}>Add new wish</h2>
            <Input isRequired label="Link" placeholder="Enter your wish link" />
            <Input
              isRequired
              label="Name"
              placeholder="Enter the name of your wish"
            />
            <Textarea
              isRequired
              label="Description"
              minRows={3}
              placeholder="Enter the description of your wish"
            />

            <Uploader />

            <div className={styles.imageContainer}>
              <Image
                isBlurred
                alt="Image Preview"
                className={styles.imagePreview}
                src="./example.png"
                width={334}
              />
              <div className={styles.imageFunctions}>
                <Icon className={styles.function} icon="solar:pen-2-bold" />
                <Icon
                  className={styles.function}
                  icon="solar:trash-bin-minimalistic-bold"
                />
              </div>
            </div>

            <Input
              endContent={<div className="text-white">ETH</div>}
              label="Price"
              placeholder="From 0.01 ETH to 100 ETH"
              type="number"
            />

            <Checkbox color="primary">Priority wish</Checkbox>

            <MyButton color="vasily" radius="full">
              Сохранить товар
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddWish;
