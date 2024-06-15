"use client";

import { useConnection } from "@/domains/Game/hooks/useConnect";

export const ConnectionRoom = () => {
	const { connected } = useConnection();
	if (connected) return null;

	return (
		<div className="h-screen w-full">
			<p className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 animate-pulse font-bold text-8xl italic">
				接続しています
			</p>
		</div>
	);
};
