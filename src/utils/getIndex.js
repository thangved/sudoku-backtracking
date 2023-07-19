import { NUM_COLS } from '../constants';

export default function getIndex(pos) {
	return pos.y + pos.x * NUM_COLS;
}
