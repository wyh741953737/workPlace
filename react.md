### 如何理解react生态
react可以说是目前为止最热门，生态最完善，应用范围最广的前端框架。
一、web端:react本身是面向web端的，轻便灵活，由于只是MVC架构中视图层。所以要配合生态体系中的其他框架或模块来使用。
1，路由主要react-router。现已v4.1。可保持路由器与应用程序状态同步。
2，状态管理器: react只是UI层，需要借助redux、react-redux状态管理。
  dva是对redux方案的集成与拓展，处理了包括项目构建，异步处理、统一请求、统一错误处理等一系列诸多问题。
3，UI库：material-ui、react-toolbox。antD
4, 一些工具：immutable-js是facebook推出的完全独立的一个js库，侧重函数式编程中不可变数据结构，
5：css-modules ——css模块化解决方案 不是为react而生的，它是css模块化的一种解决方案，但它和react配合使用很好
6: React Devtools是fb推出调试工具。提高开发效率。
7：TypeScript
8，react项目构建：比如最为流行的webpack gulp。而开发react应用，推荐使用强大的webpack做项目构建
二、react生态之——移动端
react-native是目前最优秀的非原生开发移动框架，一处开发，多端使用,使用Fiber对react核心算法进行重写，届时RN的性能将会上升，向原生紧逼。
三，react生态之——服务器端
react服务器端渲染最出色的：next.js。这是一个基于react可实现服务器和浏览器都能渲染的框架。

### 如何根据不同应用场景，选择技术栈方案。
1，开发后台应用
react+react-router+redux+webpack+ant design （四星）
react+dva+ant design （五星）
2，开发前台web应用
react+dva+bfd-ui/ant design （四星）
react+dva+material-ui/react-toolbox （四星半）

### 实现一个简单的createStore
const createStore = (reducer) => {
    let state;
    let listeners = [];
    const dispatch = (action) => {
      // dispatch里面要调用reducer得到state，遍历监听者告诉他们更新了
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
### SPA
单页应用，一个页面，仅初始化时候加载所有文件，加载完不因用户操作重载和跳转，利用js变化html内容。通过react-router实现不同组件在同一页面切换
优点：
1）解决了多页面访问速度慢
2）不刷新页面，通过ajax异步获取
3）良好的前后端分离，减轻服务器压力，服务器只要出数据，不管展示逻辑和页面合成
4）共用一套代码，可以同时应用于电脑，手机，平板
缺点：
1）初次加载从服务器一次性请求页面，会出现首屏加载慢的问题，
2）不利于SEO，SPA就一个html页面
3）前进后退：SPA内容都在一个页面，不能使用浏览器前进后退，所有页面要简历自己的堆栈管理
SPA在前后端分离基础上加了前端路由。
### shouldComponentUpdate是干嘛的？性能优化哪个生命周期
性能优化，对比props和state，没有发生改变返回false，不重写渲染组件
### jsx
是js+xml是一个语法糖，javascript  XML，此文件使应用非常可靠并能提高性能
### 虚拟DOM和真实dom,为什么虚拟DOm提高性能
虚拟DOM: 更新快，无法直接操作dom，元素更新则更新jsx，dom操作简单，很少消耗内存
真实DOM：更新慢，可直接操作DOM，元素更新直接创建新的DOM，DOM操作代价大，消耗内存多

虚拟DOM是一个轻量级js对象，最初只是真实dom的副本，更多的是一种模式
虚拟dom工作步骤：
1）底层数据变，整个ui将在虚拟dom中重新渲染
2）计算之前dom和新dom直接差异
3）只用实际更改内容更新真实dom
###  render的目的
###  React diff
### 高阶函数和高阶函数意义
js中比较常见的filter，map，reduce都是高阶函数, 更优雅，
高阶组件属于函数式编程思想，对于被包裹的组件时不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果。是一种设计模式：装饰器模式
而Mixin这种混入的模式，会给组件不断增加新的方法和属性，组件本身不仅可以感知，甚至需要做相关的处理(例如命名冲突、状态维护)，一旦混入的模块变多时，整个组件就变的难以维护，也就是为什么如此多的React库都采用高阶组件的方式进行开发。

### 高阶组件作用
实现方式：属性代理，反向继承
> 属性代理能够：
1）操作 props，给被包装组件传props <WrappedComponent {...newPRops}></WrappedComponent>
2）通过 refs 获取组件实例
3）抽离 state  
  高阶组件内state={age:1} setAge(e)=>{this.setState({age: e.target.value})} <WrappedComponent value={this.state.value} handleChange={this.setAge}>
  将state抽离出来。将被包装组件变成受控组件，受控组件通过prop接受数据和方法。
4）把 WrappedComponent 与其它 elements 包装在一起
高阶组件可以看做是装饰器模式在react的实现。ES7中添加了一个decorator的属性，使用@符表示，可以更精简的书写
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
2）如果需要使用被包装组件的静态方法，那么就需要手动复制这些静态方法，因为HOC返回的新组件不包含被包装组件的静态方法。
3)refs不会传递。 意思就是HOC里指定的ref，并不会传递到子组件，如果你要使用最好写回调函数通过props传下去
4)不要在render方法内部使用高阶组件。react会去比较 NowElement === OldElement, 来决定要不要替换这个elementTree。
调用HOC的时候每次都会返回一个新的组件不是一个引用，react以为发生了变化，去更替这个组件会导致之前组件的状态丢失。

