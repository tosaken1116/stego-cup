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
import type { Difficult, Room, UserState } from "../types";
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
  seq: string;
  life: number;
};

const ConnectionState = createContext<ConnectionStateType>({
  connected: false,
  connection: null,
  usersState: null,
  room: null,
  difficult: null,
  seq: "",
  life: 0,
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
  const [seq, setSeq] = useState<string>("");
  const [life, setLife] = useState(0);
  const { getOTP } = useRoomUseCase();
  const { token: firebaseToken } = useAuthUseCase();
  useEffect(() => {
    const connect = async () => {
      if (!firebaseToken) return;
      const token = await getOTP(firebaseToken);
      const newUrl = `${url}?otp=${token}`;
      const ws = new ReconnectingWebSocket(newUrl);
      setConnection(ws);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        switch (data.type as WSEventToClientKey) {
          case "ChangeRoomState":
            if (data.payload.status === "finish") {
              ws.close();
            }
            setRoom({
              userNumber: data.payload.user_num,
              status: data.payload.status,
            });
            break;
          case "ChangeOtherUserState":
            setUsersState((prev) => ({
              ...Object.fromEntries(
                Object.values(
                  data.payload as WSChangeOtherUserStateResponse
                ).map((v) => [v.id, v])
              ),
              ...(prev ?? {}),
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
          default:
            break;
        }
      };
    };
    connect();
    return () => {
      connection?.close();
    };
  }, [firebaseToken]);
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
      }}
    >
      {children}
    </Provider>
  );
};

export const useConnection = () => {
  const { usersState, room, difficult, seq, connected, connection, life } =
    useContext(ConnectionState);
  const handleTypingKey = (key: string) => {
    connection?.send(JSON.stringify({ type: "TypingKey", payload: { key } }));
  };
  const handleFinishCurrentSequence = (
    cause: "succeeded" | "failed" | "skipped"
  ) => {
    connection?.send(
      JSON.stringify({ type: "FinCurrentSeq", payload: { cause } })
    );
  };

  return {
    connected,
    usersState: (usersState ?? []).sort((a, b) => a.id.localeCompare(b.id)),
    room,
    difficult,
    seq,
    life,
    handleTypingKey,
    handleFinishCurrentSequence,
  };
};
