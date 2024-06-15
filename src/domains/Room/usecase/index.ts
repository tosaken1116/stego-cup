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
		const isDemo = localStorage.getItem("isDemo");
		if (isDemo) {
			await new Promise((resolve) => setTimeout(resolve, 10000));
		}
		setIsMatching(false);
		await beforeRedirect();
		router.push(`/rooms/${id}`);
	};
	const createRoom = async (data: RESTPostRoomRequest) => {
		setIsCreating(true);
		const id = await roomRepository.create(data);
		const isDemo = localStorage.getItem("isDemo");
		if (isDemo) {
			await new Promise((resolve) => setTimeout(resolve, 10000));
		}
		setIsCreating(false);
		router.push(`/rooms/${id}`);
	};
	const getOTP = async () => {
		const otp = await roomRepository.getOtp();
		return otp;
	};
	return {
		isMatching,
		isCreating,
		handleMatching,
		createRoom,
		getOTP,
	};
};
