"use client";
import { Star } from "lucide-react";
import type { CSSProperties, FC } from "react";

type ItemProps = {
	x: number;
	y: number;
	endX: number;
	endY: number;
};

const genRandomSize = (index: number) => {
	return Math.random() * 10 + 5 * index;
};
const getRandomOffset = (distanceX: number, distanceY: number) => {
	const angle = Math.atan2(distanceY, distanceX) + Math.PI; // 逆方向にするためにPIを足す
	const angleOffset = ((Math.random() - 0.5) * Math.PI) / 4;
	const finalAngle = angle + angleOffset;
	const distance = Math.random() * 150;
	return {
		x: Math.cos(finalAngle) * distance,
		y: Math.sin(finalAngle) * distance,
	};
};
const Item: FC<ItemProps> = ({ x, y, endX, endY }) => {
	const distanceX = endX - x;
	const distanceY = endY - y;
	return (
		<div
			className="relative animate-move-to-target fill-mode-forwards duration-700"
			style={
				{
					"--target-x": `${endX}px`,
					"--target-y": `${endY}px`,
				} as CSSProperties
			}
		>
			{Array.from({ length: 10 }, (_, i) => {
				const { x: offsetX, y: offsetY } = getRandomOffset(
					distanceX,
					distanceY,
				);
				const size = genRandomSize(i);
				return (
					<div
						key={i}
						className="absolute animate-move-to-target fill-mode-forwards duration-700"
						style={
							{
								animationDelay: `${Math.random() * 10 + i * 10}ms`,
								"--target-x": `${x + offsetX}px`,
								"--target-y": `${y + offsetY}px`,
							} as CSSProperties
						}
					>
						<Star
							key={i}
							className="animate-spin delay-0"
							style={{
								width: `${size}px`,
								height: `${size}px`,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

type Props = {
	items: ItemProps[];
};
export const AttackEffect: FC<Props> = ({ items }) => {
	return (
		<div>
			{items.map((item, index) => (
				<Item key={index} {...item} />
			))}
		</div>
	);
};