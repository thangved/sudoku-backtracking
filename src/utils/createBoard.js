import * as sudoku from 'sudoku';
import { EMPTY, NUM_COLS, NUM_ROWS } from '../constants';

export default function createBoard() {
	// return [
	// 	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	// 	[6, 0, 0, 1, 9, 5, 0, 0, 0],
	// 	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	// 	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	// 	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	// 	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	// 	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	// 	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	// 	[0, 0, 0, 0, 8, 0, 0, 7, 9],
	// ];

	const puzzle = sudoku.makepuzzle();

	const __return = [];

	let index = 0;

	for (let i = 0; i < NUM_ROWS; i++) {
		const row = [];

		for (let j = 0; j < NUM_COLS; j++) {
			row.push(puzzle[index] || EMPTY);
			index++;
		}

		__return.push(row);
	}

	return __return;
}

