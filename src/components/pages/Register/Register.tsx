import { createAppKit } from "@reown/appkit/react";
import { useState } from "react";

import styles from "./styles.module.scss";

import {testNetwork} from "@/config/wallet.ts";
import {  projectId, metadata, ethersAdapter } from "@/config/site.ts";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";

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
  }
});

const Register = () => {
  const [loggedInTelegram, setLoggedInTelegram] = useState<boolean>(false);
  const [walletProvided] = useState<boolean>(false);
  const loginViaTelegram = () => {
    setLoggedInTelegram(true);
  };



  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.page}>
        {!loggedInTelegram ? (
          <>
            <div
              className={
                "flex flex-col text-center justify-center items-center"
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
              onClick={loginViaTelegram}
            >
              Log in via Telegram
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
              disabled={!walletProvided}
              radius="full"
              onClick={loginViaTelegram}
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
