import React from 'react';
import Context from './Context';

class ThirdCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
export default ThirdCom;