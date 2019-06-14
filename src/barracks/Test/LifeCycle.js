import React from 'react';

class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            a: '10',
        }
    }

    componentWillMount() {
        this.setState({
            a: '20',
        })
    }

    render () {
        return (
            <div>
                LifeCycle{this.state.a}
            </div>
        )
    }
    
}

export default LifeCycle;