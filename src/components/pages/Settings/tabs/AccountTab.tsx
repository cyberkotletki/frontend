import { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Dispatch } from "@reduxjs/toolkit";

import styles from "../styles.module.scss";

import { MyButton } from "@/components/custom/MyButton.tsx";
import { setUserName, addTopic, removeTopic } from "@/stores/userSlice.tsx";
import { UserProfileResponse } from "@/types/user";
import { updateUserAppearance } from "@/api/user";
import { useUserProfile } from "@/hooks/useUserProfile";

interface AccountTabProps {
  userProfile: UserProfileResponse | null;
  dispatch: Dispatch;
}

const AccountTab = ({ userProfile, dispatch }: AccountTabProps) => {
  const { updatePartialUserProfile } = useUserProfile();
  const [newTopic, setNewTopic] = useState("");
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [userName, setUserNameLocal] = useState(userProfile?.name || "");
  const [isChanged, setIsChanged] = useState(false);
  const [topics, setTopics] = useState<string[]>(userProfile?.topics || []);

  useEffect(() => {
    if (userProfile) {
      setUserNameLocal(userProfile.name || "");
      setTopics(userProfile.topics || []);
    }
  }, [userProfile]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameLocal(e.target.value);
    setIsChanged(true);
  };

  const handleAddTopic = () => {
    if (newTopic.trim() !== "") {
      setTopics((prev) => [...prev, newTopic.trim()]);

      dispatch(addTopic(newTopic.trim()));

      setNewTopic("");
      setIsAddingTopic(false);
      setIsChanged(true);
    }
  };

  const handleRemoveTopic = (topic: string) => {
    // Удаляем тему локально
    setTopics((prev) => prev.filter((t) => t !== topic));

    // Также используем Redux для синхронизации состояния
    dispatch(removeTopic(topic));

    setIsChanged(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateUserAppearance({
        name: userName,
        topics: topics,
      });

      dispatch(setUserName(userName));

      updatePartialUserProfile(updatedProfile);

      setIsChanged(false);
      alert("Account settings saved successfully");
    } catch (error) {
      console.error("Error saving account settings:", error);
      alert("Error saving account settings");
    }
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Basic Information</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username</label>
          <Input
            className={styles.input}
            placeholder="Enter username"
            type="text"
            value={userName}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Balance</label>
          <div className={styles.balanceValue}>
            {userProfile?.balance || 0} ETH
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Stream Categories</h2>
        <div className={styles.topicsContainer}>
          {topics && topics.length > 0 ? (
            <div className={styles.topicsList}>
              {topics.map((topic, index) => (
                <div key={index} className={styles.topic}>
                  <span>{topic}</span>
                  <button
                    className={styles.removeTopic}
                    onClick={() => handleRemoveTopic(topic)}
                  >
                    <Icon icon="solar:close-circle-bold" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noTopics}>No categories selected</div>
          )}

          {isAddingTopic ? (
            <div className={styles.addTopicForm}>
              <Input
                className={styles.topicInput}
                placeholder="Category name"
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
              <div className={styles.addTopicActions}>
                <MyButton color="primary" radius="sm" onClick={handleAddTopic}>
                  Add
                </MyButton>
                <MyButton
                  color="danger"
                  radius="sm"
                  onClick={() => {
                    setIsAddingTopic(false);
                    setNewTopic("");
                  }}
                >
                  Cancel
                </MyButton>
              </div>
            </div>
          ) : (
            <button
              className={styles.addTopicBtn}
              onClick={() => setIsAddingTopic(true)}
            >
              <Icon icon="solar:add-circle-bold" />
              Add category
            </button>
          )}
        </div>
      </div>

      {isChanged && (
        <div className={styles.actionButtons}>
          <MyButton
            color="primary"
            radius="full"
            size="lg"
            onClick={handleSaveChanges}
          >
            Save changes
          </MyButton>
        </div>
      )}
    </div>
  );
};

export default AccountTab;
