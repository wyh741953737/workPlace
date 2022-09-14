### jsonp
jsonp：不是ajax请求，利用script的src标签不受同源策略的影响。服务器响应必须是函数执行，为了让函数在客户端执行，响应必须是字符串，
响应参数作为函数实参，客户端要先提前定义好，定义在全局，函数名和客户端的一直，只能发get请求

### 对闭包的理解
  闭包是指有权访问另一个函数作用域中变量的函数，函数外部可以访问到函数内部的变量：比如函数作为另一个函数的返回值。
  闭包的实现思路是返回一个函数，所以闭包是经典的高阶函数

  闭包产生条件： 函数外部引用了函数内部变量，函数嵌套

  闭包优点：延伸了变量生命周期，避免了全局变量污染
  闭包缺点：闭包中的变量在外层函数被调用后不会被自动清除，所以闭包使用不当容易造成内存泄漏。
  内存溢出：是程序运行时出现的错误，当出现运行时需要的内存大于剩余内存就出现内存溢出错误
  内存泄漏：占用的内存没有及时释放，内存泄漏多了会导致内存溢出。常见的内存泄漏：意外的全局变量，函数中没有用关键字声明的变量，没有及时清理的计时器或回调函数

### ES6新增特性
1）作用域
  var声明变量可以重复声明，只有函数作用域，没有块级作用域
  新增let声明变量，const声明常量，不能重复定义，有块级作用域
  暂时性死区：var a = 123; if(true) { a = 222; let a;} ReferenceError, 对在全局声明的变量赋值（块级作用域里也声明了同名局部变量a）会报错

2）箭头函数
    1：this指向：
      普通函数的指向由函数调用的时候确定，而箭头函数的this在写代码的时候就确定了，箭头函数没有自己的this，它的this继承自上级作用域中的this
    2：箭头函数写法比普通函数简洁， 箭头函数始终是表达式，普通函数可以是函数声明和函数表达式
    3：箭头函数是匿名函数，用完就丢，就不能通过new调用，一个函数内部有2个方法：[[call]和[[Construct]]，在通过new调用时会执行[[Construct]]方法，创建一个实例对象，然后再执行这个函数体，将函数的this绑定到这个实例对象上。直接调用时，执行[[call]]方法，直接执行函数体，箭头函数没有[[Construct]]方法，不能用作构造函数调用，会报错
    4：没有原型，this， super，arguments

3）参数处理
  默认参数值
  剩余参数：es6之前对于参数不固定的函数，用arguments处理。es6可以用...args
  展开运算符：...,将字面量对象展开为多个元素，可以用来拼接两个数组 [...arr1, ...arr2]

4）模板字面量
   es6之前字符串连接用+或者concat

5）原有字面量的增强
  更安全的二进制字面量
  更安全的八进制字面量
  字符串支持Unicode： String.fromCodePoint, String.prototype.codePointA，正则表达式字面量支持Unicode， \u \ufa5

6)对象属性增强：
  属性定义支持短语法 {name: name} => {name}
  属性名支持表达式 obj: { ['baz'+quex()]: 42}
  添加__proto__属性，但是不建议使用

7）解构赋值
  数组匹配: [b,a] = [a,b]
  对象匹配: let { a, b, c} = objA
  参数匹配: function g({name: n, val: v}) {}

8)模块
  导入：import， 导出：export，默认导出： export default


9) 类
  重写构造器
  ES5：创建子类的实例对象this，再将父构造函数的方法加到this
  ES6：先创建父类的实例this，再用子类的构造函数修改this

  es6创建类：只是语法糖，class Plane {
    constructor(num) {} // 该方法虽然在类上，但是不在原型上，只是用来生成实例的
    staEnginee() {} //原型上的方法，所以实例共享
  }

  静态方法：要添加静态方法，在方法前面加static关键字。

  js类实际上还是原型继承，创建js类的实例时候要用new关键字

  使用新的super和extends关键字扩展类，constructor中必须super调用父构造函数，super必须在this之前被调用
  super类，俗称父类，就是父类构造函数
  功能上没什么变化，统一了标准，提高了性能

10）迭代和生成器
  - 迭代器:

  - 生成器
     promise的升级，ES7的async，await是终极写法
     能暂停
     generator+promise配合，外来的runner辅助执行不一致，不标准，性能低，不能写成=>
     async，await，函数前面加async，await接收异步执行的结果
  - for..of循环，
    结合了其兄弟for和for..in的优势，可以循环任何可迭代（遵循可迭代协议）类型的数据，默认情况包含：string，array, map,set，不包含对象
    for循环最大缺点是需要跟踪计数器和退出条件，虽然for循环在循环数组时确实有优势，但某些数据不是数组
    for..in:依然使用index来访问数组值，当你要像数组添加额外方法或对象很麻烦，for..in会枚举所有可枚举属性，包括原型
    forEach：只能用于数组，无法停止或者退出forEach循环，如果你想停止或者退出就用for
    for..of和for...in基本一样，for..of解决了for和forin不足，你可以随时停止或者退出for..of循环,for..of只会遍历自身属性
    for(const digest of diests) {
      if(digest % 2 === 0) {
        continue;
      }
    }

11）promise
  异步操作同步化
  promise.prototype.then
  promise.prototype.catch
  Promise.resolve
  Promise.reject
  Promise.all
  Promise.race

12）元编程
  代理：proxy
  反射： reflex

13）新增数据类型
  Symbol， Set， Map，WeakSet， WeakMap，TypedArray

14)尾递归优化

15）原有内置对象API增强
  数组： Array.from(arrayLike[,mapFn[,thisArg]])： 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
          Array.from.length === 1
          相当于执行Array.from(obj).map(mapFn, thisArg)
          mapFn:新数组中每个元素会执行该回调， thisArg执行回调时this对象
          Array.from('foo') =》 ['f','o','o']  Array.from([1,2,3], x => x+x) [2，4，6]
          数组去重合并：combine() { 
            let arr = [].concat.apply([], arguments);
            return Array.from(new Set(arr));
          }

        Array.of(ele0[,ele1[,...[,eleN]]])：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或者类型
            Array.of(7) // [7] of内是undefined则：[undefined]
            Array.of(1,2,3) // [1,2,3]
            Array(7) // [,,,,,,]
            Array(1,2,3) // [1,2,3]

        Array.prototype.fill
        Array.prototype.find
        Array.prototype.findIndex
        Array.prototype.copyWidthin(target[,start[,end]]): 浅复制数组一部分到数组另一个位置，原数组长不变,不包括end
            ['a','b','c','d','e'].copyWithin(0, 3, 4) // ['d','b','c','d','e']
            target：复制序列到该位置，如果为复数target将从末尾开始计算，target大于等于数组长度将不发生拷贝
        Array.prototype.entries：返回一个新的Array iterator对象，可以通过next迭代，该对象包含数组中每个索引的键值对
              ['a', 'b'].entries().next().value // [0, 'a']
              Array Iterator{
                __proto__:Array Itetator,
                next: f next()
                Symbol(Symbol.toStringTag): 'Array Iterator'
                __proto__: Object
              }
              iterator.next()执行后 {value: Array(2), done:false}
        Array.prototype.keys
        Array.prototype.values
  对象： Object.assign
  字符串：String.prototype.includes
         String.prototype.repeat
         String.prototype.startWith
         String.prototype.endsWith
  数字： Number.EPSILON
        Number.inInteger
        Number.isSafeInteger
        Number.isFinite
        Number.isNaN()

### Array对象自带的排序函数底层是怎么实现的？
小于等于22位的插入排序，大于22位快速排序

### 了解navigator对象吗？
Navigator 对象包含有关浏览器的信息,  
userAgent:浏览器用于 HTTP 请求的用户代理头的值
appVersion: 返回浏览器版本
appName:返回浏览器的名称
platform：返回运行浏览器的操作系统平台
cookieEnabled：浏览器启用cookie值为 true。如果禁用了 cookie，值为 false。
appCodeName：浏览器的代码名。
### link和@import引入CSS的区别？
两者都是外部引用CSS的方式，但是存在一定的区别：
1）link是xhtml标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2）link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显
3）link是xhtml标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4）link支持使用js控制DOM去改变样式；而@import不支持。

### 移动端适配问题
> 1：流式布局：又叫百分比布局，用%百分比定义宽度，高度用px固定，根据可视区域大小调整，用max-width/height控制尺寸，实现简单，不存在兼容问题，但是在大屏手机或者横竖切换场景可能会导致页面元素被拉伸变形，字体无法随屏幕大小变化。 
  宽高：宽和高相对父元素宽高
  top/bottom/left/right：相对于非static定位的父元素的height和width
  padding/margin:相对父元素的宽，与父元素的高无关
  border-radius相对自身宽度
> 2：顺应不同页面字体大小展现问题：出现弹性布局，这种布局下包裹文字的元素的尺寸采用em/rem为单位，页面主要区域依情况用px，百分比或者em/rem
上面2种：页面元素的大小按照屏幕分辨率进行适配调整，整体布局不变
> 3：rem方案：rem是相对长度单位，相对根元素fontsize计算值的倍数，是弹性布局的一种实现方式
  实现过程：先获取文档根元素和设备dpr设置rem，在页面缩放/回退/前进的时候，获取元素内部宽度（不包括垂直滚动条，边框和外边距），重新调整rem大小
  实现方法：用css处理器或者npm包将css样式中px自动转化为rem，在整个flexible适配方案中，文本用px为单位，用[data-dpr]属性区分不同dpr下文本大小，由于手机浏览器对字体显示最小是8px，更小尺寸文字用px为单位，防止转化为rem后出问题，
  优势：兼容性好，相比于之前百分比布局，页面不会因为伸缩发生变形，自适应效果更好
  不足：1）不是纯css移动端适配，需要引入js，在头部嵌入一段js监听分辨率变化动态改变根元素的字体大小，css样式和js有一定的耦合性，并且必须将改变font-size的代码放在css样式之前
      2）小数像素问题：通过rem计算后可能会出现小数像素，浏览器会对小数部分四舍五入，也就是0.634px，渲染尺寸为1px，空出的0.375px空间将由其临近的元素填充，如果一个元素尺寸是0.375，渲染尺寸就是0，但是会占据临近元素0.375px的空间，导致缩放到低于1px的元素时时隐时现，解决：指定最小转换像素，对于比较小的像素，不转换为rem或者vw。宽高相同的正方形，长宽不一样了，border-radius：50%的圆不圆了
      3）安卓浏览器下line-height垂直居中偏离问题，这种方法在安卓设备不能完全居中
      4）cursor：pointer元素点击背景变色问题，对加了cursor：pointer属性的元素，在移动端点击的时候，背景会高亮。为元素添加tag-height-color:transparent属性可以隐藏背景高亮
> 4： vh/vw方案
  原理： 移动端视口是指布局视口，1vw：等于视口宽度的1%，1vh等于视口高度的1%； vmin：取vw和vh最小的那个，vmax取vw和vh最大的那个
        使用css预处理器把设计稿尺寸转换为vw单位，包括文本，布局宽高，间距等，让这些元素能够随视口大小自适应调整，以1080px设计稿为基准，转换：
          $vw_base: 1080
          @function vw($px) {
            @return($px/1080)*100vw
          }
 优势：纯css不存在脚本依赖问题，相对于rem，逻辑清晰简单，视口单位依赖于视口的尺寸，"1vw=1/100 viewport width" 根据视口尺寸的百分比来定义宽度
 不足：存在一些兼容性问题，安卓4.4以下不支持

 > 5： rem+vw/vh
  vw和vh方案能够实现宽度和高度自适应，并且逻辑清晰，将vw/vh和rem结合，给根元素设置随视口变化的vw单位，通过postcss-plugin-vwtorem将其转换
  对1080px宽的设计稿，设置根字体大小为100px，那么设计稿中1px对应：100vw/1080=0.0925926vw,并且1rem=100px，就可以得到 1rem = 9.25926vw