缺陷：
HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生很多嵌套，调试困难
HOC可以劫持props，在不遵守约定情况下也可能造成冲突(原来传过来name为a，hoc中又传了个name覆盖)

高阶组件应用场景：
1：增强props，通过Context进行增强
2：渲染判断鉴权： 开发中可能遇到:某些页面必须用户登录成功才能进入，没有登录直接跳到登录页面
3： 生命周期函数劫持
1）尽量不破坏原有函数，给某个对象添加方法在他执行前调用，把这个方法扩展到原型上（AOP面向切片编程）扩展原有方法，重写原有方法但是不破坏原有方法
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

### 多个异步请求，如何同步获取最终结果？异步并发问题
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
### React中constructor作用
constructor是类中必须有的，如果没有显示声明会自动添加，通过new生成实例时自动调用该方法
在class中继承是使用extends来实现的，子类必须在constructor中调用super，否则创建实例会报错：因为
子类没有自己的this，它只能继承父类的然后加工，super就是将this继承给子类。
原因：es5和es5继承机制不一样
ES5： 先创建子类的实例对象this，再将父构造函数的方法加到this
ES6：先创建父类的实例this，再用子类的构造函数修改this

super写与不写：如果你用到了constructor就要写super，constructor初始化state和事件绑定，
如果你在constructor中要用this.props就必须给super加参数
无论有无constructor在render中this.props都是可以使用的，这是react自动附带的，如果没用到可以不写，react会自动添加一个空的
### 应该在react何处发起ajax请求
componentDidMount：已经挂载后。
componentWillMount：是一个会在服务端渲染执行的方法，如果在这请求，不符合服务端渲染这种获取的方式，请求里引用一些window上获或者其他对象会造成组件在服务端渲染挂掉。
### 异步过程使用单例的event对象
React将使用单个事件侦听器在顶层侦听所有事件。对性能好，意味着React在更新DOM时无需担心跟踪事件监听器。

全局单例的event对象，所以在异步对象中使用react事件时需要额外注意，异步操作最好将对象内部需要的值先进行拷贝赋值。
react里面事件的处理：react会代理到事件，实际最终执行事件不是绑定的那个事件，react又代理了一层
e已经不是原生的e了，而是react代理后的，所有事件共用event。
clickHandle(e) {
  setTimeout(function() { // 异步使用
    console.log(e.currentTarget.innerText) // undefined,在定时器之前把e.currentTarget.innerText保存起来
  })
}
clickHandle2(e) {
  console.log(e.currentTarget.innerText) // btn2
}
### 尽量不要在render里面写bind。将绑定挪到constructor
在render里使用箭头函数，每次将方法传给子组件都会重新渲染
深拷贝方法：拷贝之后会返回一个新的对象，和之前的引用关系断开了
react采用这种的话，子组件无法判断有没变化，导致一个性能问题，和bind一样
immutable：判断组件是否要更新
### react限制
只是个库不是框架，库很大，要花时间理解
###  虚拟DOM工作原理
### 为什么浏览器无法读取jsx
浏览器只能识别html，
为什么能识别？
通过babel编译后就能识别，babel通过调用Rect.createElement这个api，
React.createElement('div', {}, createElement('span', {}, {}))
调用ReactDOM.render后实际上穿进去的是一个对象
{
  $$typeof:Symbol.for(''),  不能用字符串，防止后台传一些注入，攻击的，匹配了$$typeof的其他内容，后台没Symbol
  type,
  key:
  props:
}
### 状态提升
react中任何可变数据应当只有相对应的唯一数据源，通常state都是首先添加到需要渲染数据的组件中去，如果其他组件要公用这个state你可以将他提升到这些组件最近的共同父节点中，应当遵循自上而下的数据流而不是尝试在不同组件之间同步state
### 组合和继承
在react中，组件可以接受任意形式的props，比如数据类型，react元素及函数，如果你想在组件间复用非ui功能，你可以将他单独提取为js模块，通过import引入而不是extends继承

