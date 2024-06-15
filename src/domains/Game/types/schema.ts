export type WSJoinRoomResponse = {
	userNum: number;
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
	level: number;
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
	rank: number | null;
};

export type WSResultResponse = {
	userId: string;
	rank: number;
	displayName: string;
}[];

export type WSChangeRoomResponse = WSJoinRoomResponse;

export type WSEventToClientKey =
	| "NextSeq"
	| "ChangeWordDifficult"
	| "ChangeOtherUserState"
	| "ChangeRoomState"
	| "ChangeLife"
	| "Attack"
	| "ChangeOtherUsersState"
	| "Result";
