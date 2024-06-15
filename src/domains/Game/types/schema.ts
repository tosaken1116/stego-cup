export type WSJoinRoomResponse = {
	userNumber: number;
	status: "pending" | "playing" | "finish";
};

export type WSTypingKeyRequest = {
	key: string;
};

export type WSFinCurrentSeqRequest = {
	cause: "succeeded" | "failed" | "skipped";
};

export type WSNextSeqResponse = {
	value: string;
	type: "default" | "heal";
};

export type WSChangeWordDifficultResponse = {
	difficult: number;
	progress: number;
	cause: "heal" | "damage";
	from: "user-id" | undefined;
};

export type WSChangeOtherUserStateResponse = {
	id: string;
	name: string;
	life: number;
	seq: string;
	inputSeq: string;
	state: "connected" | "disconnected";
	rank: number | null;
}[];

export type WSChangeRoomResponse = WSJoinRoomResponse;

export type WSEventToClientKey =
	| "NextSeq"
	| "ChangeWordDifficult"
	| "ChangeOtherUserState"
	| "ChangeRoomState"
	| "ChangeLife";