###  react中合成事件是什么
合成事件是围绕浏览器原生事件充当跨浏览器包装器的对象，它们将不同浏览器行为合成一个api，确保事件在不同浏览器显示一致的属性
react里面的事件都是通过委托的方式来绑定（不能给字符串添加绑定事件）
if(/on[A-Z]/.test(propName)) {
  let eventType = propName.slice(2).toLowerCase();
  $(document).on(eventType, `[data-reactid="${rootId}"]`, props[propName])
}

### React.lazy
React.lazy接受一个函数，这个函数动态调用import（），它必须返回一个promise，该promise需要resolve一个default export的react组件
const OtherComp = React.lazy(() => import('./OtherComp'))
如果模块加载失败它会触发一个错误，你可以用异常捕获边界技术处理
异常捕获边界组件包裹你引入的组件
React.lazy只支持默认导出，如果你想被引入的模块使用命名导出，你要创建一个中间模块来重新导出为默认模块，来保障treeShaking不会出错

### context
Context提供无需为每层组件手动添加props就能在组件之间进行数据传递的方式，组件之间共享，使用contex可以避免通过中间元素传递props
react典型数据传递：自上而下通过props传递
- 何时用？ 对组件树来说是全局的数据，比如用户登录状态。当前认证的用户，主题
- 如果你只想避免层层传递数据，可以组件组合

1）React.createContext(defaultValue)，创建一个context对象，只有匹配不到Provider，默认值生效
2）Context.Provider   <MyContext.value value={..} /> 
多个Provider嵌套使用，里层覆盖外层， 当Provider的value变化，内部所有消费者重新渲染，Provider以及内部consumer不受限shouldComponentUpdate，因此当consumer组件在其祖先组件退出更新情况下也能更新，通过新旧值检测使用<Object.js>相同算法
1 - class外面：MyConponent.contextType = MyContext 这样MyComponent组件内部通过this.context获取Provider传过来的值
2 - 也可以在MyContext内部 static ContextType = MyContext; 通过this.context访问 
3 - <MyContext.Consumer>{value => <div>ddd</div>}</MyContext.Consumer>

### 错误边界
如果类组件定义了static getDerivedStateFromError() 或者componentDidCatch()中任意，那它就变成一个错误边界
当抛出错误后，用static getDerivedStateFromError渲染备用ui使用componentDidCatch打印错误日志

错误边界工作方式类似catch，不同在于错误边界只针对react类组件
错误边界只能捕获其子组件错误不能捕获自身错误
从react16起，任何违背错误边界捕获的错误会导致整个react组件树被卸载

### refs转发
将ref自动的通过组件传递到子组件的技巧

const FancyButton = React.forwardFef((props, ref) => (
  <button ref={ref}>{props.children}</button>
))

 <FancyButton ref={ref}>点我</FancyButton> 这样可以访问到button

React传递ref给forwardRef内函数作为第二个参数，我们想下转发ref到button当ref挂载完成，ref.current指向button的dom节点

参数ref只在使用React.forwardRef定义组件时存在，常规函数和类组件不接收ref，且props中不存在ref
当你组件库用来forwardRef是一个破坏性改变，不推荐用

