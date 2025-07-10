import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
} from "@heroui/react";
import { Switch } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

import { Payment } from "@/types/payments";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { useGetContract } from "@/hooks/useWallet.ts";

const DonateDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("Anonymous");
  const [message, setMessage] = useState("");
  const { getContract } = useGetContract();

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    if (checked) {
      setName("Anonymous");
    } else {
      setName("");
    }
  };

  const handleSubmit = async () => {
    const contract = await getContract();

    //тут будет необходимо все данные подргружать и подставлять в структурку!
    const payment: Payment = {
      uuid: "1234",
      paymentUserData: {
        userName: "bubel_inator",
        messageText: "bububububu",
      },
      paymentInfo: {
        date: Math.floor(Date.now() / 1000),
        fromUUID: "375eb399-61f1-4a49-9d48-909dd8c74e52",
        toUUID: "9f1494c6-2261-43fe-8392-7cecc5a9587b",
        wishUUID: "9f1494c6-2261-43fe-8392-7cecc5a9587b",
        toAddress: "0x40c3e0f50f0f144b0da906398fc743fb3017e8ff",
        paymentType: 0,
      },
    };

    const tx = await contract.donate(
      payment.uuid,
      payment.paymentUserData,
      payment.paymentInfo,
      { value: BigInt(1e17) },
    );

    await tx.wait();
    console.log("payment credited");

    const user = await contract.users(
      "0x40c3e0f50f0f144b0da906398fc743fb3017e8ff",
    );

    console.log("user: ", user);

    const ownerBalance = await contract.ownerBalance();

    console.log("owner balacne: ", ownerBalance);
    // onClose();
  };

  return (
    <div className={styles.donateContainer}>
      <MyButton
        className="w-full"
        color="vasily"
        radius="full"
        onClick={onOpen}
      >
        Donate
      </MyButton>

      <Drawer
        backdrop="blur"
        className={styles.drawerContent}
        isOpen={isOpen}
        placement="bottom"
        size="3xl"
        onClose={onClose}
      >
        <DrawerContent>
          <DrawerHeader className={styles.header}>
            <div className={styles.drawerHeader}>Donate</div>
          </DrawerHeader>

          <DrawerBody>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <Input
                  isRequired
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                    label: "text-white",
                  }}
                  color="default"
                  label="Amount"
                  name="amount"
                  placeholder="Enter donation amount"
                  size="lg"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className={styles.switchContainer}>
                <Switch
                  defaultSelected
                  color="secondary"
                  isSelected={isAnonymous}
                  size="lg"
                  onValueChange={handleAnonymousChange}
                >
                  <div className={styles.switchContent}>
                    <span className={styles.switchLabel}>Anonymous</span>
                    <Icon
                      height={18}
                      icon="solar:mask-happly-outline"
                      width={18}
                    />
                  </div>
                </Switch>
              </div>
              {!isAnonymous && (
                <div className={styles.formGroup}>
                  <Input
                    classNames={{
                      input: "text-white",
                      inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                      label: "text-white",
                    }}
                    color="default"
                    isDisabled={isAnonymous}
                    label="Your Name"
                    name="name"
                    placeholder="Enter your name"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <Input
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-[#2a2a2a] border-[#3a3a3a]",
                    label: "text-white",
                  }}
                  color="default"
                  label="Message (optional)"
                  name="message"
                  placeholder="Add a message with your donation"
                  size="lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className={styles.drawerFooter}>
            <div className={styles.footerButtons}>
              <MyButton
                className={styles.footerButton}
                color="antivasily"
                radius="full"
                onClick={onClose}
              >
                Cancel
              </MyButton>
              <MyButton
                className={styles.footerButton}
                color="vasily"
                isDisabled={!amount}
                radius="full"
                onClick={handleSubmit}
              >
                Donate
              </MyButton>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DonateDrawer;
