export const SERVICE_NAME = "タイピング99";

const API_BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PROD_API_BASE_URL
		: process.env.NEXT_PUBLIC_DEV_API_BASE_URL;

if (!API_BASE_URL) {
	throw new Error("API_BASE_URL is not defined");
}

const WS_BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_PROD_WS_BASE_URL
		: process.env.NEXT_PUBLIC_DEV_WS_BASE_URL;

if (!WS_BASE_URL) {
	throw new Error("WS_BASE_URL is not defined");
}

export { API_BASE_URL, WS_BASE_URL };
