import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "トップ画面 | タイピング99 ",
};

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <div className="bg-black/70">{children}</div>;
}
