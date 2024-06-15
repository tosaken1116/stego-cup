export const FinishMatchToast = () => {
	return (
		<div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-fit text-nowrap font-bold italic">
			<div className="flex animate-puff-out-hor delay-1500">
				{Array.from("マッチングが完了しました").map((char, i) => (
					<div
						key={i}
						className="animate-slide-in-tr fill-mode-backwards font-bold text-7xl text-white duration-500"
						style={{
							animationDelay: `${i * 0.05}s`,
						}}
					>
						{char}
					</div>
				))}
			</div>
		</div>
	);
};
