export type Room = {
	userNum: number;
	status: "pending" | "playing" | "finish" | "matched";
};

export type TypingKey = {
	key: string;
};

export type FinishCurrentSequence = {
	cause: "succeeded" | "failed" | "skipped";
};

export type NextSequence = {
	value: string;
	type: "default" | "heal";
};

export type Difficult = {
	difficult: number;
	progress: number;
	cause: "heal" | "damage";
	from: "user-id" | undefined;
};

export type UserState = {
	id: string;
	name: string;
	life: number;
	seq: string;
	inputSeq: string;
	state: "connected" | "disconnected";
	rank: number | null;
};

export type Attack = {
	from: string;
	to: string;
	damage: number;
};
