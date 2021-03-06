### 手写实现requireJS模块实现
### react和vue的介绍以及异同

### react的难点在哪里
### 如何理解react生态
react可以说是目前为止最热门，生态最完善，应用范围最广的前端框架。react结合它的整个生态，它可以横跨web端，移动端，服务器端，乃至VR领域。

一、react生态之——web端
react本身是面向web端的，它很轻便灵活，由于只是MVC架构中视图层。所以要配合生态体系中的其他框架或模块来使用。

1，路由
react的路由：主要react-router。现已v4.1。推荐react-router-redux和react-router搭配，可保持路由器与应用程序状态同步。

2，状态管理器
react只是UI层，对于如何管理应用的状态，facebook提出了flux架构，而基于这一架构，react生态陆续出现了redux、react-redux 、refluxjs、mobx、等一系列状态管理框架。其中redux、mobx是最受欢迎的。
Mobx 适合做些简单的应用，适合小的团队使用。Mobx优点：响应状态的变化。
redux适合复杂的应用，大团队，需求变化多。它的优点是响应动作和事件。
redux不仅应用于react，也可以应用于angular，vue等框架，只是redux和react配合使用最为契合。

另外国内蚂蚁金服前端团队基于redux, react-router打造了另一个前端框架——dva。
dva简单来讲是对redux方案的集成与拓展，处理了包括项目构建，异步处理、统一请求、统一错误处理等一系列诸多问题。
如果你选择redux方案，那么建议直接使用dva。

3，UI库
首先国外的有material-ui、react-toolbox。它们都基于谷歌的material设计理念，因此界面非常精美，尤其适用于web开发。
其次是国内蚂蚁金服开源的antD，以及百分点公司开源的bfd-ui。这两个都是企业级的UI库

4, 一些工具
immutable-js是facebook推出的完全独立的一个js库，侧重函数式编程中不可变数据结构，使用Immutable可使你的react应用性能上会有很大的提升。

css-modules ——css模块化解决方案
css-modules不是为react而生的，它是css模块化的一种解决方案，但它和react配合使用很好

React Devtools是fb推出调试工具。提高开发效率。

无论是react，redux，还是Immutable等都强调函数式编程。
整个react体系，都在强调js，甚至连css(css-modules)、html(jsx)都融入了js处理

TypeScript
ant design就是使用TypeScript来开发的。

5，react项目构建
前端构建工具有很多种，比如最为流行的webpack、百度开源的fis3、以及 gulp。而开发react应用，推荐使用强大的webpack做项目构建。这也是官方的推荐。

二、react生态之——移动端
react-native是目前最优秀的非原生开发移动框架，一处开发，多端使用。同时具有出色的性能，支持热更新等超强的优势
而最近facebook推出React Fiber 架构,使用Fiber对react核心算法进行重写，届时RN的性能将会再次直线式的上升，向原生步步紧逼。
开发RN应用所用的技术栈与web端大致相同，同样需要结合redux,react-router, dva, mobx，antd-mobile等周边生态来使用。

三，react生态之——服务器端
react服务器端渲染最出色的：next.js。这是一个基于react可实现服务器和浏览器都能渲染的框架。

### 如何根据不同应用场景，选择技术栈方案。

1，开发后台应用

react+react-router+mobx+webpack+bfd-ui/ant design （三星半）
react+react-router+redux+webpack+bfd-ui （三星）
react+react-router+redux+webpack+ant design （四星）
react+dva+bfd-ui （四星半）
react+dva+ant design （五星）
2，开发前台web应用

react+dva+bfd-ui/ant design （四星）
react+dva+material-ui/react-toolbox （四星半）


### 实现一个简单的createStore
-  分析：生成一个新的store，
- store里面有dispatch， getState， subscribe
- dispatch里面是一个对象{ type: ADD, payload: ''}
- subscribe(listener)
const createStore = (reducer) => {
    let state;
    let listeners = [];
    const dispatch = (action) => {
      // diapatch里面要调用reducer得到state，遍历监听者告诉他们更新了
      const state  = reducer(state, action);
      listeners.forEach(listener => listener());
    }
    const getState = () => state;
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(item => item !== listener);
      }
    }
    dispatch({});
    return { getState, dispatch, subscribe };
}

function listener() {
  let newState =  store.getState();
  component.setState(newState);
}

### 实现简单的combineReducers
const combineReducers = (reducers)  => {
  return (state={}, action) => { // 产生一个整体的reducer函数
    return Object.keys(reducers).reduce((nextStagte, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState;
    }, {})
  }
}

const reducer = combineReducers({
  a: doSomethingFunc,
  b: dosomethingFunc
});



### 实现applyMiddleWares
- 中间件作用：将所有中间件组成一个数组，一次执行
function applyMiddleware(...middleware) {
  return (createStore) {
    return (reducer, payloadParams, echaner) {
      const store = createStore(reducer, payloadPrams, echaner);
      const dispatch = store.dispatch;
      let chain = []
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }
      chain = middlewares.map(middleware => middleware(middlewareAPI))l
      dispatch = compose(...chain)(store.dispatch);
      return { ...store, dispatch }
    }
  }
}

applymiddleware(thunk, promise, logger)(createStore)(addReducer,12)

中间件被放进chain数组中，然后嵌套执行
### SPA
单页应用，所以活动局限于一个页面，仅初始化时候加载所有文件，加载完SPA不会因为用户操作进行页面的重载和跳转，利用js变化html内容。通过react-router实现不同组件在同一页面切换
优点：
1）解决了多爷们访问速度慢，提高页面访问速度
2）不刷新页面，通过ajax异步获取，页面显示流畅
3）良好的前后端分离，减轻服务器压力，服务器只要出数据，不管展示逻辑和页面合成
4）共用一套代码，可以同时应用于电脑，收集，平板
缺点：
1）初次加载从服务器一次性请求页面，会出现首屏加载慢的问题，
2）不利于SEO,传统页面，一个页面一个结构，有利于SEO，SPA就一个html页面
3）前进后退：SPA内容都在一个页面，不能使用浏览器前进后退，所有页面要简历自己的堆栈管理

SPA在前后端分离基础上加了前端路由。


### shouldComponentUpdate是干嘛的？性能优化哪个生命周期
性能优化，对比props和state，没有发生改变返回false，不重写渲染组件

### React特点
虚拟dom，可以用服务端渲染，遵循单项数据流或者数据绑定

### jsx
是js+xml是一个语法糖，javascript  XML，此文件使应用非常可靠并能提高性能

### 虚拟DOM和真实dom

虚拟DOM: 更新快，无法直接操作dom，元素更新则更新jsx，dom操作简单，很少消耗内存
真实DOM：更新慢，科直接操作DOM，元素更新直接创建新的DOM，DOM操作代价大，消耗内存多

虚拟DOM是一个轻量级js对象，最初只是真实dom的副本，更多的是一种模式
虚拟dom工作步骤：
1）底层数据变，整个ui将在虚拟dom中重新渲染
2）计算之前dom和新dom直接差异
3）只用实际更改内容更新真实dom

### react中，一切皆组件
组件是react应用ui的构建块，这些组件将整个ui分成更小的独立并可重用的部分，每个组件之间彼此独立，而不影响ui的其余部分
###  render的目的

###  为什么虚拟DOm提高性能
###  React diff
### React中refs作用，使用的场景
是react引用的简写，其实就是用它可以访问到dom元素一样
使用：选择文本或者媒体播放时，或者与第三方库集成
### 何为高阶组件，高阶组件作用
HOC：复用组件逻辑，参数为组件内，返回值也是组件
HOC将组件转化为另一个组件
HOC常见的有Redux的connect（返回高阶组件的高阶函数）
HOC不会修改传入的组件，也不会使用继承来赋值其行为，HOC通过将组件包装在容器中来生成新的组件，HOC是纯函数，没有副作用

