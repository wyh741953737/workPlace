### 手写jsonp
jsonp产生的背景：ajax请求会受到同源策略的影响，只要是跨域请求一律不准，但是我们可以利用src属性不收同意策略的影响实现跨域

json的纯字符数据课时可以简洁的描述复杂数据，json还被原生js支持，所以在客户端几乎可以随意出路这种格式数据
为了便于客户端使用数据，逐渐形成了一种非正式传输协议jsonp。特点是允许用户传递一个callback参数给服务端。
实现原理： 动态的创建sceript标签，将请求地址赋值给src
         服务器的响应必须是函数调用的字符串，在客户端全局作用域下定义函数，而且要写在script上

btn.onClick = function() {
    jsonp({ url: '...', data: {name: 'a'}, success: function(responseData) { .... }})
}

function jsonp(options) {
    const script document.createElement('script');
    const callBName = 'jsonp'+Math.random().toString().replace('.', '');
    window[callBName] = options.success
    let params = ''
    for(const attr in options.data) {
        params += '&' + attr + '=' + options.data[attr]
    }
    script.src = options.url + '?callback=' + callBName + params
    document.body.appendChild(script)
    script.onload = function() {
        document.body.removeChild(script)
    }
}


### http请求头，请求体，cookie， url在哪？
http请求包括：
  请求行：请求方法，url， 协议版本 
  请求头：user-agent发出请求的用户信息， Accept指定客户端接受哪些类型的信息，cookie身份凭证
  请求数据

  GET /hello.txt HTTP/1.1
  User-Agent: ......
  Host: www.example.com
  Accept-Language: en, mi
http响应包括：
  状态行，http-version,http协议版本，status-code状态码，reason-phrase状态码的文本描述
  消息报头：日期，content-type，content-length
  空行，
  响应正文<html><head><title>我是title</title></head></html>

    HTTP/1.1 200 OK
    Date: .....
    Server: Apache
    Last-Modified: ....
    ETag: '...'
    Accept-Ranges: bytes
    Content-length:51
    Content-type: text/plain

  ### http协议请求方式：
  1）get
  2）post
  3）delete
  4）put
  5）HEAD
  6）options
  7）Trace
  8）connect



  ### 对闭包的理解
  闭包是指有权访问另一个函数作用域中变量的函数，函数外部可以访问到函数内部的变量：比如函数作为另一个函数的返回值。
  闭包的实现思路是返回一个函数，所以闭包是经典的高阶函数

  闭包产生条件： 函数外部引用了函数内部变量，函数嵌套

  闭包优点：延伸了变量生命周期，避免了全局变量污染
  闭包缺点：闭包中的变量在外层函数被调用后不会被自动清除，所以闭包使用不当容易造成内存泄漏。
  内存溢出：是程序运行时出现的错误，当出现运行时需要的内存大于剩余内存就出现内存溢出错误
  内存泄漏：占用的内存没有及时释放，内存泄漏多了会导致内存溢出。常见的内存泄漏：意外的全局变量，函数中没有用关键字声明的变量，没有及时清理的计时器或回调函数


  ### 基本的两列自适应布局
  1，flex布局，自适应一列flex；1
  2： 浮动
  3： 绝对定位+margin

  ### OSI模型
  应用层： 文件传输，文件服务，协议：http，ftp,SMTP
  表示层: 数据格式化，代码转换，数据加密，没有协议
  会话层： 解除或建立与别的节点联系，没有协议
  传输层：
  网络层
  数据链路层
  物理层

### ES6新增特性
1）变量、赋值
  var声明变量可以重复声明，只有函数作用域，没有块级作用域
  新增let声明变量，const声明常量，不能重复定义，有块级作用域
2）函数
  a:函数写法，箭头函数，返回值是个表达式，{}可以省略
  b:函数参数，只有一个参数中（）可以省略。 function(a, ...args) {} 参数解构，传实参：参数展开/剩余参数，默认参数（a=x,b=y)
3）模板字符串
   字符串拼接可以用模板字符串
4）数组方法、json
  数组方法五种：
    map映射， 
    reduce， 累加，进去一堆，出来一个，arr.reduce((pre,cur, index, arr) => pre+item, {})
    filter过滤item.filter(item => item.click === false)返回符合条件的不改变原数组
    forEach 遍历，没有返回值，不会修改
    form,将一个类似数组转化为数组，Array.from([arr] => [x,x,x])
    json变化： 简写： 以前： let obj = { show: function() {} }    ES6： let obj = { show() {}}

5）面向对象
  class，extends，constructor， super关键字
  super类，俗称父类，就是父类构造函数
  功能上没什么变化，统一了标准，提高了性能
