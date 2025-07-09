import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

const Uploader: React.FC = () => {
  return (
    <div className={styles.uploader}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} icon="solar:upload-minimalistic-linear" />
      </div>
      <div className={styles.rows}>
        <div className={styles.uploadTitle}>Upload image</div>
        <div className={styles.uploadSubtitle}>
          <u className={styles.underlinedText}>choose from disk</u> or drag and
          drop file here
        </div>
      </div>
    </div>
  );
};

export default Uploader;
