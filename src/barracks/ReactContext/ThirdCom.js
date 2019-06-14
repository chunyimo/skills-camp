import React from 'react';
import Context from './Context';

class ThirdCom extends React.Component {
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
               {({theme, toggle}) => (
                    <button
                    onClick={toggle} //调用回调
                    style={{backgroundColor: theme}}>
                    Toggle Theme
                    </button>
                )} 
            </Context.Consumer>
        )
    }    
}
ThirdCom.contextType = Context;
export default ThirdCom;