import React, { Component } from 'react';
import './style.css';


const playerSymbol = 'X';
const aiSymbol = 'O';
const winPossibilities = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [6, 4, 2]
];

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endGame: false,
            cells: [
                {
                    value: '',
                    style: '',
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 3,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 3,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    row: 3,
                    fill: '',
                },
            ]
        };
    }

    componentDidMount () {
        this.startGame();
    }

    startGame = () => {
        let { cells } =  this.state;
        console.log(cells);
        this.setState({ endGame: false });
	      for (let i = 0; i < cells.length; i++) {
		        cells[i].value = '';
		        cells[i].style = '';
		        cells[i].fill = '';
	      }
    }

    checkWinner = (symbol) => {
        let { cells } = this.state;
        let possibilityIdx = -1;
        winPossibilities.map((possibility, idx) => {
            if (cells[possibility[0]].value == symbol && cells[possibility[1]].value == symbol && cells[possibility[2]].value == symbol) {
                this.setState({ endGame: true });
                possibilityIdx = idx;
            }
        });
        return possibilityIdx;
    }

    fillWinnerMove = (winnerCells) => {
        console.log(winnerCells);
        let { cells } = this.state;
        winnerCells.map((cell) => {
            cells[cell].fill = 'rgba(0,200,0,0.4)';
        });
    }

    turn = (position, symbol) => {
        let { cells } = this.state;
        cells[position].value = symbol;
        this.setState({ cells });

        let result = this.checkWinner(symbol);
        if (result !== -1) {
            console.log("ganhou");
            this.fillWinnerMove(winPossibilities[result]);
        }
    }

    getMove = (e) => {
        if (!this.state.endGame)
          this.turn(e.target.id, playerSymbol);
    }

    render() {
        const { cells, endgame } = this.state;

        return (
            <>
            <table>
              <tbody>
                <tr>
                {cells && cells.map( (cell, idx) => (
                  <>
                        {cell.row === 1 ? (<td className="cell" style={{backgroundColor: cell.fill}} onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
                  </>
                ))}
                </tr>
                <tr>
                {cells && cells.map( (cell, idx) => (
                  <>
                        {cell.row === 2 ? (<td className="cell" style={{backgroundColor: cell.fill}} onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
                  </>
                ))}
                </tr>
                <tr>
                {cells && cells.map( (cell, idx) => (
                  <>
                        {cell.row === 3 ? (<td className="cell" style={{backgroundColor: cell.fill}} onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
                  </>
                ))}
                </tr>
              </tbody>
            </table>
            <div className="endgame">
                <div className="text">{endgame ? 'Acabou' : 'Não acabou'}</div>
            </div>
                <button onClick={this.startGame}>Replay</button>
            </>
        );
    }
}

export default Game;
