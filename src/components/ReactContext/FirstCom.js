import React from 'react';
import SecondCom from './SecondCom';
import Context from './Context';
const themes = {
    light: '#ffcdd2',
    dark: '#9c27b0',
  };
class FirstCom extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = () => {
            this.setState(state => ({
                theme: state.theme === themes.dark ? themes.light:themes.dark,
            }));
            console.log("11")
        }
        this.state = {
            theme: themes.light,
            toggle: this.toggle,
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                <SecondCom></SecondCom>
            </Context.Provider>           
        )
    }    
}
FirstCom.contextType = Context;
export default FirstCom;