import reducer from './counterReducer'
import actions from './counterActions'
import React, { useReducer } from 'react';
function ReturnReducer() {
    const [state, dispatch] = useReducer(reducer, {count: 0});
    return (
        [state, dispatch]
    )
}

export default ReturnReducer;