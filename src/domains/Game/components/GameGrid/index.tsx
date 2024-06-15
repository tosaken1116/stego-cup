import type { FC, ReactNode } from "react";
import { GameBoard } from "../GameBoard";

type Props = {
	center: ReactNode;
	children: ReactNode[];
};
export const GameGrid: FC<Props> = ({ center, children }) => {
	return (
		<div className="grid h-screen w-screen grid-cols-11 grid-rows-14 gap-2 p-2">
			{children}
			<div
				className="flex items-center justify-center rounded-sm border font-bold text-2xl"
				style={{ gridColumn: "3 / span 7", gridRow: "4 / span 8" }}
			>
				{center}
			</div>
		</div>
	);
};
