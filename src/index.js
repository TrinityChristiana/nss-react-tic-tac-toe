import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Button, Modal } from 'semantic-ui-react';

//// 1. Create a grid of nine boxes
//// 1. When any box is clicked a red `X` appears
//// 1. When the next box is clicked a Blue `O` appears
//// 1. #1 and #2 are repeated until a row of 3 of the same character is created
//// 1. When a win happens:
//// 1. Alert the players who won
//// 1. Disallow any further clicks on the game board
//// 1. Display a `Play Again` button that resets the game
///// 1. For a tie:
//// 1. Alert players that game has ended in a tie
//// 1. Display a `Play Again` button that resets the game

class Square extends React.Component {
	render() {
		const classNames = `bordered-square ${this.props.color}`;
		return (
			<div className={classNames} onClick={this.props.onClick}>
				<span className='value-text'>{this.props.value}</span>
			</div>
		);
	}
}

class GameBoard extends React.Component {
	renderSquare(id) {
		const color =
			this.props.squareValues[id] === 'O' ? 'blue-font' : 'red-font';
		return (
			<Square
				color={color}
				value={this.props.squareValues[id]}
				onClick={() => this.props.onClick(id)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className='row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class ModalMini extends React.Component {
	render() {
		const open = this.props.show;

		return (
			<div>
				<Modal size='mini' open={open} onClose={this.props.close}>
					<Modal.Content>
						<p className='modal-text'>
							{this.props.winner}
						</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							positive
							icon='checkmark'
							labelPosition='right'
							content='Play Again'
							onClick={this.props.close}
						/>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}

class GameContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squareValues: Array(9).fill(null),
			xIsNext: true,
			isDone: false,
			isTie: false,
			open: false,
			winner: null
		};
	}

	checkForWin() {
		const winIndex = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[6, 4, 2],
			[0, 4, 8]
		];

		let winner = null;

		const wonGame = winIndex.map(row => {
			const hasItem = row.map(item =>
				this.state.squareValues[item] === null ? false : true
			);

			const wonRow = hasItem.includes(true)
				? this.state.squareValues[row[0]] ===
				  this.state.squareValues[row[1]]
					? this.state.squareValues[row[1]] ===
					  this.state.squareValues[row[2]]
						? true
						: false
					: false
				: false;

			if (wonRow) {
				winner = this.state.squareValues[row[0]];
			}

			return wonRow;
		});
		console.log(winner);
		return [wonGame.includes(true) ? true : false, winner];
	}

	clearBoard() {
		this.setState({
            squareValues: Array(9).fill(null),
            xIsNext: true,
			isDone: false,
			isTie: false,
			open: false,
			winner: null
		});
	}
	handleSquareClick(id) {
		if (!this.state.squareValues[id] && !this.state.isDone) {
			this.state.squareValues[id] = this.state.xIsNext ? 'X' : 'O';
			const newArray = this.state.squareValues;
			this.setState({
				xIsNext: !this.state.xIsNext,
				squareValues: newArray
			});
		}

		if (this.checkForWin()[0]) {
            const text = `The winner is: ${this.checkForWin()[1]}`;
			this.setState({
				isDone: true,
				open: true,
				winner: text
			});
		} else if (!this.state.squareValues.includes(null)) {
            const text = `This game ended in a tie`;

			this.setState({
				isDone: true,
				isTie: true,
				open: true,
				winner: text
			});
		}
	}

	close = () => {
        this.setState({ open: false });
        this.clearBoard();
	};
	// show = () => this.setState({ open: true });

	render() {
		return (
			<div>
				<ModalMini
					show={this.state.open}
					winner={this.state.winner}
					close={this.close}
					clear={this.clearBoard}
				/>
				<GameBoard
					squareValues={this.state.squareValues}
					onClick={id => this.handleSquareClick(id)}
				/>
			</div>
		);
	}
}

ReactDOM.render(<GameContainer />, document.getElementById('root'));
