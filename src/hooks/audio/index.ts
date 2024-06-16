import { useCallback, useEffect, useRef } from "react";

export const useAudio = (fileName: string) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = new Audio(`/audio/${fileName}`);
	}, [fileName]);

	const play = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	const stop = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	}, []);

	return { play, stop };
};
