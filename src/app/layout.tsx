import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithAuth } from "@/components/functional/withAuth";
import { Header } from "@/components/ui/header";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ログイン | タイピング99 ",
	description:
		"タイピング99のログインページです。\n匿名ユーザーでログインして、すぐに対戦を楽しもう！",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={cn(inter.className, "bg-black text-white")}>
				<Header />
				<div className="absolute top-0 left-0 h-screen w-full">
					<Image
						src="/image/key.avif"
						fill
						alt=""
						className="-z-10 h-full w-full"
					/>
				</div>
				<WithAuth>{children}</WithAuth>
			</body>
		</html>
	);
}
