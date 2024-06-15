"use client";
import Head from "next/head";
import { type ComponentType, useEffect, useRef } from "react";

export const withClickSound = (
	Component: React.ComponentType,
	fileName: string,
) => {
	return () => {
		const audioRef = useRef<HTMLAudioElement | null>(null);

		useEffect(() => {
			audioRef.current = new Audio(`audio/${fileName}`);
		}, [fileName]);

		const play = () => {
			if (audioRef.current) {
				audioRef.current.play();
			}
		};

		return (
			<div onClick={play}>
				<Component />
			</div>
		);
	};
};

export const withHoverSound = (Component: ComponentType, fileName: string) => {
	return () => {
		const audioRef = useRef<HTMLAudioElement | null>(null);

		const play = () => {
			if (audioRef.current) {
				audioRef.current.play();
			}
		};

		useEffect(() => {
			audioRef.current = new Audio(`audio/${fileName}`);
		}, [fileName]);
		return (
			<>
				<Head>
					<link rel="preload" href={`audio/${fileName}`} as="audio" />
				</Head>
				<div
					onMouseEnter={play}
					onMouseLeave={() => {
						if (audioRef.current) {
							audioRef.current.pause();
							audioRef.current.currentTime = 0;
						}
					}}
				>
					<Component />
				</div>
			</>
		);
	};
};