> 6：基于媒体查询的响应式设计
  原理：媒体查询，给不同分辨率的设备编写不同样式。一般是指pc，平板，手机设备之间较大的分辨率差异，通常结合了流式布局和弹性布局
  @media only screen and(max-width:375px) {
    样式1
  }
  @media only screen and(max-width:750px) {
    样式2
  }
  优势：能在不同设备，不同分辨率屏幕上展示合理布局，不仅仅是样式伸缩变换
  不足：要匹配足够多的设备与屏幕，一个web页面需要多个设计方案，工作量大，通过媒体查询技术需要设置一定量的断点，到达某个断点前后的页面发生显著变化，用户体验不好

### 1像素问题
  边框为1px的css像素，在普通屏幕下1px，高清屏（dpr为2）下2px，是由于不同移动设备的dpr不同，导致1px的css像素转换成物理像素显示不一样
  css中涉及1像素的地方任然用px为单位，设置<meta initial-scale=”1/dpr“>将整个页面缩小为dpr倍，对于页面用rem方案的情况，将页面的跟字体再放大dpr倍，这时候就能在不改变页面其他布局下保持边框css像素为1px
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
### 对图片的处理
加载网页时，60%以上流量来自加载图片，指定图像宽度时使用相对单位防止意外溢出视口，比如width:50%,因为css允许内容溢出容器，所以：max-width:100%来保障图像以及其他内容不会溢出，
img的alt属性有助于提高网站的可访问性。
维护自适应页面中图片宽高比固定比较常用方法是用padding设置，对不同dpr以及不同分辨率/尺寸的屏幕，为了避免资源浪费和等待时间，针对不同屏幕使用合适图片
对<img>引入的图片，若要适应不同像素密度的屏幕，使用srcset属性来指定多张图片，url后接一个空格，和像素闽都描述符，浏览器根据当前设备的像素名都，选择需要加载的图像，如果srcset属性都不满足条件就加载src属性指定的默认图像
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

### picture
picture：为不同视口提供不同图片，使用<picture>标签，是h5定义的一个容器标签，内部用<source>和<image>,浏览器会匹配<source>的type，media，srcset等熟悉，找到最适合当前布局/视口宽度的图片，这里的<img>标签是浏览器不支持picture元素，或者支持picture但是没有合适的媒体定义时的后备，不能省略
<picture>
  <source media="(min-width: 30px)" srcset="cat-vertical.jpg" />
  <source media="(min-width: 60px)" srcset="cat-verticalmin.jpg" />
  <img src="cat.jpg" alt="cat" />
</picture>

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

### Array的unshift() method的作用是什么？如何连接两个Array？如何在Array里移除一个元素？
unShift向数组前面插入一个值，，连接2个数组用Array.prototype.concat, 移除（需要改变数组）可以用shift移除末尾，

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

### 实现事件代理
事件在冒泡阶段向上传播到父节点，因此可由父节点的监听函数统一处理多个子元素的的事件，这种方法就叫做事件的代理
!function (root, doc) {

  class Delegator {
    constructor (selector) {
      this.root = document.querySelector(selector);//顶级dom
      this.delegatorEvents = {};//代理元素及事件
      //代理逻辑
      this.delegator = e => {        
        let currentNode = e.target;//目标节点
        const targetEventList = this.delegatorEvents[e.type];
        //如果当前目标节点等于事件当前所在的节点，不再向上冒泡
        while (currentNode !== e.currentTarget) {
          targetEventList.forEach(target => {
            if (currentNode.matches(target.matcher)) {
              //开始委托并把当前目标节点的event对象传过去
              target.callback.call(currentNode, e);
            }
          })
          currentNode = currentNode.parentNode;
        }
      }
    }

    on (event, selector, fn) {
     //相同事件只添加一次，如果存在，则再对应的代理事件里添加
      if (!this.delegatorEvents[event]) {
        this.delegatorEvents[event] = [{
          matcher: selector,
          callback: fn
        }]
        this.root.addEventListener(event, this.delegator);
      }else{
        this.delegatorEvents[event].push({
          matcher: selector,
          callback: fn
        })
      }
      return this;
    }
    /*
     *移除事件
     */
    destroy () {
      Object.keys(this.delegatorEvents).forEach(eventName => {
        this.root.removeEventListener(eventName, this.delegator)
      });
    }
  }

  root.Delegator = Delegator
}(window, document)

### 列举三种禁止浏览器缓存的头字段，并写出响应的设置值
Cache-Control: no-cache
Pragma: no-cache
Expires: Thu,01Dec199416:00:00GMT 

### 精确获取页面元素位置的方式有哪些
getBoundingClientRect方法，返回一个对象，对象中包含了left，top，bottom，right四个属性。
再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;

### 如何判断object是数组类型？
Array.isArray(obj)
obj instanceOf Array
Array.isPropertyOf(obj) 判断obj是原型是不是Array



### cookie和session， localStorage, sessionStorage有什么区别
Cookie 是一些数据, 存储于你电脑上的文本文件中
cookie跨域有问题，现在都是用localStorage存token
 
cookie: 存在客户端，大小为4kb，只能存储字符串类型，存在cookie截取等安全性问题，服务端响应会带上一个maxAge，是cookie的有效期(设置有效期存于硬盘，默认内存中)，默认浏览器关闭，数据失效，每次请求带上cookie，增加带宽

session：存储在服务端，没有大小限制，session通过类似于hashTable的数据结构来存储，能支持任何类型的对象，相对来说更安全，服务端响应的sessionId存在客户端的cookie
localStorage：存在客户端，大小5mb甚至更大，永久有效除非手动删除，字符串形式存，一般用于持久登录+登录验证，window.localStorage
sessionStorage：存客户端，5mb甚至更大，当前会话期有效，字符串形式存,敏感性账号的一次性登录，window.sessionStorage，

localStorage和sessionStorage都不会随http的header发送到服务端（相比cookie也更安全），减轻了服务器压力，webStorage的一些方法：setItem，getItem，clear，removeItem， key(index)等方法操作数据比cookie方便。

cookie机制： 若不在浏览器内设置过期时间，默认当前浏览器关闭cookie失效，cookie存在内存中（会话cookie），若设置过期时间，数据存在硬盘中，过期时间内有效。每次请求都会带上cookie。

session机制：当服务端收到需要创建session对象时，会检查请求头是否带sessionId，有：根据sessionId返回对应的session对象，无：服务器创建session对象，并将sessionId通过cookie存储返回客户端，如果用户禁用cookie，就要使用url重写，通过response.encodeURL(url)将sessionId拼接在url后面。
localStorage只要在不跨域，就能读取/修改到同一份localStorage数据。
sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。
，localstorage是无法跨域的，也无法让子域名继承父域名的localstorage数据，这点跟cookies的差别还是蛮大的。
### Cookie跨域请求能不能带上
cookie一般情况下是不能跨域的
一些请求可以通过jsonp的方式实现跨域，如果是非幂等的请求，还是需要post的
处理：服务端设置： header("Access-Control-Allow-Credentials: true"), header("Access-Control-Allow-Origin: http://www.xx.com")
     客户端：请求的时候带上withCredentials参数
     var xhr = new XMLHttpRequest();
     xhr.open('post', 'http://xxx.com/demo/b/index.php', true);
     xhr.withCredentials = true;
     xhr.send();
withCredentials是指跨域请求是否提供凭证信息（cookie，http认证以及SSL证明等）为true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*。
Credentials必须在前后端都被配置，才能使带credentials的CORS请求成功。
### Cookie 是否会被覆盖，localStorage是否会被覆盖
Cookie 重名时，可能执行覆盖操作
什么情况不覆盖：
  A、站点不同时
  B、setPath("路径"); 路径不同时，Cookie 可以重名


### js和服务端对cookie的操作有什么不同？
cookie有一个属性是HttpOnly，HttpOnly被设置时，表明该cookie只能被http请求读取，不能被js读取，具体的表现是:document.cookie读取到的内容不包含设置了HttpOnly的cookie。
### js如何操作cookie
一次性只能写一个cookie，要写多个就多次操作
删除cookie
只需要将一个已经存在的cookie名字过期时间设置为过去的时间即可
document.cookie = 'uid=dkfywqkrhkwehf23;expires=' + new Date(0) + ';path=/;secure;'
修改cookie
重新赋值就好，旧值会覆盖新值。
查看是否打开cookie
window.navigator.cookieEnabled // true
### cookie 的共享策略是什么
domain和path共同决定了cookie可以被哪些url访问。
访问一个url时，如果url的host与domain一致或者是domain的子域名，并且url的路径与path部分匹配，那么cookie才可以被读取。

cookie各属性详解
Name: cookie名

Value: cookie值。

Domain: cookie的域名。如果设成.example.com，那么子域名a.example.com和b.example.com，都可以使用.example.com的cookie;反之则不可以。

Path: 允许读取cookie的url路径，一般设置为/。

Expires： cookie过期时间。不设置，则为Session会话期，页面退出时cookie失效。

HttpOnly: 设置为true时，只有http能读取。js只能读取未设置HttpOnly的cookie。

Secure: 标记为Secure的cookie，只有https的请求可以携带。

SameSite: 限制第三方url是否可以携带cookie。有3个值：Strict/Lax(默认)/None。（chrome51新增属性，chrome80+强制执行）

Strict: 仅允许发送同站点请求的的cookieLax: 允许部分第三方请求携带cookie，即导航到目标网址的get请求。包括超链接 ，预加载和get表单三种形式发送cookie
None: 任意发送cookie，设置为None，（需要同时设置Secure，也就是说网站必须采用https）
Priority：优先级，chrome的提案（firefox不支持），定义了三种优先级，Low/Medium/High，当cookie数量超出时，低优先级的cookie会被优先清除。


跨域请求（CORS）中的cookie
首先cookie的SameSite需要设置为None。 其次对于将Access-Control-Allow-Credentials设置为true的接口（表示允许发送cookie），需要我们在发送ajax请求时，将withCredentials属性设为true。

cookie如何应对XSS漏洞*
XSS漏洞的原理是，由于未对用户提交的表单数据或者url参数等数据做处理就显示在了页面上，导致用户提交的内容在页面上被做为html解析执行。

常规方案：对特殊字符进行处理，如"<“和”>"等进行转义。

cookie的应对方案：对于用户利用script脚本来采集cookie信息，我们可以将重要的cookie信息设置为HttpOnly来避免cookie被js采集。

2. cookie如何应对CSRF攻击
CSRF，中文名叫跨站请求伪造，原理是，用户登陆了A网站，然后因为某些原因访问了B网站（比如跳转等），B网站直接发送一个A网站的请求进行一些危险操作，由于A网站处于登陆状态，就发生了CSRF攻击（核心就是利用了cookie信息可以被跨站携带）！

常规方案：采用验证码或token等。

cookie的应对方案：由于CSRF攻击核心就是利用了cookie信息可以被跨站携带，那么我们可以对核心cookie的SameSite设置为Strict或Lax来避免。

### h5离线存储，manifest
浏览器有缓存，h5的manifest也可以存一下优化网站
通过离线存储将需要离线存储在本地的文件列在manifest配置文件中
application cahce里可以看
1)在html中
<html manifest="cache.manifest">
2)在根目录新建cache.manifest并写上对应代码
CACHE MANIFEST
#v0.11
CACHE:
home.css
../images/banner.png
NETWORK:
network对应的不存储
FALLBACK:
./a.html  ./offline.html 如果资源加载失败就加载offline.html



### requireJS的原理是什么
requireJS是基于AMD模块加载规范，使用回调函数来解决模块加载的问题。即异步模块加载机制，其思想就是把代码分为一个一个的模块来分块加载，这样无疑可以提高代码的重用。
在整个require中，主要的方法就两个：require和define

requireJS是使用创建script元素，通过指定script元素的src属性来实现加载模块的。
3，特点
1. 实现js文件的异步加载，避免网页失去响应
2，管理模块之间的依赖，便于代码的编写和维护

requireJS为何不会多次加载同一个文件?怎么理解内部机制?

模块的定义是一个function，这个function实际是一个 factory（工厂模式），这个 factory 在需要使用的时候（require("xxxx") 的时候）才有可能会被调用。因为如果检查到已经调用过，已经生成了模块实例，就直接返回模块实例，而不再次调用工厂方法了。



