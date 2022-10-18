import { useEffect, useRef, useState } from 'react';

import './App.css';
import GameBoard from './components/GameBoard';
import { EMPTY, NUM_COLS, NUM_ROWS } from './constants';
import createBoard from './utils/createBoard';
import createConstraints from './utils/createConstraints';
import getAvailableValues from './utils/getAvailableValues';
import getNextMinDomainCell from './utils/getNextMinDomainCell';
import isFilled from './utils/isFilled';

function App() {
	const [board, setBoard] = useState(createBoard());
	const [fixedBoard, setFixedBoard] = useState(createBoard());
	const constraints = useRef(createConstraints()).current;
	const [currentPosition, setCurrentPosition] = useState({});
	const [stack, setStack] = useState([]);
	const [availableValues, setAvailableValues] = useState([]);
	const [steps, setSteps] = useState([]);
	const [backtracking, setBacktracking] = useState(false);
	const [speed, setSpeed] = useState(900);

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

		setBacktracking(false);

		const available = availableValues[0].join(', ');

		setSteps((prev) => [
			`Bước ${steps.length + 1}: Xét (${currentPosition.x}, ${
				currentPosition.y
			}): ${value} trong [${available}]`,
			...prev,
		]);

		setBoard((prev) => {
			prev[stack[0].x][stack[0].y] = value;
			return [...prev];
		});
	}, [stack]);

	useEffect(() => {
		if (!availableValues.length || !stack.length) {
			return;
		}

		if (isFilled(board)) {
			setCurrentPosition({});
			setSteps((prev) => [
				'<span class="success">Thành công!!</span>',
				...prev,
			]);
			return;
		}

		const timeout = setTimeout(() => {
			const pos = getNextMinDomainCell(board, constraints);

			if (!pos || backtracking) {
				if (availableValues[0].length > 1) {
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
				setAvailableValues((prev) => {
					prev = prev.slice(1);

					prev[0] = prev[0].slice(1);

					return prev;
				});

				return;
			}

			setBacktracking(false);

			setCurrentPosition(pos);
			setStack((prev) => [pos, ...prev]);
			setAvailableValues((prev) => [
				getAvailableValues(pos, board, constraints),
				...prev,
			]);
		}, 1000 - speed);

		return () => clearTimeout(timeout);
	}, [board]);

	useEffect(() => {
		handleReset();
	}, []);

	const handleSolve = () => {
		const pos = getNextMinDomainCell(board, constraints);
		if (!pos) {
			return;
		}

		setCurrentPosition(pos);
		setStack((prev) => [pos, ...prev]);
		setAvailableValues((prev) => [
			getAvailableValues(pos, board, constraints),
			...prev,
		]);
	};

	const handleReset = () => {
		const board = createBoard();

		const __board = [];

		for (const row of board) {
			__board.push([...row]);
		}

		setFixedBoard(__board);

		setBoard(board);
		setCurrentPosition({});
		setStack([]);
		setAvailableValues([]);
		setSteps([]);
	};

	return (
		<div className='row'>
			<div className='col'>
				<div className='col'>
					<GameBoard
						board={board}
						constraints={constraints}
						fixedBoard={fixedBoard}
						current={currentPosition}
					/>
				</div>
			</div>
			<div className='col'>
				<ul
					style={{
						height: NUM_ROWS * 50,
						width: '100%',
						minWidth: NUM_COLS * 50,
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
				<button onClick={handleReset}>Reset</button>
				<br />
				<br />
				<label htmlFor='speed'>Speed</label>{' '}
				<input
					type='range'
					name=''
					id='speed'
					min={100}
					max={1000}
					value={speed}
					onChange={(event) => setSpeed(parseInt(event.target.value))}
				/>
				{speed}
			</div>
		</div>
	);
}

export default App;

