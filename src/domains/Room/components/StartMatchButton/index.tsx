"use client";
import {
  withClickSound,
  withHoverSound,
} from "@/components/functional/withSound";
import { KeyButton } from "@/components/ui/keyButton";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { useRoomUseCase } from "../../usecase";
import { CreateRoomButton } from "../CreateRoom";
import { DinosaurGame } from "../DinosaurGame";
import { FinishMatchToast } from "../FinishMatchToast";
import { TypingGameOffline } from "../TypingGameOffline";

export const StartMatch: FC = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 h-[calc(100vh_-_48px)] w-2/3">
        <TypingGameOffline />
      </div>

      <div className="flex flex-col gap-12 p-8">
        {withClickSound(
          withHoverSound(CreateRoomButton, "cursor.mp3"),
          "decision.mp3"
        )()}
        {withClickSound(
          withHoverSound(StartMatchButton, "cursor.mp3"),
          "decision.mp3"
        )()}
      </div>
    </div>
  );
};

const StartMatchButton = () => {
  const { token } = useAuthUseCase();
  const { handleMatching, isMatching } = useRoomUseCase();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    const id = await handleMatching(token ?? "");
    setOpen(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push(`/rooms/${id}`);
  };
  return (
    <>
      <KeyButton onClick={handleClick} type="button">
        START MATCH!
      </KeyButton>
      {isMatching && (
        <div className="fixed top-0 left-0 h-[calc(100vh_-_48px)] w-2/3">
          <DinosaurGame />
        </div>
      )}
      {open && (
        <div className="fixed top-0 left-0 z-50 h-screen w-full bg-black">
          <FinishMatchToast />
        </div>
      )}
    </>
  );
};
