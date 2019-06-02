import React from 'react'
import { BrowserRouter as Routers, Route, Redirect, Switch } from 'react-router-dom'
import DragAndDrop from '../components/reactdnd/DragAndDrop'
import D3Main from '../components/d3/D3Main';
const MainContentRoutes = (props) => {  
    return (
        <Switch>
            <Route path='/reactdnd' component={DragAndDrop}></Route>
            <Route path='/d3main' component={D3Main}></Route>
        </Switch>
    )
}

export default MainContentRoutes;