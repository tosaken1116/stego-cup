import { AUTH_API_KEY, AUTH_DOMAIN } from "@/constants/auth";
import { initializeApp } from "firebase/app";

import {
	type User,
	browserLocalPersistence,
	getAuth,
	initializeAuth,
	signInAnonymously,
	updateProfile,
} from "firebase/auth";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const config = {
	apiKey: AUTH_API_KEY,
	authDomain: AUTH_DOMAIN,
} as const;

const initApp = initializeApp(config, {});
const auth = initializeAuth(initApp, {
	persistence: browserLocalPersistence,
});
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
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const check = async () => {
			if (auth.currentUser) {
				setUser(auth.currentUser);
				const token = await auth.currentUser.getIdToken();
				setToken(token);
				setLoading(false);
			} else {
				try {
					const res = await signInAnonymously(auth);
					setUser(res.user);
					setToken(await res.user.getIdToken());
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
		};
		check();
	}, []);
	return {
		user,
		loading,
		token,
		login: login(router),
	};
};
