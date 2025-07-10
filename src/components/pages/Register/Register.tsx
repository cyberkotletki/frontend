import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";
import { useAppKitAccount } from "@reown/appkit/react";

import styles from "./styles.module.scss";

import {
  TelegramLoginButton,
  TelegramUser,
} from "@/components/elements/TelegramAuth/TelegramAuth.tsx";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { type Topic, UserTopics } from "@/types/user.ts";
import { TopicsCard } from "@/components/elements/TopicsCard/TopicsCard.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { useGetContract, useWalletConnectionState } from "@/hooks/useWallet.ts";
import { routes } from "@/app/App.routes.ts";
import { postRegisterUser, postVerifyTelegram } from "@/api/auth.ts";

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

  //уже поздно менять название))))
  const [toTheWaletButtonEnabled, setToTheWaletButtonEnabled] =
    useState<boolean>(false);
  const { registrationState, name, chosenTopics } = registrationData;
  const { isConnected } = useWalletConnectionState();
  const navigate = useNavigate();
  const { getContract } = useGetContract();

  const { address } = useAppKitAccount();

  const [verified, setVerified] = useState<boolean>(true); //TODO: change default verfiication state to false
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);

  const handleVerifyingTelegram = async (): Promise<void> => {
    if (!tgUser) {
      return;
    }
    setIsLoading(true);
    try {
      const resp = await postVerifyTelegram(tgUser);

      if (!resp) {
        addToast({
          title: "wrong authentication, try again",
        });

        return;
      }
      setVerified(true);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  //hooks
  useEffect(() => {
    if (registrationData.name != "" && chosenTopics.length > 0) {
      setToTheWaletButtonEnabled(true);

      return;
    }
    setToTheWaletButtonEnabled(false);
  }, [registrationData]);

  const register = async (): Promise<void> => {
    try {
      setIsLoading(true)
      if (address && chosenTopics && name) {
        const uuid: string = await postRegisterUser({
          polygon_wallet: address,
          topics: chosenTopics.map((item) => item.text),
          name: name,
        });
        const contract = await getContract();

        console.log({
          name: registrationData.name,
          uuid: uuid,
          topics: registrationData.chosenTopics.map((t) => t.text),
        });
        const tx = await contract.registerUser(
          registrationData.name,
          uuid,
          registrationData.chosenTopics.map((item) => item.text),
        );

        await tx.wait();
        console.log("user registered");
        navigate(routes.profile());
      }
    } catch (e: any) {
      console.error("failed to register user ", e);
    } finally {
      setIsLoading(false)
    }
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

            <TelegramLoginButton
              botName="donly_test_bot"
              onAuth={(tguser) => {
                setTgUser(tguser);
                handleVerifyingTelegram();
                setCurrentRegistrationState(RegistrationState.info);
              }}
            />
            <MyButton
              className={styles.accentButton}
              color={verified ? "vasily" : "antivasily"}
              disabled={!verified}
              radius="full"
              isLoading={isLoading}
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
                isLoading={isLoading}
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
