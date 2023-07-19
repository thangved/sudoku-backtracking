import { NUM_COLS, NUM_ROWS } from '../constants';

export default function getPosition(index) {
	return {
		x: parseInt(index / NUM_ROWS),
		y: index % NUM_COLS,
	};
}
