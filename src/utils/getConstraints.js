import getIndex from './getIndex';
import getPosition from './getPosition';

export default function getConstraints(pos, constraints) {
	return Object.keys(constraints[getIndex(pos)]).map(Number).map(getPosition);
}

