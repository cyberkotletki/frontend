import styles from './styles.module.scss';
import {Button, Checkbox, Input, Textarea} from "@heroui/react";
import Header from "../../elements/Header/Header.tsx";

const AddWish = () => {
    return (
        <div className={styles.AddWishPage}>
            <div className={styles.content}>
                <Header />

                <div className={styles.form}>
                    <h2 className={styles.formTitle}>Добавить новый товар</h2>

                    <Input label="Email" placeholder="Enter your email" type="email" />
                    <Input isRequired label="Название" placeholder="Введите название товара" />
                    <Textarea
                        isRequired
                        label="Описание"
                        placeholder="Введите описание товара"
                        minRows={3}
                    />

                    <div className={styles.imageUploader}>
                        <label>Изображение товара</label>
                        <div className={styles.imagePreview}>
                            <Button color="primary" variant="flat" radius="full">
                                Загрузить изображение
                            </Button>
                        </div>
                    </div>

                    <Input
                        type="number"
                        label="Цена"
                        placeholder="Введите цену товара"
                        endContent={<div className="text-white">$</div>}
                    />

                    <Checkbox color="primary">
                        Приоритетный товар
                    </Checkbox>

                    <Button className={styles.saveButton}>
                        Сохранить товар
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddWish;