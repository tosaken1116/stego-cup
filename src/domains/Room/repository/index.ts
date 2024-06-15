import { API_BASE_URL } from "@/constants";
import { getToken } from "@/domains/Auth/usecase";
import { headers } from "next/headers";
import type { RESTPostRoomRequest } from "../types/schema";

const match = async (): Promise<string> => {
	const token = await getToken();

	const res = await fetch(`${API_BASE_URL}/api/v1/rooms/matching`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const { roomId: id } = await res.json();
	return id;
};
const create = async (props: RESTPostRoomRequest): Promise<string> => {
	const token = await getToken();
	const res = await fetch(`${API_BASE_URL}/api/v1/rooms`, {
		method: "POST",
		body: JSON.stringify(props),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const { roomId: id } = await res.json();
	return id;
};

const getOtp = async (): Promise<string> => {
	const token = await getToken();
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
