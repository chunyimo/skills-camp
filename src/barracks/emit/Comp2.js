import React from 'react';
import emitter from './events';
import Button from '@material-ui/core/Button'
class Comp2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'comp2',
            message2:"xixii"
        }
    }
    
    handleClick = (message) => {
        emitter.emit('changeMessage', message);
    }
    handleClick2 = (message) => {
        emitter.emit('changeMessage', message);
    }


    render() {
        return (
            <div>
                <Button onClick={this.handleClick.bind(this, this.state.message)} color="primary">change</Button>
                <Button onClick={this.handleClick2.bind(this, this.state.message)} color="primary">change</Button>
            </div>
        )
    }
}

export default Comp2;