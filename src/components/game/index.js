import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import cloneDeep from 'lodash/cloneDeep';
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
            gameMode: "dumb",
            players: {
                "human":
                    {
                        name: 'Você',
                        symbol: '1',
                    },
                "ai":
                    {
                        name: 'IA',
                        symbol: '0',
                    }
            },
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

    getMove = (e) => {
        const { players } = this.state;
        if(this.isValidMovement(e.target.id)) {   // cell is still available
            this.turn(e.target.id, players['human']);
            this.setState({}, () => {  // setState() without objects to update in order to force the endGame's pending update
                const { endGame } = this.state;
                if (!endGame)  // if it isn't a tie
                    this.turn(this.bestMove(), players['ai']);
            });
        }
    }

    turn = (position, player) => {
        let { cells } = this.state;
        cells[position].value = player.symbol;
        this.setState({ cells });

        let result = this.checkWinner(cells, player);
        if (result !== -1) {
            this.fillWinnerMove(winPossibilities[result]);

            return result;
        }
    }

    emptyCells = (cells, fromMinMax=false) => {
        let empties = cells.filter(cell => cell.value === '');
        if (empties.length === 0 && !fromMinMax) {
            this.setState({ endGame: true });
        }
        return empties;
    }

    bestMove = () => {
        const { gameMode, players, cells } = this.state;
        if (gameMode === 'dum') {
            try {
                return this.emptyCells(cells)[0].id;
            } catch(err) {
            }
        }
        else {
            let cellsCopy = cloneDeep(cells);
            console.log(cellsCopy);
            return this.minimax(cellsCopy, players['ai']).index;
        }
    }

    minimax = (cells, player) => {
        const { players } = this.state;
        var empties = this.emptyCells(cells, true);

        if (this.checkWinner(cells, players.human, true) !== -1) {
            return {score: -10};
        } else if (this.checkWinner(cells, players.ai, true) !== -1) {
            return {score: 10};
        } else if (empties.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < empties.length; i++) {
            var move = {};
            move.index = cells[empties[i].id].id;
            cells[empties[i].id].value = player.symbol;

            if (player == players['ai']) {
                let result = this.minimax(cloneDeep(cells), players.human);
                move.score = result.score;
            } else {
                let result = this.minimax(cloneDeep(cells), players.ai);
                move.score = result.score;
            }

		        cells[empties[i].id].value = '';

            moves.push(move);
        }

        var bestMove;
        if(player === players['ai']) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        }

        if(player === players['ai'])
            ;
            //console.log("Moves", moves);
        return moves[bestMove];
    }


    checkWinner = (cells, player, fromMinMax=false) => {
        let possibilityIdx = -1;
        winPossibilities.map((possibility, idx) => {
            if (cells[possibility[0]].value === player.symbol && cells[possibility[1]].value === player.symbol && cells[possibility[2]].value === player.symbol) {
                if(!fromMinMax)
                this.setState({ endGame: true, winner: player.name });
                possibilityIdx = idx;
            }
        });

        this.emptyCells(cells, fromMinMax);

        return possibilityIdx;
    }

    fillWinnerMove = (winnerCells) => {
        let { cells } = this.state;
        winnerCells.map((cell) => {
            cells[cell].fill = 'rgba(0,200,0,0.4)';
        });
    }

    isValidMovement = (position) => {
        const { endGame, cells } = this.state;
        return !endGame && cells[position].value === '';
    }


    render() {
        const { cells, endGame, winner } = this.state;

        let styleEndGame = !endGame ? {visibility: 'hidden'} : {};
        //let styleButton = !started ? {}
        return (
                <>
                <div align="center">
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
                </div>
                <div align="center">
                    <div className="endgame" style={styleEndGame}>
                    <div className="text">{ winner ? winner + " venceu!" : 'Empate!' }</div>
                    </div>
                </div>
                <div align="center">
                    <Button onClick={this.startGame} variant="contained" color="primary" className='button'>
                        Recomeçar
                    </Button>
                </div>
                </>
        );
    }
}

export default Game;
