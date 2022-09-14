### BFC
BFC块级格式上下文，是一个完全独立的空间，空间里的子元素不会影响到外面的布局
 规则：BFC是一个块元素，在垂直方向一个个排列
       BFC是一个独立容器，容器里的标签不会影响到外部标签
       垂直方向的距离由margin决定，属于同一个BFC的两个相邻的标签外边距会发生重叠
       计算BFC高度时，浮动元素也参与计算

 触发BFC的CSS属性：overflow为hidden，display不为none的，position为absolute和fixed的

  BFC解决的问题：
  1：使用float脱离文档流，高度塌陷： 给父元素设置：display:inline-block
  2：margin垂直边距重叠
  3: 两栏布局
### 实现一个布局：左边固定宽度为200，右边自适应，而且滚动条要自动选择只出现最高的那个

### 画出盒子模型，要使谷歌浏览器的盒子模型显示得跟IE浏览器一致（让谷歌跟ie一致，不是ie跟谷歌一致），该怎么做？



### 实现一个布局：左边固定宽度为200，右边自适应，而且滚动条要自动选择只出现最高的那个

### 画出盒子模型，要使谷歌浏览器的盒子模型显示得跟IE浏览器一致（让谷歌跟ie一致，不是ie跟谷歌一致），该怎么做？
### 做过css动画吗

### css3 html5新特性

### 盒子模型
盒子模型有标准盒模型和ie盒模型，标准盒模型的宽不包括padding和border，ie盒模型的框包括了，可以使用box-sizing将标准盒模型变为ie盒子模型

### 知不知道CSS Box-model？

### 做一个两栏布局，左边fixed width，右边responsive，用纸笔手写

### css 布局，左边定宽右边自适应

  ### 基本的两列自适应布局
  1，flex布局，自适应一列flex；1
  2： 浮动
  3： 绝对定位+margin
### css:两个块状元素上下的margin-top和margin-bottom会重叠。啥原因？怎么解决？
### .css3特性中的transform：translateZ(0)有什么作用
### 为什么要用translate3d？
### 精确获取页面元素位置的方式有哪些
getBoundingClientRect方法，返回一个对象，对象中包含了left，top，bottom，right四个属性。
再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;
### Css实现动画效果


### 实现布局：左边一张图片，右边一段文字（不是环绕）
### margin坍塌？水平方向会不会坍塌？

### 伪类和伪元素区别

### 使用flex布局实现三等分，左右两个元素分别贴到左边和右边，垂直居中
### Animation还有哪些其他属性

### Css实现三列布局

### Css实现保持长宽比1:1

### Css实现两个自适应等宽元素中间空10个像素

### rem是什么？em是什么？如果上一层就是根root了，em和rem等价么？



### 绝对定位与相对定位的区别
### 怎么在页面里放置一个很简单的图标，不能用img和background-img？
### link和@import有什么区别？
### position有哪些值,说下各自的作用

### 实现布局：左边一张图片，右边一段文字（不是环绕）
### margin坍塌？水平方向会不会坍塌？

### 伪类和伪元素区别


### 基本的两列自适应布局
  1，flex布局，自适应一列flex；1
  2： 浮动
  3： 绝对定位+margin
### 清除浮动有哪几种方式,分别说说

### 如何让各种情况下的div居中(绝对定位的div,垂直居中,水平居中)？

### display有哪些值？说明他们的作用

### css定义的权重
### 使用flex布局实现三等分，左右两个元素分别贴到左边和右边，垂直居中

### 如何让各种情况下的div居中(绝对定位的div,垂直居中,水平居中)？

### display有哪些值？说明他们的作用

### css定义的权重
### 浮动的原理以及如何清除浮动

### 视口
visual viewport 可见视口： 屏幕宽度，肉眼可见的
layout viewport 布局视口：横向滚动整个宽度
idea viewport： 理想视口： 布局视口=可见视口

设备宽度：可视视口，和dom宽度：布局视口 ，scale关系是：
  可见视口 = 布局视口 * scale
获取屏幕宽度：visual viewport： window.innerWidth/Height
获取DOM宽度：layout viewport： document.documentElement.clientWidth/Height

