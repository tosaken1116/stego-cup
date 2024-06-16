import { useCallback, useEffect, useRef } from "react";

const fileCache: Record<string, HTMLAudioElement> = {};
export const useAudio = (fileName: string) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!fileCache[fileName]) {
			fileCache[fileName] = new Audio(`/audio/${fileName}`);
		}
		audioRef.current = fileCache[fileName];
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
