import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";

type Props = Exclude<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
	children: string;
};
export const KeyButton: FC<Props> = ({ className, children, ...props }) => {
	return (
		<div className="relative">
			<div className="after:-z-10 absolute top-[-28px] left-[-28px] h-[116px] w-[206px] rounded-sm border-8 border-primary bg-primary/30" />
			<button
				type="button"
				{...props}
				className={cn(
					"group relative h-[60px] w-[150px] bg-gradient-radial bg-primary/10 font-bold text-white transition-all duration-300 hover:scale-90",
					className,
				)}
			>
				<div className="absolute top-[-20px] left-[-20px] z-10 h-[100px] w-[190px] rounded-sm shadow-black shadow-md transition-all group-hover:shadow-none " />
				<div className="absolute top-[-20px] left-[-20px] z-0 h-[100px] w-[190px] rounded-sm bg-white" />
				<div className="after:-translate-x-48 absolute top-[-20px] left-[-20px] z-10 h-[100px] w-[190px] overflow-hidden after:relative after:top-0 after:left-0 after:z-50 after:block after:h-full after:w-full group-hover:after:translate-x-48 after:bg-white/70 after:transition-transform after:duration-700 after:[clip-path:polygon(20%_0%,40%_0%,20%_100%,0_100%)]" />
				<div className="before:-top-[20px] after:-top-[20px] after:-translate-x-full absolute top-0 right-0 h-full w-full after:absolute before:absolute before:right-0 after:left-0 after:h-[100px] before:h-[100px] after:w-[20px] before:w-[20px] before:translate-x-full before:rounded-sm after:bg-gradient-to-l after:bg-pos-80 after:bg-size-200 before:bg-gradient-to-r before:bg-pos-0 before:bg-size-200 group-hover:after:bg-pos-40 group-hover:before:bg-pos-80 after:from-primary/50 before:from-primary/60 after:via-primary/50 before:via-primary/60 after:to-black before:to-black after:transition-all before:transition-all after:duration-300 before:duration-300 after:[clip-path:polygon(0%_0%,100%_20%,100%_80%,0_100%)] before:[clip-path:polygon(0%_20%,100%_0%,100%_100%,0_80%)]" />
				<div className="absolute top-0 left-0 h-full w-full after:absolute before:absolute before:top-[-20px] after:bottom-[-20px] after:left-[-20px] before:left-[-20px] after:h-[20px] before:h-[20px] after:w-[190px] before:w-[190px] after:bg-gradient-to-b after:bg-pos-0 after:bg-size-200 before:bg-gradient-to-t before:bg-pos-80 before:bg-size-200 group-hover:after:bg-pos-80 group-hover:before:bg-pos-40 after:from-primary/80 before:from-primary/30 after:via-primary/80 before:via-primary/30 after:to-black before:to-black after:transition-all before:transition-all after:duration-300 before:duration-300 after:[clip-path:polygon(10%_0%,90%_0%,100%_100%,0%_100%)] before:[clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]" />
				<div className="relative h-full w-full content-center bg-primary/40 shadow-inner ">
					{Array.from(children).map((char, i) => (
						<span
							key={i}
							className="font-bold group-hover:text-pink-400"
							style={{
								transitionDuration: `${i * 0.05}s`,
							}}
						>
							{char}
						</span>
					))}
				</div>
			</button>
		</div>
	);
};
