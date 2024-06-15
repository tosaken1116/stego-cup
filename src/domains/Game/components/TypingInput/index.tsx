import CircularProgressBar from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { type FC, useCallback, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";

export const TypingInput: FC = () => {
  const { seq, handleTypingKey, handleFinishCurrentSequence } = useConnection();
  const [value, setValue] = useState("");
  const [keyStreak, setKeyStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft <= 0.05) {
        handleFinishCurrentSequence("failed");
        setTimeLeft(5);
        return;
      }
      setTimeLeft((prev) => prev - 0.05);
    }, 50);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinishCurrentSequence]);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.length > 1) {
        return;
      }
      setValue((prev) => {
        setKeyStreak((prev) => {
          return prev + 1;
        });
        const newValue = prev + e.key;
        if (newValue === seq.value) {
          handleFinishCurrentSequence("succeeded");
          return "";
        }
        if (seq.value.startsWith(newValue)) {
          handleTypingKey(newValue);
          return newValue;
        }
        setKeyStreak(0);
        return prev;
      });
    },
    [handleFinishCurrentSequence, seq, handleTypingKey]
  );
  const lestSeq = seq.value.replace(value, "");
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <span>
      <span className="text-gray-400">{value}</span>
      <span className="text-gray-200">{lestSeq}</span>
      <Timer time={5 - timeLeft} />
    </span>
  );
};

const StreakBar: FC<{ streak: number }> = ({ streak }) => {
  const level = Math.floor(streak / 20);
  const progress = streak % 20;
  return (
    <div className="relative h-4 w-48 rounded-full border-2 border-white">
      <div
        className={cn("absolute left-0 h-4", {
          "bg-green-500": level === 0,
          "bg-yellow-500": level === 1,
          "bg-red-500": level === 2,
        })}
        style={{
          width: `${progress / 20}%`,
        }}
      />
    </div>
  );
};

const Timer: FC<{ time: number }> = ({ time }) => {
  return (
    <div className="relative w-fit">
      <CircularProgressBar
        progress={time / 5}
        className={time > 3 ? "animate-pulse" : ""}
        style={{
          animationDuration: `${Math.max(5 - time, 0.2)}s`,
        }}
      />
      <span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        {(5 - time).toFixed(2)}s
      </span>
    </div>
  );
};