高级组件内用ref很有用
ref不是props属性，就像key一样，其被react进行了特殊处理，如果你对HOC添加ref，该ref将引用最外层的容器组件而不是被包裹的组件。意味着不能调用ref.current.focus()这样的方法
但我们可以通过React.forwardRef接受一个渲染函数，其接受props和ref参数并返回一个React节点
### redux三大核心：
1）单一数据源：整个应用的state被存在一棵object tree中，并且这个树只存在唯一store中
2）state是只读，唯一改变state方法是触发action，action是描述已发生事件的普通对象,确保视图和网络请求不直接修改state，只能表达修改意图
3）使用纯函数来修改，为了描述action如何修改state tree你要编写reducers

reducer就是纯函数，它先接受之前的state和action并返回新的state
纯函数的好处就是可以复用:纯函数是函数变成的概念，必须遵守：1)不得改写参数，不能调用系统的I/O的api，不能调用Date.now()或Math.random等不纯方法返回不同结果

### 你对单一数据源有什么理解
所有状态存在store，并且他们从store本身接收更新，单一状态树可以容易的跟踪随时间的变化，并调试或检查程序

###  reducer函数为什么必须返回一个函数？
因为reducer是纯函数，能保证同样的state必定得到同样的view，正因如此，reducer函数,里面不能改变state，必须返回一个全新的对象，
### redux组成（4个）
- state状态：
  1）DomainDate：服务端返回state。  2）UI state：当前组件state,  3）App state，全局state比如是否请求loaning

- action事件：把数据从应用传到store的载体，它是store数据的唯一来源。
  通过store.dispatch()将action传递给store
  1）action本质是js普通对象，  2）内部要有一个type表要执行的动作，除了type外，action结构随意定义。
  3）只是描述了有事情要发生，并没有描述如何去更新state

- reducer：
1）本质是函数，需要return返回值，这样store才能接收值，2）函数会接收2个参数，第一是初始化state，第二个是action

  -Store在redux中的意义是什么?- store 把action和reducer联系到一起的对象
1）维持应用的state 2）提供store.getState()方法获取state 3）提供store.dispatch()方法发送action 4）提供store.subscribe()方来注册监听，通过返回值来注销监听

### react-redux
react-redux能让你的react组件从redux store中很方便的读取数据，并向store中分发action来更新数据

重要成员：react这个ui框架是以组件进行驱动的
1）Provider：能让整个app都能获取store中的数据（维护store）
2）connect：让组件和store关联

provider接受store作为props，通过context往下传递，这样react中任何组件都可以通过context获取store。容器组件可能要很深的层级，防止了一层层传递。
原理：react中的context
connect：provider内部组件要用state就要用connect封装（加强）
connect方便组件获取store中的state（内部实现：高阶组件）

createStore(reducer, applyMiddleware(thunk, promise, logger))

connect(mapStateToProps, mapDispatchToProps)(Component)
mapStateTpProps(state, ownProps) 将store中的数据作为props绑定到组件上，  省略的话就不会订阅store
mapDispatchToProps(dispatch, ownProps) 将action作为props绑定到自己函数中，可以是个函数也可以是个对象
哪个组件要接受状态就mapStateTpProps
接收方实现第一个参数，发送方实现第二个
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
### Generator
Generator是生成器，如果函数加了*，他就会变成一个生成器函数，运行后会返回一个迭代器对象
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

function fetchPosts = (postTitle) => {
  return (dispatch, getState) => {
    dispatch(requestPosts(postTitle));
    return fetch(`/some/API/${postTitle}.join`)
    .then(response => response.join())
    .then(json => dispatch(receivePosts(postTitle, json)))
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

### 什么是react路由
1）hashReouter，利用hash实现路由切换
2）BrowserRouter利用h5 APi实现路由切换

只要用了路由就会有一对对象
1）history: 
  - go, goBack, goForward
  - location: { pathname: '/home', search: '', hash:'', state: undefined }
  - push, replace, action: 'POP',
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
### 调用setState之后发生什么

### react生命周期
预废弃：componentWillMount， componentWillReceiveProps， componentWillUpdate,使用UNSAVE_兼容
已新增：static getDerivedStateFromProps(nextProps, prevState), getSnapShotBeforeUpdate(prevProps, prevState)

React16.4，react渲染机制遵循同步渲染：
1）首次渲染：willMount > render >  didMount
2)props更新时：receiveProps > shouldUpdate > willUpdate > render  >  didUpdate
3）state更新时： shouldUpdate -> willUpdate ->  render -> didUpdate
4) 卸载时： willUnMount
期间每个函数各司其职，输入输出都是可测的，一路下来顺畅

