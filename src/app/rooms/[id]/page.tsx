"use client";
import { WithAuth } from "@/components/functional/withAuth";
import { API_BASE_URL, WS_BASE_URL } from "@/constants";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { ConnectionProvider } from "@/domains/Game/hooks/useConnect";
import { Room } from "@/domains/Room/components/Room";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
	params: {
		id: string;
	};
};
export default function RoomPage({ params: { id } }: Props) {
	return (
		<div className="h-screen w-full">
			<ErrorBoundary fallback={<p>予期せぬエラーが発生しました</p>}>
				<ConnectionProvider url={`${API_BASE_URL}/api/v1/rooms/${id}`}>
					<Room />
				</ConnectionProvider>
			</ErrorBoundary>
		</div>
	);
}
