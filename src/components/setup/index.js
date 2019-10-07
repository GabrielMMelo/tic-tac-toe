import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './style.css';

class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setup: {
                players: {
                    human: {
                        name: 'Você',
                        symbol: 'O',
                    },
                    ai: {
                        name: 'AI',
                        symbol: 'X',
                    },
                },
                level: 'dumb',
            },
            levels: [
                'dumb',
                'impossible (MinMax)',
            ],
            symbols: [
                {
                    unicode: '0',
                    available: true,
                    type: 0,
                },
                {
                    unicode: '1',
                    available: true,
                    type: 1,
                },
                {
                    unicode: 'O',
                    available: true,
                    type: 0,
                },
                {
                    unicode: 'X',
                    available: true,
                    type: 1,
                },
            ]
        };
    }

    onSubmitSetup = () => {
        const { setup } = this.state;
        const { setSetup } = this.props;

        setSetup(setup);
    }

    onChangeSetup = (e, id) => {
        const { setup } = this.state;

        if (e.target.name === 'humanName') {
            setup.players.human.name = e.target.value;
        }
        else if (e.target.name === 'humanSymbol') {
            setup.players.human.symbol = e.target.value;
        }
        else if (e.target.name === 'aiName') {
            setup.players.ai.name = e.target.value;
        }
        else if (e.target.name === 'aiSymbol') {
            setup.players.ai.symbol = e.target.value;
        }
        else if (e.target.name === 'level') {
            setup.level = e.target.value;
        }

        this.setState({ setup });
    }

    render() {

        const { levels, setup, symbols } = this.state;

        return (
            <>
                <Card className='card'>
                    <CardContent>
                        <Typography className='cardTitle' gutterBottom variant='h4' component='h2'>Configurações</Typography>
                        <Grid container justify="center">
                            <Grid item xs={8}>
                                <div align="left">
                                    <Typography className='playerTitle' gutterBottom variant='h5' component='h4'>Jogador</Typography>
                                </div>
                                <TextField
                                    className="formField"
                                    name='humanName'
                                    placeholder="Você"
                                    onChange={this.onChangeSetup}
                                    label="Nome"
                                    value={setup.players.human.name}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    select
                                    className="formField"
                                    name='humanSymbol'
                                    placeholder="Símbolo"
                                    onChange={this.onChangeSetup}
                                    label="Símbolo"
                                    value={setup.players.human.symbol}
                                    variant='outlined'
                                    margin="normal"
                                >
                                    {symbols.map( (symbol, key) => (
                                        <MenuItem key={key} value={symbol.unicode}>
                                            {symbol.unicode}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <div align="left">
                                    <Typography className='playerTitle' gutterBottom variant='h5' component='h4'>Adversário</Typography>
                                </div>
                                <TextField
                                    className="formField"
                                    name='aiName'
                                    placeholder="CPU"
                                    onChange={this.onChangeSetup}
                                    label="Nome"
                                    value={setup.players.ai.name}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    select
                                    className="formField"
                                    name='aiSymbol'
                                    placeholder="Símbolo"
                                    onChange={this.onChangeSetup}
                                    label="Símbolo"
                                    value={setup.players.ai.symbol}
                                    variant='outlined'
                                    margin="normal"
                                >
                                    {symbols.map( (symbol, key) => (
                                        <MenuItem key={key} value={symbol.unicode}>
                                            {symbol.unicode}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    select
                                    className="formField"
                                    name='level'
                                    placeholder="Dificuldade"
                                    onChange={this.onChangeSetup}
                                    label="Nível"
                                    value={setup.level}
                                    variant='outlined'
                                    margin="normal"
                                >
                                    {levels.map( (level, key) => (
                                        <MenuItem key={key} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={10}>
                                <Button onClick={this.onSubmitSetup} variant="contained" color="primary" className="buttonForm">Começar</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        );
    }
}

export default Setup;