高阶组件应用场景：
1）在写代码过程中，尽量不破坏原有函数，给某个对象添加方法在他执行前调用，吧这个方法扩展到原型上（AOP面向切片编程，汉堡编程，切开，放我的进去—）扩展原有方法，重写原有方法但是不破坏原有方法
function say(who) { console.log(who+'说' )}
Function.prototype.before = function(fn) {
  let that =  this;
  return function() {
    fn();
    that(...arguments)
  }
}

let newFn = say.before(function(){console.log('hello')})
newFn('我');

多个异步请求，如何同步获取最终结果？异步并发问题
let fs = require('fs');
let school = {}
fs.readFile('./name.txt', 'utf-8', function(err, data) {school.name = data})
fs.readFile('./age.txt', 'utf-8', function(err, data) {school.age = data})
上面有2个异步读取的，如何保证上面两个函数同时获取结果？
function after(times, callback) {
  return function () {
    if(--times === 0) { //当到达调用次数，执行某个回调
        callback();
    }
  }
}
let cb = after(2, function() {console.log(school)});


高阶组件可以看做是装饰器模式在react的实现。ES7中添加了一个decorator的属性，使用@符表示，可以更精简的书写
> 属性代理
- 操作props
- refs获取组件实例
componentDidMount() {console.log(this.instanceComponent)}
《WrappedComponent {this.props} ref={instanceComponent => this.instanceComponent = instanceComponent}
- 抽离state： 通过 { props, 回调函数 } 传递给wrappedComponent组件，通过回调函数获取state
> 反向继承，继承WrappedComponent除了一些静态方法，组件的生命周期，state，各种function我们都可以得到
const iiHoc = WrappedComponent => class extends WrappedComponent {
    render() {
      return super.render();
    }
}
- 渲染劫持：就是控制它的render函数
const elementsTree = super.render();

注意:
1)高阶组件不会修改子组件，也不拷贝子组件的行为。高阶组件只是通过组合的方式将子组件包装在容器组件中，是一个无副作用的纯函数
2)静态方法要复制,无论PP还是II的方式，WrappedComponent的静态方法都不会复制，如果要用需要我们单独复制。
3)refs不会传递。 意思就是HOC里指定的ref，并不会传递到子组件，如果你要使用最好写回调函数通过props传下去
4)不要在render方法内部使用高阶组件。react会去比较 NowElement === OldElement, 来决定要不要替换这个elementTree。如果每次返回的结果都不是一个引用，react以为发生了变化，去更替这个组件会导致之前组件的状态丢失。

###  什么是纯组件
###  为什么建议传递给setState的参数是个callBack而不是一个对象
###  除了在构造函数中绑定this还有别的方法吗
箭头函数，在事件体里面
###  在构造函数中调super有什么作用？
constructor：需要初始化state时候用，通过bind绑定this
一旦使用construstor就要调用super
子类没有自己的this，要先继承父类的this对象，然后加上自己的属性和方法，不调用super就得不到this
符合原生js，属性加载constructor，方法加在原型上面


### 应该在react何处发起ajax请求
componentDidMount：已经挂载后。
componentWillmount：是一个会在服务端渲染执行的方法，如果在这请求，不符合服务端渲染这种获取的方式，请求里引用一些window上获或者其他对象会造成组件在服务端渲染挂掉。
### 异步过程使用单例的event对象
React将使用单个事件侦听器在顶层侦听所有事件。对性能好，意味着React在更新DOM时无需担心跟踪事件监听器。

全局单例的event对象，所以在异步对象中使用react事件时需要额外注意，异步操作最好将对象内部需要的值先进行拷贝赋值。
react里面事件的处理：reacrt会代理到事件，实际最终执行事件不是绑定的那个事件，react又代理了一层
e已经不是原生的e了，而是reacrt代理后的，所有事件共用event。

clickHandle(e) {
  setTimeout(function() { // 异步使用
    console.log(e.currentTarget.innerText) // undefined
  })
}
clickHandle2(e) {
  console.log(e.currentTarget.innerText) // btn2
}
<div>
  <button onClick={this.clickHandle}>btn1</button>
  <button onClick={this.clickHandle2}>btn2</button>
</div>

解决：
handleClick(e) {
  let text = e.currentTarget.innerText;
  setttimeout(function(){
    console.log(e.currentTarget.innerText)
  })
}
### 性能优化方式
使用react dev tools检测组件是否出现不必要的重新渲染
why-did-you-render是一个检测你的页面元素是否出现了不必要的重渲染
class中提取声明箭头函数，保证render执行过程中的函数不会因为引用问题导致重新渲染

### immutable库和immutable-js和immer
为了配合shouldcomponentUpdate性能优化，他们的推出是为了实现不可变数据，
### 尽量不要在render里面写bind。将绑定挪到constructor
在render里使用箭头函数，每次将方法传给子组件都会重新渲染

深拷贝方法：拷贝之后会返回一个新的对象，和之前的引用关系断开了
react采用这种的话，子组件无法判断有没变化，导致一个性能问题，和bind一样

immutable：判断组件是否要更新


### 描述事件在react中的处理方式
###  createElement何cloneElement区别
###  React中三种构建组件的方式
### React中constructor作用
constructor是类中必须有的，如果没有显示声明会自动添加，通过new生成实例时自动调用该方法
在class中继承是使用extends来实现的，子类必须在constructor中调用super，否则创建实例会报错：因为
子类没有自己的this，它只能继承父类的然后加工，super就是将this继承给子类。
原因：es5和es5继承机制不一样
ES5： 先创建子类的实例对象this，再将父构造函数的方法加到this
ES6：先创建父类的实例this，再用子类的构造函数修改this

super写与不写：如果你用到了constructor就要写super，connstructor初始化state和事件绑定，
如果你在constructor中要用this.props就必须给super加参数
无论有无constructor在render中this.props都是可以使用的，这是react自动附带的，如果没用到可以不写，react会自动添加一个空的

###  react组件划分业务组件技术组价？
### 简述flux思想
### react用过哪些脚手架
### react限制
只是个库不是框架，库很大，要花时间理解
###  虚拟DOM工作原理

### 为什么浏览器无法读取jsx
###  何es5相比，react的es6语法有何不同

### react中的状态是什么，props是什么？如何使用的
props: 父组件传递给子组件的，子组件不能修改，
state: 状态是react的核心，是数据来源，和props对比，是可变的

### 状态提升
react中任何可变数据应当只有相对应的唯一数据源，通常state都是首先添加到需要渲染数据的组件中去，如果其他组件要公用这个state你可以将他提升到这些组件最近的共同父节点中，应当遵循自上而下的数据流而不是尝试在不同组件之间同步state

### 区分有状态组件和无状组件
有状态：我的理解是有state并且能够通过setState修改state，包含过去现在降了可能的状态变化情况，接受无状态组件状态变化要求的通知，然后将props发送给它们
无状态：和有状态相反

### 组合和继承
在react中，组件可以接受任意形式的props，比如数据类型，react元素及函数，如果你想在组件间复用非ui功能，你可以将他单独提取为js模块，通过import引入而不是extends继承

###  react中合成事件是什么
合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象，它们将不同浏览器行为合成一个api，确保事件在不同浏览器显示一致的属性

react里面的事件都是通过委托的方式来绑定（不能给字符串添加绑定事件）
if(/on[A-Z]/.test(propName)) {
  let eventType = propName.slice(2).toLowerCase();
  $(document).on(eventType, `[data-reactid="${rootId}"]`, props[propName])
}
###   如何模块化react中的代码
通过export和import来模块化代码

