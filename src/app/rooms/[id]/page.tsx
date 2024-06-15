import { API_BASE_URL, WS_BASE_URL } from "@/constants";
import { ConnectionProvider } from "@/domains/Game/hooks/useConnect";
import { Room } from "@/domains/Room/components/Room";

type Props = {
	params: {
		id: string;
	};
};
export default function RoomPage({ params: { id } }: Props) {
	return (
		<div className="h-screen w-full">
			<ConnectionProvider url={`${API_BASE_URL}/rooms/${id}`}>
				<Room />
			</ConnectionProvider>
		</div>
	);
}