### 原生js添加class怎么添加，如果本身已经有class了，会不会覆盖，怎么保留？
document.getElementsByTagName('body')[0].className = 'snow-container'; //设置为新的
document.getElementsByTagName('body')[0].className += 'snow-container'; //在原来的后面加这个
document.getElementsByTagName('body')[0].classList.add("snow-container"); //与第一个等价

这种方法可以避免覆盖原有的类，但是也存在问题，一旦我们要添加的class多的时候，我们需要拼接的字符串就会变得比较乱，并且不易维护，我们也无法看到哪些使我们已经添加过得class，可能会造成类名添加重复；

// 首先判断当前dom是否已经包含了要添加的类
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 动态添加class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
// 将原有的class按空格拆分，并将类名保存到newclass数组中
  let newClass = el.className.split(' ')
  // 将要添加的类也push到这个数组
  newClass.push(className)
  // 将数组拼接成字符串返回给dom
  el.className = newClass.join(' ')
}


### 怎么去除字符串前后的空格
str.replace(/(^\s*)|(\s*$)/g, "");
string.trim()去除开头结尾

### 实现页面的局部刷新
通过Ajax将用户请求提交至服务器，服务器处理后返回结果，再由Ajax接收数据；


### w3c事件与IE事件的区别
绑定和取消绑定事件：
  w3c： addEventListener，removeEventListener
  IE： attachEvent， detachEvent

阻止默认：
  w3c： e.preventDefault,
  IE: window.e.returnValue=false
阻止冒泡和捕获：
  w3c： e.stopPropagation 阻止捕获和冒泡
  IE: window.e.cancelBubble只能阻止冒泡
事件目标：
  w3c：e.target
  IE：window.e.srcElement
事件对象：
  w3c： arguments.calee.caleer.arguments[0];
  IE：window.event
### js中上下文是什么
运行JavaScript代码时，当代码执行进入一个环境时，就会为该环境创建一个执行上下文，它会在你运行代码前做一些准备工作，如确定作用域，创建局部变量对象等。
执行上下文有且只有三类，全局执行上下文，函数上下文，与eval上下文
函数执行上下文可存在无数个，每当一个函数被调用时都会创建一个函数上下文；需要注意的是，同一个函数被多次调用，都会创建一个新的上下文。

执行上下文的生命周期有两个阶段：

创建阶段（进入执行上下文）
执行阶段（代码执行）
创建阶段：函数被调用时，进入函数环境，为其创建一个执行上下文，此时进入创建阶段。

执行阶段：执行函数中代码时，此时执行上下文进入执行阶段。
创建变量对象
函数环境会初始化创建 Arguments对象（并赋值）
函数声明（并赋值）
变量声明，函数表达式声明（未赋值）
确定this指向（this由调用者确定）
确定作用域（词法环境决定，哪里声明定义，就在哪里确定）


执行阶段的操作
变量对象赋值
变量赋值
函数表达式赋值
调用函数
顺序执行其它代码

函数声明，变量声明，函数表达式的优先级
函数声明，如果有同名属性，会替换掉
变量，函数表达式
函数声明优先 > 变量，函数表达式

### js有哪些函数能改变上下文
在js里面改变运行上下文有如下三个函数：
  call()
  apply()
  bind()

### window.onload和$(document).ready()的区别，浏览器加载转圈结束时哪个时间点？
1、执行时间上的区别：window.onload必须等到页面内（包括图片的）所有元素加载到浏览器中后才能执行。而$(document).ready(function(){})是DOM结构加载完毕后就会执行。

2、编写个数不同：window.onload不能同时写多个，如果有多个window.onload，则只有最后一个会执行，它会把前面的都覆盖掉。$(document).ready(function(){})则不同，它可以编写多个，并且每一个都会执行。

3、简写方法：window.onload没有简写的方法，$(document).ready(function(){})可以简写为$(function(){})。

另外：由于在$(document).ready()方法内注册的事件，只要DOM就绪就会被执行，因此可能此时元素的关联文件未下载完，例如与图片有关的HTML下载完毕，并且已经解析为DOM树了，但很有可能图片还未加载完毕，所以例如图片的高度和宽度这样的属性此时不一定有效。

要解决这个问题，可以使用JQuery中另一个关于页面加载的方法---load（）方法。load（）方法会在元素的onload事件中绑定一个处理函数。如果处理函数绑定在元素上，则会在元素的内容加载完毕后触发。如：$(window).load(function(){})=====window.onload = function(){}...


### js异步的方法（promise，generator，async）
定时器，ajax，事件处理onclick，nodejs读取文件也有异步
1）同步异步
2）ajax
3）aiax+promise
4）async await
async是generator的语法糖，generator是es6提供的一种异步编程解决方案
generator是一个状态机，
执行generator会返回一个遍历器对象
特征：function与函数名之间有*号，函数体内部用yeild表达式
函数执行返回的不是结果，是一个指针，yeild暂停
里面的代码分段执行，看到yeild就分一段
调用.next才能获取值，不停地next

async+await是gengerator的语法糖

### 装饰器
和类相关，普通函数不要用@
装饰器是一种函数，写成@+函数名
@tar // tar装饰Foo
class Foo {
  @configurable(false) // 装饰method方法
  method(){} 
}

上面的等同于
const r = tar(Foo) 调用tar装饰函数，装饰了Foo，调用函数


### 你所了解的跨域的方法都说说看你了解的？
1： webpack Plugin， 2： webpack Proxy， 3： nginx反向代理， 4：jsonp， 5：后端最好：cors，postMessage，
企业一般nginx， cors
cors:
    const allrowOrigin = function(req,res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Method', "*");
        res.header('Access-Control-Allow-Headers', "*");
        next();
    }
    app.use(allrowOrigin)

webpack proxy:
    在webpack-config.js里配置：
        devServer: {
            proxy: { 
                '/api': { 
                    target: 'http://....',
                    pathRewrite: {'/api': ''} // 不以/api开头
                }
            }
        }
jsonp:
function jsonp(options) {
  const script =  document.cvreateElement('script');
  const fName = 'jsonp'+Math.random().toString().replace('.', '');
  window[fName] = options.callback;
  let params = '';
  for(let attr in options.data) {
    params += '&' + attr + '=' + options.data[attr]; 
  }
  script.src = options.url + '?callback=' + fName + params;
  document.body.appendChild(script);
  script.onload  =  function() {
    document.body.remeveChild(script);
  }
}

window.postMessage('字符串', '*')
### 要是让你自己写一个js框架你会用到哪些设计模式,设计模式优点，项目中用过哪些
单例模式：使用对象前判断对象是否存在，不存在就创建。关键是使用一个变量保存对象
观察者模式：又叫发布订阅模式，redux使用的就是发布订阅模式
装饰器模式：在不破坏原来对象的前提下，对对象进行扩展，写一个装饰器函数，将被装饰对象传入
工厂模式：需要频繁创建对象时，注重创建对象的过程
建造者模式：和工程模式类似，注重创建对象的细节
策略模式：
### h5有个api能定位你知道是哪个吗？
naviator.geologation.getCurrentPosition(showPosition,showError)
const showPosition = (position) {
  console.log(position.coords.longitude)
  console.log(position.coords.latitude)
  console.log(position.coords.altitude)
  console.log(position.coords.accuracy)
}
### window上有哪些属性
addEventListener
alert
blur
clearTimeout
close
document
Domain
一些on相关的世界，onclick,onchange,onblur等等
location
setTimeout和setIntervel
navigator
fetch
history
innerHeight,innerWidth
localStorage


### 说下你所理解的mvc与mvvc
MVC:（backbone框架），用户可以操作view层，也可以操作control层，逻辑，数据，视图分离。 可以在view里调用model取数据，
也可以在model主动触发view修改视图，control即可以修改model也可以更新view 
缺点：复杂项目中会出现混乱。如视图改变，不知从哪触发（model或用户或control）
mvc并未具体指明各个部分应该承担具体什么职责，相互间如何交互

从大层面可将mvc分为服务端mvc框架和纯客户端mvc框架 服务端：spring mvc 客户端mvc：mvp，mvvm
MVP：模型-视图-presenter（主持人），view和model不能直接交互，只能通过presenter。解决了mvc交互混乱问题。明确了各个组件的职责， 
MVVM:基本和mvp一致。更注重数据驱动视图，新增双向数据绑定。 model职责不变，view的职责被分成2部分：展示数据和用户操作，
另一部分：view中动态的部分，比如输入框内容，按钮的enable，这部分职责转移到了VM中，所以view和model不直接交互.，
而是和VM绑定，VM除了要响应用户操作外还要维护视图状态

mvp中presenter也要维持视图状态的，但presenter将状态设置到视图上，自己不持有这些状态，
mvvm中，VM是视图状态的来源，视图只是反映VM状态

react不是mvvm框架，但是React可以作为MVVM中第二个V，也就是View； 
MVVM显著特征是双向绑定，而React是单向数据绑定；
 react整体是函数式的思想，把组件设计成纯组件、状态和逻辑通过参数传入。
 React是一个单向数据流的库，状态驱动视图。 
 react本身是面向web端的，它很轻便灵活，只是MVC架构中的view(视图)层。由于只是view层，所以它需要配合生态体系中的其他框架或模块来使用。

 通过new Vue实例的对象是MVVM中的VM，模型通过它将数据绑定到页面上，视图可以通过它将数据映射到模型上
 优点：低耦合，视图可独立于model的变化和修改
      复用：将视图逻辑放到vm里让很多view复用这逻辑

### for, forEach, map区别
for不能return会报错，break可以跳出循环，continue跳出本次循环

1：for：在复杂的循环中效率高，长度固定不用计算时for效率高于forEach，仅迭代自身可枚举属性
2：forEach：适合遍历数组和集合，长度不固定或需要计算时用forEach，forEach优势在于对稀疏数组的处理，会跳过数组中的空位, 如果是空数组，返回undefined, 不能break跳出循环（报错）return跳出本次循环，可以在forEach在使用return
3：map：返回新数组，不会对空数组检测（返回[])，不改变原始数组
forEach和map都不会改变原数组，
4： for...in 任意顺序遍历一个对象除symbol以外可枚举属性，可用break跳出循环，
代码中用return会报错，函数体中return可以跳出循环，返回数组下标
getOwnPropertyNames返回对象属性名（包括除symbol外可枚举和不可枚举属性）或hasOwnProperty确定某个属性是否是对象本身属性
5：for...of 可迭代对象（Map，Set，String， arguments不能return（报错），在函数体中会跳出循环
性能上：for < for...of < forEach < for..in < map

### load和DOMContentLoaded区别
load: 页面全部资源加载完才会执行，包括图片视频
DOMContentLoaded：dom渲染完即可执行，此时图片视频可能还没加载完

### 浏览器运行机制
根据html代码将标签转换成dom树中dom节点生成dom树，根据css生成cssom树，合并dom树和cssom树合成render树，布局：从根节点递归调用，计算每个元素位置，大小，在屏幕上的精准坐标。遍历渲染树，用ui层绘制每个节点。

### 重绘重排
重绘：元素外观发送改变，颜色，字体大小，table需要多次计算才确定在渲染树中节点的属性值，比同等元素要多花2倍时间，所以要尽量避免使用table布局
重排：元素规模尺寸，布局，隐藏等
触发重排：
1）页面渲染初始化（无法避免）
2）添加删除可见dom
3）元素位置改变，或者使用动画
4）元素尺寸：大小，外边距，边框
5）浏览器窗口尺寸（resize发生变化）
6）填充内容：文字数量，图片大小改变引起的计算值宽高的改变
7）读取某些元素属性（offsetLeft/Top/Height/Width, clientTop/Left/Width/Height, scrollTop/Left/Width/Height, width/height, getComputedStyle,currentStyle(IE)
8）设置style属性
9）激活CSS伪类（例如：:hover
重绘重排代价：耗时，浏览器卡慢

offsetTop:当前元素距离最近父元素顶部高度
cliectWidth:包括padding，不包括边框，滚动条，外边距
offsetWidth:包括padding，边框，滚动条
scrollTop不可见部分
clientTop：测出边框的高度

