import { cn } from "@/lib/utils";
import { Heart, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";
import type { Difficult } from "../../types";
import { TypingInput } from "../TypingInput";

export const GameBoard = () => {
	const { difficult, life } = useConnection();
	return (
		<span>
			{difficult && <DifficultProgress {...difficult} />}
			<TypingInput />
			<Life life={life} />
		</span>
	);
};

const DifficultProgress = ({ difficult, cause, progress, from }: Difficult) => {
	const [isAnimate, setIsAnimate] = useState({
		heal: false,
		damage: false,
	});
	useEffect(() => {
		if (cause === "damage") {
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
		if (cause === "heal") {
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
	}, [cause, progress]);
	return (
		<span className="relative">
			<span className="absolute z-10">{isAnimate.heal && <HealEffect />}</span>
			<div
				className={cn(
					"relative h-[10px] w-[300px] overflow-hidden rounded-md border",
					{
						"bg-orange-500": difficult === 5,
						"bg-yellow-400": difficult === 4,
						"bg-green-400": difficult === 3,
						"bg-blue-400": difficult === 2,
						"bg-gray-400": difficult === 1,
						"animate-shake": isAnimate.damage,
					},
				)}
			>
				<div
					className={cn(
						"absolute h-[10px] border-gray-500 border-r-2 transition-[width]",
						{
							"bg-red-600": difficult === 5,
							"bg-orange-500": difficult === 4,
							"bg-yellow-400": difficult === 3,
							"bg-green-400": difficult === 2,
							"bg-blue-400": difficult === 1,
						},
					)}
					style={{ width: progress * 3 }}
				/>
			</div>
		</span>
	);
};

const HealEffect = () => {
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
		<span>
			{Array.from({ length: life }).map((_, i) => (
				<Heart
					fill="pink"
					className="h-12 w-12 animate-scale duration-500"
					color="red"
					style={{ animationDelay: `${i * 0.1}s` }}
					key={i}
				/>
			))}
			{Array.from({ length: 3 - life }).map((_, i) => (
				<Heart className="h-12 w-12 animate-scale" key={3 - i} />
			))}
		</span>
	);
};
