import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import Game from '../game';
import './style.css';

class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setup: {
                name: 'Você',
                level: 'dumb',
            },
            levels: [
                'dumb',
                'impossible',
            ],
        };
    }

    render() {

        const { name, levels, setup } = this.state;

        return (
            <>
                <Card className='card'>
                    <CardContent>
                        <Grid container justify="center">
                            <Grid item xs={10}>
                                <TextField
                                    className="formField"
                                    name='name'
                                    placeholder="Você"
                                    label="Nome"
                                    value={setup.name}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    select
                                    className="formField"
                                    name='level'
                                    placeholder="Facinho"
                                    label="Nível"
                                    value={setup.level}
                                    variant='outlined'
                                    onChange={() => {}}
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
                                <Button onClick={this.startGame} variant="contained" color="primary" className="buttonForm">Começar</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>
        );
    }
}

export default Setup;
