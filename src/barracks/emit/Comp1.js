import React, { Component } from 'react';
import emitter from './events';
const EventEmitter = require('events');

class Comp1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Comp1',
        }
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener("changeMessage", (message) => {
            this.setState({
                message
            })
            console.log(message);
        })
    }

    componentWillUnmount() {
       
    }

    render() {
        return (
            <div>
                {this.state.message}
            </div>
        )
    }
    
}

export default Comp1;