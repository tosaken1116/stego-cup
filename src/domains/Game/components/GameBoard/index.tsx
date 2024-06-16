import { useAudio } from "@/hooks/audio";
import { cn } from "@/lib/utils";
import { Heart, Sparkle } from "lucide-react";
import { type FC, use, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";
import type { Difficult } from "../../types";
import { TypingInput } from "../TypingInput";

export const GameBoard = () => {
  const { difficult, life, rank } = useConnection();
  if (life <= 0) {
    return <GameOver rank={rank} />;
  }
  return (
    <span className="flex flex-col items-center justify-center gap-x-4">
      <DifficultProgress difficult={difficult} />
      <TypingInput />
      <Life life={life} />
    </span>
  );
};

const GameOver: FC<{ rank: number | null }> = ({ rank }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-4xl">ゲームオーバー</p>
      <p className="text-2xl">あなたの順位: {rank}位</p>
    </div>
  );
};

const DifficultProgress = ({
  difficult = { difficult: 0, cause: "" },
}: {
  difficult: Difficult | null;
}) => {
  const [isAnimate, setIsAnimate] = useState({
    heal: false,
    damage: false,
  });
  const level = Math.floor((difficult?.difficult ?? 0) / 100) + 1;
  const progress = (difficult?.difficult ?? 0) % 100;
  useEffect(() => {
    if (difficult?.cause === "damage") {
      setIsAnimate({
        ...isAnimate,
        damage: true,
      });
      setTimeout(() => {
        setIsAnimate({
          ...isAnimate,
          damage: false,
        });
      }, 500);
    }
    if (difficult?.cause === "heal") {
      setIsAnimate({
        ...isAnimate,
        heal: true,
      });
      setTimeout(() => {
        setIsAnimate({
          ...isAnimate,
          heal: false,
        });
      }, 500);
    }
  }, [difficult?.cause, progress]);
  return (
    <span className="relative">
      <span className="absolute z-10">{isAnimate.heal && <HealEffect />}</span>
      <div
        className={cn(
          "relative h-[10px] w-[300px] overflow-hidden rounded-md border",
          {
            "bg-orange-500": level === 5,
            "bg-yellow-400": level === 4,
            "bg-green-400": level === 3,
            "bg-blue-400": level === 2,
            "bg-gray-400": level === 1,
            "animate-shake": isAnimate.damage,
          }
        )}
      >
        <div
          className={cn(
            "absolute h-[10px] border-gray-500 border-r-2 transition-[width]",
            {
              "bg-red-600": level === 5,
              "bg-orange-500": level === 4,
              "bg-yellow-400": level === 3,
              "bg-green-400": level === 2,
              "bg-blue-400": level === 1,
            }
          )}
          style={{ width: progress * 3 }}
        />
      </div>
    </span>
  );
};

const HealEffect = () => {
  const { play, stop } = useAudio("heal.mp3");
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    play();
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
      stop();
    }, 500);
  }, [play, stop]);
  if (!isAnimate) {
    return null;
  }
  return (
    <div className="relative h-[20px] w-[300px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <Sparkle
          color="#4ADE80"
          fill="#4ADE80"
          key={i}
          size={20 - i * 2}
          className="absolute animate-fade-in-up text-blue-500"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const Life = ({ life }: { life: number }) => {
  return (
    <div className="flex flex-row">
      {Array.from({ length: life }).map((_, i) => (
        <Heart
          fill="pink"
          className="h-12 w-12 animate-scale duration-500"
          color="red"
          style={{ animationDelay: `${i * 0.1}s` }}
          key={i}
        />
      ))}
      {Array.from({ length: 5 - life }).map((_, i) => (
        <Heart className="h-12 w-12 animate-scale" key={3 - i} />
      ))}
    </div>
  );
};
