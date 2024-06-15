export type Room = {
	userNum: number;
	status: "pending" | "playing" | "finish" | "matched";
	ownerId: string;
	startedAt: number;
	maxUserNum: number;
	minUserNum: number;
};

export type TypingKey = {
	key: string;
};

export type FinishCurrentSequence = {
	cause: "succeeded" | "failed" | "skipped";
};

export type NextSequence = {
	value: string;
	level: number;
	type: "default" | "heal";
};

export type Difficult = {
	difficult: number;
	cause: "heal" | "damage" | "";
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
