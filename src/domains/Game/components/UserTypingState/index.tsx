"use client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { type FC, memo, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";
import { Attack } from "../Attack";
import { GameBoard } from "../GameBoard";
import { GameGrid } from "../GameGrid";

export const UserTypingState = () => {
  const { usersState, attack, userIDs } = useConnection();
  return (
    <GameGrid center={<GameBoard />}>
      <Attack attack={attack} userIDs={userIDs} />
      {usersState?.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
      {Array.from({ length: 98 - (usersState?.length ?? 0) }).map((_, i) => (
        <DummyEmptyItem key={`empty-${i}`} />
      ))}
    </GameGrid>
  );
};

type ItemProps = {
  id: string;
  name: string;
  life: number;
  seq: string;
  inputSeq: string;
  state: "connected" | "disconnected";
  rank: number | null;
};

const Item: FC<ItemProps> = memo(
  ({ id, name, life, seq, state, rank, inputSeq }) => {
    const [isAnimate, setIsAnimate] = useState(false);
    useEffect(() => {
      if (life === 0) {
        setIsAnimate(true);
        setTimeout(() => {
          setIsAnimate(false);
        }, 500);
      }
    }, [life]);
    return (
      <div>
        {rank !== 0 && <div className="h-7 rounded-sm border">{rank}</div>}
        <div
          className={cn("rounded-sm border", {
            "animate-fall-out": life === 0,
          })}
        >
          <span className="flex flex-row items-center">
            <p className="flex-grow text-xs">{name}</p>
            <span className="flex flex-row">
              {Array.from({ length: life }).map((_, i) => (
                <Heart
                  fill="pink"
                  className="h-3 w-3"
                  color="red"
                  key={`${name}-life-${i}`}
                />
              ))}
              {Array.from({ length: 3 - life }).map((_, i) => (
                <Heart className="h-3 w-3" key={`${name}-life-${3 - i}`} />
              ))}
            </span>
          </span>
          <span className={"flex flex-row text-[8px]"}>
            <p className="text-gray-400">{inputSeq}</p>
            <p className="text-gray-200">{seq.replace(inputSeq, "")}</p>
          </span>
        </div>
      </div>
    );
  }
);

const DummyEmptyItem = () => {
  return (
    <div className={cn("rounded-sm")}>
      <span className="flex flex-row items-center">
        <p className="flex-grow text-xs">{"     "}</p>
        <span className="flex flex-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="h-3 w-3" key={`${name}-life-${i}`} />
          ))}
        </span>
      </span>
      <span className={"flex flex-row text-[8px]"}>
        <p className="text-gray-400">{"          "}</p>
        <p className="text-gray-200">{"  "}</p>
      </span>
    </div>
  );
};
