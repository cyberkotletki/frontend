import { cn } from "@heroui/react";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useSelector } from "react-redux";
import Decimal from "decimal.js";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { getUserProfile } from "@/stores/userSlice.tsx";
import { useGetContract } from "@/hooks/useWallet.ts";
//
// const currency = [
//   { key: "pol", label: "POL", symbol: "POL", icon: "cryptocurrency:pols" },
//   { key: "btc", label: "BTC", symbol: "BTC", icon: "cryptocurrency:btc" },
//   { key: "usdt", label: "USDT", symbol: "USDT", icon: "cryptocurrency:usdt" },
//   { key: "bnb", label: "BNB", symbol: "BNB", icon: "cryptocurrency:bnb" },
// ];

// моки!!!!
// const balances = {
//   eth: { amount: 15.01, usd: 15.55 },
//   btc: { amount: 0.05, usd: 1250.0 },
//   usdt: { amount: 1000.0, usd: 1000.0 },
//   bnb: { amount: 25.5, usd: 312.75 },
// };

const WithdrawalPage = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getContract } = useGetContract();
  const { address } = useAppKitAccount();
  const userProfile = useSelector(getUserProfile);
  const [currentBalance, setCurrentBalance] = useState<Decimal>(
    userProfile?.balance ? userProfile.balance : new Decimal(0),
  );
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    async function fetchBalance() {
      if (!address) return;
      const contract = await getContract();
      const balance = (await contract.users(address)).currentBalance;

      const value = new Decimal(balance).div(1e18);

      setCurrentBalance(value);
      setMax(value.toNumber());
      // dispatch(setUserBalance(balance));
    }
    fetchBalance();
  }, [getContract]);

  const handleWithdraw = async () => {
    const contract = await getContract();

    // if (!userProfile?.uuid) {
    //   throw new Error("uuid is null");
    // }
    const parsed = new Decimal(amount);

    if (parsed.isNaN() || parsed.lessThan(0.01)) {
      alert("Invalid amount");

      return;
    }
    const weiAmount = BigInt(parsed.mul(1e18).toFixed(0)); // или toDecimalPlaces(0)

    try {
      const tx = await contract.withdraw("00", userProfile?.uuid, weiAmount);

      await tx.wait();
    } catch (e) {
      console.error(e);
    }
  };
  //
  // const handleWithdrawal = async () => {
  //   if (!amount) {
  //     alert("Please fill in all required fields");
  //
  //     return;
  //   }
  //
  //   setIsLoading(true);
  //
  //   setTimeout(() => {
  //     alert(`Withdrawal request submitted for ${amount} `);
  //     setIsLoading(false);
  //     setAmount("");
  //   }, 2000);
  // };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={cn(styles.content, "mt-20")}>
        <div className={styles.form}>
          <h2 className={"font-bold text-6xl"}>
            {currentBalance.toString()} POL
          </h2>
          <span className={" text-white/50 text-sm"}>on wallet {address}</span>
          <div className={styles.formGroup}>
            <Input
              description={`Available: ${currentBalance} `}
              endContent={<div className={styles.currency}>POL</div>}
              label="Amount"
              max={max}
              min={10}
              placeholder={`from 0.01  to ${currentBalance} `}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <MyButton
              className="w-full"
              color="vasily"
              isDisabled={!amount}
              isLoading={isLoading}
              radius="full"
              size="xl"
              onPress={handleWithdraw}
            >
              {isLoading ? "Processing..." : "Withdraw"}
            </MyButton>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default WithdrawalPage;
