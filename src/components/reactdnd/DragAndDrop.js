import React from 'react';
import DragSource from './DragSource';
import DropTarget from './DropTarget';
import { Divider } from '@material-ui/core';

const DragAndDrop = () => {
    return (
        <div>
            <DropTarget></DropTarget>
            <br/>
            <DragSource>
                
            </DragSource>
        </div>
    )
}

export default DragAndDrop;