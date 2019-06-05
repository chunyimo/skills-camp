function mouseover(evt) {

    evt.setAttribute("draggable", 'true');
    console.log(evt.getAttribute("class"))
}
window.onload = function() {
    let item2s = [];
    console.log(item2s);
    item2s = document.getElementsByClassName("item2");
    for (let i = 0; i < item2s.length; i++) {
        let item = item2s[i];
        item.ondblclick = function() {
            console.log("1");
            console.log(this.setAttribute("draggable", "true"));
        }
    }
    item2s = document.getElementsByClassName("item");
    for (let i = 0; i < item2s.length; i++) {
        let item = item2s[i];
        item.ondblclick = function() {
            console.log("1");
            console.log(this.setAttribute("draggable", "true"));
        }
    }

};
document.addEventListener("dragstart", function( event ) {
    // 保存拖动元素的引用(ref.)
    let dragged = event.target;
    // 使其半透明
    console.log("start drag");
    event.target.style.opacity = .5;
}, false);
document.addEventListener("dragend", function (event) {
    let dragged = event.target;
    console.log("drag end");
    event.target.style.opacity = "";
}, false);