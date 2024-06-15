import { cn } from "@/lib/utils";
import type { CSSProperties, FC } from "react";

type CircularProgressBarProps = {
	progress: number;
	className?: string;
	style?: CSSProperties;
};

const CircularProgressBar: FC<CircularProgressBarProps> = ({
	progress,
	className,
	style,
}) => {
	const radius = 100;
	const stroke = 20;
	const normalizedRadius = radius - stroke * 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - progress * circumference;

	return (
		<svg
			height={radius * 2}
			width={radius * 2}
			style={style}
			role="presentation"
			className={cn("rotate-[-90deg] transform", className)}
		>
			<circle
				stroke="gray"
				fill="transparent"
				strokeWidth={stroke}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<circle
				stroke="url(#gradient)"
				fill="transparent"
				strokeWidth={stroke}
				strokeDasharray={`${circumference} ${circumference}`}
				style={{ strokeDashoffset }}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#4ADE80" />
					<stop offset="100%" stopColor="#22D3EE" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default CircularProgressBar;
