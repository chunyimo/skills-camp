import React from 'react';
import Context from './Context';

class ThirdCom extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.context);
    }

    render() {
        return (
            <Context.Consumer>
                {
                    context => (
                        
                            <button
                            onClick={this.context.toggle} //调用回调
                            style={{backgroundColor: this.context.theme}}>
                            Toggle Theme
                            </button>
                    
                    )
                }
            </Context.Consumer>
            
        )
    }    
}
export default ThirdCom;