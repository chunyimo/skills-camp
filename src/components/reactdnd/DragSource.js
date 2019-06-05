import React from 'react';

// const boxstyle = {
//     height: '40px',
//     position: 'relative', 
//     overflow: 'hidden',
//     display: 'inline-block',
//     border: '1px solid red'
    
// }





// const contentstyle = {
//     marginLeft: '50px', 
//     display: 'inline-block', 
//     borderLeft: '1px solid red',
//     width: '200px', 
//     height: '40px', 
//     backgroundColor: '#bdbdbd',
//     cursor: 'move',
//     border: '1px dotted red'
// }

// const h6style = {
//     borderLeft: '2px solid transparent',
//     padding: '0',
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     textOverflow: 'ellipsis',
//     margin: '0',
//     border: '1px solid black',
//     height: '40px',
//     width: '200px',
// }

// const wrapboxstyle = {
//     marginLeft: '50px',
//     borderLeft: '1px solid blue',
// } 

// const wrapstyle = {
//     overflow: 'hidden',
//     marginLeft: '-4px',
//     position: 'relative',
//     display: 'inline-block',
//     border: '1px dotted black'
    
// }

const containerStyle = {
    height: '400px',
    width: '800px',
    backgroundColor: 'white',
    border: '1px solid black'
}

const boxstyle = {
    marginLeft: '50px',
   
    
}

const itemstyle = {
    width: '218px',
    height: '38px',
    position: 'relative',
    display: 'inline-block',
    border: '1px solid #0fdedd',
    borderRadius: '2px',
    backgroundColor: 'red',
    verticalAlign: 'top',
    textAlign: 'center',
}

const wrapstyle = {
    overflow: 'hidden',
    marginLeft: '-4px',
    position: 'relative',
    display: 'inline-block',
    border: '1px dotted black'    
}

const linestyle = {
    display: 'inline-block', 
    position: 'absolute', 
    top: '19px', 
    left: '-50px',
    width:'50px', 
    height: '2px', 
    border: 'solid', 
    borderWidth: '0 0 1px 1px', 
}

const linestyle2 = {
    display: 'inline-block', 
    position: 'absolute', 
    top: '-20px', 
    left: '-40px',
    width:'40px', 
    height: '40px', 
    border: 'solid', 
    borderWidth: '0 0 1px 1px', 
}
const optstyle = {
    display: 'inline-block',
    position: 'absolute', 
    zIndex: '1', 
    width: '20px', 
    height: '20px', 
    top: '10px',
    backgroundColor: '#ffff00', 
    left: '-30px', 
    border: '1px solid', 
    borderRadius: '50%', 
    textAlign: 'center'
}

const DragSource = (props) => {
    function drag(event) {    
        let parentNode = event.target.parentNode;
        parentNode.setAttribute("id", "isbebingDraged");
        event.dataTransfer.setData("id",parentNode.id);
        console.log(parentNode.id);
    }
    function dragend(event) {
        
        let parentNode = event.target.parentNode;
        parentNode.removeAttribute("id");
        console.log(parentNode);
    }
    function allowDrag(event) {
        event.preventDefault();
    }
    function drop(event) {
        event.preventDefault();
        var data=event.dataTransfer.getData("id");
        var el = document.getElementById(data)
        event.target.parentNode.lastElementChild.appendChild(el);
        
    }
    return (
        <div style={containerStyle}>
            {/* <div class='box' style={boxstyle}>
                <div class="item" style={itemstyle}>1</div>
            </div> */}
            <div class="wrap" style={wrapstyle}>
                <div class='box' style={boxstyle}>
                    <div class="item" style={itemstyle}>2</div>
                    <div class="wrap" style={wrapstyle}>
                            <div class='box' style={boxstyle}>
                                <div class="item" style={itemstyle}>
                                    <div class="line" style={linestyle}></div> 
                                    <span class="opt" style={optstyle}>+</span> 
                                    2
                                </div>
                                <div class="wrap" style={wrapstyle}>

                                </div>
                            </div>
                            <div class='box' style={boxstyle}>
                                <div class="item" style={itemstyle}>
                                    <div class="line" style={linestyle2}></div>  
                                </div>
                                <div class="wrap" style={wrapstyle}>

                                </div>
                            </div>
                    </div>
                </div>
                <div class='box' style={boxstyle}>
                    <div class="item" style={itemstyle}>2</div>
                    <div class="wrap" style={wrapstyle}>
                    <div class='box' style={boxstyle}>
                                <div class="item" style={itemstyle}>2</div>
                                <div class="wrap" style={wrapstyle}>

                                </div>
                            </div>
                            <div class='box' style={boxstyle}>
                                <div class="item" style={itemstyle}>2</div>
                                <div class="wrap" style={wrapstyle}>

                                </div>
                            </div>
                    </div>
                </div>
                
            </div>
        </div>

    )
}

export default DragSource;