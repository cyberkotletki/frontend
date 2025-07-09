import { createAppKit } from "@reown/appkit/react";
import {useEffect, useState} from "react";
import { Input } from "@heroui/input";

import styles from "./styles.module.scss";

import { testNetwork } from "@/config/wallet.ts";
import { projectId, metadata, ethersAdapter } from "@/config/site.ts";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { Topic, UserTopics } from "@/types/user.ts";
import { TopicsCard } from "@/components/elements/TopicsCard/TopicsCard.tsx";
import {setUserName} from "@/stores/userSlice.tsx";

createAppKit({
  adapters: [ethersAdapter],
  networks: [testNetwork],
  metadata,
  projectId,
  themeMode: "dark",
  features: {
    analytics: true,
  },

  themeVariables: {
    "--w3m-accent": "#000000",
  },
});

enum RegistrationState {
  telegram,
  info,
  wallet,
}

type RegistrationData = {
  registrationState: RegistrationState;
  name: string,
  chosenTopics: Topic[];
}

const Register = () => {
  const [currentRegistrationState, setCurrentRegistrationState] =
    useState<RegistrationState>(RegistrationState.telegram);
  const [chosenTopics, setChosenTopics] = useState<Topic[]>([]);
  // const [name, SetName] = useState<string>();

  useEffect(() =>{
    if (!localStorage.getItem('registrationData')){
      return
    }
    // const data = JSON.parse(localStorage.getItem('registrationData') | '[]');
  });

  const triggerNewTopic = (topic: Topic): void => {
    setChosenTopics((prevTopics) => {
      const exists = prevTopics.some((t) => t.text === topic.text);

      if (exists) {
        return prevTopics.filter((t) => t.text !== topic.text);
      } else {
        return [...prevTopics, topic];
      }
    });
  };

  const checkTopicExistance = (topic: Topic) => {
    return chosenTopics.some((t) => t.text === topic.text);
  };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.page}>
        {currentRegistrationState == RegistrationState.telegram ? (
          <>
            <div
              className={
                "w-full flex flex-col text-center justify-center items-center"
              }
            >
              <img alt={"qwe"} src={"/register/register_camera.png"} />
              <span className={"text-[24px] font-regular"}>
                Start earning money doing what you love to do
              </span>
            </div>
            <MyButton
              className={styles.accentButton}
              color="vasily"
              radius="full"
              onClick={() => {
                setCurrentRegistrationState(RegistrationState.info);
              }}
            >
              Log in via Telegram
            </MyButton>
          </>
        ) : currentRegistrationState == RegistrationState.info ? (
          <>
            <div className={"w-full flex flex-col gap-10"}>
              <Input
                label={"Name"}
                value={name}
                onValueChange={setUserName}
                placeholder={"Your beautiful name"}
              />
              <div className={"flex flex-col gap-4"}>
                <span className={"text-2xl font-bold"}>Выберите категории</span>
                <ul className={"grid grid-cols-3 gap-x-0 gap-y-4"}>
                  {UserTopics.map((item, index) => (
                    <TopicsCard
                      key={index}
                      picked={checkTopicExistance(item)}
                      topic={item}
                      onPick={triggerNewTopic}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <MyButton
              className={styles.accentButton}
              color="vasily"
              radius="full"
              onClick={() => {
                setCurrentRegistrationState(RegistrationState.wallet);
              }}
            >
              Start earning money
            </MyButton>
          </>
        ) : (
          <>
            <div>
              <div
                className={
                  "flex flex-col text-center justify-center items-center"
                }
              >
                <img alt={"qwe"} src={"/register/register_wallet.png"} />
                <span className={"text-[24px] font-regular"}>
                  Firstly, you need to connect your crypto-wallet
                </span>
              </div>
              <div className={styles.connectToWalletButton}>
                <appkit-button />
              </div>
            </div>
            <MyButton
              className={styles.accentButton}
              color="vasily"
              radius="full"
            >
              Start earning money
            </MyButton>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Register;
