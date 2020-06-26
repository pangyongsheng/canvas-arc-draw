# 可拖拽的弧形进度条组件（支持移动端）


## 使用方法


#### Using npm
npm i dragArc -S

```
 import DragArc from 'DragArc';
```

#### 直接引入js

```
<script src= 'dist/drag-arc.min.js'>
```

### 调用

```js
new DragArc({
    el: dom,
    value: 10,
    change: (v) => {
        console.log(v)
    },
    ...
})
```

## 属性


| Name | Description | Type | Default | Required |
| - | - | - | - | - |
| el | 放置组件的DOM元素 | Element | none | Y |
| change|当前值变化时触发的事件，回调参数为当前进度值Number（0-100）| Function | 
| startDeg | 滑动圆弧的起始弧度 | Number (0-2)| 0 |
| endDeg | 滑动圆弧的结束弧度 |Number (0-2)| 1 |
| value | 默认值 | Number (0-100) | 0 | 
| innerColor | 内侧弧度的颜色 | String | 
| outColor | 外侧圆弧背景颜色 | String,Array |
| innerLineWidth | 内侧弧线宽 | Number | 1 |
| outLineWidth  |  外侧弧线宽 |  Number | 20 |
|  counterclockwise | 逆时针方向 | Boolean | true |
| sliderColor  | 滑块颜色  | String | 
|  sliderBorderColor | 滑块边框颜色  | String | #fff|

## 方法

| draw(n) | 设置当前进度为n | Number (0-100) |
| - | - | - |


[详细介绍查看](http://www.cnblogs.com/pangys/p/6837344.html )
