"use client";
import CircularProgressBar from "@/components/ui/progress";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { cn } from "@/lib/utils";
import type { User } from "firebase/auth";
import { Crown, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
	if (!connected && room === null) {
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

const Countdown = ({ unixTimeStamp }: { unixTimeStamp: number }) => {
	const [countdown, setCountdown] = useState(unixTimeStamp - Date.now());
	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(unixTimeStamp - Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, [unixTimeStamp]);
	return <div>{countdown}</div>;
};

const PendingRoom = ({
	userNum,
	isMatched,
	ownerId,
	user,
	startedAt,
	handleStartGame,
}: RoomType & { isMatched: boolean } & { user: User | null } & {
	handleStartGame: () => void;
}) => {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<div className="absolute top-64 w-48">
				<FillPercent />
			</div>
			{startedAt !== null && <Countdown unixTimeStamp={startedAt} />}
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
			{ownerId === user?.uid && (
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

const FillPercent = () => {
	return (
		<div className={"relative w-full overflow-hidden"}>
			<div
				className={
					"flex w-96 animate-drop-slide flex-row gap-4 after:absolute after:h-1 after:w-full after:scale-x-150 after:bg-white "
				}
			>
				<div className="repeat-infinite h-8 w-8 animate-drop-4 rounded-full bg-orange-300" />
				<div className="repeat-infinite h-8 w-8 animate-drop-3 rounded-full bg-orange-300" />
				<div className="repeat-infinite h-8 w-8 animate-drop-2 rounded-full bg-orange-300" />
				<div className="repeat-infinite h-8 w-8 animate-drop-1 rounded-full bg-orange-300" />
			</div>
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
	const { result } = useConnection();
	const { user } = useAuthUseCase();
	return (
		<div>
			<h1>ゲーム終了</h1>
			<div>
				{result.map((r, i) => (
					<div
						key={i}
						className={cn("flex w-full flex-row rounded-sm border-primary/50", {
							"bg-primary": r.userId === user?.uid,
							"bg-yellow-500": r.rank === 1,
							"bg-slate-500": r.rank === 2,
							"bg-orange-700": r.rank === 3,
						})}
					>
						<span className="relative">
							{(r.rank === 1 || r.rank === 2 || r.rank === 3) && (
								<Crown
									className={cn(
										"-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2",
										{
											"text-yellow-500": r.rank === 1,
											"text-slate-500": r.rank === 2,
											"text-orange-700": r.rank === 3,
										},
									)}
								/>
							)}
							{r.rank}
						</span>
						<span>{r.displayName}</span>
						<span>{r.userId}</span>
					</div>
				))}
			</div>
		</div>
	);
};
