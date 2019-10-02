import React, { Component } from 'react';
import './style.css';


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
            players: [
                {
                    name: 'Player',
                    symbol: 1,
                },
                {
                    name: 'IA',
                    symbol: 0,
                }
            ],
            endGame: false,
            winner: null,
            cells: [
                {
                    value: '',
                    style: '',
                    id: 0,
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 1,
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 2,
                    row: 1,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 3,
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 4,
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 5,
                    row: 2,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 6,
                    row: 3,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 7,
                    row: 3,
                    fill: '',
                },
                {
                    value: '',
                    style: '',
                    id: 8,
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
        this.setState({ endGame: false, winner: null });
        for (let i = 0; i < cells.length; i++) {
            cells[i].value = '';
            cells[i].style = '';
            cells[i].fill = '';
        }
    }

    emptyCells = () => {
        const { cells } = this.state;
        let empties = cells.filter(cell => cell.value === '');
        if (empties.length === 0) {
            this.setState({ endGame: true });
        }
        return empties;
    }

    bestMove = () => {
        try {
            return this.emptyCells()[0].id;
        } catch(err) {
        }
    }

    checkWinner = (player) => {
        let { cells } = this.state;
        let possibilityIdx = -1;
        winPossibilities.map((possibility, idx) => {
            if (cells[possibility[0]].value === player.symbol && cells[possibility[1]].value === player.symbol && cells[possibility[2]].value === player.symbol) {
                this.setState({ endGame: true, winner: player.name });
                possibilityIdx = idx;
            }
        });

        this.emptyCells();

        return possibilityIdx;
    }

    fillWinnerMove = (winnerCells) => {
        let { cells } = this.state;
        winnerCells.map((cell) => {
            cells[cell].fill = 'rgba(0,200,0,0.4)';
        });
    }

    turn = (position, player) => {
        let { cells } = this.state;
        cells[position].value = player.symbol;
        this.setState({ cells });

        let result = this.checkWinner(player);
        if (result !== -1) {
            this.fillWinnerMove(winPossibilities[result]);

            return result;
        }
    }

    isValidMovement = (position) => {
        const { endGame, cells } = this.state;
        return !endGame && cells[position].value === '';
    }

    getMove = (e) => {
        const { players } = this.state;
        if(this.isValidMovement(e.target.id)) {   // cell is still available
            this.turn(e.target.id, players[0]);
            this.setState({}, () => {  // setState() without objects to update in order to force the endGame's pending update
                const { endGame } = this.state;
                if (!endGame)  // if it isn't a tie
                    this.turn(this.bestMove(), players[1]);
            });
        }
    }

    render() {
        const { cells, endGame, winner } = this.state;

        let hide = !endGame ? {display: 'none'} : {};
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
                <div className="endgame" style={hide}>
                <div className="text">{ winner ? winner + " venceu!" : 'Empate!' }</div>
                </div>
                <button onClick={this.startGame}>Replay</button>
                </>
        );
    }
}

export default Game;
