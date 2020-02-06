import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//// 1. Create a grid of nine boxes
// 1. When any box is clicked a red `X` appears
// 1. When the next box is clicked a Blue `O` appears
// 1. #1 and #2 are repeated until a row of 3 of the same character is created
// 1. When a win happens:
// 1. Alert the players who won
// 1. Disallow any further clicks on the game board
// 1. Display a `Play Again` button that resets the game
// 1. For a tie:
// 1. Alert players that game has ended in a tie
// 1. Display a `Play Again` button that resets the game

class Square extends React.Component {
	constructor(props) {
		super(props);
    }
    
	render() {
        const classNames = `bordered-square ${this.props.color}`
		return <div className={classNames} onClick={this.props.onClick}>{this.props.value}</div>;
	}
}

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
	
	}


	renderSquare(id) {
        const color = this.props.squareValues[id] == "O" ? "blue-font" : "red-font";
		return <Square  color={color} value={this.props.squareValues[id]} onClick={() => this.props.onClick(id)}/>;
	}

	// if(condition) {}

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

class GameContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            squareValues: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleSquareClick(id) {
        this.state.squareValues[id] = this.state.xIsNext ? "X" : "O";
        const newArray = this.state.squareValues;
        this.setState({
            xIsNext: !this.state.xIsNext,
            squareValues:  newArray,
        })
        console.log(this.state.squareValues);
    }

	render() {
		return <GameBoard squareValues={this.state.squareValues} onClick={(id) => this.handleSquareClick(id)}/>;
	}
}

ReactDOM.render(<GameContainer />, document.getElementById('root'));
