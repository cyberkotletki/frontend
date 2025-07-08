import {  Checkbox, Input, Textarea } from "@heroui/react";

import Header from "../../elements/Header/Header.tsx";

import styles from "./styles.module.scss";
import Uploader from "@/components/elements/Uploader/Uploader.tsx";
import {MyButton} from "@/components/elements/MyComponents/MyButton.tsx";
import {Image} from "@heroui/react";
import { Icon } from '@iconify/react';


const AddWish = () => {
  return (
    <div className={styles.AddWishPage}>
      <div className={styles.content}>
        <Header />
        <div className={styles.form}>
          <h2 className={styles.formTitle}>Add new wish</h2>
          <Input
              isRequired
              label="Link"
              placeholder="Enter your wish link"
          />
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
            <div className={styles.imageFunctions}>
              <Icon icon="solar:pen-2-bold" className={styles.function} />
              <Icon icon="solar:trash-bin-minimalistic-bold" className={styles.function} />
            </div>
            <Image className={styles.imagePreview}
                isBlurred
                alt="Image Preview"
                src="./example.png"
                width={334}
            />
          </div>

          <Input
            endContent={<div className="text-white">ETH</div>}
            label="Price"
            placeholder="From 0.01 ETH to 100 ETH"
            type="number"
          />

          <Checkbox color="primary">
            Priority wish
          </Checkbox>

          <MyButton color="vasily" radius="full">
            Сохранить товар
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default AddWish;
