import { FC } from "react";

import styles from "./styles.module.scss";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ size = "md", fullPage = false }) => {
  return (
    <div
      className={`${styles.spinnerContainer} ${fullPage ? styles.fullPage : ""}`}
    >
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
};

export default Spinner;