### React.lazy
React.lazy接受一个函数，这个函数动态调用import（），它必须返回一个promise，该promise需要resolve一个default export的react组件
const OtherComp = React.lazy(() => import('./OtherComp'))
如果模块加载失败它会触发一个错误，你可以同年哥哥异常捕获边界技术处理
异常捕获边界组件包裹你引入的组件
React.lazy只支持默认到处，如果你想被引入的模块使用命名导出，你要创建一个中间模块来重新导出为默认模块，来保障treeShaking不会出错

### context
Context提供无需为每层组件手动添加props就能在组件之间进行数据传递的方式，组件之间共享，使用contex可以避免通过中间元素传递props
react典型数据传递：自上而下通过props传递
- 何时用？ 对组件树来说是全局的数据，比如用户登录状态。当前认证的用户，主题
- 如果你只想避免层层传递数据，可以组件组合

api：
1）React.createContext(defaultValue)，创建一个context对象，只有匹配不到Provider，默认值生效
2）Context.Provider   <MyContext.value value={..} /> 
多个Provider嵌套使用，里层覆盖外层， 当Provider的value变化，内部所有消费者重新渲染，Provider以及内部consumer不受限shouldComponentUpdate，因此当consumer组件在其祖先组件退出更新情况下也能更新，通过新旧值检测使用<Object.js>相同算法
1 - class外面：MyConponent.contextType = MyContext 这样MyComponent组件内部通过this.context获取Provider传过来的值
2 - 也可以在MyContext内部 static ContextType = MyContext; 通过this.context访问 
3 - <MyContext.Consumer>{value => <div>ddd</div>}</MyContext.Consumer>


### 错误边界
如果类组件定义了static getDerivedStateFromError() 或者componentDidCatch()中任意，那它就变成一个错误边界
当抛出错误后，用static 个体Derive的StateFromError渲染备用ui使用componentDidCatch打印错误日志

错误边界工作方式类似catch，不同在于错误边界只针对react类组件

错误边界只能捕获其子组件错误不能捕获自身错误
从react16起，任何违背错误边界捕获的错误会导致整个react组件树被卸载

### refs转发
Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。
我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：

ref转发：将ref自动的通过组件传递到子组件的技巧

const FancyButtom = React.forwardFef((props, ref) => (
  <button ref={ref}>{props.children}</button>
))

<FanncyButtom ref={ref}>点我</FanncyButtom> 这样可以访问到button

React传递ref给forwardRef内函数作为第二个参数，我们想下转发ref到button当ref挂载完成，ref.current指向button的dom节点

第二个惨ref只在使用React.forwardRef定义组件时存在，常规函数和类组件不接收ref，且props中不存在ref
当你组件库用来forwardRef是一个破坏性改变，不推荐用

高级组件内用ref很有用
ref不是props属性，就像key一样，其被react进行了特殊处理，如果你对HOC添加ref，该ref将引用最外层的容器组件而不是被包裹的组件。意味着不能调用ref.current.focus()这样的方法
幸运的是我们可以通过React.forwardRef接受一个渲染函数，其接受props和ref参数并返回一个React节点

### Fragment
fragment将子列表分组，而无需向dom添加节点

###  如何在react中创建表单
react表单类似于html表单，丹尼斯在react中，状态包含在组件内的state中，只能通过setState更新，因此元素不能直接更新他们的状态，它们的提交是由Js函数处理的，此函数完全可以访问到用户输入


### 什么时候用redux？
可预测化的状态容器，为了解决状态混乱

只有遇到reacrt解决不了的问题才用redux
-  redux不需要
1）如果你的UI层很简单，
2）没有很多互动，
3）不需要和服务器大量交互，
4）view只从单一来源获取数据

- 需要redux
1）某个组件的状态需要共享
2）某个状态在任何地方都可以拿到
3）一个组件需要改变全局状态
4）一个组件要改变另一个组件的状态

### redux设计思想和工作流
web应用是一个状态机，视图和状态是一一对应的，所有状态保存在一个对象里

组件触发一个action，action通过createAction创建，dispatch派发这个action到reducer处理器，reducer处理器根据state和action的type，返回一个新的state，state变化，视图也发生相应的变化。
中间件就是用来增强dispatch的，可以触发异步，中间件触发side Effect副作用，（比如异步获取数据，获取数据后也可以diapatch一个action通过dispatch派发给reducer更改state。原始diaptch是同步的，不支持promise和异步
Store仓库就包括dispatch（派发）， reducer处理器，state状态

### redux三大核心：
1）单一数据源：整个应用的state被存在一棵object tree中，并且这个树只存在唯一stroe中
2）state是只读，唯一改变state方法是触发action，action是描述已发生事件的普通对象
确保视图和网络请求不直接修改state，只能表达修改意图
3）使用纯函数来修改，为了描述action如何修改state tree你要编写reducers

reducer就是纯函数，它先接受之前的state和action并返回新的state
纯函数的好处就是可以复用
纯函数是函数变成的概念，必须遵守：
1)不得改写参数，不能调用系统的I/O的api，不能调用Date.now()或Math.random等不纯方法返回不同结果

### 你对单一数据源有什么理解
所有状态存在store，并且他们从store本身接收更新，单一状态树可以容易的跟踪随时间的变化，并调试或检查程序

###  reducer函数为什么必须返回一个函数？
因为reducer是纯函数，能保证同样的state必定得到同样的view，正因如此，reducer函数
里面不能改变state，必须返回一个全新的对象，

state -》object tree <=> store
### redux组成（4个）
- state状态：
  1）DomainDate：服务端返回state
  2）UI state：当前组件state
  3）App state，全局state比如是否请求loaning

- action事件：把数据从应用传到store的载体，它是store数据的唯一来源。
  通过store.dispatch()将action传递给store
  1）action本质是js普通对象，
  2）内部要有一个type表要执行的动作，除了type外，action结构随意定义。
  3）只是描述了有事情要发生，并没有描述如何去更新state

- reducer：
1）本质是函数，需要return返回值，这样store才能接收值，
2）函数会接收2个参数，第一是初始化state，第二个是action


  -Store在redux中的意义是什么
- store 把action和reducer联系到一起的对象
主要职责：
1）维持应用的state
2）提供store.getState()方法获取state
3）提供store.dispatch()方法发送action
4）提供store.subscribe()方来注册监听，通过返回值来注销监听



store仓库包含dispatch（派发）middleware中间件， reducer处理器， state状态

redux提供了combineReducers方法，用于Reducer的拆分

同步操作只要发出action就可以，异步操作差别在于要发出三种action
  操作发起时的action
  操作成功的action
  操作失败的action
除了action种类不同，异步操作state也要变
state = { isFetching: boolean, didInvalidate: boolean, lastUpdated:string}
是否抓取数据，是否过时，上次更新时间


### react-redux
react-redux能让你的react组件从redux store中很方便的读取数据，并向store中分发action来更新数据

重要成员：react这个ui框架是以组件进行驱动的
1）Provider：能让整个app都能获取store中的数据（维护store）
2）connect：让组件和store关联

provider接受store作为props，通过context往下传递，这样react中任何组件都可以通过conntext获取store。容器组件可能要很深的层级，防止了一层层传递。
原理：react中的context

connect：provider内部组件要用state就要用connect封装（加强）
connect方便组件获取store中的state（内部实现：高阶组件）


中间件有层次要求

createStore(reducer, initState, applyMiddleware(logger))
createStore(reducer, applyMiddleware(thunk, promise, logger))
createStore可以接受第二个参数：state的初始状态，设了就不会取reducer里的默认参数
使用：
1）利用redux构建store
import {createStore} from 'redux';
export default createStore(reducer);
2)引入Provider从react-reducx
在App中Provier包裹并把store传进去

