import { Avatar } from "@heroui/react";

import styles from "./styles.module.scss";

import DefaultLayout from "@/layouts/DefaultLayout";
import { mockHistoryData, HistoryItem } from "@/types/history";

const DonatHistoryPage = () => {
  const groupByDate = (items: HistoryItem[]) => {
    const groups: { [key: string]: HistoryItem[] } = {};

    items.forEach((item) => {
      const date = new Date(item.datetime);
      const dateKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    return groups;
  };

  const formatTime = (datetime: string) => {
    const date = new Date(datetime);

    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatWishUuid = (uuid: string) => {
    return uuid.substring(0, 8) + "...";
  };

  const groupedHistory = groupByDate(mockHistoryData.history);

  return (
    <DefaultLayout overlayMode={"header"} >
      <div className={styles.history}>
        <div className={styles.page}>
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date} className={styles.dateGroup}>
              <div className={styles.dateHeader}>{date}</div>
              {items.map((item, index) => (
                <div key={index}>
                  {item.type === "donate" ? (
                    <div className={styles.historyItem}>
                      <div className={styles.avatar}>
                        <Avatar
                          className="w-full h-full"
                          src={"./example.png"}
                        />
                      </div>
                      <div className={styles.info}>
                        <div className={styles.header}>
                          <div className={styles.user}>
                            <div className={styles.username}>
                              {item.username || "Anonymous"}
                            </div>
                            <div className={styles.datetime}>
                              {formatTime(item.datetime)}
                            </div>
                          </div>
                          <div className={styles.donateInfo}>
                            <div className={styles.amount}>
                              {item.amount} ETH
                            </div>
                            <div className={styles.wishUuid}>
                              {formatWishUuid(item.wish_uuid)}
                            </div>
                          </div>
                        </div>
                        {item.message && (
                          <div className={styles.message}>{item.message}</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.withdrawItem}>
                      <div className={styles.withdrawInfo}>
                        <div className={styles.withdrawLabel}>Withdraw</div>
                        <div className={styles.datetime}>
                          {formatTime(item.datetime)}
                        </div>
                      </div>
                      <div className={styles.withdrawAmount}>
                        -{item.amount} ETH
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DonatHistoryPage;
