import { cn } from "@/lib/utils";
import type { FC } from "react";

const keyboardLayout: string[][] = [
	["!", '"', "#", "$", "%", "&", "'", "(", ")", "-", "=", "^", "\\"],
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "@", "["],
	["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", ":", "]"],
	["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "_"],
];
type Props = {
	itemClassName?: (key: string) => string;
};
export const KeyBoard: FC<Props> = ({ itemClassName = () => "" }) => {
	return (
		<div className="flex flex-col gap-2">
			{keyboardLayout.map((row, i) => (
				<div key={i} className="flex gap-2">
					{Array.from({ length: i }).map((_, i) => (
						<div key={i} className="h-2 w-2" />
					))}
					{row.map((key) => (
						<div
							key={key}
							className={cn(
								"flex h-12 w-12 items-center justify-center rounded-sm border border-white",
								itemClassName(key),
							)}
						>
							{key}
						</div>
					))}
				</div>
			))}
		</div>
	);
};