connect(mapStatetoProps, mapDispatchToProps)(Component)
mapStateTpProps(state, ownProps) 将store中的数据作为props绑定到组件上，  省略的话就不会订阅store
mapDispatchToProps(dispatch, ownProps) 将action作为props帮到自己函数中，可以是个函数也可以是个对象
哪个组件要接受状态就mapStateTpProps

react中数据传递：父传子，子传父，兄弟之间传递

3）要使用的组件导入connect
接收方实现第一个参数
发送方实现第二个
const mapDispatchToProps = (dispatch)=> {
  return {
    sendAction: () => {
      dispatch({
        type: 'add_action'
      })
    }
  }
}

只有return，在组件内部通过this.props.state可以访问到传进来的值
组件更新三种情况：1）props变化，2）组件自身state变化。3）forceUpdate


组件A---触发Action发送----reducer进行接收 ----》store全局状态管理容器 《=》Provider
                                                |
                                                mapStateToProps

### Generator
Generator是生成器，如果函数加了*，他就会变成一个生成器函数，
运行后会返回一个迭代器对象
es6规范中规定，迭代器必须有一个next方法，这个方法会返回一个对象，这个对象具有done和value两个属性
yeild会暂停执行，并会将yeild后面的表达式的值作为对象的value

item.next()向下，
item.return();直接后面不执行了
item.throw();


### redux中action发出后，reducer立即算出state叫同步，那过段时间再执行reducer叫异步，怎么在异步结束后自动执行？
中间件：在action和reducer中间的
reducer纯函数：只承担计算功能不适合其他
view：与state对应不适合承担其他
action：存数据，即消息载体，只能被别人操作自己不能有任何操作


### redux-saga
异步：中间件
redux-saga用了es6中generator
API：createSagaMiddleware(options)创建一个redux middle，并将Saga连接到Redux Store，
     middleware.run(saga, ...args) 动态运行saga，只能在applymidle之后运用


1）从redux-saga中引入createSagaMiddleware
2) const sagaMiddle = createSagaMiddleware();
3) let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);科里化
4) sagaMiddleware.run(rootSaga)//负责执行saga

saga辅助函数： 
  1）takeyEvery: 监听对应的action，每次diapatch都会触发。
  2）takeLatest：监听对应的action，只会触发最后一次dispatch(取消正在运行的)
  3）throttle(ms, pattern, saga,...args) 监听action，又叫节流阀（节流相同时间内只会触发一次）匹配到action后去执行，并且接收一个action（正在执行的后面的一个）放在buffer，n秒内就不执行异步任务了

Effect创建器：
  1）take(patern) 阻塞方法，匹配触发的action
  2）put：非阻塞，命令middleware向Store发送dispatch
  3）call(fn,...args) 命令middleware以参数args调用函数fn
  4）fork(fn, ...args)命令middleware以非阻塞调用形式执行fn
  5）jion(task)等待之前的分叉结果
  6）cancel(task)取消之前的一个分叉任务
  7）select(selector,...args)获取redux中state，如果select参数空的，那effect会获得完整的state

Effect组合器：
  1）race(effects): 用来命令middleware在多个effect间竞赛race，其中一个完成，另一个默认取消
  2）all([...effects])：用来命令middleware并行运行多个effect，并等待他们全部完成


### redux-thunk中间件
中间件：独立运行于各个框架之间的代码，本质是一个函数，可以访问请求对象和响应函数，可以对请求进行拦截，处理后再将控制权向下传递，也可以终止请求。


redux借鉴这种思想，中间件是运行在action发送出去后，达到reducer之间的一段代码
action-》middleware-》reducer，这种机制可以让我们改变数据流，实现异步action，action过滤，异常报告等

异步操作至少要发送2个action：用户触发第一个action，这个跟同步一样，如何在第一个action结束后才自动发送第二个action？
奥秒就在action creator中
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } =  this.props;
    dispatch(fetchPosts(selectedPost)) // 加载成功后像服务器请求数据fetchProps方法
  }
}
这里的fetchPosts就是action creator

function fetchPosts = (postTilte) => {
  return (dispatch, getState) => {
    dispatch(requestPosts(postTitle));
    return fetch(`/some/API/${postTitle}.join`)
    .then(response => resonso.join())
    .then(json => dispatch(ceceivePosts(postTitle, json)))
  }
}

fetchPosts生成器返回一个函数，函数执行，先发出一个action表示操作要开始，然后进行异步操作
拿到结果先转成json，异步结束后再发出一个action表示要结束

store.dispatch(fetchPosts('react js'));
store.dispatch(fetchPosts('reactjs')).then(() => ...)

这样，解决了第二个action的问题，但是，Action是由store.dispatch发送的
正常情况下，store.dispatch参数是对象，不能是函数，这样就要用中间件redux-thunk
createStore(reducer, applyMiddleware(thunk))
改造后，store的dispatch可以接受函数作为参数
因此异步操作的第一种解决反案就是写出一个返回函数的Action creator，然后用redux-thunk中间件改造store.dispatch

### redux-Prommise
既然Action creator可以返回函数，那也可以返回其他值，另一种异步解决的方案就是redux-promise让action creator返回一个promise对象
createStore(reducer, applyMiddle(promiseMiddleware))
这可以让store.dispatch方法可以接受promise对象作为参数
const petchPosts = (dispatch, postTitle) => {
  return new  Promise((resolve, reject) => {
    dispatch(requestPosts(postTitle));
    return fetch(`/some/api/${postTitle}`)
      .then(response => {
        type: 'FETCH_POSTS',
        payload: response.json()
      })
  })
}

- 写法二：
Action对象的payload属性是一个promise对象。需要从redux-actions模块引入createAction方法
class AsyncAPP extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    dispatch(requestPosts(selectedPost)); // 发出同步action
    diapatch(createAction( // 发出异步action
      'FETCH_POSTS',
      fetch(`/some/API/${postTitle}`) // createAction第二个参数必须是Promise对象
        .then(response => response.json())
    ))
  }
}

redux-promise源码
export default function promiseMiddleware({ dispatch }) => {
  return (next) => {
    return (action) => {
      if(!isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }
      return isPromise(action.payload) ? 
        action.payload.then(
          result => dispatch({...action, payload,: result}),
          error => { 
             dispatch({...action, payload: error, error: true }),
             return Promise.reject(error);
          }
        ): next(action);
    }
  }
}

从上面看，action本身是一个promise，它resolve之后的值应该是个action对象会被dispatch方法送出
action.then(dispatch)



### redux何flux有什么不同
redux：store和更改逻辑是分开的，只有一个store，没有调度器的概念，容器组件是要联系的，状态是不可改变的
flux：store包含逻辑和状态，有多个store，所有store互不影响且平级，有单一调度器，react子组件订阅store，状态可变

action -> dispatcher(调度器)->通知->store修改state--反映到view









### 什么是react路由
react+react-router可以创建单页应用，可以将组件映射到路由上，将对应的组件渲染到要渲染的地方

react路由2中方式： 
1）hashReouter，利用hash实现路由切换
2）BrowserRouter利用h5 APi实现路由切换

只要用了路由就会有一对对象
1）history: 
  - go
  - goBack
  - goForward
  - location: { pathname: '/home', search: '', hash:'', state: indefined }
  - push
  - replace
  - action: 'POP',
  - block
2）location
  - pathname: '/home',
  - hash: '',
  - search: '',
  - state: undefined
3）match
  - isExact: true,
  - params: {}
  - path: '/home',
  - url: '/home'


