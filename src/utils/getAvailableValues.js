import { MAX_VALUE } from '../constants';
import getConstraints from './getConstraints';

export default function getAvailableValues(pos, board, constraints) {
	let __return = [];

	for (let i = 1; i <= MAX_VALUE; i++) {
		__return.push(i);
	}

	const __constraints = getConstraints(pos, constraints);

	for (const constraint of __constraints) {
		__return = __return.filter(
			(e) => e !== board[constraint.x][constraint.y],
		);
	}

	return __return;
}

