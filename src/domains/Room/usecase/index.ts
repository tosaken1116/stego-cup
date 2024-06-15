import { useRouter } from "next/navigation";
import { useState } from "react";
import { roomRepository } from "../repository";
import type { RESTPostRoomRequest } from "../types/schema";

export const useRoomUseCase = () => {
	const [isMatching, setIsMatching] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const router = useRouter();
	const handleMatching = async (
		beforeRedirect: () => Promise<void> = async () => {},
	) => {
		setIsMatching(true);
		const id = await roomRepository.match();
		setIsMatching(false);
		await beforeRedirect();
		router.push(`/rooms/${id}`);
	};
	const createRoom = async (data: RESTPostRoomRequest) => {
		setIsCreating(true);
		const id = await roomRepository.create(data);
		setIsCreating(false);
		router.push(`/rooms/${id}`);
	};
	return {
		isMatching,
		isCreating,
		handleMatching,
		createRoom,
	};
};
