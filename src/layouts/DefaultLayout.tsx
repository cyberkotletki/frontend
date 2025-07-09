import { ReactNode } from "react";

import styles from "./DefaultLayout.module.scss";

import Header from "@/components/elements/Header/Header";

interface DefaultLayoutProps {
  children: ReactNode;
  overlayMode: "none" | "header" | "banner_full" | "banner_compact";
}

const DefaultLayout = ({
  children,
  overlayMode = "none",
}: DefaultLayoutProps) => {
  const shouldOverlay = overlayMode !== "none";
  const bannerMode =
    overlayMode === "banner_full"
      ? "full"
      : overlayMode === "banner_compact"
        ? "compact"
        : "";

  return (
    <div className={styles.layout}>
      {overlayMode !== "none" && (
        <div
          className={
            shouldOverlay
              ? `${styles.headerOverlay} ${bannerMode ? styles[bannerMode] : ""}`
              : styles.headerNormal
          }
        >
          <Header />
        </div>
      )}
      <main className={shouldOverlay ? styles.overlayContent : styles.content}>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
