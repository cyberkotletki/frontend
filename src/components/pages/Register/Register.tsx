import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { type Topic, UserTopics } from "@/types/user.ts";
import { TopicsCard } from "@/components/elements/TopicsCard/TopicsCard.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { useGetContract, useWalletConnectionState } from "@/hooks/useWallet.ts";
import { routes } from "@/app/App.routes.ts";

enum RegistrationState {
  telegram = 0,
  info = 1,
  wallet = 2,
}

type RegistrationData = {
  registrationState: RegistrationState;
  name: string;
  chosenTopics: Topic[];
};

const defaultRegistrationData: RegistrationData = {
  registrationState: RegistrationState.telegram,
  name: "",
  chosenTopics: [],
};

const isValidRegistrationData = (value: any): value is RegistrationData => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    Array.isArray(value.chosenTopics) &&
    typeof value.registrationState === "number" &&
    value.registrationState >= 0 &&
    value.registrationState <= 2
  );
};

const Register = () => {
  //reactive states and variables
  const [registrationData, setRegistrationData, clearRegistrationData] =
    useLocalStorage("registrationData", defaultRegistrationData, {
      validator: isValidRegistrationData,
    });
  const [toTheWaletButtonEnabled, setToTheWaletButtonEnabled] =
    useState<boolean>(false);
  const { registrationState, name, chosenTopics } = registrationData;
  const { isConnected } = useWalletConnectionState();
  const navigate = useNavigate();
  const { getContract } = useGetContract();

  //hooks
  useEffect(() => {
    if (registrationData.name != "" && chosenTopics.length > 0) {
      setToTheWaletButtonEnabled(true);

      return;
    }
    setToTheWaletButtonEnabled(false);
  }, [registrationData]);

  const register = async () => {
    const contract = await getContract();

    console.log({
      name: registrationData.name,
      uuid: uuidv4(),
      topics: registrationData.chosenTopics.map((t) => t.text),
    });
    const tx = await contract.registerUser(
      registrationData.name,
      uuidv4(),
      registrationData.chosenTopics.map((item) => item.text),
    );

    await tx.wait();
    console.log("user registered");
    navigate(routes.profile());
  };

  //functions

  const updateRegistrationData = (updates: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...updates }));
  };

  const triggerNewTopic = (topic: Topic): void => {
    const newTopics = chosenTopics.some((t) => t.text === topic.text)
      ? chosenTopics.filter((t) => t.text !== topic.text)
      : [...chosenTopics, topic];

    updateRegistrationData({ chosenTopics: newTopics });
  };

  const checkTopicExistance = (topic: Topic) => {
    return chosenTopics.some((t) => t.text === topic.text);
  };

  const handleNameChange = (value: string) => {
    updateRegistrationData({ name: value });
  };

  const setCurrentRegistrationState = (state: RegistrationState) => {
    updateRegistrationData({ registrationState: state });
  };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.page}>
        {registrationState === RegistrationState.telegram ? (
          <>
            <div
              className={
                "mt-20 w-full flex flex-col text-center justify-center items-center"
              }
            >
              <img
                alt={"registration camera"}
                src={"/register/register_camera.png"}
              />
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
        ) : registrationState === RegistrationState.info ? (
          <>
            <div className={"w-full mt-20 flex flex-col gap-10"}>
              <Input
                label={"Name"}
                placeholder={"Your beautiful name"}
                required={true}
                value={name}
                onValueChange={handleNameChange}
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
            <div className="flex gap-2">
              <MyButton
                className={styles.accentButton}
                color={toTheWaletButtonEnabled ? "vasily" : "antivasily"}
                disabled={!toTheWaletButtonEnabled}
                radius="full"
                onClick={() => {
                  setCurrentRegistrationState(RegistrationState.wallet);
                }}
              >
                Start earning money
              </MyButton>
              <MyButton
                color="default"
                radius="full"
                variant="bordered"
                onClick={clearRegistrationData}
              >
                Clear Data
              </MyButton>
            </div>
          </>
        ) : (
          <>
            <div>
              <div
                className={
                  "flex flex-col text-center justify-center items-center"
                }
              >
                <img
                  alt={"registration wallet"}
                  src={"/register/register_wallet.png"}
                />
                <span className={"text-[24px] font-regular"}>
                  Firstly, you need to connect your crypto-wallet
                </span>
              </div>
              <div className={styles.connectToWalletButton}>
                <appkit-button />
              </div>
            </div>
            <div className="flex gap-2">
              <MyButton
                className={styles.accentButton}
                color={isConnected ? "vasily" : "antivasily"}
                disabled={!isConnected}
                radius="full"
                onPress={register}
              >
                Start earning money
              </MyButton>
              <MyButton
                color="default"
                radius="full"
                variant="bordered"
                onClick={clearRegistrationData}
              >
                Clear Data
              </MyButton>
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Register;