优化：浏览器自己的优化：浏览器会维护一个队列，吧所有引起回流重绘的操作放入，队列满了或者达到一定时间间隔进行批处理，多次-》一次
     我们：减少对dom的操作，合并多次dom和样式修改，减少对style样式请求：直接改元素的classname
      2）display：none先设置为none，然后进行页面布局操作，完成后设置display：block，这样只会引起2次重绘重排
      3）用cloneNode(true or false)和replaceChild技术，引起一次回流和重绘
      4）将需要多次重排元素，position设为absolute或者fixed，脱离文档流，他的变化不影响别的元素
      5）如果需要创建多个dom节点，用document.createDocumentFragment创建后一次性插入document
例如：
const fragment =  document.createDocumentFragment();
for(let i=0; i<100; i++) {
  const li  = document.createElement('li');
  fragment.appencChild(li);
}
document.getElementById('di').appendChild(fragment);

###  网页验证码作用*
文字点选，推理拼图，滑动拼图，图标点选
有效防止恶意登录注册，排除用其他病毒或者软件自动四驱用户以及登录


### 为什么css放head
css放在尾部：dom树绘制完成就构建render树，计算布局和绘制，等css加载完构建了cssom树，会和dom树合并重新构建render树，重新布局绘制
而且放在尾部会先出现html，不利于用户体验


### 单点登录
有多个系统，原始登录是每个系统一个账号和密码，单点登录可以实现在一个系统登录，其他系统都处于登录状态，
SSO(Single Sign On)多个系统中，只要登录一个就可以访问他们相互信任的应用系统。
比如A，B，C三个系统，还有SSO系统，SSO系统只包含登录模块，没有其他模块，A，B，C没有登录模块，而A，B，C需要登录的时候跳到SSO系统完成登录，其他系统就也登录了。

普通登录机制： A网站需要登录，将用户名密码发送到服务端完成登录验证，验证成功，session登录状态为yes，服务端生成的sessionId存储在cookie中返回给客户端。下次请求时会带上cookie，服务端根据sessionId判断是否登录。
同域名下单点登录：一个企业一般只有一个域名，通过二级域名区分不同系统。比如域名：a.com，系统有app1.a.com, app2.a.com,我们要做单点登录SSO，就叫sso.a.com
              只要在sso.a.com登录，app1.a.com和app2.a.com就不需要登陆了
问题： 1：cookie不能跨域，cookie的domain属性是sso.a.com,在给app1.a.com和app2.a.com发送请求是带不上的，
      2：sso，app1和app2是不同的应用，session存在自己的应用里，不共享
解决： sso登录后可以将cookie的域设置为顶级域名：.a.com,这样所有子域名都能访问到，我们在设置cookie时只能设置顶域和自己的域，不能设置其他域，比如不能在自己系统中给百度的域设置cookie
这样访问app1就可以将cookie带到app1，
如何找到cookie对应的session？
把3个系统的session共享，同域下的单点登录利用了cookie顶域的特性，不同域cookie是不共享的

CAS流程是单点登录的标准流程
1）用户访问app，app需要是登录的，但现在用户没有登录
2）跳转（302）到CAS server，即SSO登录系统，SSO系统也没登录，弹出用户登录页
3）用户填写用户名，密码，sso系统进行认证后，将登录状态写入SSO系统的session，浏览器中写入SSO域下的cookie。(set-Cookie：...，302到app，ticket=ST-323232)
4）SSO系统登录完成后会生成一个TS（service Ticket）然后跳转到app系统，同时将ST作为参数传递给app系统
5）app系统拿到ST后，从后台像SSO发送请求，验证ST是否有效
6）验证通过后，app系统将登录状态写入session并设置app域下的cookie(set-Cookie，302)

用户访问app2的时候：
1）跳转到SSO系统
2）SSO系统登录了，不需要重新登录验证
3）SSO生成ST，浏览器跳转到app2，并将ST传递给app2
4）app2拿到sT，后台访问SSO验证ST是否有效，验证成功将登录状态写入session，并在app2域下写入cookie

SSO登录必须拿ST进行验证，防止直接在浏览器输入回调的地址，并带上伪造的用户信息。
            

### 移动端是指手机浏览器，还是native，还是hybrid
移动端应用开发：
native App：原生app，只用native开发，代码移植性不好，比较精致，功能丰富，升级灵活性低，总要通过应用商店升级，从应用商店安装。原生基本可以操作任何手机系统（视频，扫描，读取通讯录）

web app： 网页应用（移动Web），移植性和优化高。通过移动浏览器安装，基本上不能操作手机系统

Hybrid App： 混合app， h5+原生，或者html网站套一个app壳（在壳里面其实就做了一个内嵌浏览器）如果要操作手机要原生配合
在外层套了一个壳，壳有内置浏览器，你还是在浏览器打开，代码移植性和优化好，部分更新不能通过应用商店，从应用商店安装

移动终端web壳（简称壳）：主要功能是定义安卓应用程序和网页之间的接口，允许网页中的js调用安卓应用程序。

sdk就是封装代码的意思，window.adk={getData(){}, name}

### 移动端300ms延迟
IOS的safari点击2次会放大（还有滚动），300ms用于判断用户是想单击触发事件，还是双击缩放。点击穿透是300ms延迟的副作用
解决方案：
1）禁止所有缩放：<meta name="viewport" content="user-scale=no" />   <meta name="viewport" content="init-scale=1, maxinum-scale=1">,缺点：完全禁止了缩放
2）更改默认视口宽度，设置屏幕宽度等于设备宽度，浏览器认为该网站做过适配优化，无需双击缩放，就禁了双击缩放，但是任然可以双指缩放<meta content="width=device-width" />
3) css属性touch-action,指定相应元素能够触发的行为，none表示该元素上面的操作不会触发任何浏览器默认行为，maininpulation表示干掉双击行为，在移动端兼容性也还可以
4）fast-click专门解决移动端300ms延迟的轻量级库，原理：检测到touchEnd事件时，通过DOM自定义事件立即触发模拟的click事件，并把浏览器在300ms后的click事件禁止掉。

### 点击穿透
touchStart事件在某些情况下出现点击穿透现象
B在A上面，我们在B上注册了一个回调，作用是隐藏B，当我们点击B后，touchStart-touchEnd-click,而click有300ms延迟，当touchStart把B隐藏后，到了300ms，浏览器触发了click事件，作用到了A，如果A是一个连接就意外跳转了。

fastClick问题：IOs端input框唤起键不灵敏：
解决： node_modules找到fastClick文件修改focus方法，但是npm之后又会被覆盖

var targetElement = null
document.body.addEventListener('touchStart', function() { // 记录当前点击的元素
  targetElement = event.target
})
document.addEventListener('touchEnd', function() { // 阻止默认事件，屏蔽之后的click事件，合成cick事件，并添加可追踪属性forwardTouchEvent， 在targetElement上触发click事件，targetElement上绑定的事件立即执行，完成fastClick
  e.preventDefault(); // 屏蔽之后的click时间
  var touch = event.changedTouches[0]
  var clickEvent = document.createEvent('MouseEvent')
  clickEvent.initMouseEvent('click', true, true, window, 1,touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null)
  clickEvent.forwardTouchEvent = true;
  targetElement.dispatchEvent(clickEvent)
})

### 移动端的事件有哪些？
1）click事件，类似于Pc端的click事件，不过会有300ms延迟
2）touch类事件：touchStart手指触摸， touchMove手指移动过程， touchEnd手指离开屏幕，touchCancel可由系统触发，比如手指在触摸屏幕的时候alert一下，或者系统打断了其他touch行为
3）tap类事件：一般用于代替click事件，
  tap:手指碰一下屏幕就会触发，longTap手指长按屏幕触发，singleTap手指碰一下屏幕触发，doubleTap手指双击屏幕触发
4）swipe类事件：
swiperLeft, swiperRight, swiperUp, swiperDown

事件对象：
  touchList触摸点的集合（手指）
  changedTouches 改变后的触摸点集合，每个事件都会记录触摸点
  targetTouches 当前元素的触摸点集合，离开屏幕时无法记录
  touches： 页面上所有触摸点集合，离开屏幕时无法记录
滑动实现的原理：让触摸的元素随手指的滑动做出位置的改变，需要获取手指的坐标，在每一个触摸点中会记录当前触摸点的坐标，e.touches[0]第一个触摸点

clientX， clientY基于浏览器窗口：视口
pageX，pageY基于页面
screenX， screenY’基于屏幕

swipe手势事件：由原生touch事件衍生来的
window.onload = function() {
  const box = document.querySelector('.box');
  const bindSwipeEvent = function(dom, leftCallback, rightCallback) {
    let startX = 0;
    let distance = 0;
    let isMove = false;
    dom.,addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    })
    dom.addEventListener('touchmove', function(e) {
      isMove = true;
      let moveX = e.touches[0].clientX;
      distance = moveX-startY;
    })
    dom.addEventListener('touchend', function(e) {
      if(isMove&&Math.abs(distance) > 50) {
        if(distance > 0) {
          leftCallback && leftCallback.call(this, e);
        } else  {
          rightCallback && rightCallback.call(this.e);
        }
      }
      startX = 0;
      distance = 0;
      isMove = false;
    })
  }
}


### 移动端IOS和安卓兼容
1）怎么判断是IOS还是安卓
  const u = navigator.userAgent.toLowerCase() 获取浏览器代理并转小写
  const isIOS  = (u.indexOf('iphone') !== -1) || （u.indexOf('ipad') !== -1);
  if(IsIOS) {做ios兼容} else {做安卓兼容}

2）兼容问题：
>> ios端，在ajax回调中或者异步中无法通过window.open打开新窗口，safir安全机制挡住了
    解决：window.location.href
>> 禁止图片点击放大
  部分安卓手机点击图片会放大，如果要禁止放大： img{ pointer-events: none}; 这个会让img标签点击事件失效，如果要给图片加点击事件就要给上面再写一层
>> 禁止IOS识别长串数字为电话（常见）
  <meta name="format-detection"格式检测 content="telephone=no"> 做移动端开发时候要加上

>> 禁止复制，选中文本 设置css {-webkit-user-select: none}
>> 一些情况下，对不可点击事件，比如label，span添加点击事件，不会触发ios下触发，css增加cursor:pointer
>> 上拉滚动条时卡顿，慢 
  body {
    -webkit-overflow-scrolling: touch
    overflow-scrolling: touch
  }
>> 安卓不会自动播放视频autoplay失效
window.addEventListener('touchstart', function() {
  audio.play(); 
},false)
>> 半透明的遮罩层改为全透明
ios，点击一个链接或者通过js绑定率点击事件的元素时，会出现一个半透明的背景，手指离开屏幕，灰色背景消失，出现闪屏
html, body {
  -webkit-tap-heighlight-color: rgba(0,0,0,0)
}

###  有哪些事件
一般事件10： 
  鼠标事件：onclick, ondbclick双击，onmouseup,onmouseover,onmousemove,onmouseout
  键盘事件：onkeypress, onkeydown, onkeyup
页面相关事件9：
  onabort图片下载被中断， onstop浏览器停止按钮被按下时候触发或者正在下载的文件被中断
  onbeforeunload：页面内容将要被改变时候触发， onerror， 
  onload页面内容完成时触发，onunload页面将被改变触发， 
  onmove浏览器窗口被移动时触发， onresize浏览器窗口大小改变，
  onscroll滚动条位置发生变化，
表单事件5：
  onblur失去焦点，onfocus
  onreset重置，onsubmit提交，onchange：元素失去焦点并且元素内容改变
滚动字幕事件3：
  onstart：当Marquee元素开始显示内容时触发
  onfinish：当Marquee元素完成需要显示的内容后触发
  onbounce：当Marquee内的内容移动到Marquee显示范围之外时触发
