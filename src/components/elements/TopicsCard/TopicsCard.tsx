import { cn } from "@heroui/react";

import styles from "./styles.module.scss";

import { Topic } from "@/types/user.ts";

export interface TopicsCardProps {
  topic: Topic;
  picked: boolean;
  onPick: (topic: Topic) => void;
}

export const TopicsCard = ({ topic, picked, onPick }: TopicsCardProps) => {
  return (
    <div
      className={cn(
        "rounded-[28px] text-center w-[110px] h-[130px] flex flex-col items-center p-4 gap-[20px]",
        styles.card,
        picked ? styles.choosed : "",
      )}
      onClick={() => onPick(topic)}
    >
      <span className={"text-5xl"}>{topic.emoji}</span>
      <span className={"text-[20px]"}>{topic.text}</span>
    </div>
  );
};
