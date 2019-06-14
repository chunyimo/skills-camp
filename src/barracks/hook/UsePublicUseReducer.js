import React from 'react';
import Button from '@material-ui/core/Button'
import PUR from './PublicUseReducer';
import actions from './counterActions';
function UsePublicUseReducer() {
    const [state, dispatch] = PUR();
    return (
        <div>
            <h2>PUBLIC_REDUCER: {state.count}</h2>
            <Button onClick={() => dispatch(actions.increment())}>add</Button>
            <Button onClick={() => dispatch(actions.decrement())}>sub</Button>
            
        </div>
    )

}

export default UsePublicUseReducer;