Router里面封装了很多方法，父组件里使用<Router>包装了<Route>，而子组件没有引入Router
怎么在子组件之间共享状态？跨组件传数据
context，将属性定义在Router，然后传到Route




### MVC
model-view-control
1）对dom操作代价很大
2）程序运行缓慢并且效率低
3）内存浪费严重
4）由于循环依赖性，组件模型需要围绕models和views进行创建

### flux
是一种强制单向数据流的架构模式，它控制派生数据，并使用具有所有数据权限的中心store实现组件间通信，整个应用的数据更新必须在此处进行，flux为应用提供稳定性并减少运行时错误
### React中key的作用
key用于识别唯一的虚拟dom元素以及其驱动UI的相应数据，他们通过回收dom中当前所有元素来帮助react优化渲染，这些可以必须是唯一的，react只是重排而不是重新渲染他们，这可以提高性能
### 调用setState之后发生什么

### react生命周期
预废弃：componentWillMount， componentWillReceiveProps， componentWillUpdate,使用UNSAVE_兼容
已新增：static getDerivedStateFrpmProps(nextProps, prevState), getSnapShotBeforeUpdate(prevProps, prevState)

React16.4，react渲染机制遵循同步渲染：
1）首次渲染：willMount > render >  didMount
2)props更新时：receiveProps > shouldUpdate > willUpdate > render  >  didUpdate
3）state更新时： shouldUpdate -> willUpdate ->  render -> didUpdate
4) 卸载时： willUnMount
期间每个函数各司其职，输入输出都是可测的，一路下来顺畅

但是，从React17开始，渲染机制发烧颠覆性改变，这个新方法就是 <Async Render>
Async render不是那种服务端渲染，比如发送异步请求到后台返回newState甚至新的html，这里的Async render还是限制在react作为一个View框架的view层本身

预废弃的函数都发生在虚拟DOM的构建期间，也就是render之前，在将来的React17中，在dom真正render之前，react中的调度机制可能会不定期的去查看有没有更高级的任务，如果有就打断当前的周期执行函数，哪怕已经执行了一半，等高优先级任务执行完，再回来重新执行前面被打断的周期函数，这种新机制对现存周期函数的影响就是他们调用时机变得复杂而不可预测，这也就是为什么UNSAFE_


getDerivedStateFromProps是componentWillReceiveProps的代替品

componentWillReceiveProps只会在updating阶段，并且是父组件触发的render才会被调用

什么叫DerivedState？，函数为什么是static？derived：获得，产生，得到

由于组件的props改变从而引发state改变，这个state就是derived state，
比如父组件引用子组件并传递了userId这props，子组件使用了

static是Es6的写法，当我们定义一个函数为static时就意味着无法通过this调用我们在类中定义的方法，原理和js中原型链继承有关

static getDerivedStateFromProps：请只根据nextProps来设定derived state，不要通过this这些东西来调用帮助方法，可能会越帮越乱
用专业术语说：getDerivedStateFromProps是个纯函数，没有副作用

mounting时：不管16.3还是16.4都会调用
updating时：16.3只有props改变，才会调用这个周期函数来更新state，  16.4在任何一次render前都会触发该函数，包括new Props， setState，forceUpdate

getDerivedStateFromProps在条件限制：ifelse下调用setState，如果不设条件setState，这个函数超高的调用频率，不停地setState，会导致频繁的重绘，即可能产生性能问题也容易产生bug

derived state滥用根源： 受控和非受控
受控组件：controlled： 子组件没有state（state意味着组件可以通过setState来控制自身的渲染它的一切行为完全由父组件觉得，因此是可控制的
像下面这样，连onChange事件都要父亲代劳的
- function  EmailInput(props)  {
-   return  <input onChange={props.onChange} value={props.email} />
- }

非受控组件：unControlled：子组件有内部的state，不受父组件控制，

有个奇特存在derivedState，它和父组件传入的props联动，从性质上来说又是子组件的state，可以通过setState来设置，在这种情况下，controlled还是uncontrolled就很难

函数组件和类组件
1）加载props方式不同，函数式定义组件从组件函数的参数加载，class形式的组件通过this.props获取传入的参数
2）函数组件比较简单，内部无法维护状态，class形式内部可以通过this.state和this.setState方法更新内部state
3）class组件内部可以定义更多的方法在实例上，但函数式组件无法定义
4）函数组件比类组件性能要高，因为类组件使用的时候要实例化，函数组件直接执行获取返回结果就可以。
5）函数组件没有this，生命周期，状态


derived State滥用：本不需要

getSnapshotBeforeUpdate是在render之后触发的，它的要点在于触发时，DOM还没有更新，开发者可以做一些事，返回值将会作为第三个参数传递给接下来要触发的componentDidUpdate
componentWillUpdate触发时，DOM同样没有更新，
它们之间最大的不同还是触发时机，componentWillUpdate在updating阶段的render之前触发
两者使用场景是一样的，在beforeUpdate中记录旧的dom信息作为snapshot

componentWillUpdate所谓的不安全，是指在react17版的async render机制下，由于优先级权限，render之前触发的componentWillUpdate可能会反复调用，获取到的一些旧的dom不一定准确


componentDidMount在render阶段触发一次，ajax调用可以放到这也可以setState，但是会额外触发一次render，但是两次
render都发生在浏览器更新screen之前，所以用户不会感受到state连续改变引发的跳屏，但可能影响性能

componentDidUpdate(prevProps, prevState, snapshot)如果在这里setState应该设置前置条件否则陷入无限循环
setState同样会触发额外渲染，预componentDidMount类似

shouldComonentUpdate是进一步改善性能，慎用，用PureComponent替换，返回false不会触发

### 为何stack不能中断，fiber可以
stack是深度优先遍历通过递归实现，嵌套的层级太深，一层层入栈，当某一层完成后出栈回到上一级，假设某个子节点还在运行，由于出现了更高优先级的任务，导致整个walk被打断（之前的多层入栈都被清除），当高优先级任务完成，我们无法仅通过被中断节点的引用恢复递归现场，我们既找不到它的兄弟节点也无法找到它的父亲节点


### Fiber
React Fiber是在render/reconcilication协调阶段的核心调度算法进行了重构，commit还是同步的，不允许被打断，为了配合这次重构，React15到16，协调阶段的生命周期也发生了变化。

Fiber是React的新的Reconciler， Reconciler是React的核心代码，是各个平台公用的。

Reconciler即协调算法，用于计算新老差异，React16之前的Reconciler调度算法叫Stack reconciler。

Stack Reconciler：递归遍历所有虚拟DOM阶段，进行diff，一旦开始，无法中断，要等整颗VDOM计算完才会释放主线程，而浏览器中渲染引擎和js引擎是互斥的，diff的过程中动画等周期性任务无法得到处理，就会出现卡顿即掉帧，影响用户体验

React16采用增量渲染（incremental rendering）即异步渲染（async rendering）来解决掉帧，将渲染任务拆分为更小的任务，每次只做一个小任务，
做完后就将时间控制权交给主线程去执行优先级更高的任务（动画，交互等），而不像之前那样长时间占用。

尽管React16已使用了fiber架构，但是为了从16到17的平滑过渡以及新架构还在严重测试阶段，异步渲染并没有开启，还是采用同步渲染

那如何开启Async render？
在react16的早期版本中，开启异步渲染的方式是ReactDOM.unstable_defferedUpdates方法，包括官方提供的fiber demo都用的这个方法

componentDidMount() {
  this.interalId = setInterval(this.tick, 1000);
}

tick = () => {
  ReactDOMFiber.unstable_deferredUpdates(()  => this.setState(state => ({ seconds: (state.seconds % 10) + 1})))
}

