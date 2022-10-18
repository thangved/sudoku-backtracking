import clsx from 'clsx';
import React from 'react';

import GameCell from './GameCell';

const GameBoard = ({
	board = [[]],
	fixedBoard = [[]],
	current,
	constraints,
	backtracking,
	setFixedBoard,
}) => {
	return (
		<div
			className={clsx('game', {
				backtracking,
			})}
		>
			<table>
				<tbody>
					{board.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((col, colIndex) => (
								<GameCell
									current={current}
									constraints={constraints}
									rowIndex={rowIndex}
									colIndex={colIndex}
									fixedBoard={fixedBoard}
									col={col}
									key={colIndex}
									setFixedBoard={setFixedBoard}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameBoard;

