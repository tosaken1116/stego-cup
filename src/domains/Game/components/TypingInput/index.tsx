import CircularProgressBar from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Pill } from "lucide-react";
import { type FC, useCallback, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";

export const TypingInput: FC = () => {
  const { seq, handleTypingKey, handleFinishCurrentSequence, lostLife } =
    useConnection();
  const [value, setValue] = useState("");
  const [keyStreak, setKeyStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft <= 0.05) {
        handleFinishCurrentSequence("failed");
        setTimeLeft(5);
        setValue("");
        lostLife();
        return;
      }
      setTimeLeft((prev) => prev - 0.05);
    }, 50);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinishCurrentSequence, lostLife]);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.length > 1) {
        return;
      }
      const newValue = value + e.key;
      if (seq.value.startsWith(newValue)) {
        handleTypingKey(newValue);
        setKeyStreak(Math.min(keyStreak + 1, 60));
        setValue(newValue);
      } else {
        setKeyStreak(0);
      }
      if (newValue === seq.value) {
        handleFinishCurrentSequence("succeeded");
        setValue("");
        setTimeLeft(5);
        return;
      }
    },
    [handleFinishCurrentSequence, seq, handleTypingKey, value, keyStreak]
  );
  const lestSeq = seq.value.replace(value, "");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <span>
      <span className="flex flex-row">
        <span className="flex-grow">
          <span className="text-gray-400">{value}</span>
          <span className="text-gray-200">{lestSeq}</span>
        </span>
        {seq.type === "heal" && <Pill className="text-green-500" />}
        <span className="pl-4 font-bold text-4xl text-primary">
          {seq.level}
        </span>
      </span>
      <Timer time={5 - timeLeft} />
      <StreakBar streak={keyStreak} />
    </span>
  );
};

const StreakBar: FC<{ streak: number }> = ({ streak }) => {
  const level = Math.floor(streak / 20);
  const progress = streak % 20;
  return (
    <div
      className={cn(
        "relative h-4 w-48 overflow-hidden rounded-full border-2 border-white",
        {
          "bg-green-500": level === 1,
          "bg-yellow-500": level === 2,
          "bg-orange-500": level === 3,
          "animate-shake": streak === 60,
        }
      )}
    >
      <div
        className={cn("absolute left-0 h-4", {
          "bg-green-500": level === 0,
          "bg-yellow-500": level === 1,
          "bg-orange-500": level === 2,
          "bg-red-500": level === 3,
        })}
        style={{
          width: `${(progress / 20) * 192}px`,
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
