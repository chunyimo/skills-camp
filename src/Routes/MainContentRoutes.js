import React from 'react'
import {  Route, Switch } from 'react-router-dom'
import DragAndDrop from '../barracks/reactdnd/DragAndDrop'
import D3Main from '../barracks/d3/D3Main';
import FirstCom from '../barracks/ReactContext/FirstCom';
import Emit from '../barracks/emit/Emit';
import Redux from '../barracks/redux/ReduxIndex';
import HookIndex from "../barracks/hook";
import ScalePanleIndex from '../barracks/ScalePanel';
const MainContentRoutes = (props) => {  
    return (
        <Switch>
            <Route path='/reactdnd' component={DragAndDrop}></Route>
            <Route path='/d3main' component={D3Main}></Route>
            <Route path='/reactcontext' component={FirstCom}></Route>
            <Route path='/emit' component={Emit}></Route>
            <Route path='/redux' component={Redux}></Route>
            <Route path='/hook' component={HookIndex}></Route>
            <Route path='/scale' component={ScalePanleIndex}></Route>
        </Switch>
    )
}

export default MainContentRoutes;