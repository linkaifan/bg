window.onload = function() {

    Hexagon();
}
    //定义随机函数  
function RandomNum(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}
//构造六边形函数  
function Hexagon() {
    this.hexagon = document.createElement("div");
    this.width =144;
    this.height =158;
        //如果元素有id名，我们可以直接使用，不用document.get....获取
    var visualWidth = document.documentElement.clientWidth;
    var visualHeight = document.documentElement.clientHeight;  
    this.left = RandomNum(0, visualWidth - 144);
    this.top = RandomNum(0, visualHeight -158);

}



