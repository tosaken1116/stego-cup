"use client";
import { useAuthUseCase } from "@/domains/Auth/usecase";
import { useRoomUseCase } from "@/domains/Room/usecase";
import {
  type FC,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import type { Attack, Difficult, Room, UserState } from "../types";
import type {
  WSChangeOtherUserStateResponse,
  WSEventToClientKey,
} from "../types/schema";
type ConnectionStateType = {
  connected: boolean;
  connection: ReconnectingWebSocket | null;
  usersState: UserState[] | null;
  room: Room | null;
  difficult: Difficult | null;
  seq: {
    value: string;
    level: number;
  };
  life: number;
  attack: Attack[];
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
  },
  life: 0,
  attack: [],
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
    null
  );

  const [usersState, setUsersState] = useState<Record<
    string,
    UserState
  > | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [difficult, setDifficult] = useState<Difficult | null>(null);
  const [seq, setSeq] = useState<{
    value: string;
    level: number;
  }>({ value: "", level: 1 });
  const [life, setLife] = useState(0);
  const [attack, setAttack] = useState<Attack[]>([]);
  const { getOTP } = useRoomUseCase();
  const { token: firebaseToken } = useAuthUseCase();
  useEffect(() => {
    const connect = async () => {
      if (!firebaseToken) return;
      const token = await getOTP(firebaseToken);
      const newUrl = `${url}?p=${token}`;
      const ws = new ReconnectingWebSocket(newUrl);
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
            setUsersState((prev) => ({
              ...prev,
              [data.payload.id]: {
                ...prev?.[data.payload.id],
                ...data.payload,
              },
            }));
            break;
          case "ChangeWordDifficult":
            setDifficult(data.payload);
            break;
          case "NextSeq":
            setSeq(data.payload.value);
            break;
          case "ChangeLife":
            setLife(data.payload.life);
            break;
          case "Attack":
            setAttack((prev) => [...prev, data.payload]);
            break;
          default:
            break;
        }
      };
    };
    connect();
    return () => {
      connection?.close();
    };
  }, [firebaseToken, connection?.close]);
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
  } = useContext(ConnectionState);
  const handleTypingKey = (key: string) => {
    connection?.send(
      JSON.stringify({ type: "TypingKey", payload: { inputSeq: key } })
    );
  };
  const handleFinishCurrentSequence = (
    cause: "succeeded" | "failed" | "skipped"
  ) => {
    connection?.send(
      JSON.stringify({ type: "FinCurrentSeq", payload: { cause } })
    );
  };
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
    userIDs,
    handleStartGame,
    handleTypingKey,
    handleFinishCurrentSequence,
  };
};
