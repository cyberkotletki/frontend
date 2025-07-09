import { ReactNode } from "react";
import Header from "@/components/elements/Header/Header";
import styles from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: ReactNode;
  overlayHeader?: boolean;
  hasBanner?: boolean;
  bannerMode?: "compact" | "full";
}

const DefaultLayout = ({
  children,
  overlayHeader = false,
  hasBanner = false,
  bannerMode = "compact"
}: DefaultLayoutProps) => {
  const shouldOverlay = overlayHeader || hasBanner;

  return (
    <div className={styles.layout}>
      <div className={shouldOverlay ? `${styles.headerOverlay} ${styles[bannerMode]}` : styles.headerNormal}>
        <Header />
      </div>
      <main className={shouldOverlay ? styles.overlayContent : styles.content}>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
