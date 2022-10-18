import clsx from 'clsx';
import { useState } from 'react';

import { EMPTY, MAX_VALUE, NUM_COLS, SQUARE_SIZE } from '../constants';
import getAvailableValues from '../utils/getAvailableValues';
import getIndex from '../utils/getIndex';

const GameCell = ({
	current,
	constraints,
	rowIndex,
	colIndex,
	fixedBoard,
	col,
	setFixedBoard,
	stack,
}) => {
	const [editing, setEditing] = useState(false);

	const handleDbClick = () => {
		setEditing(true);
	};

	const handleKeyUp = (event) => {
		if (event.code !== 'Enter') {
			return;
		}

		if (event.target.value > MAX_VALUE) {
			return;
		}

		const pos = { x: rowIndex, y: colIndex };
		const value = parseInt(event.target.value);

		const values = getAvailableValues(pos, fixedBoard, constraints);

		if (!values.includes(value)) {
			return;
		}

		setEditing(false);

		setFixedBoard((prev) => {
			prev[rowIndex][colIndex] = value;
			return [...prev];
		});
	};

	const handleBlur = () => {
		setEditing(false);
	};

	return (
		<td
			className={clsx({
				highlight: current.x === rowIndex && current.y === colIndex,
				constraints:
					constraints[
						getIndex({
							x: rowIndex,
							y: colIndex,
						})
					][getIndex(current)],
				fixed: fixedBoard[rowIndex][colIndex],
				marked: stack.some(
					(pos) => pos.x === rowIndex && pos.y === colIndex,
				),
			})}
			style={{
				borderRight:
					(colIndex + 1) % SQUARE_SIZE == 0 &&
					colIndex + 1 !== NUM_COLS &&
					'2px solid #000',
				borderBottom:
					(rowIndex + 1) % SQUARE_SIZE == 0 &&
					rowIndex + 1 !== NUM_COLS &&
					'2px solid #000',
			}}
			key={colIndex}
			onDoubleClick={handleDbClick}
		>
			{editing ? (
				<input
					type='number'
					min={1}
					max={MAX_VALUE}
					autoFocus
					onKeyUp={handleKeyUp}
					onBlur={handleBlur}
				/>
			) : (
				col !== EMPTY && col
			)}
		</td>
	);
};

export default GameCell;

