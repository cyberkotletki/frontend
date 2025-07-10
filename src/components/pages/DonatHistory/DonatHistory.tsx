import { Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import styles from "./styles.module.scss";

import { getUserHistory } from "@/api/user";
import DefaultLayout from "@/layouts/DefaultLayout";
import { HistoryItem, HistoryResponse } from "@/types/history";

const DonatHistoryPage = () => {
  const [historyData, setHistoryData] = useState<HistoryResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const data = await getUserHistory(currentPage);
        setHistoryData(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentPage]);

  const groupByDate = (items: HistoryItem[]) => {
    const groups: { [key: string]: HistoryItem[] } = {};

    items.forEach((item) => {
      const date = new Date(item.datetime);
      const dateKey = date.toLocaleDateString("ru-RU", {
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const groupedHistory = historyData?.history ? groupByDate(historyData.history) : {};

  const showPagination = historyData?.history && historyData.history.length === 20;

  return (
    <DefaultLayout overlayMode={"header"}>
      <div className={styles.history}>
        <div className={styles.page}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : historyData?.history?.length === 0 ? (
            <div className={styles.emptyHistory}>
              История пуста
            </div>
          ) : (
            <>
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

              {showPagination && (
                <div className={styles.pagination}>
                  <button
                    className={styles.paginationButton}
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                  >
                    <Icon icon="solar:alt-arrow-left-outline" />
                  </button>
                  <span className={styles.pageNumber}>
                    Страница {currentPage}
                  </span>
                  <button
                    className={styles.paginationButton}
                    onClick={handleNextPage}
                    disabled={historyData?.history?.length < 20}
                  >
                    <Icon icon="solar:alt-arrow-right-outline" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DonatHistoryPage;
