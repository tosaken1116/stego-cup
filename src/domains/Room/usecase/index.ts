import { useAuthUseCase } from "@/domains/Auth/usecase";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import { roomRepository } from "../repository";
import type { RESTPostRoomRequest } from "../types/schema";

export const useRoomUseCase = () => {
	const [isMatching, setIsMatching] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const handleMatching = async (token: string) => {
		setIsMatching(true);
		const id = await roomRepository.match(token);
		const isDemo = localStorage.getItem("isDemo");
		if (isDemo) {
			await new Promise((resolve) => setTimeout(resolve, 10000));
		}
		setIsMatching(false);
		return id;
	};
	const createRoom = async (data: RESTPostRoomRequest, token: string) => {
		setIsCreating(true);
		const id = await roomRepository.create(data, token);
		const isDemo = localStorage.getItem("isDemo");
		if (isDemo) {
			await new Promise((resolve) => setTimeout(resolve, 10000));
		}
		setIsCreating(false);
		router.push(`/rooms/${id}`);
	};
	const getOTP = async (token: string) => {
		const otp = await roomRepository.getOtp(token);
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