但是，从React17开始，渲染机制发生颠覆性改变，这个新方法就是 <Async Render>
Async render不是那种服务端渲染，比如发送异步请求到后台返回newState甚至新的html，这里的Async render还是限制在react作为一个View框架的view层本身

预废弃的函数都发生在虚拟DOM的构建期间，也就是render之前，在将来的React17中，在dom真正render之前，react中的调度机制可能会不定期的去查看有没有更高级的任务，如果有就打断当前的周期执行函数，哪怕已经执行了一半，等高优先级任务执行完，再回来重新执行前面被打断的周期函数，这种新机制对现存周期函数的影响就是他们调用时机变得复杂而不可预测，这也就是为什么UNSAFE_

getDerivedStateFromProps是componentWillReceiveProps的代替品
由于组件的props改变从而引发state改变，这个state就是derived state
static是Es6的写法，当我们定义一个函数为static时就意味着无法通过this调用我们在类中定义的方法，原理和js中原型链继承有关
static getDerivedStateFromProps：请只根据nextProps来设定derived state，不要通过this这些东西来调用帮助方法，可能会越帮越乱
用专业术语说：getDerivedStateFromProps是个纯函数，没有副作用

mounting时：不管16.3还是16.4都会调用
updating时：16.3只有props改变，才会调用这个周期函数来更新state，  16.4在任何一次render前都会触发该函数，包括new Props， setState，forceUpdate

getDerivedStateFromProps在条件限制：ifelse下调用setState，如果不设条件setState，这个函数超高的调用频率，不停地setState，会导致频繁的重绘，即可能产生性能问题也容易产生bug

函数组件和类组件
1）加载props方式不同，函数式定义组件从组件函数的参数加载，class形式的组件通过this.props获取传入的参数
2）函数组件比较简单，内部无法维护状态，class形式内部可以通过this.state和this.setState方法更新内部state
3）class组件内部可以定义更多的方法在实例上，但函数式组件无法定义
4）函数组件比类组件性能要高，因为类组件使用的时候要实例化，函数组件直接执行获取返回结果就可以。
5）函数组件没有this，生命周期，状态

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

目前官方建议直接采用requestIdleCallback来降低某个可能耗时操作的优先级
requestIdleCallback: 在线程空闲时间调度执行低优先级函数（可能会隔几帧）
requestAnimationFrame：在下一个动画帧调度前执行高优先级函数

requestIdleCallback方法提高deadline，即限制任务执行时间，以切分任务，避免任务长时间执行，阻塞UI渲染而导致掉帧
并不是所有浏览器都支持requestIdleCallback，但是react内部实现了自己的polyfill，不必担心兼容

react自始至终管理者三种东西：
1）root，根，有个属性指向current树，有一个属性指向workInProgress树。
2）current树，树上每个节点都是fiber节点，每个节点保存的是上一次的状态，每个fiber节点对应jsx节点
3）workInProgress树，保存的是本次更新的状态，并且每个fiber节点都对应一个jsx节点

初次渲染时候，没有current树，没有上一次的状态，react在一开始创建root的时候，就会创建一个unInitialFiber（未初始化的fiber）
它让react的current暂时指向unInitialFiber，因为react需要上次状态和本次状态对比更新，而未初始fiber上属性都是null。
第一次是：workInProgress和unInitialFiber对比。

react主要分2个阶段：
1）render阶段：创建fiber的过程叫render阶段
    1：为每个阶段创建workInProgress，也有可能是复用之前fiber，生成一个新的workInProgress树。
    2：初次渲染的时候（或创建了某个节点的时）会将这个fiber创建真实的dom实例（createElement创建真实dom）。
       只是创建，还没有向页面上插入。并且对当前节点的子节点进行插入（appendChild）。
    3：如果不是初次渲染，就对比新旧fiber的状态，将产生了更新的节点，通过链表的方式，挂载到rootFiber上。

2）commit阶段：才是真正要操作页面的阶段。
  1：执行生命周期
  2：会从RootFiber上获取到链表，根据链表上的标识来操作页面。
  
