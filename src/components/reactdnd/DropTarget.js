import React from 'react';
const dropstyle = {
    overflow: 'scroll', 
    height: '200px', 
    width: '800px',
    border: '1px dotted green'
}
const DropTarget = (props) => {
    function allowDrop(event) {
        event.preventDefault();
    }
    function drop(event) {
        event.preventDefault();
        var data=event.dataTransfer.getData("id");
        var el = document.getElementById(data)
        event.target.appendChild(el);
        console.log(event.target);
    }
    return (
        <div style={dropstyle} onDragOver={allowDrop} onDrop={drop}></div>
    )
} 

export default DropTarget;