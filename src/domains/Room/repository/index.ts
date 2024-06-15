import { API_BASE_URL } from "@/constants";
import { headers } from "next/headers";
import type { RESTPostRoomRequest } from "../types/schema";

const match = async (token: string): Promise<string> => {
	const res = await fetch(`${API_BASE_URL}/api/v1/rooms/matching`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const { id } = await res.json();
	return id;
};
const create = async (
	props: RESTPostRoomRequest,
	token: string,
): Promise<string> => {
	const res = await fetch(`${API_BASE_URL}/api/v1/rooms`, {
		method: "POST",
		body: JSON.stringify(props),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const { id } = await res.json();
	return id;
};

const getOtp = async (token: string): Promise<string> => {
	try {
		const res = await fetch(`${API_BASE_URL}/api/v1/otp`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { otp } = await res.json();
		return otp;
	} catch (e) {
		console.log(e);
		return "";
	}
};
export const roomRepository = {
	match,
	create,
	getOtp,
} as const;
