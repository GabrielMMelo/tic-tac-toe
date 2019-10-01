import React, { Component } from 'react';

import Game from '../game';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
            <div>Home</div>
            <Game/>
            </>
        );
    }
}


export default Home;
