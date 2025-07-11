import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";

import styles from "./styles.module.scss";
import AppearanceTab from "./tabs/AppearanceTab";
import AccountTab from "./tabs/AccountTab";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { useAppDispatch, useAppSelector } from "@/stores/hooks.tsx";
import { getUserProfile } from "@/stores/userSlice.tsx";

const Settings = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(getUserProfile);
  const [activeTab, setActiveTab] = useState("account");

  return (
    <DefaultLayout overlayMode={"banner_compact"}>
      <div className={styles.settingsPage}>
        <Banner mode="compact" />

        <div className={styles.content}>
          <Tabs
            className={styles.tabs}
            color="primary"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab as any}
          >
            <Tab key="account" className={styles.tab} title="Account Settings">
              <AccountTab dispatch={dispatch} userProfile={userProfile} />
            </Tab>
            <Tab key="appearance" className={styles.tab} title="Appearance">
              <AppearanceTab userProfile={userProfile} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
