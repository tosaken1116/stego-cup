import { useEffect, useRef } from "react";

export const useAudio = (fileName: string) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = new Audio(`/audio/${fileName}`);
	}, [fileName]);

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const stop = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	};

	return { play, stop };
};
