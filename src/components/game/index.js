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
                },
                {
                    value: '',
                    style: '',
                    row: 1,
                },
                {
                    value: '',
                    style: '',
                    row: 1,
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                },
                {
                    value: '',
                    style: '',
                    row: 2,
                },
                {
                    value: '',
                    style: '',
                    row: 3,
                },
                {
                    value: '',
                    style: '',
                    row: 3,
                },
                {
                    value: '',
                    style: '',
                    row: 3,
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
	      }
    }

    checkWinner = (symbol) => {
        let { cells } = this.state;
        winPossibilities.map((possibility) => {
            if (cells[possibility[0]].value == symbol && cells[possibility[1]].value == symbol && cells[possibility[2]].value == symbol)
                this.setState({ endGame: true });
        });
    }

    turn = (position, symbol) => {
        let { cells } = this.state;
        cells[position].value = symbol;
        this.setState({ cells });

        this.checkWinner(symbol);
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
                    {cell.row === 1 ? (<td className="cell" onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
                  </>
                ))}
                </tr>
                <tr>
                {cells && cells.map( (cell, idx) => (
                  <>
                        {cell.row === 2 ? (<td className="cell" onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
                  </>
                ))}
                </tr>
                <tr>
                {cells && cells.map( (cell, idx) => (
                  <>
                  {cell.row === 3 ? (<td className="cell" onClick={this.getMove} key={idx} id={idx}>{ cell.value }</td>) : null }
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
