"use client";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { useRoomUseCase } from "@/domains/Room/usecase";
import {
	type FC,
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import type {
	Attack,
	Difficult,
	NextSequence,
	Result,
	Room,
	UserState,
} from "../types";
import type { WSEventToClientKey } from "../types/schema";
type ConnectionStateType = {
	connected: boolean;
	connection: ReconnectingWebSocket | null;
	usersState: UserState[] | null;
	room: Room | null;
	difficult: Difficult | null;
	seq: NextSequence;
	life: number;
	attack: Attack[];
	result: Result;
	rank: number | null;
	lostLife: () => void;
	popAttack: () => void;
};

const ConnectionState = createContext<ConnectionStateType>({
	connected: false,
	connection: null,
	usersState: null,
	room: null,
	difficult: null,
	seq: {
		value: "",
		level: 1,
		type: "default",
	},
	life: 0,
	attack: [],
	result: [],
	lostLife: () => {},
	popAttack: () => {},
	rank: null,
});

const { Provider } = ConnectionState;
type ConnectionProviderProps = {
	url: string;
	children: ReactNode;
};
export const ConnectionProvider: FC<ConnectionProviderProps> = ({
	children,
	url,
}) => {
	const [connection, setConnection] = useState<ReconnectingWebSocket | null>(
		null,
	);

	const [usersState, setUsersState] = useState<Record<
		string,
		UserState
	> | null>(null);
	const [room, setRoom] = useState<Room | null>(null);
	const [difficult, setDifficult] = useState<Difficult | null>(null);
	const [seq, setSeq] = useState<NextSequence>({
		value: "",
		level: 1,
		type: "default",
	});
	const [life, setLife] = useState(5);
	const [attack, setAttack] = useState<Attack[]>([]);
	const { getOTP } = useRoomUseCase();
	const { token: firebaseToken, user } = useAuthUseCase();
	const [result, setResult] = useState<Result>([]);
	const [rank, setRank] = useState<number | null>(null);
	const wsUrlGenerator = useCallback(async () => {
		if (!firebaseToken) return "";
		const otp = await getOTP(firebaseToken);
		const newUrl = `${url}?p=${otp}`;
		return newUrl;
	}, [firebaseToken, getOTP, url]);
	useEffect(() => {
		if (!firebaseToken) {
			return;
		}
		const ws = new ReconnectingWebSocket(wsUrlGenerator);
		setConnection(ws);
		ws.onmessage = (e) => {
			const data = JSON.parse(e.data);
			switch (data.type as WSEventToClientKey) {
				case "ChangeRoomState":
					if (data.payload.status === "finish") {
						ws.close();
					}
					setRoom(data.payload);
					break;
				case "ChangeOtherUserState":
					if (data.payload.id === user?.uid) {
						setRank(data.payload.rank ?? null);
						break;
					}
					setUsersState((prev) => ({
						...prev,
						[data.payload.id]: {
							...data.payload,
						},
					}));
					break;
				case "ChangeOtherUsersState": {
					const users = data.payload as UserState[];
					const userObject: Record<string, UserState> = users.reduce(
						(acc, payloadUser) => {
							if (payloadUser.id === user?.uid) return acc;
							acc[payloadUser.id] = payloadUser;
							return acc;
						},
						{} as Record<string, UserState>,
					);
					setUsersState(userObject);
					break;
				}
				case "ChangeWordDifficult":
					setDifficult(data.payload);
					break;
				case "NextSeq":
					setSeq(data.payload);
					break;
				// case "ChangeLife":
				//   setLife(data.payload.life);
				//   break;
				case "Attack":
					setAttack((prev) => [...prev, data.payload]);
					break;
				case "Result":
					setResult(data.payload);
					break;
				default:
					break;
			}
		};
		return () => {
			ws.close();
		};
	}, [user?.uid, wsUrlGenerator]);
	return (
		<Provider
			value={{
				connected: connection?.readyState === ReconnectingWebSocket.OPEN,
				connection,
				usersState: Object.values(usersState ?? {}),
				room,
				difficult,
				seq,
				life,
				attack,
				rank,
				result,
				popAttack: () => {
					setAttack((prev) => prev.slice(1));
				},
				lostLife: () => setLife((prev) => Math.max(prev - 1, 0)),
			}}
		>
			{children}
		</Provider>
	);
};

export const useConnection = () => {
	const {
		usersState,
		room,
		difficult,
		seq,
		connected,
		connection,
		life,
		attack,
		result,
		rank,
		lostLife,
		popAttack,
	} = useContext(ConnectionState);
	const { user } = useAuthUseCase();
	const handleTypingKey = (key: string) => {
		connection?.send(
			JSON.stringify({
				type: "TypingKey",
				payload: { inputSeq: key, userId: user?.uid },
			}),
		);
	};
	const handleFinishCurrentSequence = useCallback(
		(cause: "succeeded" | "failed" | "skipped") => {
			connection?.send(
				JSON.stringify({ type: "FinCurrentSeq", payload: { cause } }),
			);
		},
		[connection?.send],
	);
	const userIDs = usersState?.map((v) => v.id) ?? [];
	const handleStartGame = () => {
		connection?.send(JSON.stringify({ type: "StartGame" }));
	};

	return {
		connected,
		usersState: (usersState ?? []).sort((a, b) => a.id.localeCompare(b.id)),
		room,
		difficult,
		seq,
		life,
		attack,
		result,
		userIDs,
		rank,
		popAttack,
		lostLife,
		handleStartGame,
		handleTypingKey,
		handleFinishCurrentSequence,
	};
};