Fiber数据结构：
    stateNode：保存与fiber关联的localState
    type： 类组件：构造函数， dom元素： html标识
    tag：定义fiber类型。Reconciler通过它来确定需要完成哪些工作，函数：0 ， 类：1， host：5
    updateQueue： state更新，回调以及DOM更新的队列
    memoizedState: 缓存的之前组件state对象，便于恢复
    memoizedProps： 缓存的之前组件props对象，便于恢复
    pendingProps：子组件或者dom中要改变的props（当前处理过程中的组件props对象）新进来的props
    key： 唯一标识，用于更快的找出哪些节点增删改
    return： 当前fiber的父级fiber
    sibling：大弟弟
    child：大儿子
    index
    effectTag：React中Dom节点state和props的改变导致视图改变的操作称为side effect，effectTag就是记录这种操作
    nextEffect
    firstEffect:
    lastEffect:
    experiationTime:本质上是优先级
    alternate：连接current和workIProgress双向连接
    updateQueue： 当前fiber的新的状态，比如调2次setState({num: 3}) setState({num :6}),以链表形式先挂3，再挂6，保存新状态的链表
    1：找fiber
    2：创建更新
    3：吧更新放到updateQueue上面
    

    进制形式，因此可以累加
            export type  SideEffectTag: number;
            export const NoEffect = 0;
            export const PerformedWork = 1;
            export const Placement = 2;
            export const Update = 4;
            export const PlaceAndUpdate = 6;
            ...
  fiber提供了一个叫effect list的数组，包含了需要改变的react element对应的fiber对象（firstEffect， lastEffect）
  effect list好处是可以快速拿到状态改变的DOM而不必遍历整颗React Root

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
scheduleWork -> requestWork -> performSyncWork/performAsyncWork -> workLoop -> performUnitOfWork -> render

performUnitOfWork调用的核心函数是beginWork，beginWork会遍历当前workInProgress的所有子集fiber完成单元任务的处理
current.alternate和updateQueue要同步
因为每次执行setState会创建新的更新，把更新挂到对应的fiber上
这个fiber在奇数次更新的时候存在fiber上，偶数次更新存在current.alternate上
每次复用workOInProgress是从current.alternate上拿
复用的ternate上，updateQueue不一定有新的更新

### 为什么react路由v4中使用switch关键字
###   列出React Router的优点
### Mixin
react早期用mixin，后来用高阶组件，现在hooks
mixin可能会相互依赖，相互耦合，不利于代码维护
不同mixin中方法可能会冲突，mixin很多时，组件是可以感知到的，甚至还要为期做相关处理，这样会给代码造成滚雪球式的复杂性

### ref的类型
用在html元素里：<div ref={this.reftest}> 构造函数用React.createRef创建的ref接收底层dom元素作为其current属性
放到一个类组件上面： <Counter ref={this.counterRef}> this.counterRef.current.increment()父组件调用子组件的函数
ref用在组件上获取到的是组件对象
组件是函数组件获取不到（函数组件没有实例对象）。但是有时候我们需要获取到，可以通过React.forwardRef高阶组件来获取，

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
hook是js函数，不能破坏两个规则：不只能在函数外层调用hook，不要在循环，条件判断或者子函数中调用，保证顺序和第一次执行时一致（hooks内部使用数组和索引维护hooks）
与类组件的setState不同，useState不会自动合并更新对象，你可以用函数式的setState结合展开运算符来合并更新对象的结果
setState(prevState => { 
  return {...prevState, ...updatedValues}
})
useReducer是另一种可选方案，它更适用于管理包含多个子值的state对象

调用stateHook的更新函数并传入当前的state时，react将跳过子组件的渲染以及effect的执行，React使用Object.is来比较state

组件卸载时要清除effect，为了防止内存泄漏，清除函数会在组件卸载前执行，组件多次渲染，在执行下一个effect之前，上一个effect就被清除。

和componentDidMount和componentDidUpdate不同：浏览器在完成布局和绘制之后，传给effect的函数会延迟调用，这使得它适用于常见副作用场景，比如设置订阅，因此不要在该函数中执行阻塞浏览器更新屏幕的操作

并不是所有effect都会被延迟执行。例如在浏览器执行下一次绘制之前，用户可见的dom变更就必须同步执行，避免用户感觉不一致。react为此提供了useLayoutEffect来处理这类effect，和useEffect结构相同，调用时机不同

