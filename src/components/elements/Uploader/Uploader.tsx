import { Icon } from "@iconify/react";
import { useRef, useState, useCallback } from "react";
import { Spinner } from "@heroui/react";

import styles from "./styles.module.scss";

import { getImageUrl, ImageType, uploadImage } from "@/api/images";

interface UploaderProps {
  onImageUploaded?: (imageUrl: string, imageId: number) => void;
  onImageDeleted?: () => void;
  defaultImage?: string;
  type?: ImageType;
}

const Uploader: React.FC<UploaderProps> = ({
  onImageUploaded,
  onImageDeleted,
  defaultImage,
  type = "wish",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const createLocalPreview = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const localPreviewUrl = e.target?.result as string;

        setPreviewUrl(localPreviewUrl);

        if (onImageUploaded) {
          const tempId = Math.floor(Math.random() * 10000) + 1;

          onImageUploaded(localPreviewUrl, tempId);
        }
      };
      reader.readAsDataURL(file);
    },
    [onImageUploaded],
  );

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, загрузите файл изображения");

        return;
      }

      createLocalPreview(file);

      setIsLoading(true);
      setError(null);

      try {
        const imageId = await uploadImage(file, type);

        const imageUrl = getImageUrl(imageId);

        if (onImageUploaded) {
          onImageUploaded(imageUrl, imageId);
        }
      } catch (err: any) {
        console.error("Error uploading image:", err);
        setError(
          err.error ||
            "Ошибка загрузки на сервер. Изображение доступно только локально.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onImageUploaded, type, createLocalPreview],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];

        processFile(file);
      }
    },
    [processFile],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        processFile(file);
      }
    },
    [processFile],
  );

  const handleChooseFileClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleDeleteImage = useCallback(() => {
    setPreviewUrl(null);
    setError(null);

    if (onImageDeleted) {
      onImageDeleted();
    }
  }, [onImageDeleted]);

  return (
    <div className={styles.uploaderContainer}>
      <input
        ref={fileInputRef}
        accept="image/*"
        className={styles.fileInput}
        id="imageUpload"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileInputChange}
      />

      {!previewUrl && (
        <div
          className={`${styles.uploader} ${isDragging ? styles.dragging : ""} ${
            isLoading ? styles.loading : ""
          }`}
          onClick={handleChooseFileClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner color="primary" size="lg" />
              <div className={styles.loadingText}>Загрузка...</div>
            </div>
          ) : (
            <>
              <div className={styles.iconWrapper}>
                <Icon
                  className={styles.icon}
                  icon="solar:upload-minimalistic-linear"
                />
              </div>
              <div className={styles.rows}>
                <div className={styles.uploadTitle}>Upload image</div>
                <div className={styles.uploadSubtitle}>
                  <u className={styles.underlinedText}>choose from disk</u> or
                  drag and drop file here
                </div>
                {error && <div className={styles.errorText}>{error}</div>}
              </div>
            </>
          )}
        </div>
      )}

      {previewUrl && (
        <div className={styles.previewContainer}>
          <img alt="Preview" className={styles.previewImage} src={previewUrl} />
          {error && (
            <div className={styles.previewErrorBadge}>
              <Icon
                className={styles.errorIcon}
                icon="solar:danger-triangle-bold"
              />
              <span>Локальное превью</span>
            </div>
          )}
          <div className={styles.previewControls}>
            <button
              className={styles.previewControlBtn}
              title="Edit"
              onClick={handleChooseFileClick}
            >
              <Icon icon="solar:pen-2-bold" />
            </button>
            <button
              className={styles.previewControlBtn}
              title="Delete"
              onClick={handleDeleteImage}
            >
              <Icon icon="solar:trash-bin-minimalistic-bold" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploader;
