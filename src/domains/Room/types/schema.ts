export type RESTPostRoomResponse = {
	id: string;
};

export type RESTPostRoomRequest = {
	name: string;
	hostName: string;
	minUserNum: number;
	maxUserNum: number;
	useCpu: boolean;
};

export type RESTGetRoomsResponse = {
	total: number;
};

export type RESTRoomMatchingResponse = {
	id: string;
};
