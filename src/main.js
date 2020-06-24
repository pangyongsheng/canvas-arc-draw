/*
 * @Author       : pangyongsheng
 * @Date         : 2020-06-22 16:13:50
 * @LastEditTime : 2020-06-24 17:49:59
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \drag-arc\src\dragArc.js
 */
class DragAcr {
  constructor(param) {
    this.initParam(param)
    this.draw(10)
  }
  initParam(param) {
    const {
      el,
      startDeg = 0,
      endDeg = 1,
      innerColor = "#c0c0c0",
      outColor = "#0078b4",
      innerLineWidth = 1,
      outLineWidth = 20,
      counterclockwise = true,
      rotate = 0,
      slider = 10,
      color = "",
      sliderColor = "#fff",
      sliderBorderColor = "#f15a4a"
    } = param;

    this.el = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.center = this.width / 2
    this.radius = this.width / 3; //滑动路径半径
    this.initCanvas(el);

    this.startDeg = 2 - startDeg;
    this.endDeg = 2 - endDeg;
    this.innerColor = innerColor;
    this.outColor = outColor;
    this.innerLineWidth = innerLineWidth;
    this.outLineWidth = outLineWidth;
    this.counterclockwise = counterclockwise;
    this.rotate = rotate;
    this.slider = slider;
    this.color = color;
    this.sliderColor = sliderColor;
    this.sliderBorderColor = sliderBorderColor;

    this.isDown = false;
    this.event(el)

  }
  initCanvas(dom) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "dragArc");
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.width);
    dom.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    console.log(this.ctx)
  }
  //绘图
  draw(value) {
    this.ctx.clearRect(0, 0, this.width, this.width);
    // j = j || 0.75 * Math.PI;
    this.ctx.save();

    this.rotate && this.ctx.translate(this.center, this.center);
    this.rotate && this.ctx.rotate(Math.PI * this.rotate);
    this.rotate && this.ctx.translate(-this.center, -this.center);

    // 绘制内层圆弧
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.arc(this.center, this.center, this.radius - 20, Math.PI * this.startDeg, Math.PI * this.endDeg, this.counterclockwise); // 绘制内层圆弧
    this.ctx.strokeStyle = '#0078b4';
    this.ctx.stroke();

    // 绘制外侧圆弧
    this.ctx.beginPath();
    this.ctx.arc(this.center, this.center, this.radius, Math.PI * this.startDeg, Math.PI * this.endDeg, this.counterclockwise); // 绘制外侧圆弧
    this.ctx.strokeStyle = '#c0c0c0';
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 20;
    this.ctx.stroke();

    let Deg = this.transDeg(value)

    //console.log(Deg)

    // 绘制可变圆弧
    this.ctx.beginPath();
    this.ctx.arc(this.center, this.center, this.radius, Math.PI * this.startDeg, Deg, this.counterclockwise); // 可变圆弧
    this.ctx.strokeStyle = '#f15a4a';
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 20;
    this.ctx.stroke();

    // 绘制滑块
    this.P = this.DegXY(Deg)
    this.ctx.beginPath();
    this.ctx.moveTo(200, 200);
    this.ctx.arc(this.P.x, this.P.y, this.slider + 5, 0, Math.PI * 2, false); // 绘制滑块内侧
    this.ctx.fillStyle = this.sliderBorderColor;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.moveTo(200, 200);
    this.ctx.arc(this.P.x, this.P.y, this.slider, 0, Math.PI * 2, false); // 绘制滑块
    this.ctx.fillStyle = this.sliderColor;;
    this.ctx.fill();

  }
  transDeg(v) {
    let range = this.startDeg - this.endDeg;
    let val = range / 100 * v;
    return (this.startDeg - val) * Math.PI;
  }
  DegXY(deg) {
    let d = 2 * Math.PI - deg;
    return this.respotchangeXY({
      x: this.radius * Math.cos(d),
      y: this.radius * Math.sin(d)
    })
  }
  //canvas坐标转化为中心坐标
  spotchangeXY(point) {
    const spotchangeX = (i) => {
      return i - this.center
    }
    const spotchangeY = (i) => {
      return this.center - i
    }
    return {
      x: spotchangeX(point.x),
      y: spotchangeY(point.y)
    }
  }

  //中心坐标转化为canvas坐标
  respotchangeXY(point) {
    const spotchangeX = (i) => {
      return i + this.center
    }
    const spotchangeY = (i) => {
      return this.center - i
    }
    return {
      x: spotchangeX(point.x),
      y: spotchangeY(point.y)
    }
  }
  event(dom) {  //事件绑定
    dom.addEventListener("mousedown", this.OnMouseDown.bind(this), false);
    dom.addEventListener("mousemove", this.debounce(this.OnMouseMove.bind(this)), false);
    dom.addEventListener("mouseup", this.OnMouseUp.bind(this), false);
  }
  OnMouseMove(evt) { //
    
    if(!this.isDown) return;
    
    console.log('move')
      let evpoint = {};
      evpoint.x = this.getx(evt);
      evpoint.y = this.gety(evt);
      let point = this.spotchangeXY(evpoint);
      console.log(point)
      let deg = this.getDeg(point.x, point.y);

      //console.log(deg)
      this.draw(deg)
  }
  OnMouseDown(evt) {
    console.log('down');
    let X = this.getx(evt);
    let Y = this.gety(evt);
    let minX = this.P.x - this.slider;
    let maxX = this.P.x + this.slider;
    let minY = this.P.y - this.slider;
    let maxY = this.P.y + this.slider;
    if (minX < X && X < maxX && minY < Y && Y < maxY) {   //判断鼠标是否在滑块上 
      console.log("in slide")
      this.isDown = true;
    } else {
      this.isDown = false;
    }
  }
  OnMouseUp() {  //鼠标释放
    this.isDown = false
  }
  getDeg(lx,ly) {
    console.log(lx,ly)
    console.log(ly/lx)
    let adeg =  Math.atan(ly/lx)
    console.log(adeg)
    let deg;
    if(lx>=0 && ly>=0){
      deg = adeg;
    }
    if(lx<=0 && ly>=0){
      deg =  adeg + Math.PI;
    }
    if(lx<=0 && ly<=0){
      deg =  adeg + Math.PI;
    }
    if(lx>=0 && ly<=0){
      deg = adeg + Math.PI * 2;
    }
    return deg / ((this.startDeg - this.endDeg)*Math.PI) * 100
  }
  //获取鼠标在canvas内坐标x
  getx(ev) {
    return ev.clientX - this.el.getBoundingClientRect().left;
  }
  //获取鼠标在canvas内坐标y
  gety(ev) {
    return ev.clientY - this.el.getBoundingClientRect().top;
  }
  debounce(func) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, 10);
    }
  }
}


export default DragAcr