编辑事件20：
  onbeforecopy：选择内容将要被赋值到浏览器系统或者剪贴板前触发
  oncopy：选择内容被复制后
  onbeforecut：内容将被移离当前页面[剪贴]并移动到浏览者的系统剪贴板时触发
  oncut：被剪切时触发
  onbeforeeditfocus：进入编辑状态
  onbeforepaste：将要粘贴时触发
  onpaste： 粘贴时触发
  onbeforeupdate：当浏览者粘贴系统剪贴板中的内容时通知目标对象
  oncontextmenu：当浏览者按下鼠标右键出现菜单时或者通过键盘的按键触发页面菜单时触发的事件
  ondrag： 当某个对象被拖动时触发此事件 [活动事件]
  ondrop：拖动过程，释放鼠标键时触发
  ondragdrop：拖到当前窗口
  ondrapend：拖动结束，鼠标按钮释放
  ondrapenter：目标进入容器范围内
  ondropleave：目标离开容器范围内
  ondropover：在容器内拖动目标
  ondropstart：当目标被拖动时触发
  onlosecapture：当元素失去鼠标移动所形成的选择焦点时触发此事件
  onselect： 	当文本内容被选择时的事件
  onselectstart：当文本内容选择将开始发生时触发的事件
数据绑定10：
  onafterupdate：当数据完成由数据源到对象的传输时触发
  oncellchange：当数据来源发生变化时
  ondataavailable：	当数据接收完成时触发
  ondatasetchanged： 数据在数据源发生变化时触发的
  ondatasetcomplete：当来子数据源的全部有效数据读取完毕时触发
  onerrorupdate：	当使用onBeforeUpdate事件触发取消了数据传送时，代替onAfterUpdate事件
  onrowenter：	当前数据源的数据发生变化并且有新的有效数据时触发
  onrowexit	：	当前数据源的数据将要发生变化时触发
  onrowsdelete：	当前数据记录将被删除时触
  onrowsinserted：	当前数据源将要插入新数据记录时

外部事件6：
  onafterprint: 被打印后
  onbeforeprint：即将打印
  onfilterchange：对象的滤镜效果发送变化
  onhelp：浏览者按下F1或者浏览器帮助选择时触发
  onpropertychange: 对象属性改变
  onreadystatechange: 对象的初始化属性值发送变化

### ajax轮询，长轮询，webSocket
ajax轮询：客户端过一段时间就像服务端询问
长轮询:类似ajax轮询，但是是阻塞模型，没有资源就等着，
ajax轮询1和长轮询追求速度，需要服务器有很块处理资源的速度，都是不断地建立tcp连接，需要很高的高并发，也就是有很强的接待客户的能力，追求速度，非常耗资源
websocket真正的双工，需要服务端和客户端都升级，

websocket：聊天，客服，在线咨询
实现原理2种：ajax轮询，websocket（常用：有一个封装好的socket.io）一般引入它的js就可以

websocket是应用层第七层的一个应用协议
websocket其实是一个新的协议，和http协议基本没关系，只是为了兼容现有浏览器，所以用了http
客户端会先发送一个upgrade请求头来告诉服务端想建立一个websocket连接
websocket特点：建立在tcp之上，服务端实现比较容易，与http有良好的兼容性，握手阶段采用http协议，因此握手时不容易屏蔽，能通过各种http代理服务器
客户端原生js就支持：
  const url = 'ws://127.0.0.1:8080'
  if(window.socket) {
    // 就像ajax创建xhr，open，send，一样
    ws = new webSocket(url);
    ws.onopen = (e) => {}
    ws.onmessage = (e) => {} 收到后台发来的消息
    ws.onclose = (e) => {}
  }
建立连接后就不会再断了
用socket.io
前端：const socket = io() 相当于new
     socket.emit('join',name) 发信息，join是自定义名称，后端要监听join
     socket.on('join', (user) => {}) 前端监听join
     socket.on('message',(msg) => {}) 监听message
实际工作中，公司都会买的：环信客服注册账号-》登录客服云-》点击管理员模式-》渠道管理-》选中网站，将js复制在页面
### 如何优化网站
Dom操作昂贵，避免频繁操作dom，对dom查询进行缓存。比如for循环将arr.length用一变量缓存，dom查询用一变量·缓存
将频繁操作变成一次：循环后，最后appendChild

资源合并： script合并到一个加载
缓存：(webpack)静态资源文件名hash后缀，根据文件内容计算hash，CDN引入，
SSR：将网页和数据一起加载，一起渲染，非SSR先加载网页再加载数据，再渲染数据
压缩：
懒加载：


### 前后端交互有什么优化吗
我们把put， delete，patch做了区分，对于小量更改数据很有用

67、你的优点/竞争
preloader

73、你做过最困难的事情是啥？

76、问做过啥项目，用到什么技术，遇到什么困难

96、问到了多个服务器怎么弄，架构之类的

98、脏检查

99、nodejs的架构、优缺点、回调

113、做了那么多项目，有没有自己的归纳总结

114、工程怎么进行文件管理

115、less和sass掌握程度

135、最近看什么开源项目？

147、组件的html怎么进行管理

156、你用了移动端的什么库类和框架？

157、移动端要注意哪些？

158、适配有去考虑么，retina屏幕啊？

160、怎么测试的？会自动化测试么？

161、你觉得你什么技术最擅长？

162、你平时有没有什么技术的沉淀？

187、webpack底层实现原理

197、说说你在项目中遇到了哪些困难,是怎么解决的

204、遇到过哪些浏览器兼容性问题

209、学习前端的方法以及途径

237、nodejs中的文件怎么读写？

270、如何评价BAT？

271、描述下在实习中做过的一个项目，解决了什么问题，在其中担任了什么角色？这个过程存在什么问题，有什么值得改进的地方？

272、如何看待加班，如果有个项目需要连续一个月加班，你怎么看？

273、遇到的压力最大的一件事是什么？如何解决的？

278、你对于第一份工作最看重的三个方面是什么？

279、如何评价现在的前端？



### 0.1+0.2 === 0.3 为什么？

js使用Number表示数字（整数和浮点数），64位表示一个数字（1+11+52） 
1：符号位，0表示正数，1表示负数， 11：指数位（e)   52：尾数，小数部分（有效数字）

最大安全数字：Math.pow(2, 53)-1  转换成整数就是16位， 所以0.1 === 0.1 是因为toPrecision(16)有效位之后，两者相等

计算机无法直接对十进制数字进行运算，会先转换成二进制再进行对阶运算
0.1和0.2转换成二进制，尾数会发生无限循环，由于尾数限制，会将多余的截掉，这样在精度计算中已经损失
标准中，尾数f固定长度是52位，再加上省略的一位53位是js精度范围，最大表示2^53，长度是16位，可以用toPrecision(16)来做精度运算，超过长度自动凑整

对阶运算：由于指数位不同，运算时要对阶运算，指数部分先转二进制，然后用toPrecision（16），

总结：精度丢失可能出现在 进制转换 和 对阶转换运算 中

#### 怎么解决精度问题
1：将数字转化成整数，
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length  获取尾数部分
  const baseNum = Math.pow(10, Math.max(num1Digists, numDigists))
  return  (num1*baseNum + num2*baseNum) / baseNum;
}
2：三方库，Math.js（专为node和js提供的广泛的数学库，支持数字，大数字）

### 最大安全数字：Math.pow(2, 53)-1 为什么不是MAth.pow(2, 52)-1
因为二进制表示数字总是1.xxx...xxx的形式，尾数部分f在规约形式下第一位默认为1，省略不写最长为52位，因此js提供有效数字最长为53位，64位浮点数的后52位+被省略的一位。


###  js数据类型
number
string
boolean
null： 此处不该有值
undefined： 声明，未赋值
Symbol,符号类型，
复杂：object, array, function
BigIntES2020

类型检测：typeof，能对number，string，undifined，boolean，function， 不能检测null和对象，都返回object
        instanceOf检测复杂数据类型
        

函数有一个prototype属性，默认指向一个空对象，prototype属性上有Constructor，指回构造函数本身
实例和构造函数没有关系，和构造函数原型有关系
Person.prototype.Constructor = Person
person.__proto__ = Persopn.prototype 这句说明persoon是Person的实例对象



function  instanceOf(A, B) {
  if(A.__proto__ === B.prototype) {
    return true;
  } 
  return false;
}

instance只能用于对象，不适合原始类型，

constructor属性，判断到底是哪个构造函数产生的
const f = new F();
f.constructor = F // true
但是constructor易变，不可信赖，重写原型造成constructor丢失

Object.prototype.toString， 获取toString运行时候this指向的对象的类型，返回类型为[object,xxx]
基本所有对象类型都可以获取
Object.prototype.toString.call('') [object, String]
Object.prototype.toString.call(1') [object, Number]
必须通过Object.prototype.toString.call来获取，不能通过new Date.toString().所有对象的原型都指向Object，按照js变量查找规则，其他对象也能直接访问到Object的toString方法。而大部分对象自身实现了to'String方法，要用call强制执行Object的toString方法

总结：typeof可以准确哦按的基本类型，引用类除了function都返回object
     已知是引用类型的情况可以用instanceof或constructor方法进行类型判断，instanceof基于原型，constructor易变不可信赖
     Object.prototype.toString.call繁琐

###  js整数怎么表示的？
Number，64位表示一个数字，1：符号位，0正数，1负数， 11：指数位， 52：尾数位，最大安全数字是Math.pow(2, 53)-1, 对于16位十进制，（符号位+指数位+小数有效位

###  Number存储空间多大？如果后台发送一个超过最大数字怎么办
Math.pow(2, 53), 53为有效数字，会发生截断，等于js能支持的最大数字

###  实现深度克隆
考虑基本类型，引用类型（array, object, function, Date, RegExp)

### 事件是如何实现的？
基于发布订阅模式，在浏览器加载的时候会读取事件相关代码，但是只有实际等到具体事件触的时候才会执行
在web端，常见的就是DOM事件
DOM0级事件：直接在元素上绑定： ele.onclick = () => {}，一个事件只能有一个处理程序，后面覆盖
DOM2级：addEventListener注册事件， removeEventListener删除事件
DOM3级：增加事件类型： UI事件，点击事件，鼠标事件

### new过程发生了什么
1）创建一个空对象
2）将空对象的__proto__指向构造函数的显示原型
3）将this指向该对象
4）执行代码（给新对象添加属性和方法）
5）如果有返回值，并且返回值为非空对象，就返回该对象，否则返回新对象

### new一个构造函数，如果函数返回 return  {}, return null, return 1, return true会发生什么 
如果返回一个非空对象，就返回通过new创建出来的实例对象
如果返回的是基本类型（1， null， true）不会覆盖新实例对象

### Symbol有什么用处
Symbol：表示一个独一无二的变量，防止命名冲突，作为对象的属性，可以变成私有属性，
要访问到对象的Symbol为属性名的属性通过Object.getOwnPropertySymbols

###  闭包是什么？
闭包：有权访问其他作用域中的变量，本质是函数，
闭包产生：返回一个函数，当前环境中存在指向父级作用域的引用
闭包优点：延伸了变量生命周期，防止全局变量污染，
闭包缺点：闭包中引用的变量用完后不会被垃圾回收机制回收，闭包使用不当会造成内存泄漏
应用场景：科里化bind，模块

###  作用域
作用域是静态的，在你写代码的时候就确定了，作用域有全局作用域，函数作用域，es6有块级作用域

### 作用域链
当你访问一个变量时，会先在对象自身作用域查找，如果没有，就像上层作用域链中找，直到全局作用域，而作用域链就是当前作用域和上级作用域的一系列变量对象组成，它保证了当前作用域对符合访问权限的变量和函数的有序访问。

###  NaN是什么？用typeof会输出什么
NaN表示不是一个数字，用typeof检测返回number

### js隐式转换，显示转换
一般非基础类型进行转换会先调用valueOf，如果valueOf无法返回基本类型值，就会调toString

### 类型转换
数据类型转String 
  1： number转string： 得到number的字符串
  2： string转string： 得到string的字符串
  3： boolean转string： 得到boolean的字符串
  4： null转string： 得到null的字符串
  5： undefined转string： 得到undefined的字符串
  6：对象转string： 得到object的字符串
