import { Input } from "@heroui/input";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { type Topic, UserTopics } from "@/types/user.ts";
import { TopicsCard } from "@/components/elements/TopicsCard/TopicsCard.tsx";
import { useLocalStorage } from "@/hooks/useRegister";
import { useWalletConnectionState } from "@/hooks/useWallet.ts";

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
  const [registrationData, setRegistrationData, clearRegistrationData] =
    useLocalStorage("registrationData", defaultRegistrationData, {
      validator: isValidRegistrationData,
    });

  const { registrationState, name, chosenTopics } = registrationData;
  const { isConnected } = useWalletConnectionState();

  console.log(isConnected);

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
                "w-full flex flex-col text-center justify-center items-center"
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
            <div className={"w-full flex flex-col gap-10"}>
              <Input
                label={"Name"}
                placeholder={"Your beautiful name"}
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
                color="vasily"
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
