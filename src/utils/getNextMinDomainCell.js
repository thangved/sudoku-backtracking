import { EMPTY, NUM_COLS, NUM_ROWS } from '../constants';
import getAvailableValues from './getAvailableValues';

export default function getNextMinDomainCell(board, constraints) {
	let pos = {};
	let minLength = Infinity;

	for (let x = 0; x < NUM_ROWS; x++) {
		for (let y = 0; y < NUM_COLS; y++) {
			if (board[x][y] === EMPTY) {
				const length = getAvailableValues(
					{ x, y },
					board,
					constraints,
				).length;

				if (!length) {
					return {};
				}

				if (length && length < minLength) {
					minLength = length;
					pos = { x, y };
				}
			}
		}
	}

	return pos;
}

