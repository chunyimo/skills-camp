import React, {useState} from 'react';
import { useTheme, makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import SimpleSlider from './SimpleSlider';
import Slide from '@material-ui/core/Slide';
import Slider from '@material-ui/lab/Slider'

const useStyles = makeStyles(theme => ({
    gContent: {
        width: '1140px',
        height: '600px',
        overflow: 'auto',
        backgroundColor: '#dbdbdb',
    },
    mDashRegion: (sliderCount) => ({
        position: 'relative',
        padding: '15px 25px',
        minWidth: '100%',
        minHeight: '100%',
        overflow: 'hidden',
        width: `${sliderCount * 1920}px`,
        height: `${sliderCount * 1080}px`,
    }),
    mCanvas: (sliderCount) => ({
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '1920px',
        height: '1080px',
        backgroundColor: '#b3e5fc',
        transform: `translate(-50%,-50%) scale(${sliderCount})`,
        
    }),
    slider: {
        padding: '22px 0px',
        width: '300px',
        marginLeft: '40px'
    },
    dragDiv: {
        position: 'absolute',
        cursor: 'move',
        width: '200px',
        height: '200px',
        backgroundColor: '#90a4ae',
        left: '40px',
        top: '40px',
        display: 'inline-block',
        resize: 'both',
        overflow: 'auto',
        
    },
    spanline: {
        position: 'absolute',
        display: 'inline-block',
        width: '500px',
        height: '2px',
        left: '-50px',
        top: '0px',
        borderBottom: '3px dotted black'

    }
}))

function ScalePanleIndex() {
    const [sliderCount, setSliderCount] = useState(50)
    const classes = useStyles(sliderCount/50);
    var draggedObj_X;
    var draggedObj_Y;
    var mouse_X;
    var mouse_Y;
    
    // 从子节点node 获取父元素下的所有可以拖动的item
    const getAllDragItems = (node) => {
        if (node === null) {
            return;
        }
        let pElement = node.parentElement;
        if (pElement === null) {
           return; 
        }

        let childElements = pElement.children;
        let childElementsXYInfo = [];
        for (let i = 0; i < childElements.length; i++) {
            let element = childElements[i];
            childElementsXYInfo.push(getElementXYInfo(element));
            
        }
        return childElementsXYInfo;
    }

    const getElementXYInfo = (element) => {
        let ID = element.id;
        let cWidth = element.clientWidth;
        let cHeight = element.clientHeight;

        let LTX = element.offsetLeft;
        let LTY = element.offsetTop;

        let RTX = LTX + cWidth;
        let RTY = LTY;

        let LBX = LTX;
        let LBY = LTY + cHeight;

        let RBX = RTX;
        let RBY = LBY;

        let CCX = (LTX + RTX) / 2;
        let CCY = (LTY + LBY) / 2;
        return {ID, LTX, LTY, RTX, RTY, LBX, LBY, RBX, RBY, CCX, CCY};
    }

    const detectParallel = (curEle, curMovingEleXYInfo, allElesXYInfos, threshold) => {''
        //移除相同的点
        let otherElesXYInfos;
        if (Object.prototype.toString.call(allElesXYInfos) === "[object Array]") {
            otherElesXYInfos = allElesXYInfos.filter(item => item.ID !== curMovingEleXYInfo.ID)
        }
        // console.log("curMovingEleXYInfo", curMovingEleXYInfo)
        // console.log("otherElesXYInfos", otherElesXYInfos);

        //水平移动检测
        let compateX = [curMovingEleXYInfo.LTX, curMovingEleXYInfo.CCX, curMovingEleXYInfo.RTX];
        for (let i = 0; i < compateX.length; i++) {
            let allParallel = [];
            for (let j = 0; j < otherElesXYInfos.length; j++) {
                let otherEle = otherElesXYInfos[j];
                if (Math.abs(otherEle.LTX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.LTX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("L");
                } else if (Math.abs(otherEle.CCX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.CCX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("C");
                } else if (Math.abs(otherEle.RTX - compateX[i]) < threshold) {
                    allParallel.push({X: otherEle.RTX, length: (otherEle.LTY - curMovingEleXYInfo.LTY) < 0 ? (otherEle.LTY - curMovingEleXYInfo.LTY) : (otherEle.LBY - curMovingEleXYInfo.LBY)});console.log("R");
                }
            }
            let lengths = allParallel.map(item => item.length);
            if (lengths.length > 0) {
                let maxLength = Math.max.apply(null, lengths);
                let minLength = Math.min.apply(null, lengths);
                switch(i) {
                    case 0: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(0, -minLength, 0, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(0, -minLength, maxLength, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(0, 0, maxLength, curEle.clientWidth, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='leftspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X + "px";
                        break;
                    }
                    case 1: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(curEle.clientWidth/2, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(curEle.clientWidth/2, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(curEle.clientWidth/2, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='centerXspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X - curEle.clientWidth/2 + "px";
                        break;
                    }
                    case 2: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateXSpanline(curEle.clientWidth, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateXSpanline(curEle.clientWidth, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateXSpanline(curEle.clientWidth, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='rightspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }                       
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("X", allParallel[0].X);
                        curEle.style.left = allParallel[0].X - curEle.clientWidth + "px";
                        break;
                    }
                    default: {
                    }
                }    
            } else {
                switch(i) {
                    case 0: {
                        let sl = curEle.querySelector("[spanlinesymbolid='leftspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }                       
                        break;
                    }
                    case 1: {
                        let sl = curEle.querySelector("[spanlinesymbolid='centerXspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }
                        
                        break;
                    }
                    case 2: {
                        let sl = curEle.querySelector("[spanlinesymbolid='rightspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }    
                        break;
                    }
                    default: {
                    }
                } 
            }
            
        }
        //垂直移动检测
        let compateY = [curMovingEleXYInfo.LTY, curMovingEleXYInfo.CCY, curMovingEleXYInfo.LBY];
        for (let i = 0; i < compateY.length; i++) {
            let allParallel = [];
            for (let j = 0; j < otherElesXYInfos.length; j++) {
                let otherEle = otherElesXYInfos[j];
                if (Math.abs(otherEle.LTY - compateY[i]) < threshold) {
                    allParallel.push({Y: otherEle.LTY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                } else if (Math.abs(otherEle.CCY - compateY[i]) < threshold) {
                    console.log("center", otherEle.CCY, compateY[i]);
                    allParallel.push({Y: otherEle.CCY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                } else if (Math.abs(otherEle.LBY - compateY[i]) < threshold) {
                    allParallel.push({Y: otherEle.LBY, length: (otherEle.LTX - curMovingEleXYInfo.LTX) < 0 ? (otherEle.LTX - curMovingEleXYInfo.LTX):(otherEle.RTX - curMovingEleXYInfo.RTX)})
                }
            }
            let lengths = allParallel.map(item => item.length);
            console.log("allParallel", allParallel);
            if (lengths.length > 0) {
                let maxLength = Math.max.apply(null, lengths);
                let minLength = Math.min.apply(null, lengths);
                switch(i) {
                    case 0: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(0, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(0, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(0, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='topspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("0Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y + "px";
                        break;
                    }
                    case 1: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(curEle.clientHeight/2, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(curEle.clientHeight/2, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(curEle.clientHeight/2, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='centerYspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }
                        
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("1Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y - curEle.clientHeight/2 + "px";
                        break;
                    }
                    case 2: {
                        let spanline;
                        if (minLength < 0 && maxLength < 0) {
                            spanline = generateYSpanline(curEle.clientHeight, -minLength, 0, curEle.clientWidth, curEle.clientHeight)
                        } else if (minLength < 0 && maxLength > 0) {
                            spanline = generateYSpanline(curEle.clientHeight, -minLength, maxLength, curEle.clientWidth, curEle.clientHeight)
                        } else {
                            spanline = generateYSpanline(curEle.clientHeight, 0, maxLength, curEle.clientWidth, curEle.clientHeight)
                        }
                        let sl = curEle.querySelector("[spanlinesymbolid='bottomspanline']");
                        if (sl === null) {
                            curEle.appendChild(spanline);
                        } else {
                            sl.replaceWith(spanline);
                        }                       
                        console.log("maxLength", maxLength);
                        console.log("minLength", minLength);
                        console.log("2Y", allParallel[0].Y);
                        curEle.style.top = allParallel[0].Y - curEle.clientHeight + "px";
                        break;
                    }
                    default: {
                    }
                }    
            } else {
                switch(i) {
                    case 0: {
                        let sl = curEle.querySelector("[spanlinesymbolid='topspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }                       
                        break;
                    }
                    case 1: {
                        let sl = curEle.querySelector("[spanlinesymbolid='centerYspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }
                        
                        break;
                    }
                    case 2: {
                        let sl = curEle.querySelector("[spanlinesymbolid='bottomspanline']");
                        if (sl !== null) {
                            sl.remove();
                        }    
                        break;
                    }
                    default: {
                    }
                } 
            }
        }
    }

    

    const generateXSpanline = (left, length1, length2, nodeWidth, nodeHeight) => {
        console.log(length1, length2, nodeWidth)
        let spanlinesymbolid = "leftspanline";
        if (left === nodeWidth/2) spanlinesymbolid="centerXspanline";
        if (left === nodeWidth) spanlinesymbolid="rightspanline";
        let spanline = document.createElement("span");
        spanline.setAttribute("spanlinesymbolid", spanlinesymbolid)
        let csstext = `position: absolute; top: -${length1 + 10}px; height: ${length1 + length2 + nodeHeight + 20}px;`
        + `left: ${left}px; border-left: 3px dotted black; pointer-events: none`;
        console.log(csstext)
        spanline.style.cssText = csstext; 
        return spanline;
    }
    const generateYSpanline = (top, length1, length2, nodeWidth, nodeHeight) => {
        console.log(length1, length2, nodeHeight)
        let spanlinesymbolid = "topspanline";
        if (top === nodeHeight/2) spanlinesymbolid="centerYspanline";
        if (top === nodeHeight) spanlinesymbolid="bottomspanline";
        let spanline = document.createElement("span");
        spanline.setAttribute("spanlinesymbolid", spanlinesymbolid)
        let csstext = `position: absolute; left: -${length1 + 10}px; width: ${length1 + length2 + nodeWidth + 20}px;`
        + `top: ${top}px; border-top: 3px dotted black; pointer-events: none`;
        console.log(csstext)
        spanline.style.cssText = csstext; 
        return spanline;
    }

    const mousedown = (event) => {
        draggedObj_X = event.target.offsetLeft;
        draggedObj_Y = event.target.offsetTop;
        mouse_X = event.clientX;
        mouse_Y = event.clientY;
        event.target.isdraggable = "true";
        event.target.style.zIndex = "1";
        console.log("draggedObj(X,Y):", draggedObj_X, draggedObj_Y)
    }
    const mouseup = (event) => {
        event.target.isdraggable = "false";
        event.target.style.zIndex = "0";
        event.target.style.overflow = "auto";
        let spanlines = event.target.querySelectorAll("[spanlinesymbolid]");
        console.log("moveout", spanlines);
        if (spanlines !== null) {
            for (let i = 0; i < spanlines.length; i++) {
                spanlines[i].remove();
            }
        }
    }
    const move = (event) => {
        if (event.target.isdraggable === "true") {
            event.target.style.overflow = "visible";
            let mx = event.clientX;
            let my = event.clientY;
            let x = (mx - mouse_X) * 50/sliderCount;
            let y = (my - mouse_Y) * 50/sliderCount;
            let curX;
            let curY;
            if (0 < (draggedObj_X + x) && (draggedObj_X + x) < event.target.parentNode.clientWidth - event.target.clientWidth) {
                curX = draggedObj_X + x;
            } else if ((draggedObj_X + x) > event.target.parentNode.clientWidth - event.target.clientWidth) {
                curX = event.target.parentNode.clientWidth - event.target.clientWidth;
                
            } else if ((draggedObj_X + x) < 0) {
                curX = 0;
            }
            if (0 < (draggedObj_Y + y) && (draggedObj_Y + y) < event.target.parentNode.clientHeight - event.target.clientHeight) {
                curY = draggedObj_Y + y;
            } else if ((draggedObj_Y + y) > event.target.parentNode.clientHeight - event.target.clientHeight) {
                curY = event.target.parentNode.clientHeight - event.target.clientHeight;
                
            } else if ((draggedObj_Y + y) < 0) {
                curY = 0;
            }      
            
            event.target.style.left = (curX) + 'px';
            event.target.style.top = (curY) + 'px';

            let eleXYInfo = getElementXYInfo(event.target);
            let elesXYInfos = getAllDragItems(event.target);
            detectParallel(event.target, eleXYInfo, elesXYInfos, 5)
        }
        
    }

    const mouseout = (event) => {
        event.target.isdraggable = "false";
        event.target.style.zIndex = "0";
        event.target.style.overflow = "auto";
        let spanlines = event.target.querySelectorAll("[spanlinesymbolid]");
        console.log("moveout", spanlines);
        if (spanlines !== null) {
            for (let i = 0; i < spanlines.length; i++) {
                spanlines[i].remove();
            }
        }
    }

    
    return (
        <div style={{display: 'inline-block'}}>
            <div className={classes.gContent}>
            <div className={classes.mDashRegion}>
                <div className={classes.mCanvas}>
                    <div 
                        id = "graph1"
                        className={classes.dragDiv} 
                        isdraggable={"false"} 
                        onMouseDown={(event) => mousedown(event)}
                        onMouseUp={(event) => mouseup(event)}
                        onMouseMove={
                            (event) => move(event)   
                        }
                        onMouseOut={(event) => mouseout(event)}
                        style={{backgroundColor: '#ce93d8', }}
                        >
                    </div>
                    <div 
                        id = "graph2"
                        className={classes.dragDiv} 
                        isdraggable={"false"} 
                        onMouseDown={(event) => mousedown(event)}
                        onMouseUp={(event) => mouseup(event)}
                        onMouseMove={
                            (event) => move(event)   
                        }
                        onMouseOut={(event) => mouseout(event)}
                        style={{backgroundColor: '#ffff00', width: '150px', height: '150px'}}
                        >
                        
                    </div>
                    <div 
                        id = "graph3"
                        className={classes.dragDiv} 
                        isdraggable={"false"} 
                        onMouseDown={(event) => mousedown(event)}
                        onMouseUp={(event) => mouseup(event)}
                        onMouseMove={
                            (event) => move(event)   
                        }
                        onMouseOut={(event) => mouseout(event)}
                        style={{backgroundColor: '#ff8a65', width: '100px', height: '100px'}}
                        >
                        
                    </div>
                    <div 
                        id = "graph4"
                        className={classes.dragDiv} 
                        isdraggable={"false"} 
                        onMouseDown={(event) => mousedown(event)}
                        onMouseUp={(event) => mouseup(event)}
                        onMouseMove={
                            (event) => move(event)   
                        }
                        onMouseOut={(event) => mouseout(event)}
                        style={{backgroundColor: '#90a4ae', }}
                        >
                        
                    </div>
                </div>
            </div>          
        </div>
        <Slider
                value={sliderCount}
                className={classes.slider}
                onChange={(event, value) => setSliderCount(value) }
                min={10}
                max={100}
        />
        <Button onClick={() => getAllDragItems(document.getElementById("graph1"))}>childs</Button>
        <Button onClick={() => {
            let eleXYInfo = getElementXYInfo(document.getElementById("graph1"));
            let elesXYInfos = getAllDragItems(document.getElementById("graph1"));
            detectParallel(eleXYInfo, elesXYInfos, 10)
        }}>childs</Button>
        </div>       
    )
}

export default ScalePanleIndex;