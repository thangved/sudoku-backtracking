import clsx from 'clsx';
import React from 'react';

import { EMPTY, NUM_COLS, SQUARE_SIZE } from '../constants';
import getIndex from '../utils/getIndex';

const GameBoard = ({
	board = [[]],
	fixedBoard = [[]],
	current,
	constraints,
}) => {
	return (
		<div className='game'>
			<table>
				<tbody>
					{board.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((col, colIndex) => (
								<td
									className={clsx({
										highlight:
											current.x === rowIndex &&
											current.y === colIndex,
										constraints:
											constraints[
												getIndex({
													x: rowIndex,
													y: colIndex,
												})
											][getIndex(current)],
										fixed: fixedBoard[rowIndex][colIndex],
									})}
									style={{
										borderRight:
											(colIndex + 1) % SQUARE_SIZE == 0 &&
											colIndex + 1 !== NUM_COLS &&
											'2px solid',
										borderBottom:
											(rowIndex + 1) % SQUARE_SIZE == 0 &&
											rowIndex + 1 !== NUM_COLS &&
											'2px solid',
									}}
									key={colIndex}
								>
									{col !== EMPTY && col}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameBoard;

