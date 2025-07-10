import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

import styles from "./styles.module.scss";

import Spinner from "@/components/elements/Spinner/Spinner";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";
import { MyButton } from "@/components/custom/MyButton.tsx";

const currency = [
  { key: "eth", label: "ETH", symbol: "ETH", icon: "cryptocurrency:eth" },
  { key: "btc", label: "BTC", symbol: "BTC", icon: "cryptocurrency:btc" },
  { key: "usdt", label: "USDT", symbol: "USDT", icon: "cryptocurrency:usdt" },
  { key: "bnb", label: "BNB", symbol: "BNB", icon: "cryptocurrency:bnb" },
];

// моки!!!!
const balances = {
  eth: { amount: 15.01, usd: 15.55 },
  btc: { amount: 0.05, usd: 1250.0 },
  usdt: { amount: 1000.0, usd: 1000.0 },
  bnb: { amount: 25.5, usd: 312.75 },
};

const WithdrawalPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("eth");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentBalance = balances[selectedCurrency as keyof typeof balances];
  const selectedCurrencyData = currency.find((c) => c.key === selectedCurrency);

  const handleWithdrawal = async () => {
    if (!amount) {
      alert("Please fill in all required fields");

      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      alert(
        `Withdrawal request submitted for ${amount} ${selectedCurrencyData?.symbol}`,
      );
      setIsLoading(false);
      setAmount("");
    }, 2000);
  };

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.content}>
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <Spinner size="lg" />
          </div>
        )}
        <div className={styles.course}>
          <div className={styles.title}>Available for withdrawal</div>
          <div className={styles.amount}>
            {Object.entries(balances).map(([key, balance]) => {
              const currencyItem = currency.find((c) => c.key === key);

              return (
                <div key={key} className={styles.balanceItem}>
                  <Icon
                    height={20}
                    icon={currencyItem?.icon || ""}
                    width={20}
                  />
                  <span>
                    {balance.amount} {currencyItem?.symbol}
                    <span className={styles.usdValue}>~ ${balance.usd}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <Autocomplete
              defaultItems={currency}
              label="Currency"
              placeholder="Select currency"
              selectedKey={selectedCurrency}
              onSelectionChange={(key) => setSelectedCurrency(key as string)}
            >
              {(item) => (
                <AutocompleteItem
                  key={item.key}
                  startContent={
                    <Icon height={20} icon={item.icon} width={20} />
                  }
                >
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          <div className={styles.formGroup}>
            <Input
              description={`Available: ${currentBalance?.amount} ${selectedCurrencyData?.symbol}`}
              endContent={
                <div className={styles.currency}>
                  <Icon
                    height={16}
                    icon={selectedCurrencyData?.icon || ""}
                    width={16}
                  />
                  <span>{selectedCurrencyData?.symbol}</span>
                </div>
              }
              label="Amount"
              placeholder={`from 0.01 ${selectedCurrencyData?.symbol} to ${currentBalance?.amount} ${selectedCurrencyData?.symbol}`}
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
              onPress={handleWithdrawal}
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
