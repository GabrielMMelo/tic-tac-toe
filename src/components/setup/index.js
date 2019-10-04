import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from 'react-select';
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
            name: '',
            levels: [
                'dumb',
                'impossible',
            ],
        };
    }

    render() {

        const { name, level } = this.state;

        return (
                <>
                <Card>
                  <CardContent>
                    <TextField
                      name='name'
                      placeholder="Você"
                      label="Nome"
                      value={name}
                      variant='outlined'
                    />
                    <Select
                      value={}
                      options={levels}
                    />
                  </CardContent>
                </Card>
                </>
        );
    }
}


export default Setup;
