import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import HookCounter from './HookCounter';
import PUR from './PublicUseReducer';
import actions from './counterActions';
import UsePublicUseReducer from './UsePublicUseReducer';
function HookIndex() {
    const [count, setCount] = useState(0);
    const [state, dispatch] = PUR();
    return (
        <div>
            <HookCounter></HookCounter>
            <Divider/>
            <h2>PUBLIC_REDUCER: {state.count}</h2>
            <Button onClick={() => dispatch(actions.increment())}>add</Button>
            <Button onClick={() => dispatch(actions.decrement())}>sub</Button>
            <Divider/>
            <UsePublicUseReducer></UsePublicUseReducer>
        </div>
    )

}

export default HookIndex;