调用toString方法，或者String函数
数据类型转Number
  调用Number方法
  1： 数字转number： 得到number
  2： 字符串转number： 如果字符串有数字，开头是数字，得到数字部分，没有数字返回NaN
  3： boolean转number： true：1， false： 0
  4： null转number： 得到0
  5： undefined转number： 得到NaN
  6： 对象转number： 得到NaN
 parseInt和parseFloat对付字符串
 parseInt返回整数部分，parseFloat返回浮点数

数据类型转Boolean
  1：数字转布尔，除了0相关，其余都是true
  2： 字符串转布尔，都是true
  3：null和undefined转boolean为false
  4：对象转布尔都是true

+， -， 
###  this，call， apply， bind
this指向：
1）作为普通函数，非严格模式下，window
2）作为对象的方法被使用，this指向对象
3）作为构造函数被使用，this指向实例对象
4）定时器下，this是window
call，apply，bind改变this指向（改变函数执行上下文），
不同：call： 参数一个个传
     apply：第二个参数是数组
     bind返回一个函数，并不会立即执行

###  setTimeout(fn, 0)多久才执行?
同步代码同步执行，异步代码放入任务队列，任务队列分为宏队列和微队列，宏队列：setTimeout，setInterval，requestAnimationFrame
微队列：promise。。。
setTimeout按照顺序放在宏队列中，等待函数调用栈清空后才开始执行

###  js脚本加载问题，async，defer问题
js脚本放在body，
async：同步加载js，加载完就开始执行
defer：同步加载js，等渲染完再执行，不阻塞

### 如何判断一个对象是不是空对象
{}
Object.getOwnProperties()看得到的长度
Object.keys().length === 0

### script src="xx' 'xxx' 外部js文件先加载还是onload先执行，为什么
外部js代码先加载，
### 事件传播机制（事件流）
当子元素事件触发：父执行顺序:先捕获，后冒泡
父级捕获-》子集冒泡-》子集捕获-》父级冒泡

事件处理程序过多问题的解决就是事件委托：利用事件冒泡，只指定一个事件处理程序，就可以管理一类型的所有事件

DOM2规范事件流三个阶段：捕获，目标，冒泡，
DOM0级：只能添加一个事件，btn.onclick = () => {}
DOM2级：多个事件，addEventListener，removeEventListener，事件类型，事件处理函数，true捕获，false冒泡
IE事件：attachEvent，detachEvent， 执行作用域不一样，在全局，this是window，DOM级是事件本身，执行顺序不一样，attachEvent是自下而上，后添加的先触发

阻止默认事件： 其他浏览器： e.preventDefault() , IE: e.returnValue=false
阻止冒泡：e.stopPropagation()取消冒泡和捕获, IE： e.cancelBubble=true 只能取消冒泡

e.target
e.curentTarget
e.cancelBubble

DOM2明确规范捕获阶段不命中事件目标，但是主流浏览器都会在捕获阶段在事件目标上触发事件，最终事件目标上有2次机会来处理事件
### PWA，serviceWorker
支持PWA的网站可以提供脱机工作，推送通知和设备硬件访问等功能
service worker是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门。 现在，它们已包括如推送通知和后台同步等功能。 将来，Service Worker将会支持如定期同步或地理围栏等其他功能。 本教程讨论的核心功能是拦截和处理网络请求，包括通过程序来管理缓存中的响应。

### Es6之前使用prototype实现继承
Object.create()会创建一个新对象，然后将此对象内部的[[prototype]]关联到你指定的对象，Foo.prototype, OBject.create(null)创建一个空[[prototype]]对象,这个对象无法进行委托
function Foo(name) {
  this.name = name
}
Foo.ptototype.getName = function(){}
function Bar(name, age) {
  Foo.call(this, name); // 继承属性
  this.label = label;
}
Bar.prototype = Object.create(Foo.prototype); // 继承方法，创建备份
Bar.prototype.constructor = Bar;
Bar.prototype.myLabel = function() {
  return this.label;
}
const a = new Bar('a', 'obj');


### 如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
不会继承，因为this绑定四大规则，new绑定优先级高于bind显示绑定，
通过new进行构造函数调用，会创建一个新对象，这个新对象会替代bind的对象绑定，作为此函数的this，并且在此函数没有返回对象的情况下返回这个新建的对象。


### 继承的方式
1：原型链继承: 缺点是无法在实例化的时候传参，父构造函数的方法变成公有的（原型上的方法是不共享的）
Son.prototype = new Father() 
2：构造函数继承：支持子构造函数传参， 实例修改父构造函数的属性不会影响其他实例
   共有方法定义在构造函数中定义，每次实例化都要创建一遍，无法实现函数的复用，浪费内存
   通过call只是调用了父构造函数的属性和方法，父构造函数的原型方法没有继承过来
 funcgtion Son() {
   Father.call(this, args)
 }
3：组合继承：通过原型链继承继原型对象的方法，利用构造函数继承实现属性的继承，而且可以传参
  不足：__proto__里的属性没用，执行了2次构造函数
  funcgtion Son() {
   Father.call(this, args)
 }
 Son.prototype = new Father()
4：原型式继承：和原型链继承类似，每次实例化都要创建方法，无法实现函数的复用
5：寄生继承：和构造函数继承类似，支持子构造函数传参，但是父构造函数的方法实例化几次就被调用几次，浪费内存
6：寄生组合继承：
  
### 知道 ES6 的 Class 嘛？Static 关键字有了解嘛
es6的类是构造函数加原型继承的语法糖，
和普通构造函数的区别：
1）类必须通过new调用，而普通函数可以直接调用，调用者是this
类的constructor是类自身方法，普通方法都挂在类原型上，static为类自身添加方法，而不是在函数对象的原型上面
在类块中定义的所有内容都会定义在类的原型上，添加到this上的所有内容都会存在不同实例上。
不能在类块上给原型添加基本数据类型或对象作为成员数据
静态成员用static生命，定义在类本身上
在类外面给类添加的方法
constructor和定义在类块里的，实例成员能访问到，加了static的访问不到，constructor，类块里的方法都在类原型上
定义在constructor里的是实例自有属性，定义在类块的是类原型属性

static get flag() {return 'dog'} 静态属性
静态方法中的super指向父类，
### 静态属性怎么继承
通过extends可以继承静态方法和属性

### instanceof如何用
左边是任意值，右边是构造函数 
instanceOf(A,  B) {
  if(A.__proto__ === B.prototype) {
    return true;
  } else  {
    return false;
  }
}




### 如果页面初始载入的时候把ajax请求返回的数据存在localStorage里面，然后每次调用的时候去localStorage里面取数，是否可行。
不能保证数据的实时性，请求和实时性必然要牺牲一个

### 了解过SEO吗？

### getUrlParmas(urlm key)获取url的某个参数，要考虑边界情况，多个返回值等

### 低版本浏览器不支持HTML5标签怎么解决?底层是怎么实现的？

### 如何保持登录状态

### Html的语义化

### Post一个file的时候file放在哪的？

### 怎么在页面里放置一个很简单的图标，不能用img和background-img？

### js轮播实现思路

### requirejs怎么防止重复加载(如何避免循环依赖)

### 浏览器如何实现图片缓存

### 前端安全

### 原生js模板引擎

### form表单当前页面无刷新提交 target iframe

### 用原生js实现复选框选择以及全选非全选功能

### Object.defineProperty

### src和href区别
请求资源类型不同：
  href表超文本引用，用来建立当前元素和文档之间的链接，link，a等标签
  在请求src资源时会会下载其指向的资源并应用到文档，script, img,iframe
作用结果不同：
  href用于建立文档和资源之间确立联系
  src用于替换内容
浏览器解析方式不同
  href，浏览器会识别该文档为css文件，并进行下载资源并且不会停止对当前文档的处理
  src：会暂停其他资源的下载和处理，直到该资源加载，编译，执行完成，将资源应用到当前内容，这也是为啥建议js放底部原因
### settimeut时间为0，以及误差的原因
settimeout如果是1000表示1000ms后加入队列，为0的时候是立即加入到异步队列中（但是也不会立即执行，要等到前面的执行完）
### blob和msSaveBlob
window.navigator.msSaveBlob和window.navigator.msSaveOrOpenBlob方法以本地方式保存文件
IE10的msSaveBlob（提供保存按钮）和msSaveOrOpenBlob（提供保存和打开按钮）允许用户在客户端保存文件，方法就像同internet下载文件，可以保存到下载文件夹
### collection是html元素的集合
### NodeList是文档节点的集合

- NodeList和collection集合基本相同，两者都是类数组的对象集合
- 他们都有定义集合（列表）中项目数的length属性
- 都可以通过0，1，2...索引访问数组那样访问每个项目
- 访问html collection可以通过它们的索引号，名称，id
- 访问NodeList只能通过索引号，只有NodeList包含属性节点和文本节点

所有浏览器都会为childNode返回NodeList对象

### 增删节点
1：增加节点： document.createElement('p') | document.createTextNode('文本节点')
2:追加节点： 像元素后面追加： element.appendChild(newEle);  像元素前面追加： element.inertBefore(element, newEle)
3: 删除已有节点： element.removeChild(child) , 
- 能够不引用父元素删除是好的，但是dom需要同时了解你需要删除的元素及其父元素，常见方法：parentNode找到父元素

替换html元素：replaceChild（newChild， oldChild）

### getElementByTagName方法返回collection对象
html collection是类数组的元素的集合




### ES6新增特性
1）let,const
2）箭头函数 
3）参数处理 默认参数值 剩余参数：之前参数不固定的函数，用arguments。es6用...args
4）模板字面量 es6之前字符串连接用+或者conca
5）原有字面量的增强 更安全的二进制，八进制字面量 字符串支持Unicode
6)对象属性增强： 属性定义支持短语法 {name: name} => {name} 属性名支持表达式 obj: { ['baz'+quex()]: 42} 添加__proto__属性，但是不建议使用
7）解构赋值
8)模块 导入：import
9)类 重写构造器 ES5：创建子类的实例对象this，再将父构造函数的方法加到this ES6：先创建父类的实例this，再用子类的构造函数修改this
es6创建类：只是语法糖，constructor(num) 该方法虽然在类上，但是不在原型上
10）迭代和生成器
迭代器:
生成器 promise的升级，ES7的async，await是终极写法 能暂停 generator+promise配合

for..of循环， 结合了其兄弟for和for..in的优势，可以循环任何可迭代（遵循可迭代协议）类型的数据，默认情况包含：string，array, map,set， for循环最大缺点是需要跟踪计数器和退出条件，虽然for循环在循环数组时确实有优势，但某些数据不是数组 for..in:依然使用index来访问数组值，当你要像数组添加额外方法或对象很麻烦，for..in会枚举原型属性 
forEach只能用于数组，无法停止或者退出循环，你想停止或退出用for for..of和for...in基本一样，for..of解决了for和forin不足，你可以随时停止或者退出for..of循环,for..of只会遍历自身属

11）promise
12）元编程 代理：proxy 反射： reflex
13）新增数据类型 Symbol， Set， Map，WeakSet， WeakMap，TypedArray
14)尾递归优化
15）原有内置对象API增强 数组： Array.from(arrayLike[,mapFn[,thisArg]])： 从一个类似数组或可迭代对象创建一个新数组. mapFn中每个元素会执行该回调， thisArg执行回调时this对象 
    Array.of(ele0[,ele1[,...[,eleN]]])：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或者类型
    Array.fill
    Array.find/findIndex
    Array.copyWidthin(target[,start[,end]]): 浅复制数组一部分到数组另一个位置，原数组长不变,不包括end
    Array.entries：返回一个新的Array iterator对象，可以通过next迭代，该对象包含数组中每个索引的键值
    Array.keys/values
对象： Object.assign ,includes,repeat,startWith,endsWith

### 了解navigator对象吗？
Navigator 对象包含有关浏览器的信息,
userAgent:浏览器用于 HTTP 请求的用户代理头的值 appVersion: 返回浏览器版本 appName:返回浏览器的名称 platform：返回运行浏览器的操作系统平台 cookieEnabled：浏览器启用cookie值为 true。如果禁用了 cookie，值为 false。 appCodeName：浏览器的代码名。