虽然useEffect会在浏览器绘制后延后执行，但是会保证任何新的渲染前执行，react将在更新前刷新上一论渲染的effect
执行装置运行一次effect，可以传递一个空数组。react会完成画面渲染后才延迟调用useEffect，因此会使得处理额外操作很方便

useContext
const value = useContext(MyContext);
接收一个context对象，并返回context的当前值，当前的context值由上层组件中距离当前组件最近的MyContext.Provider的valueprop决定。
上层Provider更新，该hook会被触发，并使用最新传给Provider的context value值。即使祖先使用react.memo或者shouldcomponentUpdate，也会在组件本身使用useContext时重新渲染
useContext相当于类组件的static contextType = MyContext或者<MyContext.Consumer>
useContext只是让你能够读取context的值以及订阅context的变化，你依然要在上层组件树中使用<MyContext.Provider>来为下层组件提供context

useReducer是useState的替代方案，
const [state, dispatch] = useReducer(reducer, initialArg, init)
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

useMemo的函数会在渲染期间执行，不要在这个函数内部执行与渲染无关的操作，诸如副作用操作属于useEffect的使用范畴而不是useMemo
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
### 类组件不足
1：组件间状态逻辑很难复用，2：复杂业务的有状态组件会越来越复杂，3：this指向问题
### setState传递的数据是不可变的数据
不要这样修改state：this.state.arr.push({name: 'a'})
          this.setState({ arr: this.state.arr  }) // 这样改变的话，引用地址不变，只是改变了引用地址内部东西，数据改变了，但是界面没有改变
为何使用setState改？保存界面与数据的同步，这种修改方式react并不知道数据发生变化

shouldComponentUpdate接收newProps, newState，与原来的对比来判断要不要重新渲染
shouldComponentUpdate(newProps, newState) {
  if(newState.arr !== this.state.arr) {
    return true; // 引用地址一样，这样不会刷新
  }
}

推荐做法：
const newArr = [...this.state.arr] // 相当于复制了一个内存空间 newArr.push({name:'A'})
this.setState({arr: newArr}) // 这样改变，相当于改了地址，shouldComponentUpdate能够检测到

开发时继承PureComponent会自动进行浅层比较，我们在开发过程中要保证this.state是不可变的

pureComponent：实际是对props/state进行了一个浅对比，所以对于嵌套的对象不适用，没办法比较出来
和shouldComponentUpdate做了优化,Component没有做优化，要通过shouldComponentUpdate

### 全局事件传递
跨组件通信，多层组件通信
事件总线：event bus 
react有事件总线的库，通过yarn管理的： events 要安装：yarn add events
import { EventsEmitter } from 'events;
const eventBus = new EventEmitter();

### setState同步还是异步
调用setState只是单纯的将新的state放到updateQueue链表里面，还没有进行更新，你拿不到更新后的数据，等点击事件结束后会触发内部的回调
正常绑定事件你点击的时候就会触发，但是react中的合成事件会先去做别的事情再来执行回调函数，这个时候才是真正的更新state以及重新渲染。
当使用了Concurrent组件的时候才是真正异步，但同样无法立即获取新的状态，并且在执行渲染（生成fiber阶段）和更新时候是用来真正异步方式

异步更新：组件的生命周期，react的合成事件里面是异步的
为什么要设计成异步？
1）提升性能，每次调用setState意味着render函数会被频繁调用，界面重新渲,效率很低，最好办法是获取到多个更新，之后批量更新
如果同步更新了state，但是还没执行render函数，那么state和props不能保持同步，state和props不能保持一致性在开发过程会遇到很多问题

如何获取异步的结果？
1）setState的第二个参数
2）生命周期componentDidUpdate（源码中调调用componentDidUpdate在执行setState第二个参数

同步更新：定时器是异步的，将setState放在定时器执行是同步的
原生的事件监听：在componentDidMount里面，通过document获取dom，监听按钮点击，将setState放在里面是同步的，react源码里面做了一个判断 
### setState数据的合并
源码里面通过object.assign来处理Object.assign({}, this.state, {name: 'B' }); Object.assign({}, prevState,partialState)
### setState本身的合并
increment(){
  this.setSate({count: this.state.count+1})
  this.setSate({count: this.state.count+1})
}
结果不管你调用几次setState拿到的结果都是1
源码中会用do。while来遍历队列，链表中多个setSate，只有最后一次生效。