6）promise
  异步操作同步化
  promise.prototype.then
  promise.prototype.catch
  Promise.resolve
  Promise.reject
  Promise.all
  Promise.race

7） generator
   promise的升级，ES7的async，await是终极写法
   能暂停
   generator+promise配合，外来的runner辅助执行不一致，不标准，性能低，不能写成=>
   async，await，函数前面加async，await接收异步执行的结果
   
8）模块化

9）解构赋值（左右两边结构一样，定义和赋值必须同步）

### 

### 同步和异步
同步：前一个任务没有完成，后面任务就等着
异步：并发，性能高，体验好
浏览器执行机制：同步代码同步执行，异步代码放在一部队列中，等同步代码执行完，去一部队列执行异步代码，异步队列又分宏队列（定时器任务）和微队列（promise），先执行微队列，再执行宏队列。
轮询：固定时间问一次
回调：放在那，等结果来了再执行

### 手写一个promise版的ajax
### 手写实现一个promise
### 手写实现requireJS模块实现
### react和vue的介绍以及异同
### AMD和CMD，commonJS的区别
### 介绍一下backbone
### 了解过SEO吗？

### 低版本浏览器不支持HTML5标签怎么解决？

### 用js使低版本浏览器支持HTML5标签 底层是怎么实现的？

### 实现一个布局：左边固定宽度为200，右边自适应，而且滚动条要自动选择只出现最高的那个

### 画出盒子模型，要使谷歌浏览器的盒子模型显示得跟IE浏览器一致（让谷歌跟ie一致，不是ie跟谷歌一致），该怎么做？

### 手写JS实现类继承，讲原型链原理，并解释new一个对象的过程都发生了什么

### Array对象自带的方法，一一列举

### Array对象自带的排序函数底层是怎么实现的？

### 了解navigator对象吗？

### 手写一个正则表达式，验证邮箱

### link和@import引入CSS的区别？

### 刚才说有些浏览器不兼容@import，具体指哪些浏览器？


### 移动端适配问题

### react的难点在哪里

### 做过css动画吗

### css3 html5新特性

### 闭包，ES6，跨域

### 盒子模型
盒子模型有标准盒模型和ie盒模型，标准盒模型的宽不包括padding和border，ie盒模型的框包括了，可以使用box-sizing将标准盒模型变为ie盒子模型
### Array的unshift() method的作用是什么？如何连接两个Array？如何在Array里移除一个元素？
unShift向数组前面插入一个值，，连接2个数组用Array.prototype.concat, 移除（需要改变数组）可以用shift移除末尾，

### 用纸笔写一个Closure，任意形式和内容
function(a,b) {
  const sum = a;
  return function(c) {
    const total = sum + c;
    return total
  }
}

### 知不知道Array-like Object？

### 如何用Native JavaScript来读写Cookie？

### 知不知道CSS Box-model？

### 如何做一个AJAX Request？

### Cross-domain access有没有了解？

### 前端安全方面有没有了解？XSS和CSRF如何攻防？
XSS跨站脚本攻击，向页面插入恶意的代码或者脚本，当客户端向服务端发起请求之后，服务端将恶意代码返回，浏览器渲染，恶意代码就会执行，xss的存储形式永久式XSS，容易留下痕迹，DomXSS
  预防：

CSRF跨站脚本伪造，获取用户的信息，如果用户权限高，危害很大，主要是伪造用户做一些操作，比如转账。预防：

### HTTP Response的Header里面都有些啥？

### 知不知道HTTP2？

### 输入URL后发生了什么？

### new operator实际上做了什么？

### 面向对象的属性有哪些？

### 做一个两栏布局，左边fixed width，右边responsive，用纸笔手写


### css 布局，左边定宽右边自适应

### 冒泡和捕获，事件流哪三个阶段？

### 实现事件代理

### 原型链

### 继承的两种方法

### ajax，原生ajax的四个过程

### css:两个块状元素上下的margin-top和margin-bottom会重叠。啥原因？怎么解决？
### .css3特性中的transform：translateZ(0)有什么作用

### 列举三种禁止浏览器缓存的头字段，并写出响应的设置值
catch-control: no-cache
catch-control：max-age=0
expires：告诉浏览器资源失效的时间

### 精确获取页面元素位置的方式有哪些
getBoundingClientRect方法，返回一个对象，对象中包含了left，top，bottom，right四个属性。
再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;

### 如何判断object是数组类型？
Array.isArray(obj)
obj instanceOf Array
Array.isPropertyOf(obj) 判断obj是原型是不是Array


