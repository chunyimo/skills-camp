import React, { useState, useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import reducer from './counterReducer';
import actions from './counterActions';

function HookCounter() {
    const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(reducer, {count: 0});
    useEffect(() => {
        setInterval(() => {
            setCount(count => count+1)
        }, 1000);
    }, count)
    return (
        <div>
            <p>yout clicked {count} times</p>
            <Button onClick={() => setCount(count + 1)}>click_add</Button>
            <Button onClick={() => setCount(count - 1)}>click_sub</Button>
            <Divider />
            <p>Hook</p>
            <h3>State.Count: {state.count}</h3>
            <Button onClick={() => dispatch(actions.increment())}>click_add</Button>
            <Button onClick={() => dispatch(actions.decrement())}>click_sub</Button>

        </div>
    )

}

export default HookCounter;