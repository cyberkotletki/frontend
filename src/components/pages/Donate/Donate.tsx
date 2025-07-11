import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input, useUser,
} from "@heroui/react";
import { Switch } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Decimal from "decimal.js";

import styles from "./styles.module.scss";

import { Payment } from "@/types/payments";
import { MyButton } from "@/components/custom/MyButton.tsx";
import { useGetContract } from "@/hooks/useWallet.ts";
import {useUserProfile} from "@/hooks/useUserProfile.ts";
import {useSearchParams} from "react-router-dom";
import {getUserProfile} from "@/api/user.ts";

const DonateDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("Anonymous");
  const [message, setMessage] = useState("");
  const { getContract } = useGetContract();
  const {userProfile} = useUserProfile();
  const [searchParams] = useSearchParams();

  const toUUID = searchParams.get("uuid");
  const wishUUID = searchParams.get("wish");

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    if (checked) {
      setName("Anonymous");
    } else {
      setName("");
    }
  };

  const handleSubmit = async () => {
    const parsedAmount = new Decimal(amount);
    const isValidAmount =
      !parsedAmount.isNaN() && parsedAmount.greaterThanOrEqualTo(0.01);

    if (!isValidAmount) {
      alert("Invalid donation amount");

      return;
    }

    try {
      const weiAmount = BigInt(parsedAmount.mul(1e18).toFixed(0));
      const contract = await getContract();

      if (!toUUID || !wishUUID){
        return;
      }

      const profile = await getUserProfile(toUUID);


      const payment: Payment = {
        uuid: "1234",
        paymentUserData: {
          userName: name,
          messageText: message,
        },
        paymentInfo: {
          date: Math.floor(Date.now() / 1000),
          fromUUID: userProfile?.uuid || "",
          toUUID: toUUID,
          wishUUID: wishUUID,
          toAddress: "0x40c3e0f50f0f144b0da906398fc743fb3017e8ff",
          paymentType: 0,
        },
      };

      const tx = await contract.donate(
        payment.uuid,
        payment.paymentUserData,
        payment.paymentInfo,
        {
          value: weiAmount,
        },
      );

      await tx.wait();
      console.log("payment credited");

      alert("Donation successful");
      setAmount("");
      setMessage("");
      if (!isAnonymous) setName("");
      onClose();
    } catch (err) {
      console.error("Donation failed", err);
      alert("Something went wrong with the transaction.");
    }
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
        hideCloseButton={true}
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
