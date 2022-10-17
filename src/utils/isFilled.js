import { EMPTY } from '../constants';

export default function isFilled(board) {
	for (const row of board) {
		for (const cell of row) {
			if (cell === EMPTY) {
				return false;
			}
		}
	}
	return true;
}

