import { Divider } from "@heroui/react";
import Banner from "../../elements/Banner/Banner.tsx";
import styles from "./styles.module.scss";
import { Icon } from '@iconify/react';
import {MyButton} from "@/components/elements/MyComponents/MyButton.tsx";



const ProfilePage = () => {
  return (
      <div className={styles.ProfilePage}>
          <Banner/>
          <div className={styles.content}>

              <div className={styles.profileOptions}>
                  <div className={styles.option}>
                      <Icon icon="solar:gift-line-duotone" className={styles.icon}/>
                      <div className={styles.text}>My wishes</div>
                  </div>
                  <div className={styles.option}>
                      <Icon icon="solar:clock-circle-linear" className={styles.icon}/>

                      <div className={styles.text}>Transactions history</div>
                  </div>
                  <div className={styles.option}>
                      <Icon icon="solar:diagram-up-bold-duotone" className={styles.icon}/>

                      <div className={styles.text}>Analytics</div>
                  </div>
                  <div className={styles.option}>
                      <Icon icon="solar:card-recive-line-duotone" className={styles.icon}/>

                      <div className={styles.text}>Withdrawal</div>
                  </div>
                  <Divider className="my-4"/>
                  <div className={styles.option}>
                      <Icon icon="solar:settings-linear" className={styles.icon}/>

                      <div className={styles.text}>Settings</div>
                  </div>
                  <div className={styles.option}>
                      <Icon icon="solar:paint-roller-line-duotone" className={styles.icon}/>

                      <div className={styles.text}>Appearance</div>
                  </div>
              </div>

              <div>
                  <MyButton radius="full" color="danger" size="lg" >Sign out</MyButton>
              </div>
          </div>

      </div>
  );
};

export default ProfilePage;