但是从某个版本开始，这个方法由于一些潜在问题被移除了，目前官方建议直接采用requestIdleCallback来降低某个可能耗时操作的优先级

React15掉帧严重，React16采用unstable_deferredUpdates就很流畅了 deferred延期，延迟 unstable不稳定的

requestIdleCallback: 在线程空闲时间调度执行低优先级函数（可能会隔几帧）
requestAnimationFrame：在下一个动画帧调度前执行高优先级函数

requestIdleCallback方法提高deadline，即限制任务执行时间，以切分任务，避免任务长时间执行，阻塞UI渲染而导致掉帧
并不是所有浏览器都支持requestIdleCallback，但是react内部实现了自己的polyfill，不必担心兼容

Fiber数据结构：
    stateNode：保存与fiber关联的localState
    type： 类组件：构造函数， dom元素： html标识
    tag：定义fiber类型。Reconciler通过它来确定需要完成哪些工作，类：1， 函数：0， host：5
    updateQueue： state更新，回调以及DOM更新的队列
    memolizedState: 缓存的之前组件state对象，便于恢复
    memolizedProps： 缓存的之前组件props对象，便于恢复
    penddingProps：子组件或者dom中要改变的props（当前处理过程中的组件props对象）
    key： 唯一标识，用于更快的找出哪些节点增删改
    return： 当前fiber的父级fiber
    sibling：大弟弟
    child：大儿子
    index
    effectTag：React中Dom节点state和props的改变导致视图改变的操作称为side effect，effectTag就是记录这种操作，二进制形式，因此可以累加
            export type  SideEffectTag: number;
            export const NoEffect = 0;
            export const PerformedWork = 1;
            export const Placement = 2;
            export const Update = 4;
            export const PlaceAndUpdate = 6;
            ...
  fiber提供了一个叫effect list的数组，包含了需要改变的react element对应的fiber对象（firstEffect， lastEffect）
  effect list好处是可以快速拿到状态改变的DOM而不必遍历整颗React Root

  nextEffect
  firstEffect:
  lastEffect:
  expriationTime:本质上是优先级

最早将Priority分为5级：
{
  NoWork: 0,
  SynchronousPriority: 1,
  TaskPriority: 2,
  HighPriority: 3,
  LowPriority: 4,
  OffscreenPriority: 5,
}
划分时粒度不够细，后来又换成了基于时间的分级机制
Sync代表同步模式，立即处理，优先级最高，为1
Never代表不用执行，优先级最低




设置初始值NoWork = 1
fiber任务是否到期(isWorking?) -----是------》parse1：render（nextRenderExpirationTime), parse2:commit(Sync)
      |
      否
      |
    是否异步？-----是-----》是否为interactive update  -----是-----computeInteractiveExpiration(currentTime)
      |                          |
      否                         否
      |                          |
      Sync                  computeAsyncExpiration(currentTime)


一个React组件有current fiber和alternate fiber又叫workInProgress fiber
当组件第一次render时构建的fiber树为current，接下来当组件状态改变时新构建的fiber树叫workInProgress，代表将来的新状态
这两个fiber都有一个更新队列：updateQueue，队列中的item的引用是相同的，区别在于workInProgress会从队列中移除更新好的item，因此，workInProgress的updateQueue是currennt fiber UpdateQueue的一个子集
所有更新完成后，workInProgress fiber成为新的current fiber， 如果更新中断或者失败，current fiber可以用来恢复

updateQueue是一个单向链表，firstUpdate和lastUpdate分别指向链表的对头和队尾。

enqueueSetState做以下任务： 
1）建立组件对应的fiber
2）将组件的update放入fiber的updateQueue中
3）通过scheduleWork正式开始任务调度

work的调度工作主要在ReactFiberSchedule.js中
scheduleWork -> requestWork -> performSyncWork/performAsyncWork -> workloop -> performUnitOfWork -> render

performUnitOfWork调用的核心函数是beginWork，beginWork会遍历当前workInProgress的所有子集fiber完成单元任务的处理


### 同步和异步
同步：前一个任务没有完成，后面任务就等着
异步：并发，性能高，体验好
浏览器执行机制：同步代码同步执行，异步代码放在一部队列中，等同步代码执行完，去一部队列执行异步代码，异步队列又分宏队列（定时器任务）和微队列（promise），先执行微队列，再执行宏队列。
轮询：固定时间问一次
回调：放在那，等结果来了再执行

### 前端路由核心
改变url，但是页面不进行整体刷新如何实现？
url的hash，改变url的hash，页面不整体刷新，h5的history.pushState,类似栈结构，histore.back将栈顶路由溢出，history.replace彻底替换，不能再前进后退，history.go, history.back,history.forward



### 为什么react路由v4中使用switch关键字

### 为什么需要react中的路由
###   列出React Router的优点
###  react路由和常规路由有何不同
常规路由： 每个视图对应一个新文件，url更改： http请求被发送到服务器并且接收相应的html页面，用户体验：用户实际在每个视图的不同页面切换
react路由：只涉及单个HTML页面，url更改：仅更改历史记录属性，用户体验： 用户以为在不同页面间切换


### 高阶函数和高阶函数意义
js中比较常见的filter，map，reduce都是高阶函数

更优雅，
高阶组件属于函数式编程思想，对于被包裹的组件时不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果。是一种设计模式：装饰器模式
而Mixin这种混入的模式，会给组件不断增加新的方法和属性，组件本身不仅可以感知，甚至需要做相关的处理(例如命名冲突、状态维护)，一旦混入的模块变多时，整个组件就变的难以维护，也就是为什么如此多的React库都采用高阶组件的方式进行开发。


### 高阶组件作用
高阶组件实现方式：属性代理，反向继承
属性代理能够：
1）更改 props
2）通过 refs 获取组件实例
3）抽象 state
4）把 WrappedComponent 与其它 elements 包装在一起


1：增强props，通过Context进行增强
2：渲染判断鉴权：
  开发中可能遇到:某些页面必须用户登录成功才能进入，没有登录直接跳到登录页面
  高阶组件可以做抽取公共部分逻辑
3： 生命周期函数劫持

时机
不要在组件的 render 方法中使用HOC，尽量也不要在组件的其他生命周期中使用HOC。因为调用HOC的时候每次都会返回一个新的组件，于是每次render，前一次高阶组件创建的组件都会被卸载(unmount)，然后重新挂载(mount)本次创建的新组件，既影响效率又丢失了组件及其子组件的状态。
3，静态方法
如果需要使用被包装组件的静态方法，那么就需要手动复制这些静态方法，因为HOC返回的新组建不包含被包装组件的静态方法。

缺陷：
HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生很多嵌套，调试困难
HOC可以劫持props，在不遵守约定情况下也可能造成冲突(原来传过来name为a，hoc中又传了个name覆盖)


### connect
connect：第一个参数是mapStateToProps（state或者props变都会被调用，在和props合并后计算出新值），第二个：mapDispatchToProps
  connect：Provider组件：在原生应用组件上包裹一层，让原来的应用成为Provider的子组件，Provider接收redux的store作为props，通过context对象传递给子孙组件上的connect

  接收mapstateprops和mapdispatch，返回一个新的高阶组价，高阶组件返回一个Connect类，
  特点 ：1）通过props.store获取祖先组件的store
        2）props包括stateProps，dispatchProps，parentProps，合并一起得到nextState作为props传给真正的Component
        3）ComponentDidMount时，添加事件this.stroe.subscribe(this.handleChange)实现页面交互
        4）shouldComponentUpdate时判断是否可以避免进行渲染，提升性能，并得到nextState
        5）compnentWillUnMount时移除监听的事件this.handleChange


