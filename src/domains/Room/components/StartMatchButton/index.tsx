"use client";
import { KeyButton } from "@/components/ui/keyButton";
import { type FC, useState } from "react";
import { useRoomUseCase } from "../../usecase";
import { CreateRoomButton } from "../CreateRoom";
import { DinosaurGame } from "../DinosaurGame";
import { FinishMatchToast } from "../FinishMatchToast";
import { TypingGameOffline } from "../TypingGameOffline";

export const StartMatch: FC = () => {
	const { isMatching, handleMatching } = useRoomUseCase();
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		handleMatching(async () => {
			setOpen(true);
			await new Promise((resolve) => setTimeout(resolve, 3000));
		});
	};

	return (
		<div>
			{!isMatching && !open && (
				<div className="fixed top-0 left-0 h-[calc(100vh_-_48px)] w-2/3">
					<TypingGameOffline />
				</div>
			)}
			{isMatching && (
				<div className="fixed top-0 left-0 h-[calc(100vh_-_48px)] w-2/3">
					<DinosaurGame />
				</div>
			)}
			{open && (
				<div className="z-50">
					<FinishMatchToast />
				</div>
			)}
			{!open && (
				<div className="flex flex-col gap-12 p-8">
					<CreateRoomButton />
					<KeyButton onClick={handleClick} type="button">
						START MATCH!
					</KeyButton>
				</div>
			)}
		</div>
	);
};