setState合并时候进行累加
this.setSate((prevState, props) => {
  return {
    count: prevState.count+1
  }
})

this.setSate((prevState, props) => {
  return {
    count: prevState.count+1
  }
})
this.setSate((prevState, props) => {
  return {
    count: prevState.count+1
  }
})
setState接收一个函数，依赖于上一次的值或者props，你调用几次就会就该几次，合并一次更新，是对象就合并

### react的更新机制
渲染：jsx-虚拟dom-真实dom
更新：props/state改变 -》 render函数执行 -》 产生新的dom树 -》新旧树比较 -》 计算差异进行更新 -》 更新到真实dom树
第一次渲染会产生一个真实dom树，之后发生改变，进行render产生虚拟dom树之后，更新变化的部分，不会把虚拟dom直接更新到真实dom
diff发生在render之后，要render生成一个虚拟dom

如果一棵树参照另一个树进行完全比较更新，即使是最新最先进的算法，改算法的复杂度为O(n3),n为树中元素的数量。开销太昂贵了
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
PureComponent能解决类组件，解决不了函数组件
函数组件使用React.Memo()
### redux痛点，吐槽最多的
修改一次数据，太麻烦，dispatch一个action，调用reducer计算，触发回调，更新数据，redux使用最大弊端是样版代码action，reducer太多，修改数据链路太长
为何还要用？redux可以解决跨组件传递数据问题，并且修改数据清晰
### 为什么redux不能处理异步
dispatch默认只能就收一个Object类型的action，不可以是其它类型，因为reducer里面要接收action.type处理不同数据
- react-redux
  redux实现了发布，react-redux实现订阅mapStateToProps是订阅state，Provider就是通过react的contextAPI将数据向下传递
react-redux能让你的react组件从redux store中很方便的读取数据，并向store中分发action来更新数据
重要成员：react这个ui框架是以组件进行驱动的 1）Provider：能让整个app都能获取store中的数据（维护store） 2）connect：让组件和store关联
provider接受store作为props，通过context往下传递，这样react中任何组件都可以通过conntext获取stor。容器组件可能要很深的层级，防止了一层层传递。 原理：react中的context
connect：providr内部组件要用state就要用connect封装（加强） connect方便组件获取store中的state（内部实现：高阶组件）

- connect让组件和全局关联起来
- 高阶组件，接收Provider传递过来的store对象，订阅store中数据，如果store数据改变会调用setState触发组件更新
组件A---触发Action发送----reducer进行接收 ----》store全局状态管理容器 《=》Provider | mapStateToProps
Generator是生成器，如果函数加了*，他就会变成一个生成器函数， 运行后会返回一个迭代器对象 yeild会暂停执行，并会将yeild后面的表达式的值作为对象的value

核心对象：Provider容器组件,connect高阶组件
连接react和redux的中间件，本质是一个函数，可以访问请求对象和响应函数，可以对请求进行拦截，处理后再将控制权向下传递，也可以终止请求。
redux借鉴这种思想，中间件是运行在action发送出去后，达到reducer之间的一段代码 action-》middleware-》reducer，这种机制可以让我们改变数据流，实现异步action，action过滤，异常报告等
异步操作至少要发送2个action：用户触发第一个action，这个跟同步一样，如何在第一个action结束后才自动发送第二个action？ 奥秒就在action creator中

fetchPosts生成器返回一个函数，函数执行，先发出一个action表示操作要开始，然后进行异步操作 拿到结果先转成json，异步结束后再发出一个action表示要结束
store.dispatch(fetchPosts('react js')); store.dispatch(fetchPosts('reactjs')).then(() => ...)
这样，解决了第二个action的问题，但是，Action是由store.dispatch发送的 正常情况下，store.dispatch参数是对象，不能是函数，这样就要用中间件redux-thunk createStore(reducer, applyMiddleware(thunk)) 改造后，store的dispatch可以接受函数作为参数 因此异步操作的第一种解决反案就是写出一个返回函数的Action creator，然后用redux-thunk中间件改造store.dispatch
### hooks核心实现
### context原理
### setState，forceUpdate，

### 描述事件在react中的处理方式
###  createElement何cloneElement区别
###  为什么建议传递给setState的参数是个callBack而不是一个对象
### createElement何cloneElement区别