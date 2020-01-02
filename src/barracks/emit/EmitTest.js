import React from 'react';
import { EventEmitter } from 'events';

const emiiter = new EventEmitter();

class EmitTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emitMsg: ""
        }
        this.emit = this.emit.bind(this);
    }
    
    componentDidMount() {
        emiiter.on("emittest", (msg) => {
            this.setState({
                emitMsg: msg
            })
        })
    }

    componentWillUnmount() {
        emiiter.removeListener("emittest", () => {
            console.log('remove the emittest');
        })
    }

    emit() {
        emiiter.emit("emittest", "haha")
    }

    render() {
        return (
            <div>
                <p>{this.state.emitMsg}</p>
                <button onClick={this.emit} >emit</button>
            </div>
        )
    }
}

export default EmitTest;