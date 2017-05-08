var Draw={
   init:function(){
    this.obj=document.getElementById("canvas");	//获取canvas对象
    this.cObj=document.getElementById("canvas").getContext("2d");
    this.pathr=120; //滑动路径半径
    this.event();   //初始化事件
    this.draw.prototype=this; //draw继承父元素方法
    this.p=new this.draw(112,284,18);  //创建实例p
   },
   draw:function(x,y,r,j){  //绘图
      this.cObj.clearRect(0,0,400,400);
      this.x=x;
      this.y=y;
      this.r=r;
      this.j=j||0.75*Math.PI;
      console.log("="+this.j);

      this.cObj.beginPath();
      this.cObj.lineWidth = 1;
      this.cObj.arc(200,200,100,Math.PI*0.75,Math.PI*2.25,false); // 绘制内层圆弧
      this.cObj.strokeStyle = '#0078b4';
      this.cObj.stroke();

      this.cObj.beginPath();
      this.cObj.arc(200,200,120,Math.PI*0.75,Math.PI*2.25,false); // 绘制外侧圆弧
      this.cObj.strokeStyle = '#c0c0c0';
      this.cObj.lineCap = "round";
      this.cObj.lineWidth = 20;
      this.cObj.stroke();

      this.cObj.beginPath();
      this.cObj.moveTo(200,200);
      this.cObj.arc(x,y,r,0,Math.PI*2,false); // 绘制滑块
      this.cObj.fillStyle='#f15a4a';
      this.cObj.fill();

      this.cObj.beginPath();
      this.cObj.moveTo(200,200);
      this.cObj.arc(x,y,8,0,Math.PI*2,false); // 绘制滑块外侧
      this.cObj.fillStyle='#ffffff';
      this.cObj.fill();

      this.cObj.beginPath();
      this.cObj.arc(200,200,120,Math.PI*0.75,this.j,false); // 可变圆弧
      this.cObj.strokeStyle = '#f15a4a';
      this.cObj.lineCap = "round";
      this.cObj.lineWidth = 20;
      this.cObj.stroke();

      this.cObj.beginPath();
      this.cObj.moveTo(200,200);
      this.cObj.arc(x,y,11,0,Math.PI*2,false); // 绘制滑块内侧
      this.cObj.fillStyle='#ffffff';
      this.cObj.fill();
      //console.log(x);
   },
   OnMouseMove:function(evt){ //

       if(this.p.isDown){
          var a={};         
          a.x=this.getx(evt);
          a.y=this.gety(evt);
          //this.p.isDown=this.check(a.x,a.y);
          console.log(this.p.isDown);
          var b=this.spotchange(a);
          var co=this.getmoveto(b.x,b.y);
          console.log("鼠标"+a.x+','+a.y+'||'+b.x+','+b.y);
          if(this.check(b.x,b.y)){
            var co=this.getmoveto(b.x,b.y);
            var tar=this.respotchange(co)
            //console.log("移动坐标"+tar.x+","+tar.y);
            var o=co.z;
            this.p.draw(tar.x,tar.y,this.p.r,o);
            //反馈结果
            if(o<3.292){
              nowState='A';
            }else if(o<4.234){
              nowState='B';
            }else if(o<5.176){
              nowState='C';
            }else if(o<6.118){
              nowState='D';
            }else if(o<7.06){
              nowState='E';
            }
            console.info(nowState);
          }
         // console.log(lx+'-'+ly);  
       }
   },
   OnMouseDown:function(evt){
      console.log('down');
      var X=this.getx(evt);
      var Y=this.gety(evt);
      var minX=this.p.x-this.p.r;  
      var maxX=this.p.x+this.p.r;
      var minY=this.p.y-this.p.r;
      var maxY=this.p.y+this.p.r;
      if(minX<X && X<maxX && minY<Y && Y<maxY){   //判断鼠标是否在滑块上 
        this.p.isDown=true;      
      }else{
        this.p.isDown=false;
      }
   },
   OnMouseUp:function(){  //鼠标释放
       this.p.isDown=false
   },
   event:function(){  //事件绑定
       this.obj.addEventListener("mousedown",this.OnMouseDown.bind(this),false);
       this.obj.addEventListener("mousemove",this.OnMouseMove.bind(this),false);
       this.obj.addEventListener("mouseup",this.OnMouseUp.bind(this),false);
   },
  getmoveto:function(lx,ly){
      if(!this.p.isDown){
        return false;
      }
      var tem={};
      tem.o=Math.atan(ly/lx); //鼠标移动点圆形角
      tem.x=this.pathr*Math.cos(tem.o);
      tem.y=this.pathr*Math.sin(tem.o);
      if(lx<0){ //坐标点处理
        tem.x=-tem.x;
        tem.y=-tem.y;
      }
     if(lx>0){  //弧度值处理
      tem.z=-Math.atan(tem.y/tem.x)+Math.PI*2;
     }else{
      tem.z=-Math.atan(tem.y/tem.x)+Math.PI;
     }
     if(tem.z>7.06){  //最大值
      tem.z=7.06;
      tem.x=this.pathr*Math.cos(Math.PI*2.25);
      tem.y=-this.pathr*Math.sin(Math.PI*2.25);
     }
     if(tem.z<2.4){ //最小值
      tem.z=2.4;
      tem.x=this.pathr*Math.cos(Math.PI*0.75);
      tem.y=-this.pathr*Math.sin(Math.PI*0.75);
     }
    console.log(tem);
    return tem;
   },
  spotchange:function(a){ //canvas内坐标转化为圆形坐标 
    var target={};
    if(a.x<200 && a.y<200){
      target.x=-(200-a.x);
      target.y=200-a.y;
    }else if(a.x>200 && a.y<200){
      target.x=a.x-200;
      target.y=200-a.y;
    }else if(a.x>200 && a.y>00){
      target.x=a.x-200;
      target.y=-(a.y-200)
    }else if(a.x<200 && a.y>200){
      target.x=-(200-a.x);
      target.y=-(a.y-200);
    }
    return target;
  },
  respotchange:function(a){ //圆心坐标转换为canvas内坐标
    var target={};
    if(a.x>0 && a.y>0){
      target.x=200+a.x;
      target.y=(200-a.y);
    }else if(a.x<0 && a.y>0){
      target.x=200+a.x;
      target.y=200-a.y;
    }else if(a.x<0 && a.y<0){
      target.x=200+a.x;
      target.y=-(a.y-200)
    }else if(a.x>0 && a.y<0){
      target.x=200+a.x;
      target.y=-(a.y-200);
    }
    return target;
  },
  check:function(x,y){  //限制可拖动范围
    var xx=x*x;
    var yy=y*y;
    var rr=114*114; //最小
    var rrr=126*126;  //最大
    if(xx+yy>rr && xx+yy<rrr){
      return true;
    }
    return false;
  },
  getx:function(ev){  //获取鼠标在canvas内坐标x
    //console.log(lpx);
    return ev.clientX-this.obj.getBoundingClientRect().left;
  },
  gety:function(ev){  //获取鼠标在canvas内坐标y
    return ev.clientY-this.obj.getBoundingClientRect().top;
  }
  ///////
}


var nowState;
Draw.init();


window.onload=function(){

}