### js：写一个递归。就是每隔5秒调用一个自身，一共100次

### cookie和session， localStorage, sessionStorage有什么区别
        存储位置                     存储大小           存储时间            安全         存储类型   对服务器的压力  
cookie: 存在客户端，大小为4kb，只能存储字符串类型，存在cookie截取等安全性问题，服务端响应会带上一个maxAge，是cookie的有效期(设置有效期存于硬盘，默认内存中)，默认浏览器关闭，数据失效，每次请求带上cookie，增加带宽
session：存储在服务端，没有大小限制，session通过类似于hashTable的数据结构来存储，能支持任何类型的对象，相对来说更安全，服务端响应的sessionId存在客户端的cookie
localStorage：存在客户端，大小5mb甚至更大，永久有效除非手动删除，字符串形式存，一般用于持久登录+登录验证，window.localStorage
sessionStorage：存客户端，5mb甚至更大，当前会话期有效，字符串形式存,敏感性账号的一次性登录，window.sessionStorage，
localStorage和sessionStorage都不会随http的header发送到服务端（相比cookie也更安全），减轻了服务器压力，减少了网络流量，提高了访问速度。webStorage（localStorage+sessionStorage)的一些方法：setItem，getItem，clear，removeItem， key(index)等方法操作数据比cookie方便。

cookie机制： 若不在浏览器内设置过期时间，默认当前浏览器关闭cookie失效，cookie存在内存中（会话cookie），若设置过期时间，数据存在硬盘中，过期时间内有效。每次请求都会带上cookie。

session机制：当服务端收到需要创建session对象时，会检查请求头是否带sessionId，有：根据sessionId返回对应的session对象，无：服务器创建session对象，并将sessionId通过cookie存储返回客户端，如果用户禁用cookie，就要使用url重写，通过response.encodeURL(url)将sessionId拼接在url后面。
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



### 如果页面初始载入的时候把ajax请求返回的数据存在localStorage里面，然后每次调用的时候去localStorage里面取数，是否可行。

### 网络分层结构

### 事件代理js实现

### Css实现动画效果

### Animation还有哪些其他属性

### Css实现三列布局

### Css实现保持长宽比1:1

### Css实现两个自适应等宽元素中间空10个像素

### requireJS的原理是什么

### 如何保持登录状态

### 浮动的原理以及如何清除浮动

### Html的语义化

### 原生js添加class怎么添加，如果本身已经有class了，会不会覆盖，怎么保留？

### Jsonp的原理。怎么去读取一个script里面的数据？

### http请求头有哪些字段

### 数组去除一个函数。用arr.splice。又问splice返回了什么？应该返回的是去除的元素。

### js异步的方法（promise，generator，async）

### commonJS和AMD

### 为什么要用translate3d？

### 对象中key-value的value怎么再放一个对象？

### Get和post的区别？

### Post一个file的时候file放在哪的？

### js的异步加载，promise的三种状态，ES7中的async用过么

### 静态属性怎么继承

### js原型链的继承

### 移动端是指手机浏览器，还是native，还是hybrid

### rem是什么？em是什么？如果上一层就是根root了，em和rem等价么？

### 怎么得到一个页面的a标签？

### 怎么在页面里放置一个很简单的图标，不能用img和background-img？

### 正则表达式判断url

### 怎么去除字符串前后的空格

### 实现页面的局部刷新

### 绝对定位与相对定位的区别

### js轮播实现思路

### 如何让各种情况下的div居中(绝对定位的div,垂直居中,水平居中)？

### display有哪些值？说明他们的作用

### css定义的权重

### requirejs怎么防止重复加载

### ES6里头的箭头函数的this对象与其他的有啥区别

### w3c事件与IE事件的区别

### 有没有上传过些什么npm模块

### IE与W3C怎么阻止事件的冒泡

### 说下你知道的响应状态码

### ajax的过程以及 readyState几个状态的含义


### es6与es7了解多少

### 清除浮动有哪几种方式,分别说说

### JavaScript有哪几种类型的值

### 使用 new操作符时具体是干了些什么

### 让你设计一个前端css框架你怎么做

### 了解哪些设计模式说说看

### 说下你所了解的设计模式的优点

### js中this的作用

### js中上下文是什么

### js有哪些函数能改变上下文

### 你所了解的跨域的方法都说说看你了解的？

### 要是让你自己写一个js框架你会用到哪些设计模式

### 平常在项目中用到过哪些设计模式,说说看

### 一来给了张纸要求写js自定义事件

### 前端跨域的方法

### call与apply的区别

### h5有个api能定位你知道是哪个吗？

