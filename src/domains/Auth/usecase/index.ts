import { AUTH_API_KEY, AUTH_DOMAIN } from "@/constants/auth";
import { initializeApp } from "firebase/app";

import {
	Auth,
	getAuth,
	signInAnonymously,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
import type { AuthPostRequest } from "../types/schema";

const config = {
	apiKey: AUTH_API_KEY,
	authDomain: AUTH_DOMAIN,
} as const;

const initApp = initializeApp(config);
const auth = getAuth(initApp);
const login =
	(router: AppRouterInstance) =>
	async (redirectPath: string, userName: string) => {
		const res = await signInAnonymously(auth);
		await updateProfile(res.user, {
			displayName: userName,
		});
		router.push(redirectPath);
	};
export const useAuthUseCase = () => {
	const router = useRouter();
	const user = auth.currentUser;
	return {
		user,
		login: login(router),
	};
};

export const getToken = async (): Promise<string> => {
	const token = await auth.currentUser?.getIdToken();
	return token ?? "";
};
