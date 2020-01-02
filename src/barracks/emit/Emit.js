import React from 'react';
import Comp1 from './Comp1';
import Comp2 from './Comp2';
import EmitTest from './EmitTest';

const Emit = (props) => {
    return (
        <div>
            <Comp1></Comp1>
            <Comp2></Comp2>
            <EmitTest/>
        </div>
    )
}

export default Emit;