<!--
 * @Author       : your name
 * @Date         : 2020-07-01 10:06:43
 * @LastEditTime : 2020-07-20 11:24:18
 * @LastEditors  : Please set LastEditors
 * @Description  : In User Settings Edit
 * @FilePath     : \canvas-arc-draw\README.md
--> 

# 可拖拽的弧形进度条组件（支持移动端）

这是一个支持任意弧度开始结束，正时针、逆时针，样式可配置的圆形可拖动进度条


## 使用方法


#### Using npm
npm i drag-arc -S

```
 import DragArc from 'drag-arc';
```

#### 也可下载直接引入js

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
| change| 当前值变化时触发的事件，回调参数为当前进度值Number（0-100）| Function |
| mouseUp| 滑动结束，鼠标释放时调用该方法 | Function |
| startDeg | 滑动圆弧的起始弧度 | Number| 0 |
| endDeg | 滑动圆弧的结束弧度 |Number | 2 |
| value | 默认值 | Number (0-100) | 0 | 
| textShow | 显示文字 | Boolean | true | 
| innerColor | 内侧弧度的颜色 | String | 
| outColor | 外侧圆弧背景颜色 | String,Array |
| innerLineWidth | 内侧弧线宽 | Number | 1 |
| innerLineDash | 内侧弧线是否为虚线,如为虚线直接设置虚线线宽，默认不显示虚线 | Number | 0 |
| outLineWidth  |  外侧弧线宽 |  Number | 20 |
|  counterclockwise | 逆时针方向 | Boolean | true |
| sliderColor  | 滑块颜色  | String | 
|  sliderBorderColor | 滑块边框颜色  | String | #fff|
| showDrag | 是否显示滑块 | Boolean | true |


这里startDeg，endDeg 设置为任意数值n,表示表示n *  π, 如示例为 0 和1 ，表示0 到 π ；


## 方法

| draw(n) | 设置当前进度为n | Number (0-100) |
| - | - | - |

## 实现介绍

[实现方法查看](https://www.cnblogs.com/pangys/p/13201808.html)
