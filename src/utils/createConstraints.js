import { NUM_COLS, NUM_ROWS, SQUARE_SIZE } from '../constants';
import getIndex from './getIndex';

export default function createConstraints() {
	const __return = [];

	for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
		__return.push([]);
	}

	for (let x = 0; x < NUM_ROWS; x++) {
		for (let y = 0; y < NUM_COLS; y++) {
			createConstraint({ x, y }, __return);
		}
	}

	return __return;

	function createConstraint(pos, constraints) {
		const __return = [];

		for (let row = 0; row < NUM_ROWS; row++) {
			if (row === pos.x) {
				continue;
			}

			constraints[getIndex(pos)][getIndex({ x: row, y: pos.y })] = true;
		}

		for (let col = 0; col < NUM_COLS; col++) {
			if (col === pos.y) {
				continue;
			}

			constraints[getIndex(pos)][getIndex({ x: pos.x, y: col })] = true;
		}

		const start = {
			x: parseInt(pos.x / SQUARE_SIZE) * SQUARE_SIZE,
			y: parseInt(pos.y / SQUARE_SIZE) * SQUARE_SIZE,
		};
		for (let i = 0; i < SQUARE_SIZE; i++) {
			for (let j = 0; j < SQUARE_SIZE; j++) {
				if (start.x + i !== pos.x && start.y + j !== pos.y) {
					constraints[getIndex(pos)][
						getIndex({ x: start.x + i, y: start.y + j })
					] = true;
				}
			}
		}

		return __return;
	}
}