### link和@import引入CSS的区别？
两者都是外部引用CSS的方式，但是存在一定的区别： 1）link是xhtml标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。 2）link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显 3）link是xhtml标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。 4）link支持使用js控制DOM去改变样式；而@import不支持。

### 移动端适配问题
1：流式布局：又叫百分比布局，用%百分比定义宽度，高度用px固定，根据可视区域大小调整，用max-width/height控制尺寸，实现简单，不存在兼容问题，但是在大屏手机或者横竖切换场景可能会导致页面元素被拉伸变形，字体无法随屏幕大小变化。 padding/margin:相对父元素的宽，与父元素的高无关 border-radius相对自身宽度 
2：字体大小展现：出现弹性布局，包裹文字元素用em/rem为单位，主要区域用px，百分比或者em/rem 
上面2种：页面元素的大小按照屏幕分辨率进行适配调整，整体布局不变 
3：rem方案：rem是相对长度单位，是弹性布局的一种实现方式 实现过程：先获根元素和设备dpr设置rem，页面缩放时，获取元素内部宽，重新调整rem大小 实现方法：用css处理器或者npm包将css样式中px自动转化为rem，在整个flexible适配方案中，文本用px为单位，用[data-dpr]属性区分不同dpr下文本大小，由于手机浏览器对字体显示最小是8px，更小尺寸文字用px为单位，防止转化为rem后出问题， 优势：兼容性好，相比百分比布局，页面不变形，自适应效果更好 不足：1）不是纯css移动端适配，需要引入js，在头部嵌入js监听分辨率变化动态改变根字体大小，css，js有一定的耦合性，并且必须将改变font-size的代码放在css样式之前 2）小数像素问题：通过rem计算后可能会出现小数像素，浏览器会对小数部分四舍五入，也就是0.634px，渲染尺寸为1px，空出的0.375px空间将由其临近的元素填充，如果一个元素尺寸是0.375，渲染尺寸就是0，但是会占据临近元素0.375px的空间，导致缩放到低于1px的元素时时隐时现，解决：指定最小转换像素，对于比较小的像素，不转换为rem或者vw。宽高相同的正方形，长宽不一样了，border-radius：50%的圆不圆了 3）安卓浏览器下line-height垂直居中偏离问题，这种方法在安卓设备不能完全居中
4： vh/vw方案 原理： 移动端视口是指布局视口，1vw：等于视口宽度的1%，1vh等于视口高度的1%； vmin：取vw和vh最小的那个，vmax取vw和vh最大的那个 使用css预处理器把设计稿尺寸转换为vw单位，包括文本，布局宽高，间距等，让这些元素能够随视口大小自适应调整，以1080px设计稿为基准，转换： $vw_base: 1080 @function vw($px) { @return($px/1080)*100vw } 优势：纯css不存在脚本依赖问题，相对于rem，逻辑清晰简单，视口单位依赖于视口的尺寸，"1vw=1/100 viewport width" 根据视口尺寸的百分比来定义宽度 不足：兼容性问题

5： rem+vw/vh vw和vh方案能够实现宽度和高度自适应，并且逻辑清晰，将vw/vh和rem结合，给根元素设置随视口变化的vw单位，通过postcss-plugin-vwtorem将其转换 对1080px宽的设计稿，设置根字体大小为100px，那么设计稿中1px对应：100vw/1080=0.0925926vw,并且1rem=100px，就可以得到 1rem = 9.25926vw

6：基于媒体查询的响应式设计 原理：媒体查询，给不同分辨率的设备编写不同样式。一般是指pc，平板，手机设备之间较大的分辨率差异，通常结合了流式布局和弹性布局 @media only screen and(max-width:375px) { 样式1 } @media only screen and(max-width:750px) { 样式2 } 优势：能在不同设备，不同分辨率屏幕上展示合理布局，不仅仅是样式伸缩变换 不足：要匹配足够多的设备与屏幕，一个web页面需要多个设计方案，工作量大，通过媒体查询技术需要设置一定量的断点，到达某个断点前后的页面发生显著变化，用户体验不好

### 1像素问题
边框为1px的css像素，在普通屏幕下1px，高清屏（dpr为2）下2px，是由于不同移动设备的dpr不同，导致1px的css像素转换成物理像素显示不一样 css中涉及1像素的地方任然用px为单位，设置将整个页面缩小为dpr倍，对于页面用rem方案的情况，将页面的跟字体再放大dpr倍，这时候就能在不改变页面其他布局下保持边框css像素为1px
### 对图片的处理
加载网页时，60%以上流量来自加载图片，指定图像宽度时使用相对单位防止意外溢出视口，比如width:50%,因为css允许内容溢出容器，所以：max-width:100%来保障图像以及其他内容不会溢出， img的alt属性有助于提高网站的可访问性。 维护自适应页面中图片宽高比固定比较常用方法是用padding设置，对不同dpr以及不同分辨率/尺寸的屏幕，为了避免资源浪费和等待时间，针对不同屏幕使用合适图片 对引入的图片，若要适应不同像素密度的屏幕，使用srcset属性来指定多张图片，url后接一个空格，和像素闽都描述符，浏览器根据当前设备的像素名都，选择需要加载的图像，如果srcset属性都不满足条件就加载src属性指定的默认图像  想针对不同屏幕用不同分辨率版本和尺寸的图片，用srcset和sizes，srcset允许浏览器选择的图像集，以及每个图像大小（用w为单位），sizes定义了一组媒体条件（例如屏幕宽度），指明当某些条件为真时，怎样的图片尺寸才是最佳选择  浏览器查询过程：查看设备宽度，检测sizes列表中哪个媒体条件为真，查看给予该媒体查询的槽大小，加载srcset列表中引用的最接近所选的槽大小的图像

