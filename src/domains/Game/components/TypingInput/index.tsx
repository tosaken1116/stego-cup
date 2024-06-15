import CircularProgressBar from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { type FC, useCallback, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";

export const TypingInput: FC = () => {
  const { seq, handleTypingKey, handleFinishCurrentSequence } = useConnection();
  const [value, setValue] = useState("");
  const [timeSec, setTimeSec] = useState(0);
  const [keyStreak, setKeyStreak] = useState(0);
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
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeSec >= 5) {
        handleFinishCurrentSequence("failed");
        clearInterval(timer);
      }
      setTimeSec((prev) => prev + 0.05);
    }, 50);
    return () => {
      clearInterval(timer);
    };
  }, [handleFinishCurrentSequence, timeSec]);
  return (
    <span>
      <span className="text-gray-400">{value}</span>
      <span className="text-gray-200">{lestSeq}</span>
      <div className="relative w-fit">
        <CircularProgressBar
          progress={timeSec / 5}
          className={timeSec > 3 ? "animate-pulse" : ""}
          style={{
            animationDuration: `${Math.max(5 - timeSec, 0.2)}s`,
          }}
        />
        <span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
          {(5 - timeSec).toFixed(2)}s
        </span>
        <StreakBar streak={keyStreak} />
      </div>
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