完美适配： 不需要缩放或者滚动就能看到所有内容，文字大小合适，不会因像素密度高的屏幕显得太小而看不清，idle viewport
移动设备默认的viewport是layout viewport，比屏幕宽，开发时我们要的是理想视口，meta来解决，让viewport宽度等于设备宽度，同时禁止用户缩放。不这样会出现横向滚动条

meta viewport首先是苹果公司在其Safari浏览器引入的，目的是为了解决移动端viewport问题。
meta viewport有6个属性
<meta name="viewport" content="width=device-width, init-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

像素分辨率：硬件所支持的，屏幕每行的像素*每列的像素，单位是px
尺寸：手机屏幕对角线长度换算成英寸的大小

物理像素： physical pixel：又叫设备像素，显示设备中最微小的物理部件。
一倍屏，二倍屏Retina，三倍屏是指设备以多少物理像素来显示一个css像素。
普通屏幕下：一个css像素对应一个物理像素， Retina下一个css像素对应4个物理像素。田字示意图

css像素：抽象单位，主要用于浏览器，css像素和设备无关

设备像素比dpr = 物理像素/设备独立像素

Retina屏的iphone， dpr为2，一个css像素相当于2个物理像素。三倍屏是3

viewport中，scale为dpr的倒数

设备独立像素（device independent pixels）dip：与屏幕密度有关
设备像素：device  pixels ：dp=物理像素
安卓：根据屏幕像素密度分为1dip，mdip，hdip，xhdip，规定以160dip为准，1dp=1px，如果密度为320dip 则1dp=2px
IOS：iphone4开始Retina屏


屏幕像素密度（pixel per inch）PPI：设备表面存在的像素数量，屏幕像素密度和屏幕尺寸和屏幕分辨率有关，屏幕尺寸越小，分辨率越高

屏幕尺寸、屏幕分辨率 --》 对角线分辨率/屏幕尺寸 ---》屏幕像素密度PPI ---》 dpr=物理像素/设备独立像素dip--》 viewport： scale --》 css像素


1:viewport设置理想视口
<meta name="viewport" content="width=device-width, init-scale=1, maximum-scale=1, minimum-scale=1, user-scale=no">

2: 动态设置视口缩为1/dpr;
对于安卓，所有设备缩放为1，IOs根据dpr不同，设置其缩放为dpr倒数。
(function(doc,win) {
  const docEl = win.document.documentElement;
  const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
  let metaEl = doc.querySelector(meta[name=:viewport"]);
  let dpr = 0;
  let scale = 0;
  if(!dpr && !scale) {
    const isAndroid = win.navigator.appVersion.match(/android/gi/);
    const isIphone = win.navigator.appVersipn.match(/[iphone|ipad]/gi);
    const devicePixelRatio = win.devecePixelRatio;
    if(isIphone) {
      dpr = devicePixelRatio
    } else {
      dpr = 1;
    }
    scale = 1/dpr;
  }
  docEl.setAttribute('data-dpr', dpr);
  if(!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale='+scale+',miximum-scale='+scale+'minimum-scale='+scale+'user-scale=no');
    docEl.firstElementChild.appendChild(metaEl);
  } else {
    metaEl.setAttribute('content', 'width=device-width, initial-scale='+scale+',miximum-scale='+scale+'minimum-scale='+scale+'user-scale=no');
  }
})(document, window)


dpr设备像素比= 物理像素/设备独立像素
物理像素=设备像素
设备独立像素dip
安卓标准是160dip，1px = 1dip
iphone4以上是2倍屏 


px单位的适配：设置动态缩放视口后，iphone6上，缩放为0.5，即css像素2px最终显示为1px效果，而scale为1的时候1px效果是1px，为达到一致，以px为单位的元素，比如字体其样式要适配不同dpr的版本，在动态设置viewport：scale时，同时在根元素上加data-dpr=[dpr]这种方式还是不够，若dpr为2，2之外的px无法适配到，因此选择rem为单位
.p {
  font-size: 14px;
  [data-dpr="2] & {
    font-size: 14px * 2;
  }
  [data-dpr="3] & {
    font-size: 14px * 3
  }
}

###  设置缩放视口与设置理想视口有何不同

### vm/vh:css单位
css3新增单位，可视区宽高100vw，100vh window.innerHeight/Width