### webpack怎样配置？


### link和@import有什么区别？


### 说下你所理解的mvc与mvvc

### position有哪些值,说下各自的作用

### 写个从几个li中取下标的闭包代码

### 移动端性能优化

### lazyload如何实现

### 点透问题

### 前端安全

### 原生js模板引擎

### repaint和reflow区别

### requirejs如何避免循环依赖？

### 实现布局：左边一张图片，右边一段文字（不是环绕）

### window.onload和$(document).ready()的区别，浏览器加载转圈结束时哪个时间点？

### form表单当前页面无刷新提交 target iframe

### setTimeout和setInterval区别，如何互相实现？

### 如何避免多重回调—promise，promise简单描述一下，如何在外部进行resolve()

### margin坍塌？水平方向会不会坍塌？

### 伪类和伪元素区别

### vue如何实现父子组件通信，以及非父子组件通信

### 数组去重

### 使用flex布局实现三等分，左右两个元素分别贴到左边和右边，垂直居中

### 实现bind函数

### http状态码。。。401和403区别？

### 用原生js实现复选框选择以及全选非全选功能

### amd和cmd区别

### vue的特点？双向数据绑定是如何实现的

### Object.defineProperty

### 页面加载过程

### 浏览器如何实现图片缓存

### 如何立即react生态

### 对组件的理解


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
            

### 移动端300ms延迟
IOS的safari点击2次会放大（还有滚动），300ms用于判断用户是想单击触发事件，还是双击缩放。点击穿透是300ms延迟的副作用
解决方案：
1）禁止所有缩放：<meta name="viewport" content="user-scale=no" />   <meta name="viewport" content="init-scale=1, maxinum-scale=1">,缺点：完全禁止了缩放
2）更改默认视口宽度，设置屏幕宽度等于设备宽度，浏览器认为该网站做过适配优化，无需双击缩放，就禁了双击缩放，但是任然可以双指缩放<meta content="width=device-width" />
3) css属性touch-action,指定相应元素能够触发的行为，none表示该元素上面的操作不会触发任何浏览器默认行为，maininpulation表示干掉双击行为，在移动端兼容性也还可以
4）fast-click专门解决移动端300ms延迟的轻量级库，原理：检测到touchEnd事件时，通过DOM自定义事件立即触发模拟的click事件，并把浏览器在300ms后的click事件禁止掉。

点击穿透：touchStart事件在某些情况下出现点击穿透现象
比如：B在A上面，我们在B上注册了一个回调，作用是隐藏B，当我们点击B后，touchStart-touchEnd-click,而click有300ms延迟，当touchStart吧B隐藏后，到了300ms，浏览器触发了click事件，但是B不见了就作用到了A，如果A是一个连接就意外跳转了。

fastClick问题：IOs端input框唤起键不灵敏：
解决： node_modules找到fastClick文件修改focus方法，但是npm之后又会被覆盖

一个按钮点击过程的处理：
var $test = document.getElementById('test')
$test.addEventListener('click', function() {})

