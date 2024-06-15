import { useAuthUseCase } from "@/domains/Auth/usecase";
import { useConnection } from "../../hooks/useConnect";
import type { Attack as AttackType, UserState } from "../../types";
import { AttackEffect } from "../AttackEffect";
type Position = {
	x: number;
	y: number;
};

const cellWidth = 125;
const cellHeight = 45;
const gap = 4;
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
	const { user } = useAuthUseCase();
	const { popAttack } = useConnection();
	const items = attack
		.map((a) => {
			const attacker =
				user?.uid === a.from
					? { x: 700, y: 200 }
					: getUserPosition(a.from, userIDs);
			const target =
				user?.uid === a.to
					? { x: 700, y: 200 }
					: getUserPosition(a.to, userIDs);
			if (attacker === null || target === null) {
				return null;
			}
			return {
				x: attacker.x - 300,
				y: attacker.y - 100,
				endX: target.x - 200,
				endY: target.y - 100,
			};
		})
		.filter((a): a is NonNullable<typeof a> => a !== null);
	return <AttackEffect items={items} deleteAnimate={popAttack} />;
};
