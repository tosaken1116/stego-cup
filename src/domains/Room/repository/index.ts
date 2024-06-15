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
	const { id } = await res.json();
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
	const { id } = await res.json();
	return id;
};
export const roomRepository = {
	match,
	create,
} as const;