异步加载：引入的图片，使用js自带的异步加载图片，根据不同dpr加载不同分辨率图片  let dpr = window.devicePixelratio if(dpr > 3) {dpr = 3} let imgSrc = $('#img').data('src'+dpr+'x'); let img = new Image(); img.src=imgSrc; img.onload = function(imgObj) { $('#img').remove().prepend(imgObj) // 替换img对象 }

picture
picture：为不同视口提供不同图片，使用标签，是h5定义的一个容器标签，内部用和,浏览器会匹配的type，media，srcset等熟悉，找到最适合当前布局/视口宽度的图片，这里的标签是浏览器不支持picture元素，或者支持picture但是没有合适的媒体定义时的后备，不能省略

背景图片
对于背景图片，使用image-set根据用户设备的分辨率匹配合适的图像，同时要考虑兼容性问题 .css { background-image: url(...png); 不支持image-set情况下显示 background: -image-set( url(1x.png) 1x, url(2x.png) 2x, url(3x.png) 3x, ) } 媒体查询，对于背景图片，用媒体查询自动切换不同分辨率的版本 .css { background-image: url(...png); } @media only screen and(min-device-pixel-ratio: 2) { .css { background-image: url(..2x.png); } } @media only screen and(min-device-pixel-ratio: 3) { .css { background-image: url(..3x.png); } }
### cookie和session， localStorage, sessionStorage有什么区别
cookie跨域有问题，现在都是用localStorage存token
localStorage和sessionStorage都不会随http的header发送到服务端（相比安全），减轻了服务器压力，webStorage操作数据比cookie方便。
cookie机制： 默认当前浏览器关闭cookie失效，cookie存在内存中（会话cookie），若设置过期时间，数据存在硬盘中，过期时间内有效。每次请求都会带上cookie。
session机制：服务端收到创建session时，检查请求头是否带sessionId，有：根据sessionId返回对应的session对象，无：服务器创建session对象，并将sessionId通过cookie存储返回客户端，若用户禁用cookie：url重写，通过response.encodeURL(url)将sessionId拼接在url后面。localStorage只要不跨域，就能读改同一份localStorage数据。 sessionStorage还要求在同一窗口下。 localstorage是无法跨域的，也无法让子域名继承父域名的localstorage数据，这点跟cookies的差别还是蛮大的。不受页面刷新影响（sessionStorage可在浏览器崩溃并重启后恢复

Cookie跨域请求能不能带上
cookie一般情况下是不能跨域的 一些请求可以通过jsonp的方式实现跨域：服务端设置： Access-Control-Allow-Credentials: true 客户端：请求的时候带上withCredentials：true是指跨域请求是否提供凭证信息（cookie，http认证以及SSL证明等 Credentials必须在前后端都被配置，才能使带credentials的CORS请求成功。
domain和path共同决定了cookie可以被哪些url访问。 访问一个url时，如果url的host与domain一致或者是domain的子域名，并且url的路径与path部分匹配，那么cookie才可以被读取。
cookie各属性详解 Name,Value: cookie值。Domain: cookie的域名,Path: 允许读取cookie的url路径，一般设置为/。Expires,HttpOnly

cookie如何应对XSS漏洞* 
XSS漏洞的原理是，由于未对用户提交的表单数据或者url参数等数据做处理就显示在了页面上，导致用户提交的内容在页面上被做为html解析执行。
常规方案：对特殊字符进行处理，如"<“和”>"等进行转义。
cookie的应对方案：将重要的cookie信息设置为HttpOnly来避免cookie被js采集。

cookie如何应对CSRF攻击 原理:用户登陆了A网站，后访问了B网站（比如跳转等），B网站直接发送一个A网站的请求进行一些危险操作，由于A网站处于登陆状态，就发生了CSRF攻击（核心利用cookie信息可以被跨站携带）！
常规方案：采用验证码或token等。
cookie的应对方案：CSRF攻击核心就是利用了cookie信息可以被跨站携带，那么我们可以对核心cookie的SameSite设置为Strict避免。

### requireJS的原理是什么
requireJS是基于AMD模块加载规范，使用回调函数来解决模块加载的问题。即异步模块加载机制，其思想就是把代码分为一个一个的模块来分块加载，这样无疑可以提高代码的重用。 在整个require中，主要的方法就两个：require和define

requireJS是使用创建script元素，通过指定script元素的src属性来实现加载模块的。 3，特点

实现js文件的异步加载，避免网页失去响应 2，管理模块之间的依赖，便于代码的编写和维护
requireJS为何不会多次加载同一个文件?怎么理解内部机制?

模块的定义是一个function，这个function实际是一个 factory（工厂模式），这个 factory 在需要使用的时候（require("xxxx") 的时候）才有可能会被调用。因为如果检查到已经调用过，已经生成了模块实例，就直接返回模块实例，而不再次调用工厂方法了。

原生js添加class怎么添加，如果本身已经有class了，会不会覆盖，怎么保留？
document.getElementsByTagName('body')[0].className = 'snow-container'; //设置为新的 document.getElementsByTagName('body')[0].className += 'snow-container'; //在原来的后面加这个 document.getElementsByTagName('body')[0].classList.add("snow-container"); //与第一个等价

这种方法可以避免覆盖原有的类，但是也存在问题，一旦我们要添加的class多的时候，我们需要拼接的字符串就会变得比较乱，并且不易维护，我们也无法看到哪些使我们已经添加过得class，可能会造成类名添加重复；

// 首先判断当前dom是否已经包含了要添加的类 export function hasClass(el, className) { let reg = new RegExp('(^|\s)' + className + '(\s|$)') return reg.test(el.className) } // 动态添加class export function addClass(el, className) { if (hasClass(el, className)) { return } // 将原有的class按空格拆分，并将类名保存到newclass数组中 let newClass = el.className.split(' ') // 将要添加的类也push到这个数组 newClass.push(className) // 将数组拼接成字符串返回给dom el.className = newClass.join(' ') }
### w3c事件与IE事件的区别
绑定和取消绑定事件： w3c： addEventListener，removeEventListener IE： attachEvent， detachEvent
阻止默认： w3c： e.preventDefault, IE: window.e.returnValue=false 阻止冒泡和捕获： w3c： e.stopPropagation 阻止捕获和冒泡 IE: window.e.cancelBubble只能阻止冒泡 事件目标： w3c：e.target IE：window.e.srcElement 事件对象： w3c： arguments.calee.caleer.arguments[0]; IE：window.event

### js中上下文是什么
运行js代码时，当代码执行进入一个环境时，就会为该环境创建一个执行上下文，执行上下文有且只有三类，全局执行上下文，函数上下文，与eval上下文 函数执行上下文可存在无数个，函数被调用都会创建一个函数上下文调用几次创建几个上下文
执行上下文的生命周期有两个阶段：
创建阶段：函数被调用时，进入函数环境，为其创建一个执行上下文。
执行阶段：执行函数中代码时， 创建变量对象（上下文这定义的所有变量和函数都存在这个对象上） 初始化Arguments对象（并赋值） 函数变量声明（并赋值），函数表达式声明（未赋值） 确定this指向 确定作用域
作用域链：上下文中代码执行时会创建变量对象的一个作用域链，作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。
### 你所了解的跨域的方法都说说看你了解的？
1： webpack Plugin， 2： webpack Proxy， 3： nginx反向代理， 4：jsonp， 5：后端最好：cors 企业一般nginx， cors
webpack Plugin: webpack-dev-middle跨域
webpack proxy: 在webpack-config.js里配置： devServer: { proxy: { '/api': { target: 'http://....', pathRewrite: {'/api': ''} } }
### 要是让你自己写一个js框架你会用到哪些设计模式,设计模式优点，项目中用过哪些
单例模式：使用对象前判断对象是否存在，不存在就创建。关键是使用一个变量保存对象 
观察者模式：又叫发布订阅模式，redux使用的就是发布订阅模式，react-redux中实现了订阅功能，mapStateToProps是订阅state，mapDispatchTpProps订阅dispatch
装饰器模式：在不破坏原来对象的前提下，对对象进行扩展，写一个装饰器函数，将被装饰对象传入 
工厂模式：需要频繁创建对象时，注重创建对象的过程 
建造者模式：和工厂模式类似，注重创建对象的细节 
策略模式：算法封装，重复调用
代理模式：加载的时候用，比如预加载
迭代器模式：
状态模式：
职责链模式：
命令模式（发布者，调用者和执行者是分开的）

### 渲染10万条数据不造成卡顿
无论是浏览器的DOM还是BOM，还是nodejs，都是基于js引擎开发的，dom和bom最终都要被转换成js能够处的数据，这个转换过程比较耗时，所以浏览器最耗时的是操作dom
react的虚拟dom，本质是js数据模拟真是dom树，
在渲染时候使用document.createDocumentFragment创建虚拟节点,requestAnimationFrame去执行函数



JSON.parse(JSON.stringify())
function deepClone(obj, target) {
  target = target || {}
  for(let i in obj) {
    if(Object.hasOwnProperty(i)) {
      if(typeof obj[i] === 'object') {
        target[i] = Array.isArray(obj[i]) ? [] : {}
        deepClone(obj[i], target[i])
      } else {
        target[i] = origin[i]
      }
    }
  }
}

### 重绘重排
重绘：元素外观发送改变，颜色，字体大，所以要尽量避免使用table布局 
重排：元素规模尺寸，布局，隐藏等 触发重排： 1）页面渲染初始化（无法避免） 2）添加删除可见dom 3）元素位置改变，或者使用动画 4）元素尺寸：大小，外边距，边框 5）浏览器窗口尺寸（填充内容：文字数量，图片大小改变引起的计算值宽高的改变 7）读取某些元素属性（offsetLeft/Top/Height/Width, clientTop/Left/Width/Height, scrollTop/Left/Width/Height, width/height, getComputedStyle,currentStyle(IE) 8）设置style属性 9）激活CSS伪类（例如：:hover 重绘重排代价：耗时，浏览器卡慢

优化：浏览器会维护一个队列，所有引起回流重绘的操作放入，队列满了或者达到一定时间间隔进行批处理，多次-》一次 
我们：减少对dom的操作，合并多次dom和样式修改，减少对style样式请求：直接改元素的classname 2）display先设置为none，然后进行页面布局操作，完成后设置display：block，这样只会引起2次重绘重排 3）用cloneNode(true or false)和replaceChild技术，引起一次回流和重绘 4）将需要多次重排元素，position设为absolute或者fixed，脱离文档流，他的变化不影响别的元素 5）如果需要创建多个dom节点，用document.createDocumentFragment创建后一次性插入document 
### 移动端300ms延迟
IOS的safari点击2次会放大（还有滚动），300ms用于判断用户是想单击触发事件，还是双击缩放。点击穿透是300ms延迟的副作用 解决方案： 
1）禁止所有缩放： ,缺点：完全禁止了缩放 2）更改默认视口宽度，设置屏幕宽度等于设备宽度，浏览器认为该网站做过适配优化，无需双击缩放，就禁了双击缩放，但是任然可以双指缩放。fast-click原理：检测到touchEnd事件时，通过DOM自定义事件立即触发模拟的click事件，并把浏览器在300ms后的click事件禁止掉。
### 点击穿透
touchStart事件在某些情况下出现点击穿透现象 比如：B在A上面，我们在B上注册了一个回调，作用是隐藏B，当我们点击B后，touchStart-touchEnd-click,而click有300ms延迟，当touchStart吧B隐藏后，到了300ms，浏览器触发了click事件，但是B不见了就作用到了A，如果A是一个连接就意外跳转了。
### 移动端IOS和安卓兼容
1）怎么判断是IOS还是安卓 navigator.userAgent
2）兼容问题：
ios端，在ajax回调中或者异步中无法通过window.open打开新窗口，safir安全机制挡住了 解决：window.location.href 
      禁止图片点击放大 部分安卓手机点击图片会放大，如果要禁止放大： img{ pointer-events: none}; 
      禁止IOS识别长串数字为电话（常见） <meta name="format-detection"格式检测 content="telephone=no"> 做移动端开发时候要加上

禁止复制，选中文本 设置css {-webkit-user-select: none} 一些情况下，对不可点击事件，比如label，span添加点击事件，不会触发ios下触发，css增加cursor:pointer 上拉滚动条时卡顿，慢 body { -webkit-overflow-scrolling: touch overflow-scrolling: touch } 安卓不会自动播放视频autoplay失效 window.addEventListener('touchstart', function() { audio.play(); },false) 半透明的遮罩层改为全透明 ios，点击一个链接或者通过js绑定率点击事件的元素时，会出现一个半透明的背景，手指离开屏幕，灰色背景消失，出现闪屏 html, body { -webkit-tap-heighlight-color: rgba(0,0,0,0) }

### 0.1+0.2 === 0.3 为什么？
总结：精度丢失可能出现在 进制转换 和 对阶转换运算 中
### 事件是如何实现的？
基于发布订阅模式，在浏览器加载的时候会读取事件相关代码，但是只有实际等到具体事件触的时候才会执行 在web端，常见的就是DOM事件 DOM0级事件：一个事件只能有一个处理程序，后面覆盖 DOM2级：add/removeEventListener
### 事件传播机制（事件流）
事件委托：利用事件冒泡，只指定一个事件处理程序，就可以管理一类型的所有事件
DOM2规范事件流三个阶段：捕获，目标，冒泡，true捕获，false冒泡 IE事件：attachEvent，detachEvent， 执行作用域不一样，在全局，this是window，DOM级是事件本身，执行顺序不一样，attachEvent是自下而上，后添加的先触发

Es6之前使用prototype实现继承
Object.create()会创建一个新对象，然后将此对象内部的[[prototype]]关联到你指定的对象，Foo.prototype, Object.create(null)创建一个空[[prototype]]对象,这个对象无法进行委托 
如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？
不会继承，因为this绑定四大规则，new绑定优先级高于bind显示绑定
### 性能优化
- 首页加载慢：
图片，静态资源（html，css，js），请求数量多
对图片的解决：非首屏图片懒加载，小图标用iconfont，小图片用雪碧图
合并请求：将js，css合并
缓存：DNS缓存，CDN缓存，http缓存
对于一些较大的三方库，按需加载：一般是babel实现
SPA应用通过前端路由懒加载（只加载首页，不加载其它不可见的），使用React.lazy，
代码层面：babel实现按需加载

React.lazy为什么能进行动态路由的加载？
React.lazy必须接收一个函数，函数要动态import并且返回一个promise。pending状态就渲染loading组件，resolve状态就渲染组件
React.lazy引入的组件必须使用Suspense包裹，
impoet('/cxx').then(match=> match.add(1,2))
React.lazy使用了dynamic import的标准，
webpack解析到这时会自动进行代码分割，遇到import('/xx)就会将里面内容单独打包成一个包
- 减少资源体积：
- 请求资源css，js，图片请求过大怎么解决？
- 将资源分开，css和js通过webpack混淆（将js代码进行字符串加密）和压缩（去除console等）
- 图片压缩：自动化工具，转base64，使用webP格式
- 开启gzip进行全资源压缩，gzip是一种压缩文件的格式对任何文件进行压缩
- webp优势：同等条件等比例无损压缩后的webp比png少了26%的体积，并且图片越多压缩后的体积优势越明显

### canvas和svg区别：
svg：矢量图，基于xml描述的2d图形语言，用js处理，每个图形都是对象，属性变化，浏览器可自动加载
  特点：不依赖分辨率，支持事件处理，适合带有大型渲染区域的应用程序没比如谷歌地图，不适应游戏应用
canvas：位图，逐像素渲染，适合游戏，基于js绘制的2d图形，逐像素渲染，canvas中，图形是被绘制完成，如果位置发生变化，整个场景发生变化，依赖于分辨率

图片类型：
jpeg，jpg， png，gif，svg，base64，webp
### 二进制位数与色彩的关系
计算机中，像素用二进制表示，一个像素对应的二进制位数越多，它可以表示的颜色种类越多，成像越细腻，文件体积越大
一个二进制位表示2种颜色（0|1对应白黑白）如果一种图片格式对应的二进制位数有n个，那它可以呈现2^n种颜色
### jpeg|JPG
有损压缩，体积小，加载快，不支持透明
JPG优点：特点是有损压缩，这种压缩算法让他成为一种很轻巧的图片格式，并且还是一种高质量的压缩方式，当我们将图片体积压缩到原有体积的50%以下时，JPG仍可保持60%的品质
此外jpg是以24位存储单个图，可以呈现1600万种颜色，足以应对大多数场景下色彩要求，这点决定了它压缩前后的质量损耗不容易被肉眼察觉。
适用场景：用于色彩丰富的图片，复杂的，可作为大的背景图，轮播图或者banner图，比如淘宝首页中最大图片肯定是以.jpg结尾的
适用jpg呈现大图，既可以保住图片质量也不会带来令人头疼的图片体积
缺点：有损压缩在轮播图上确实不易漏出马脚，但当它处理矢量图形和logo等线条感较强，颜色对比强烈的图形时，人为压缩导致的图片模糊会很明显
### png
优点：无损压缩的高保真图片格式，8和24是二进制位数，8位的png最多支持256种颜色，24位可以呈现1600万种颜色，png比jpg有更强的色彩表现力，对线条处理更加细腻，对透明度有良好的支持，
它弥补了jpg的局限性，唯一的缺点就是体积太大。
png-8和png-24：当你追求最佳显示效果不在意文件大小时使用png-24的，但是实践中为了规避体积问题，我们一般不用png处理较复杂的图像，当我们遇到适合png场景时会优先选择png-8
如何确定一张图用png-8还是png-24？把图片按照这两种格式分别输出，看png-8输出是否会带来肉眼可见的损耗，基于结果选择
适用场景：主要用来呈现小的logo，颜色简单且对比强烈的图片或者背景等
### svg
svg和png和jpg相比，文件体积小，可压缩性更强，最显著的优点在于图片可以无限放大而不失真。另外svg是文本文件，可以像写代码一样定义svg，把它放在html里，成为dom的一部分。
也可以把对图形的描述以.svg为后缀的独立文件，使得svg文件可以被很多工具读取和修改，具有较强的灵活性。
svg局限性有2个方面，1：渲染成本比较高，对性能来说不好，2：svg存在其图片格式所没有的学习成本（可编程）
### base64