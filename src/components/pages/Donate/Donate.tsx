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

import { MyButton } from "@/components/custom/MyButton.tsx";

const DonateDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("Anonymous");
  const [message, setMessage] = useState("");

  const handleAnonymousChange = (checked: boolean) => {
    setIsAnonymous(checked);
    if (checked) {
      setName("Anonymous");
    } else {
      setName("");
    }
  };

  const handleSubmit = () => {
    console.log("Submitted donation:", { amount, name, message, isAnonymous });
    onClose();
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
