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
    const isIphone = win.navigator.appVersion.match(/[iphone|ipad]/gi);
    const devicePixelRatio = win.devicePixelRatio;
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
  [data-dpr="2"] & {
    font-size: 14px * 2;
  }
  [data-dpr="3"] & {
    font-size: 14px * 3
  }
}

###  设置缩放视口与设置理想视口有何不同

### vm/vh:css单位
css3新增单位，可视区宽高100vw，100vh window.innerHeight/Width

### link和@import引入CSS的区别？
两者都是外部引用CSS的方式，但是存在一定的区别：
1）link是xhtml标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2）link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显
3）link是xhtml标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4）link支持使用js控制DOM去改变样式；而@import不支持。

### 1像素问题
  边框为1px的css像素，在普通屏幕下1px，高清屏（dpr为2）下2px，是由于不同移动设备的dpr不同，导致1px的css像素转换成物理像素显示不一样
  css中涉及1像素的地方任然用px为单位，设置<meta initial-scale="1/dpr">将整个页面缩小为dpr倍，对于页面用rem方案的情况，将页面的跟字体再放大dpr倍，这时候就能在不改变页面其他布局下保持边框css像素为1px
### transform的scale属性
允许对元素进行缩放，scaleY()通过设置Y轴的值类定义缩放转换并结合伪元素使用，通过transform-origin:50% 0%修改元素变换的中心点实现
针对横向边框用scaleY,竖向边框scaleY,一圈的scale(),并且需要注意转移元素变换中心
.oneBorder:before {
  transform-origin: 50% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) { // dpr为2时
  .oneBorder:before {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 3) { // dpr为3时
  .oneBorder:before {
    transform: scaleY(0.33);
  }
}

### border-image属性
border-image: url 剪裁（clip）位置，重复性

30% 40% 40% 30%形成九宫格裁剪

重复性：repeat：重复； round 平铺:以完整的单元铺满区域，stretch拉伸默认值

边框将图片分成9部分， border-top-left-image， border-top-image， border-top-right-image
                  border-left-image, .......,  border-right-image
                  border-bottom-left-image，border-bottom-image，border-bottom-right-image，
四个对角不受重复方式影响，该怎样还是怎样

### 背景图片
对于背景图片，使用image-set根据用户设备的分辨率匹配合适的图像，同时要考虑兼容性问题
.css {
  background-image: url(...png); 不支持image-set情况下显示
  background: -image-set(
    url(1x.png) 1x,
    url(2x.png) 2x,
    url(3x.png) 3x,
  )
}
媒体查询，对于背景图片，用媒体查询自动切换不同分辨率的版本
.css {
  background-image: url(...png);
}
@media only screen and(min-device-pixel-ratio: 2) {
  .css {
    background-image: url(..2x.png);
  }
}
@media only screen and(min-device-pixel-ratio: 3) {
  .css {
    background-image: url(..3x.png);
  }
}
### 什么是css盒子模型
元素的margin、border、padding、content就构成了CSS盒模型。
CSS盒模型分为IE盒模型（也叫怪异盒模型） 和 W3C盒模型（标准盒模型)。
现在所有标准的浏览器都遵循的是W3C盒模型，IE6以下版本的浏览器遵循的是IE盒模型。
IE盒模型：width/height = content + padding + border
W3C盒模型：width/height = content。
C3新增box-sizing: content-box | border-box | inherit，默认值为content-box。
值为content-box，那元素遵循的是W3C盒模型；
值为border-box，那元素遵循的是IE盒模型；
值为inherit，该属性的值应该从父元素继承。
### picture
picture：为不同视口提供不同图片，使用<picture>标签，是h5定义的一个容器标签，内部用<source>和<image>,浏览器会匹配<source>的type，media，srcset等属性，找到最适合当前布局/视口宽度的图片，这里的<img>标签是浏览器不支持picture元素，或者支持picture但是没有合适的媒体定义时的后备，不能省略
<picture>
  <source media="(min-width: 30px)" srcset="cat-vertical.jpg" />
  <source media="(min-width: 60px)" srcset="cat-verticalmin.jpg" />
  <img src="cat.jpg" alt="cat" />
</picture>
### 对图片的处理
加载网页时，60%以上流量来自加载图片，指定图像宽度时使用相对单位防止意外溢出视口，比如width:50%,因为css允许内容溢出容器，所以：max-width:100%来保障图像以及其他内容不会溢出，
维护自适应页面中图片宽高比固定比较常用方法是用padding设置，对不同dpr以及不同分辨率/尺寸的屏幕，
对<img>引入的图片，若要适应不同像素密度的屏幕，使用srcset属性来指定多张图片，url后接一个空格，和像素描述符，浏览器根据当前设备的像素名都，选择需要加载的图像，如果srcset属性都不满足条件就加载src属性指定的默认图像
<img src-set="foo-320w.jpg,
             foo-480w.jpg 1.5x,
             foo-640w.jpg 2x" 
      src="foo640.jpg">
想针对不同屏幕用不同分辨率版本和尺寸的图片，用srcset和sizes，srcset允许浏览器选择的图像集，以及每个图像大小（用w为单位），sizes定义了一组媒体条件（例如屏幕宽度），指明当某些条件为真时，怎样的图片尺寸才是最佳选择
<img src-set="foo-320w.jpg,
             foo-480w.jpg 1.5x,
             foo-640w.jpg 2x" 
      sizes="(max-widgth:320px) 280px,
             (max-width: 480px) 440px,
             800px"
      src="foo640.jpg">
浏览器查询过程：查看设备宽度，检测sizes列表中哪个媒体条件为真，查看给予该媒体查询的槽大小，加载srcset列表中引用的最接近所选的槽大小的图像

异步加载：<img>引入的图片，使用js自带的异步加载图片，根据不同dpr加载不同分辨率图片
<img id="img" data-src1x="xx@1x.jpg" data-src2x="xx@2x.jpg" data-src3x="xx@3x.jpg"/>
let dpr = window.devicePixelratio
if(dpr > 3) {dpr = 3}
let imgSrc = $('#img').data('src'+dpr+'x');
let img = new Image();
img.src=imgSrc;
img.onload = function(imgObj) {
  $('#img').remove().prepend(imgObj) // 替换img对象
}