### Mixin
react早期用mixin，后来用高阶组件，现在hooks
mixin可能会相互依赖，相互耦合，不利于代码维护
不同mixin中方法可能会冲突
mixin很多时，组件是可以感知到的，甚至还要为期做相关处理，这样会给代码造成滚雪球式的复杂性


### ref转发
ref不能用于函数组件，函数组件没有实例，不能获取到对应的组件对象
function Profile(props) {
  return <div id="A"></div>
}
类组件中：createRef， this.refText = createRef(); 使用：ref={this.resText}  打印this.refText.current
函数组件：使用creatRef会报错。指向函数,你拿不到函数，没有实例
如果你想拿到A盒子，你可以用高阶组件：forwardRef函数，
将原来的函数作为参数传给forwardRef
const Profile = forwardRef(function Profile(props，ref) {
  return <div id="A" ref={ref}></div>
})
Profile接收的就是一个组件

使用forwardRef增强的函数会多出来一个参数ref，来自父组件ref={this.refText}传过来的.
在hooks使用useRef就可以了

ref不是一个props，是react内部管理的
### 受控和非受控中refs使用
管理焦点：文本选择或者媒体播放
触发强制动画
继承第三方DOM库

<h1 ref="字符串：不推荐后期删除"></h1>
<h1 ref={createRef创建的对象，目前推荐的方式}></h1>
<h1 ref="传入回调函数"></h1>

获取：this.refs.字符串拿到dom元素

### ref的类型
用在html元素里：<div ref={this.reftest}> 构造函数用React.createRef创建的ref接收底层dom元素作为其current属性
放到一个类组件上面： <Counter ref={this.counterRef}> this.counterRef.current.increament()父组件调用子组件的函数
ref用在组件上获取到的是组件对象
组件是函数组件获取不到（函数组件没有实例对象）。但是有时候我们需要获取到，可以通过React.forwardRef高阶组件来获取，

### 受控组件非受控组件
react中html表单处理方式和普通dom不太一样，表单元素通常会保存在一些内部的state
受控(推荐）：
<form>
  <input type="text" onChange={e => {this.setState({value: e.target.value })}} value={this.state.value } /> 单向数流
</form>
非受控：
<form onSubmit={e => {this.handleSubmit(e)}>
  <input type="text" id="username" ref={this.usernameRef}/> 单向数流
  <input type="submit" id="提交"/> 单向数流
</form>

handleSubmit = (e) => {

}


### render函数的返回值
1）react元素，
2）数组或者fragment
3）portals
4）布尔或者null，什么都不渲染，字符串或者数值会被渲染为文本节点

### portals入口，端口
若你想渲染的内容独立于父组件，甚至是独立于当前挂载到的dom元素中，（默认都是挂到id为root的dom元素上）
比如弹出独立于根元素的。
portal提供了一种将子节点渲染到存在于父组件以外的dom节点的优秀方案
第一个参数：child是任何可渲染的react子元素，例如字符串或者fragment
第二个参数container的一个dom元素
React.createPortal(child,container)
通常你从组件的render方法返回一个元素时，该元素将被挂载到dom节点中距离其最近的父节点

Modal案例：

antd中modal中是创建一个div然后添加到document，作为第三方库，就动态创建加到body里面

### react hooks
hook让你在无需修改结构情况下复用状态逻辑
usetState可以使用state
useEffect：增加操作副作用的能力，componentDidMount，componentDidUpdate，componentWillUnMount的合并
useEffect告诉react在完成dom的更改后运行你的副作用函数，react会在每次渲染后调用副作用函数，
useEffect可以返回一个函数清除副作用，取消订阅
hook是js函数，不能破坏两个规则：只能在函数外层调用hook，不要在循环，条件判断或者子函数中调用，保证顺序和第一次执行时一致
只能在函数组件中调用hook。
自定义hook使用use开头，hook复用逻辑状态，但是不复用state
const [fruit, setFruit] = useState('banana')
useState中方括号：数组解构，fruit的值为useState返回的第一个值，setFruit是返回的第二个值，

与类组件的setState不同，useState不会自动合并更新对象，你可以用函数式的setState结合展开运算符来合并更新对象的结果
setState(prevState => { 
  return {...prevSatte, ...updatedValues}
})
useReducer是另一种可选方案，它更适用于管理包含多个子值的state对象

调用statehook的更新函数并传入当前的state时，react将跳过子组件的渲染以及effect的执行，React使用Object.is来比较state

如果你在渲染期间执行了高开销的计算，使用useMemo来优化

组件卸载时要清除effect，为了防止内存泄漏，清除函数会在组件卸载前执行，组件多次渲染，在执行下一个effect之前，上一个effect就被清除。

和componentDidMount和componentDidUpodate不同：浏览器在完成布局和绘制之后，传给effect的函数会延迟调用，这使得它适用于常见副作用场景，比如设置订阅，因此不要在该函数中执行阻塞浏览器更新屏幕的操作

并不是所有effect都会被延迟执行。例如在浏览器执行下一次绘制之前，用户可见的dom变更就必须同步执行，避免用户感觉不一致。react为此提供了useLayoutEffect来处理这类effect，和useEffect结构相同，调用时机不同

虽然useeffect会在浏览器绘制后延后执行，但是会保证任何新的渲染前执行，react将在更新前刷新上一论渲染的effect
执行装置运行一次effect，可以传递一个空数组。react会完成画面渲染后才延迟调用useEffect，因此会使得处理额外操作很方便

useContext
const value = useContext(MyContext);
接收一个context对象，并返回context的当前值，当前的context值由上层组件中距离当前组件最近的MyContext.Provider的valueprop决定。
上层Provider更新，该hook会被触发，并使用最新传给Provider的context value值。即使祖先使用react.memo或者shouldcomponentUpdate，也会在组件本身使用useContext时重新渲染
useContext相当于类组件的static contextType = MyContext或者<MyContext.Consumer>
useContext只是让你能够读取context的值以及订阅context的变化，你依然要在上层组件树中使用<MyContext.Provider>来为下层组件提供context

useReducer是useState的替代方案，
const [state, dispatch] = useReducer(recuder, initialArg, init)
它接收形如（state，action) => newState的reducer，
state复杂或者下一个state依赖于之前的state，使用useReducer
useReducer还可以给哪些会触发深更新的组件做性能优化，因为你可以给儿子传dispatch，而不是回调函数
const initState  = { count: 0 }
function reducer(state, action) {
  switch(action.type) {
    case 'increment: return {count: state.count+1 };
  }
}
function Counter {
  const [state, dispatch] = useReducer(reducer,initSate);
  return(<><button onClick={() => dispatch({type:'increment' })}>+</button><>)
}
react会确保dispatch函数的标识是稳定的，并且不会在组件重新渲染时改变，这就是为什么可以安全的从useEffect或useCallback的依赖列表中省略dispatch

useCallback返回一个memolized回调函数
改回调函数只在依赖性改变时候更新， useCallback相当于useMemo(() => fn, deps)
useMemo返回一个memolize值，useMemo的函数会在渲染期间执行，不要在这个函数内部执行与渲染无关的操作，诸如副作用操作属于useEffect的使用范畴而不是useMemo
useMemo不传依赖项，会在每次渲染时重新计算新的值

useRef返回一个可变的ref对象，其current被初始化为传入的参数，返回ref对象在组件整个生命周期内保持不变
useRef会在每次渲染时返回同一个ref对象

useImperativeHandle(ref, createHandle, [deps])可以让你在使用ref时自定义暴露给父组件的实例值，它要和forwardRef一起用

conte fancyInput = forwardRef(funcgtion(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus:() => { inputRef.current.focus(); }
  }))
  return <input ref={inputRef} ... />
})

