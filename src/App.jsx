import { useEffect, useRef, useState } from 'react';

import './App.css';
import GameBoard from './components/GameBoard';
import { EMPTY, NUM_COLS, NUM_ROWS } from './constants';
import createBoard from './utils/createBoard';
import createConstraints from './utils/createConstraints';
import getAvailableValues from './utils/getAvailableValues';
import getIndex from './utils/getIndex';
import getNextMinDomainCell from './utils/getNextMinDomainCell';
import isFilled from './utils/isFilled';

function App() {
	const [board, setBoard] = useState(createBoard());
	const constraints = useRef(createConstraints()).current;
	const [currentPosition, setCurrentPosition] = useState({});
	const [stack, setStack] = useState([]);
	const [availableValues, setAvailableValues] = useState([]);
	const [steps, setSteps] = useState([]);
	const [backtracking, setBacktracking] = useState(false);

	useEffect(() => {
		if (!availableValues.length || !stack.length) {
			return;
		}

		if (isFilled(board)) {
			return;
		}

		const value = availableValues[0][0];

		if (!value) {
			setBoard((prev) => [...prev]);
			return;
		}

		setSteps((prev) => [
			`Bước ${steps.length + 1}: Xét (${currentPosition.x}, ${
				currentPosition.y
			}): ${value}`,
			...prev,
		]);

		setBoard((prev) => {
			prev[stack[0].x][stack[0].y] = value;
			return [...prev];
		});

		setAvailableValues((prev) => {
			prev[0] = prev[0].slice(1);

			return prev;
		});
	}, [stack]);

	useEffect(() => {
		if (!availableValues.length || !stack.length) {
			return;
		}

		if (isFilled(board)) {
			return;
		}

		setTimeout(() => {
			const pos = getNextMinDomainCell(board, constraints);

			if (typeof pos.x === 'undefined' || backtracking) {
				if (availableValues[0].length) {
					setBacktracking(false);
					setStack((prev) => [...prev]);
					return;
				}

				setBacktracking(true);

				if (!stack[1]) {
					setBacktracking(false);
					setStack((prev) => [...prev]);
					return;
				}

				setSteps((prev) => [
					`Bước ${
						steps.length + 1
					}: <span class="danger">Quay lại</span> (${stack[1].x}, ${
						stack[1].y
					})`,
					...prev,
				]);

				setBoard((prev) => {
					prev[stack[0].x][stack[0].y] = EMPTY;
					return prev;
				});

				setCurrentPosition(stack[1]);
				setStack((prev) => [...prev.slice(1)]);
				setAvailableValues((prev) => [...prev.slice(1)]);

				return;
			}

			setBacktracking(false);

			setCurrentPosition(pos);
			setStack((prev) => [pos, ...prev]);
			setAvailableValues((prev) => [
				getAvailableValues(pos, board, constraints),
				...prev,
			]);
		}, 100);
	}, [board]);

	const handleSolve = () => {
		const pos = getNextMinDomainCell(board, constraints);
		if (typeof pos.x === 'undefined') {
			return;
		}

		setCurrentPosition(pos);
		setStack((prev) => [pos, ...prev]);
		setAvailableValues((prev) => [
			getAvailableValues(pos, board, constraints),
			...prev,
		]);
	};

	return (
		<div className='row'>
			<div className='col'>
				<div className='col'>
					<GameBoard
						board={board}
						constraints={constraints}
						current={currentPosition}
					/>
				</div>
			</div>
			<div className='col'>
				<ul
					style={{
						height: NUM_ROWS * 50,
						width: NUM_COLS * 50,
						overflowY: 'scroll',
					}}
				>
					{steps.map((step, i) => (
						<li
							key={i}
							dangerouslySetInnerHTML={{ __html: step }}
						></li>
					))}
				</ul>
				<button onClick={handleSolve}>Solve</button>
			</div>
		</div>
	);
}

export default App;

