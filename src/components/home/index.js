import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Game from '../game';
import Setup from '../setup';
import './style.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startGame: false,
        };
    }

    setSetup = (setup) => {
        this.setState({ setup, startGame: true });
    }

    render() {

        const { setup, startGame } = this.state;

        return (
            <>
            <div className="root">
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Tic-tac-toe
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

            <Grid container className='message' justify="center">
                <Grid item xs={8}>
                    <div>
                        <Card>
                            <CardContent>
                                <p>
                                Jogo desenvolvido utilizando o algoritmo de <i>MinMax</i> para a disciplina de <i>Inteligência Artificial</i> do curso de graduação em ciência da computação da UFLA.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>

            <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                    <div className="setup">
                        <Setup setSetup={this.setSetup}/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Game startGame={startGame} setup={setup} />
                </Grid>
            </Grid>
            </>
        );
    }
}


export default Home;
