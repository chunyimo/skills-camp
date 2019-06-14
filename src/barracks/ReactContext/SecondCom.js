import React from 'react';
import ThirdCom from './ThirdCom';

class SecondCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ThirdCom></ThirdCom>
            </div>
        )
    }    
}
export default SecondCom;