import { useState, useEffect } from "react";
import { Input, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import Banner from "@/components/elements/Banner/Banner.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { useAppDispatch, useAppSelector } from "@/stores/hooks.tsx";
import {
  setUserName,
  addTopic,
  removeTopic,
  getUserProfile,
} from "@/stores/userSlice.tsx";
import AppearanceTab from "./tabs/AppearanceTab";
import AccountTab from "./tabs/AccountTab";

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
            selectedKey={activeTab}
            onSelectionChange={setActiveTab as any}
            className={styles.tabs}
            color="primary"
          >
            <Tab key="account" title="Account Settings" className={styles.tab}>
              <AccountTab userProfile={userProfile} dispatch={dispatch} />
            </Tab>
            <Tab key="appearance" title="Appearance" className={styles.tab}>
              <AppearanceTab userProfile={userProfile} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
