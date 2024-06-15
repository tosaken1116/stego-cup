import CircularProgressBar from "@/components/ui/progress";
import { type FC, useCallback, useEffect, useState } from "react";
import { useConnection } from "../../hooks/useConnect";

export const TypingInput: FC = () => {
	const { seq, handleTypingKey, handleFinishCurrentSequence } = useConnection();
	const [value, setValue] = useState("");
	const [timeSec, setTimeSec] = useState(0);
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			setValue((prev) => {
				const newValue = prev + e.key;
				if (newValue === seq) {
					handleFinishCurrentSequence("succeeded");
					return "";
				}
				if (seq.startsWith(newValue)) {
					return newValue;
				}
				return prev;
			});
			handleTypingKey(e.key);
		},
		[handleTypingKey, seq, handleFinishCurrentSequence],
	);
	const lestSeq = seq.replace(value, "");
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeSec((prev) => prev + 0.05);
		}, 50);
		return () => {
			clearInterval(timer);
		};
	}, []);
	useEffect(() => {
		setTimeSec(0);
	}, [seq]);
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
			</div>
		</span>
	);
};