useLayoutEffect:和useEffect相同，会在所有DOM变更后同步调用effect，可以用它来读取dom布局并同步触发重新渲染，浏览器执行绘制之前，useLayoutEffect内部的更新计划将被同步刷新


优势：
劣势:

### 类组件不足
1：组件间状态逻辑很难复用
2：复杂业务的有状态组件会越来越复杂
3：this指向问题


### setState传递的数据是不可变的数据
不要这样修改state：this.state.arr.push({name: 'a'})
          this.setState({ arr: this.state.arr  }) // 这样改变的话，引用地址不变，只是改变了引用地址内部东西，数据改变了，但是界面没有改变
为何使用setState改？保存界面与数据的同步，这种修改方式react并不知道数据发生变化

shouluComponentUpdate接收newProps, newState，与原来的对比来判断要不要重新渲染
shouldComponentUpdate(newProps, newState) {
  if(newState.arr !== this.state.arr) {
    return true; // 引用地址一样，这样不会刷新
  }
}

推荐做法：
const newArr = [...this.state.arr] // 相当于复制了一个内存空间
newArr.push({name:'A'})
this.setState({arr: newArr}) // 这样改变，相当于改了地址，shouldComponentUpdate能够检测到

开发时继承PureComponent会自动进行浅层比较，我们在开发过程中要保证this.state是不可变的

pureComponent：实际是对props/state进行了一个浅对比，所以对于嵌套的对象不适用，没办法比较出来
和shouldComponentUpdate做了优化
Component没有做优化，要通过shouldComponentUpdayte

### 全局事件传递
跨组件通信，多层组件通信
事件总线：event bus 
react有事件总线的库，通过yarn管理的： events 要安装：yarn add events
import { EventsEmiter } from 'events;
const eventBus = new EventEmiter();

在某个地方发射事件：eventBus.emit('sayHello','我是发射内容', 123)
监听：componentDidMount监听，卸载的时候注销，
componentDidMount() {
  eventBus.addEventListener('sayHello', (...args) => {

  })
}

### setState同步还是异步
异步更新：
组件的生命周期，react的合成事件里面是异步的
this.state = {name: 'a' }
this.setState({name:'A'})
console.log(this.state.name) // 'a' 看出来是异步的，不能在setState之后直接拿到改变的值

为什么要设计成异步？
1）可以提升性能，如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染
这样效率是很低的，最好办法是获取到多个更新，之后批量更新
如果同步更新了state，但是还没执行render函数，那么state和props不能保持同步，state和props不能保持一致性在开发过程会遇到很多问题

如何获取异步的结果？
1）setState的第二个参数
2）生命周期componentDidUpdate（源码中调调用componentDidUpdate在执行setSatte第二个参数

同步更新：
定时器里面，定时器是异步的，将setSatte放在定时器执行是同步的
原生的事件监听：在componentDidMount里面，通过document获取dom，监听按钮点击，将setSatte放在里面是同步的
react源码里面做了一个判断 

### setSatte数据的合并
this.setSate({
  name:'A',
  age: 12
})
之后：
this.setState({
  name: 'B'
})
为什么不会把age覆盖？
源码里面通过object.assign来处理Object.assign({}, this.state, {name: 'B' });
Object.assignn({}, prevSatte,partialState)
### setState本身的合并
increment(){
  this.setSate({count: this.state.count+1})
  this.setSate({count: this.state.count+1})
  this.setSate({count: this.state.count+1})
}
结果不管你调用几次setState拿到的结果都是1
源码中会用do。while来遍历队列，链表中多个setSate，只有最后一次生效。

setSatte合并时候进行累加
this.setSate((prevState, props) => {
  return {
    count: prevSatte.count+1
  }
})

this.setSate((prevState, props) => {
  return {
    count: prevSatte.count+1
  }
})this.setSate((prevState, props) => {
  return {
    count: prevSatte.count+1
  }
})
setSatte接收一个函数，依赖于上一次的值或者props，你调用几次就会就该几次，合并一次更新，
是对象就合并

### react的更新机制
渲染：jsx-虚拟dom-真实dom
更新：props/state改变 -》 render函数执行 -》 产生新的dom树 -》新旧树比较 -》 计算差异进行更新 -》 更新到真实dom树
第一次渲染会产生一个真实dom树，之后发生改变，进行rende产生虚拟dom树之后，更新变化的部分，不会把虚拟dom直接更新到真实dom
diff发生在render之后，要render生成一个虚拟dom

如果一棵树参照另一个数进行完全比较更新，即使是最新最先进的算法，改算法的复杂度为O(n3),n为树中元素的数量。开销太昂贵了
react对这个算法进行优化O(n)
1）同层节点相互比较，不跨级比较
2）不同类型的节点，产生不同的树结构
3）通过key来指定哪些节点在不同的渲染下保持稳定


对比不同类型的元素
1）当节点为不同元素，react会卸载原有树，建立新树
2）当卸载一棵树，对应dom节点会被销毁，组件执行componentWillUnMount方法
3）建立新树，执行componentWillMount，componentDidMount

对比同一类型的元素
1）react保留节点，仅对比更新有改变的属性。如果是同类型的组件元素，组件会保持不变，react会更新该组件的props，调用componnentWillReceiveProps和componentWillUpdate，下一步调用render方法，diff算法将在之前的结果以及新的结果中进行递归（逐层比较）


对子节点进行递归
在默认条件下，当递归dom节点的子元素时，react会产生同时遍历2个子元素的列表，当产生差异，生成一个mutation
在最后插入一条数据的情况：前面两个比较是完全相同的就不会产生mutation（改变），最后一个比较，产生一个mutation，将其插入新的dom树即可
在中间插入一条数据的情况：会对每个元素产生一个mutation，这种低效率比较性能不好

为了解决上面的情况，要使用key。react用key来匹配原有树的子元素以及最新树上的子元素。进行位移操作
key：插入的时候优化，是位移的，不要用随机数，下次render时候会生成一个新的数字，匹配不到，index做key对性能优化作用不大。

### render函数被调用
案例：组件App嵌套A， B，C。初始化的时候会被调用，
当组件App自己发生改变，全部组件被调用render。父组件变，不管子组件变不变都重新渲染
优化：shouldComponentUpdate(nextProps, nextSatte) { // SCU，决定要不要调用render。 源码默认返回true
    if(this.state.count !== nextState.count) {
      return true
    }
}

SCU源码中会判断constructor原型上的isPureComponent有没有，如果有就不走默认true，去调shallowEqual(pldProps,newProps)
shallow浅层

PureComponent能解决类组件，解决不了函数组件

函数组件使用React.Memo()
memo其实是一个高阶组件
memo(function ComA() {})

### 为什么react要合成事件
react不确定要跑在pc端还是原生事件端
pc端要给一个事件event，原生端也要给原生控件对象，
到底给哪个，react不确定，就把事件变成合成事件，合成事件会根据不同的平台产生不同的对象

touch，非阻塞click，keypress，定时器，开始帧


### react在history模式下刷新404了
就要服务器配置路由重写指向index.html就可以
apache中.htaccess文件


### 实现render
### 实现Copmonent
### createElement，cloneElement
### 实现虚拟DOM
### 实现类组件，函数组件，原生组件和Fragment的渲染
### 实现diff算法
### 实现fiber架构
### hooks核心实现
### context原理
### setState，forceUpdate，
### react渲染和更新过程
### 自定义hooks，useState，useEffects，useCallback，useMemo
### react路由实现，手写完整的路由

###  安装不同划分方式划分组件
按照定义方式：函数组件，类组件
按照内部是否有状态维护：有、无状态组件
按照职责：展示组件和容器组件（数据逻辑）



