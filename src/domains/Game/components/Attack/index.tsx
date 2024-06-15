import type { Attack as AttackType, UserState } from "../../types";
import { AttackEffect } from "../AttackEffect";
type Position = {
	x: number;
	y: number;
};

const cellWidth = 50;
const cellHeight = 50;
const gap = 5;
const columns = 11;
const getUserPosition = (
	userID: string,
	userIDs: string[],
): Position | null => {
	const index = userIDs.indexOf(userID);
	if (index === -1) {
		return null;
	}

	const row = Math.floor(index / columns);
	const col = index % columns;

	const x = col * (cellWidth + gap);
	const y = row * (cellHeight + gap);

	return { x, y };
};
export const Attack = ({
	attack,
	userIDs,
}: {
	attack: AttackType[];
	userIDs: UserState["id"][];
}) => {
	const items = attack
		.map((a) => {
			const attacker = getUserPosition(a.from, userIDs);
			const target = getUserPosition(a.to, userIDs);
			if (attacker === null || target === null) {
				return null;
			}
			return {
				x: attacker.x,
				y: attacker.y,
				endX: target.x,
				endY: target.y,
			};
		})
		.filter((a): a is NonNullable<typeof a> => a !== null);
	return <AttackEffect items={items} />;
};
