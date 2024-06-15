"use client";
import CircularProgressBar from "@/components/ui/progress";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { cn } from "@/lib/utils";
import type { User } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { UserTypingState } from "../../../Game/components/UserTypingState";
import { useConnection } from "../../../Game/hooks/useConnect";
import type { Room as RoomType } from "../../../Game/types";
export const Room = () => {
	const { room, connected, handleStartGame } = useConnection();
	const { user } = useAuthUseCase();
	const [dots, setDots] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setDots((dots) => (dots + 1) % 4);
		}, 500);
		return () => clearInterval(interval);
	}, []);
	if (!connected) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center">
				<LoaderCircle className="h-32 w-32 animate-spin" />
				<p className="text-4xl">接続中 {".".repeat(dots)}</p>
			</div>
		);
	}
	if (!room) return null;
	switch (room.status) {
		case "playing":
			return <PlayingRoom />;
		case "finish":
			return <FinishRoom />;
		default:
			return (
				<PendingRoom
					{...room}
					handleStartGame={handleStartGame}
					isMatched={room.status === "matched"}
					user={user}
				/>
			);
	}
};

const PendingRoom = ({
	userNum,
	isMatched,
	ownerId,
	user,
	handleStartGame,
}: RoomType & { isMatched: boolean } & { user: User | null } & {
	handleStartGame: () => void;
}) => {
	return (
		<div className="flex h-full w-full flex-col items-center">
			{!isMatched ? (
				<h1
					className={cn("font-bold text-xl", {
						"animate-pulse duration-1000": !isMatched,
					})}
				>
					マッチング中
				</h1>
			) : (
				<FinishMatching />
			)}
			<CircularProgressBar
				progress={userNum / 99}
				className={
					Math.round((userNum / 99) * 100) === 100 ? "animate-fade-out" : ""
				}
			/>
			<div className="mt-4 text-center">
				<p className="text-gray-500 text-sm">参加人数</p>
				<p className="font-bold text-xl">{`${userNum} 人`}</p>
			</div>
			{!isMatched && ownerId === user?.uid && (
				<button
					onClick={handleStartGame}
					type="button"
					className="cursor-pointer"
				>
					ゲーム開始
				</button>
			)}
			<p className={isMatched ? "" : "opacity-0"}>もうすぐ始まります</p>
		</div>
	);
};
const FinishMatching = () => {
	return (
		<span className="flex flex-row">
			{Array.from("マッチング完了!").map((char, i) => (
				<span
					key={i}
					className={cn("animate-fade-in font-bold text-4xl")}
					style={{
						animationDelay: `${i * 0.05}s`,
					}}
				>
					{char}
				</span>
			))}
		</span>
	);
};

const PlayingRoom = () => {
	return (
		<div>
			<UserTypingState />
		</div>
	);
};

const FinishRoom = () => {
	return (
		<div>
			<h1>終了</h1>
			<div>結果</div>
		</div>
	);
};
