import { WithAuth } from "@/components/functional/withAuth";
import type { Metadata, ResolvingMetadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: { id: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  return {
    title: `ルーム "${id}" | タイピング99`,
    description: `ルーム${id}に参加しよう！`,
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <WithAuth>{children}</WithAuth>;
}