var targetElement = null
document.body.addEventListener('touchStart', function() { // 记录当前点击的元素
  targetElement = event.target
})
document.addEventListener('touchEnd', function() { // 阻止默认事件，屏蔽之后的click事件，合成cick事件，并添加可追踪属性forwardTouchEvent， 在targetElement上触发click事件，targetElement上绑定的时间立即执行，完成fastClick
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


### ajax轮询，长轮询，webSocket
ajax轮询：客户端过一段时间就像服务端询问
长轮询:类似ajax轮询，但是是阻塞模型，没有资源就等着，
ajax轮询1和长轮询追求速度，需要服务器有很块处理资源的速度，都是不断地建立tcp连接，需要很高的高并发，也就是有很强的接待客户的能力，追求速度，非常耗资源
websocket真正的双工，需要服务端和客户端都升级，

### http特点
1）支持客户/服务器模式（由客户端发出请求）
2）简单快速，只要传送请求方法/路径（由于http协议简单，使得http服务器的程序规模小，因而通信速度很快 
3）灵活，http允许传输任意类型数据对象，由content-type加以标记（1.0后） 
4）无连接，每次连接只处理一个请求，服务器处理完客户端请求，并接收到客户端答应之后，就断开连接，采用这种方式可以节约时间。（keep-alive：让客户端与服务端的连接持续有效，避免重新建立连接） 
5）无状态：协议对事务处理没有记忆能力，缺少状态意味着如果后续处理需要前面的信息，则它必须重传，导致每次传输数据很大

### SPDY
谷歌提出，为了最小化网络延迟，提升网络速度，对http的增强，
http： http+tcp+ip
SPDY：http+tcp+ip+spdy+TLS
1）多路复用：允许一个连接可以有无限个并行请求，还可以设置优先级，防止非重要资源占用通道
2）支持服务器推送
3）spdy压缩了http的header，舍去了不必要的头部信息
4）强制使用SSL，对用户来说网页速度变快，不担心数据被截取

### http和https的区别
http： 通过明文传输不安全,

https： 安全，要申请证书，在http基础上增加了一层安全层，一系列的加密操作都是在安全层进行的。https可认为是http+TLS，
      TLS是传输层加密协议，前身是SSL，SSL是https建立在应用层和传输层，TCP协议之上的一个加密通道。
      HTTPS增加了3个强大的功能对付劫持行为：1）内容加密 2）身份认证，数字证书。 3）数据完整性

https的证书颁发过程：1： 生成服务端证书签名： 服务端将公钥key1发送证书机构，机构用自己私钥加密key1，根据服务端网址等信息生成经过私钥加密的证书签名。 
                  2： 客户端解密证书签名：  服务度将证书签名发送到客户端，客户端只要知道是哪家证书颁发机构的签名就能从本地找到找到机构公钥解密证书签名。
                  3： 客户端生成证书签名： 客户端用同样方式生成自己的证书签名，如果两个证书签名一致说明有效。
                  4： 客户端生成对策加密秘钥： 客户端用公钥解密服务端的公钥key1，
                  5： 服务端解密： 客户端生成对称加密秘钥key2，用服务端公钥key1加密key2，发送到服务端，服务端用自己私钥解密

### http1.0和http2.0有哪些区别
http1.0：一次性连接
http1.1：保持连接，性能提升
http2.0：强制https，自带双向通信，多路复用

http2.0核心：二进制分针，在不改变http语义，状态码，方法，utI，首部字段等等核心概念下，做出了突破http1.1标准的性能限制，实现低延迟高吞吐量。
            2）之所以叫2.0就是因为增加了二进制分帧。 将所有的传输信息分割成更小的消息和帧，并且采用二进制形式编码。
            3）http2.0首部压缩：首部表跟踪/存储之前发送键值对，相同的不再通过每次请求和响应发送。其实就是只发送发生变化的字段。通信双方缓存了一份首部表，即避免了重复header的传输。 
            4）http2.0多路复用： 继承SPDY协议，所有通信都在一个TCP连接中完成。2.0把http基本单位缩小为帧。TCP性能：关键在于低延迟，大部分TCP连接很短，突发性。TCP只在长时间传输连接，传输大文件的时候效率才最高。

HTTP2.0的问题：还是底层支称的TCP造成的， 
          1：队头阻塞（当连接中出现丢包，2.0不如1，丢包之后整个tcp都要等待重传，导致后面数据被阻塞，对于http1.1来说，开启多个tcp连接，出现这个问题只会影响单个连接。） 
          2：建立连接的握手延迟：不管是1.0还是1.1，https都是tcp进行传输，https，2.0还要使用TLS进行安全传输，这样出现两个握手延迟。TLS完全握手至少需要RTT两回才能建立，对于短连接来说，这个延迟影响很大无法消除。 QUIC是TCP遗留的无法解决问题的优化。 针对延迟问题：0 RTT ：QUIC利用类似TCP快速打开的技术，缓存当前会话上下文，下次恢复会话时候只要将会话缓存传到服务器确认，确认通过就可以进行传输。 传统TCP：客户端————服务端————响应客户端（1RTT）————客户端发送ACK+SYN————服务端响应（2RTT） TCP+TLS：4RTT QUIC：2RTT


### tcp/udp区别

### tcp三次握手过程
    1：客户端发送带有SYN标识（SYN=1，seq=x）的连接请求报文段，然后进入SYN_SEND状态，等待服务端确认。
    2：服务端接收到客户端SYN报文段后，需要发送ACK信息对这个SYN进行确认，同时还要发送自己的SYN信息（SYN=1，ACK=1，seq=y，ack=x+1）服务端把这些信息放在一个报文段中（（SYN+ACK报文段），一并发给客户端，此时服务端进入SYN_RECV状态
    3：客户端接收到服务端的SYN+ACK报文段后会向服务端发送ACK（ACK=1，seq=x+1，ack=y+1）确认报文段，这个报文段发送后， 客户端和服务端都进入ESTABLISHED状态，完成三次握手。
    三次？双方要明确对方接收能力都是正常的，（客户端发之后，服务端可以确定客户端有发送能力，服务端发送给客户端，可以确定服务端的接收和发送能力正常，最后客户端发送确认，来确定客户端的接受能力

### xss与csrf的原理与怎么防范

### Http结构
请求头：
  1: method:方法,
  2: url:路径,
  3: 协议，
  4: content-type: 请求内容数据类型，
  5： host：请求资源所在服务器，
  6： cookie，
  7： connection：keep-alive/close，控制连接,
  8： cache-control：控制缓存,
  9； Date： 创建日期,
  10：If-none-Match,和上次资源对比是否改变
  11：If-modifed-since，
  12：user-egent：代理
  13： Accept：用户代理可处理的媒体类型，如text/html
  14： Accept-laguage：优先语言
  15： Accept-chartset：优先字符集
  16： Accept-encoading:优先内容编码
  17： x-requested-with： XMLHttpRequest
请求体
响应头: 
  1： status：状态码，
  2： 协议版本，
  3： cache-control，
  4： set-cookie，
  5： content-Type， 
  6： Date ,
  7： etag， 
  8： content-length
  9： age：资源创建经历的时间
  10： location：领客户端重定向的URI
  11： last-modified
响应体

### http请求方式
http1.0中有三种请求方式：get，post，head
http1.1新增5种请求方式： put，delete，connect，trace，options
1）get，请求参数拼接在地址后面，安全性低，浏览器对url有限制，所以体积不能大
2）post，请求参数放在请求体，安全性相对高，发送两个数据包，第一次发送响应100，第二次带上请求参数发送请求，请求体积不限
3）put，和post不同，put是幂等的，没有验证机制，更多时间用put来传输资源。
4）head，和get类似，只返回请求头
5）delete，请求删除资源服务器某些资源
6）options：获取指定的资源能够支持的请求方式
7）trace：回显服务端收到的请求，主要用于测试或者诊断，客户端发送trace请求来获取发出去的请求是怎样被篡改的，
8）connect：开启客户端和所请求资源之间双向沟通的通道，可以用来创建隧道，http代理的时候用connect请求

### http身份认证有哪些方法？
1）basic认证：http1.0，客户端请求，服务端返回401，用户携带经过base64编码的用户名密码到首部字段（Authorization）到服务端，成功200，失败401.base64不是加密不安全
2）digest认证：http1.1，弥补basic认证，服务端返回401和临时质询码，不发送明文，客户端响应包含经过h5加密的digest字段，但是防止不了用户伪装
3）SSL客户端认证：借用https客户端证书来完成认证，服务端通过证书判断用户是否来自自己登陆的用户。收到需要认证的用户请求，服务端会要求客户端提供证书，客户端提供证书后，服务端验证，通过：获取客户端证书内容的秘钥，开启https加密通信，一般银行用。要一定成本
4）表单认证：由web应用基于表单实现的认证方式，通过cookie和session来保持用户状态。

### DNS
1：DNS：把域名和ip地址相互映射分布式数据库，DNS协议运行在UDP协议之上。 
2：DNS解析：通过域名最终得到对应ip地址的过程。 
3：DNS缓存：浏览器，操作系统，LocalDNS，根域名服务器都会对DNS结果作出一定的缓存 
4：DNS查询过程：先搜索浏览器自身DNS缓存=》读取操作系统的hosts文件看是否存在对应的映射关系=》TCP/IP参数里设置的首选DNS服务器=》根服务器发出请求，进行递归查询

CDN：内容分发网络，缓存服务器，为买票者提供了方便，帮助他们在最近的CDN节点，最短的请求时间，拿到资源，起到分流作用，减轻服务器负载压力
CDN缓存：在浏览器本地缓存失效后，浏览器会像CDN边缘节点发起请求，类似浏览器缓存，CDN边缘节点也存在一套缓存机制，CDN边缘节点缓存策略因服务商不同而不同，通过http响应头中的cache-control：max-age字段设置CDN边缘节点数据缓存时间。 当浏览器向CDN节点请求数据时，CDN节点会判断缓存数据是否过期，若缓存数据过期，CDN会像服务器发出回源请求，从服务器拉取最新数据，更新本地缓存，并将最新数据返回给客户端，CDN服务商一般会提供基于文件后缀，目录多个维度来指定CDN缓存时间，为用户提供更精细化的缓存管理。 
CDN优势： 1：CDN节点解决了跨运营商和跨地域访问的问题，访问延时大大降低 2：大部分请求在CDN边缘节点完成，CDN起到分流作用，减轻了源服务器的负载。

CDN工作方式： 当你点击网站页面的url时，经过本地域名系统解析，域名系统解析会最终把域名的解析权交给cname()指向的内容分发专用的域名系统服务器。

内容分发的域名系统服务器把内容分发的全局负载均衡设备ip地址返回给用户。

当你像内容分发的全局负载均衡设备发起url访问请求，内容分发网络的全局负载均衡设备会为你选择一台合适的缓存服务器提供服务，选择的依据包括：用户的ip地址，判断哪台服务器距离用户最近，根据用户请求的url中携带的内容名称判断哪台服务器上有用户要的数据，查询各个服务器当前负载情况，判断哪台服务器有服务能力。基于这些条件综合分析后，区域负载均衡设备会向全局负载均衡设备请求返回一台缓存服务器的IP地址。全局负载均衡设备返回服务器IP地址，用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端，如果这台缓存服务器没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要像它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。域名解析服务器根据用户ip地址，把域名解析成相应节点的缓存服务器ip地址，实现用户就近访问，使用CDN服务的网站，只要将其域名解析权交给CDN的GSLB设备，将需要分发的内容注入到CDN就可以实现内容加速了。
DNS也是开销，通常浏览器查找一个给定域名的IP地址要花费20~120毫秒，在完成域名解析之前，浏览器不能从服务器加载到任何东西。那么如何减少域名解析时间，加快页面加载速度呢？

当客户端DNS缓存（浏览器和操作系统）缓存为空时，DNS查找的数量与要加载的Web页面中唯一主机名的数量相同，包括页面URL、脚本、样式表、图片、Flash对象等的主机名。减少主机名的 数量就可以减少DNS查找的数量。

DNS查询过程：
查看浏览器内部缓存
系统缓存：浏览器会调用一个类似 gethostbyname 的库函数，此函数会先去检测本地 hosts 文件，查看是否有对应 ip。
路由器缓存、ISP 缓存 如果浏览器和系统缓存都没有，系统的 gethostname 函数就会像 DNS 服务器发送请求。而网络服务一般都会先经过路由器以及网络服务商（电信），所以会先查询路由器缓存，然后再查询 ISP 的 DNS 缓存。
本地 DNS 服务器 通常为自己计算机搭建的小型 DNS 服务器，自我使用，属于 DNS 优化的一部分。
域名服务器 到此处的过程为：根域服务器（.） -> 顶级域名服务器（eg: .com，.org）-> 主域名服务器（eg: google.com） 如果域名正常，应该就会返回 IP 地址，如果没有浏览器就会提示找不到服务器地址。
浏览器获取到 IP 地址后，一般都会加到浏览器的缓存中，本地的 DNS 缓存服务器，也可以去记录。另外，一秒钟几千万的请求域名服务器如何满足？就是 DNS 负载均衡。
### 浏览器缓存的区别
缓存策略都是通过设置http的header来实现的
缓存机制： 先走强缓存，强缓存生效，返回200，并且从缓存中读取数据返回，强缓存失效，向服务端发起请求，协商缓存生效，返回304，继续使用缓存
浏览器缓存分为：
  强制缓存：
        expires:expires是服务器返回的资源过期时间，如果修改本地时间缓存会失效,expires是http1.0产物
        cache-control:控制是否需要缓存，是http1.1产物，catch-control的优先级高于expires
  协商缓存：
    Etag/If-None-Match: 资源的标识符，资源变化，服务端的Etag就会发生变化，etag的优先级高于last-modified, 
    last-Modified/If-Modified-since:资源最后的修改时间，只能精确到秒，秒以内发生的变化感知不到,精度上Etag大于last-modified，性能上etag小于last-modified

Expires+Last-Modified+max-age+Etag 缺陷：max-age或者Expires不过期，浏览器无法感知文件变化，怎么让浏览器无法感知？ 
Http缓存改进： 1：md5/hash缓存 通过不缓存html，为静态文件添加MD5或hash标识，
             2：CDN缓存

缓存位置： 
  service-worker：自由控制缓存哪些文件，如何匹配和读取文件， 缓存是持续的
  Memory-cache： 读取速度快，缓存容量小，不是持续缓存，tab页关闭，缓存被释放
  Disk-cache： 读取速度慢，缓存容量大，缓存持续时间长。根据http的header判断哪些需要缓存，大部分缓存来自硬盘缓存
  push-cache: 只会在session会话中存在，会话关闭，缓存失效，推送缓存（http2.0),以上3种缓存没有命中才会使用，在chrome只有5分钟，不是严格根据http中header进行缓存

用户行为：地址栏输入：查找disk-cache是否有匹配，没有匹配发送请求
        普通刷新：F5,优先使用memory-cache,其次是disk-cache
        强制刷新： Ctrl+F5，不使用缓存

service-worker：运行在浏览器背后的独立线程，使用它必须用https，因为service-worker涉及到请求拦截，必须用https来保证安全。service-worker和浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件，如何匹配缓存，读取缓存，并且缓存是连续的。
### 304与200读取缓存的区别

### 304是什么意思？有没有方法不请求不经过服务器直接使用缓存


### 如何优化网站

### React中key的作用
### 调用setState之后发生什么
### react生命周期
### shouldComponentUpdate是干嘛的？性能优化哪个生命周期
###  为什么虚拟DOm提高性能
###  React diff
### React中refs作用，使用的场景
### 展示组件和容器组件有何区别
### 类组件何函数组件区别
###  组件的state何props区别
###  何为受控组件和非受控组件
### 何为高阶组件，高阶组件作用
###  什么是纯组件
###  为什么建议传递给setState的参数是个callBack而不是一个对象
###  除了在构造函数中绑定this还有别的方法吗
###  在构造函数中调super有什么作用？
### 写constructor何不写constructor有什么区别
### 应该在react何处发起ajax请求
### 描述事件在react中的处理方式
###  createElement何cloneElement区别
###  React中三种构建组件的方式
###  react组件划分业务组件技术组价？
### 简述flux思想
### react用过哪些脚手架
### react特点
### react优点
### react限制
###  什么是jsx
###  虚拟DOM工作原理
### 为什么浏览器无法读取jsx
###  何es5相比，react的es6语法有何不同
###  如何理解“react中一切都是组件”
### react中render目的
###  如何将两个或者多个组件嵌套到一个组件
### 什么是props
### react中的状态是什么？如何使用的
###  区分props何state
###  为何要用setState更新状态而不是直接this.state=...
### react中箭头函数是什么怎么用？
### 区分有状态组件和无状组件
###  如何在react中创建一个事件
###  react中合成事件是什么
###   如何模块化react中的代码
###  如何在react中创建表单
###  MVC主要问题是什么
###  redux相关
### Redux遵循的原则
###   你对单一数据源有什么理解
### 列出redux的组件
### 数据如何通过redux流动
###  如何在Redux中定义action
### 解释reducer的作用
### Store在redux中的意义是什么
### redux何flux有什么不同
### 什么是react路由
### 为什么react路由v4中使用switch关键字
### 为什么需要react中的路由
###   列出React Router的优点
###  react路由和常规路由有何不同




67、你的优点/竞争力


preloader

72、以后的规划

73、你做过最困难的事情是啥？

76、问做过啥项目，用到什么技术，遇到什么困难

77、兼容性

95、介绍一下做过的项目

96、问到了多个服务器怎么弄，架构之类的

98、脏检查

99、nodejs的架构、优缺点、回调

112、你的不足是什么？

113、做了那么多项目，有没有自己的归纳总结

114、工程怎么进行文件管理

115、less和sass掌握程度

135、最近看什么开源项目？

137、平时是怎么学习的？

146、说说你对组件的理解

147、组件的html怎么进行管理

156、你用了移动端的什么库类和框架？

157、移动端要注意哪些？

158、适配有去考虑么，retina屏幕啊？

160、怎么测试的？会自动化测试么？

161、你觉得你什么技术最擅长？

162、你平时有没有什么技术的沉淀？

187、webpack底层实现原理

188、gulp与webpack区别

193、你除了前端之外还会些什么？

196、你觉得你哪个项目是你做的最好的

197、说说你在项目中遇到了哪些困难,是怎么解决的

198、前端优化你知道哪些

203、看过哪些框架的源码

204、遇到过哪些浏览器兼容性问题

209、学习前端的方法以及途径

237、nodejs中的文件怎么读写？

240、看过哪些前端的书？平时是怎么学习的

244、你的职业规划是怎么样的？

269、为什么选择前端，如何学习的，看了哪些书，《js高级程序设计》和《你不知道的js》有什么区别，看书，看博客，看公众号三者的时间是如何分配的？

270、如何评价BAT？

271、描述下在实习中做过的一个项目，解决了什么问题，在其中担任了什么角色？这个过程存在什么问题，有什么值得改进的地方？

272、如何看待加班，如果有个项目需要连续一个月加班，你怎么看？

273、遇到的压力最大的一件事是什么？如何解决的？

274、平时有什么爱好

275、自身有待改进的地方

277、手里有什么offer

278、你对于第一份工作最看重的三个方面是什么？

279、如何评价现在的前端？

262、平时如何学前端的，看了哪些书，关注了哪些公众号

266、描述一个印象最深的项目，在其中担任的角色，解决什么问题
