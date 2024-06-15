"use client";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};
export const WithAuth: FC<Props> = ({ children }) => {
	const { loading, token } = useAuthUseCase();
	if (loading || token === null || token === "") return <p>loading...</p>;
	return <>{children}</>;
};
