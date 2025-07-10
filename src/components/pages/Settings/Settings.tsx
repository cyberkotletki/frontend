import { useState, useEffect } from "react";
import { Input } from "@heroui/react";
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

const Settings = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(getUserProfile); // Изменено с user на userProfile
  const [newTopic, setNewTopic] = useState("");
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [userName, setUserNameLocal] = useState(userProfile?.name || ""); // Добавлена проверка на null/undefined

  useEffect(() => {
    if (userProfile?.name) {
      setUserNameLocal(userProfile.name);
    }
  }, [userProfile]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUserNameLocal(value);
    dispatch(setUserName(value));
  };

  const handleRemoveTopic = (topic: string) => {
    dispatch(removeTopic(topic));
  };

  const handleAddTopic = () => {
    if (
      newTopic.trim() &&
      userProfile?.topics &&
      !userProfile.topics.includes(newTopic.trim())
    ) {
      dispatch(addTopic(newTopic.trim()));
      setNewTopic("");
      setIsAddingTopic(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTopic();
    }
  };

  return (
    <DefaultLayout overlayMode={"banner_full"}>
      <div className={styles.settings}>
        <Banner mode="full" showName={false} />
        <div className={styles.content}>
          <div className={styles.section}>
            <Input
              className={styles.nameInput}
              label="User Name"
              value={userName}
              onChange={handleNameChange}
            />
          </div>

          <div className={styles.section}>
            <div className={styles.topicsHeader}>
              <h2 className={styles.sectionTitle}>Your topics</h2>
            </div>

            <div className={styles.chipsContainer}>
              {userProfile?.topics?.map((topic, index) => (
                <div key={index} className={styles.chip}>
                  <span className={styles.chipText}>{topic}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveTopic(topic)}
                  >
                    <Icon icon="solar:close-circle-bold" />
                  </button>
                </div>
              ))}

              {isAddingTopic ? (
                <div className={styles.addChip}>
                  <Input
                    placeholder="Enter topic"
                    size="sm"
                    value={newTopic}
                    onKeyPress={handleKeyPress}
                    onValueChange={setNewTopic}
                  />
                  <div className={styles.addActions}>
                    <button
                      className={styles.confirmButton}
                      onClick={handleAddTopic}
                    >
                      <Icon icon="solar:check-circle-bold" />
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsAddingTopic(false);
                        setNewTopic("");
                      }}
                    >
                      <Icon icon="solar:close-circle-bold" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className={styles.addNewChip}
                  onClick={() => setIsAddingTopic(true)}
                >
                  <Icon icon="solar:add-circle-bold" />
                  <span>Add new</span>
                </button>
              )}
            </div>
          </div>

          <div className={styles.buttons}>
            <MyButton
              className="w-full"
              color="antivasily"
              radius="full"
              size="xl"
            >
              Connect wallet
            </MyButton>
            <MyButton className="w-full" color="vasily" radius="full" size="xl">
              Save
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
