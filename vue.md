### 为什么说Vue是渐进式js框架
vue允许你将页面割成可复用的组件，每个组件有自己的html，cssjs。
用自己想用或者能用的功能特性，不想用的部分功能可以先不用。VUE不强求你一次性接受并使用它的全部功能特性。
### vue生命周期
beforeCreate：data和methods中数据还没有初始化，无$el，无data
created：无$el, 有data
beforeMount: 无$el, 有data
mounted：有$el, 有data
beforeUpdate
updated
beforeDestory
destoryed
vue3: setup,onBeforeMount,onMount,onBeforeUpdate,onUpdated,onUnmount, 如果使用了keep-aliv还会有actived组件激活前，deactived组件激活后
setup中为什么没有beforeCreate和created？？？
### vue子组件和父组件执行顺序
加载渲染:beforeCreate(父)=>created（父）=>beforeCreate(子)=>created(子)=>beforeMount(子)=>mounted(子)=>mounted(父)
更新：beforeUpdate(父)=>beforeUpdate(子)=>updated(子)=>updated(父)
销毁：beforeDestory(父)=>beforeDestory(子)=>destoryed(子)=>destoryed(父)
### v-el作用
提供一个在页面上已存在的dom元素作为Vue实例挂载的目标，可以是css选择器，也可是HTMLElement实例
### vue中el属性和$mount优先级
会先判断是否有el属性，没有就执行vm.$mount，如果有el还会判断是否有template
### vue双向绑定原理
采用数据劫持和发布订阅的方式。
### 如果data里面的数据不做响应式怎么办？
数据放到vue实例外，Object.freeze()
### 如何获取data中某个数据的初始状态？
this.$options.data().num
### 动态给vue的data添加新属性为什么没有响应式？
data里的属性全都在initState函数（created之前）里通过Object.defineproperty实现了响应式，后来加的要通过vue.set实现响应式，或者Object.assign，或者$foreUpdate重新渲染仅影响实例本身和插入插槽内容的子组件，而不是所有组件
### Vue.observable

### 动态指令设置以及动态传参
<child @[someType]="handlerSomeEvent()" :[sompeProps]="100" />
someType: type ? 'click' : 'dbClick'

### vue组件之间参数传递
1：props，$emit父子之间
2: v-model 单选框，复选框等输入控件，父通过v-model传给子，会自动传一个名为value的prop属性，子通过this.$emit('input', val)就能更改父的v-model的值
3：v-solt父子组件单向通信，在实现可复用组件，向组件传入dom节点，html时刻优先考虑v-solt
4: refs、parent、children。refs可以获取子组件实例或者当前元素。this.$parent获取当前组件的父组件实例，this.$children获取当前组件的子组件实例。
5: vuex,跨层级，项目复杂的情况下使用
6：provider和inject，适用于隔代组件通信，不像props，不需要层层传递，适用于封装高阶组件，祖先实例不需要关心哪个后代实例会用到
7：eventBus 中央事件总线：创建一个vue实例挂载到vue原型上，通过这个vue实例通信。会让全局变量的变化不可测,适用于跨层级跨兄弟间通信。
  this.$bus.$emit('clickEvnet', 'aa')
  this.$bus.$on('clickEvnet', data => {})
### provider和inject
实现父组件往深层次子组件传值
父：provide（）{}， 后代：inject:['keyName']

### nextTick原理
在下一次dom更新循环结束后执行延迟回调。获取更新后的dom。
vue是异步执行dom更新的，一旦观察到数据变化就会开启一个队列，然后把在同一个事件循环中观察到数据变化的watcher推送到这个队列，如果这个watcher被触发多次，只会被推送到队列一次
这种缓冲可提升新能。而在下一个事件循环时，vue会清空队列并进行必要的dom更新。
在created操作dom时要放在nextTick中，因为creaded时dom没有进行任何渲染。
### compute和watche区别
computed有缓存，是基于依赖缓存的，只有依赖变化才会重新求值。
watch的依赖是单个的，watch可以是异步的，而computed不行
### filters
过滤器，全局和局部，当命名冲突时以局部过滤器权重高，{{msg | filterMsg}} Vue.filter('过滤器名', (val) => {}) filters: { 过滤器名: (val){]}}
### props和data谁的优先级更高
在源码initState中，判断顺序依次是：props，methods，data，computed，watch
### v-if和v-show
在vue2.x中，v-for的优先级会比v-if的优先高，但在vue3.x中这一判断优先级被换了过来，除此之外v-for和v-if在同一标签中使用也会报错，解决办法可以在外面套一个template标签，或者使用computed来对数组进行过滤然后渲染
### vue中key的原理和必要性
key是每个vnode的唯一id，是diff的一种策略，根据key更准确更快的找到对应的vnode节点。
### 共享组件不会重新渲染问题
我们有时候开发中会把多个路由解析为同一个Vue组件。Vue默认情况下共享组件将不会重新渲染，
如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化，此时我们需要传递key来区分，达到刷新的目的
<template>
  <router-view :key="$route.path"></router-view>
</template>

### v-solt
插槽就是子组件使用solt标签定义的预留位置，有name属性叫具名插槽，不设置name属性是匿名插槽。
插槽作用域: <template slot="mysolt" slot-scope="props"></template> 子：<solt name="mysolt" :data="list"></solt>
子组件在作用域上绑定的属性会被挂在父组件v-solt接受的对象上
<solt name="mysolt" test="hh"></solt>  父：<template v-solt:default="slotProps"></template>
v-solt缩写：# 只有默认插槽时可以在标签上使用
默认插槽名为default可以省略default直接写v-solt

### misxins
vue复用组件的一种方式，组件间操作不会污染，组件的methods和components会覆盖混入对象的方法。created和mounted等会被合并调用，混合对象的钩子函数在组件里的钩子函数之前调用。
在mixins里包含异步请求函数的时候，通过直接调用异步函数获取返回数据
mixins更像是对于组件的拓展。
### keep-alive
内置组件，让被包裹的组件保留状态避免重复渲染
include只有名称匹配的组件会被缓存，exclude匹配到的不会被缓存。exclude优先级比include高: <keep-alive :include="['a','b']"></keep-alive>
初始进去：生命周期:beforeRouteEnter->beforeCreate->created->mounted->actived->beforeRouteLeave->deactived
再次进去：生命周期：beforeRouteEnter->actived...->beforeRouteLeave->deactived
### vue常用修饰符
v-model.lazy,v-model.trim, v-model.number,
@click.stop,@click.prevent,@click.self,@click.once, @click.capture,
@click.passive在移动端监听滚动事件时会一直触发onScroll卡顿，用passive修饰相当于给onscroll事件加了.lazy修饰符,
@click.native让坐一会变成像html内置标签一样监听原生事件
@click.keyCode
### 对SPA的理解
仅在页面初始化加载相应的html，css，js，加载完成不会因为用户的操作重新加载或者页面跳转。利用路由机制实现html内容的变换
优点：用户体验好，避免不必要的跳转和重新渲染，前后端分离。
缺点：不利于SEO，首屏加载慢
### class和style如何动态绑定？
对象或者数组 :class="{active:true}" :class="['active']" :style="[styleColor]"
### 怎么理解vue单向数据流？
所以的props都向下传递，父props可以向下传递但是反过来不行，这样会阻止子组件意外更改props
每次父组件更新，子组件的props都会拿到新值，如果子想改父组件的props可以通过this.$emit派发一个自定义事件。
### 父组件可以监听到子组件的生命周期吗？
@hook
<Child @hook:mounted="doSomethig"></Child>
doSomething(){}
子： mounted() {this.$emit('mounted')}
@hook还可以监听其他生命周期

### 为什么new Vue中data是对象，组件中data必须是函数
组件是复用的，js里对象是引用关系，如果组件中data是对象，作用域没有隔离，子组件的data会相互影响，而data是函数，每个实例维护对象的独立拷贝。
new vue中的实例是不会被复用的不存在引用对象的问题
### v-model原理
v-model本质上是语法糖，v-model在内部为不同的输入使用不同属性并抛出不同事件
原理就是双向数据绑定，通过Object.defineProperty对数据进行劫持，通过监听不同属性对应的事件作出相应的处理。

text和textarea元素使用value属性，input事件
checbox和radio使用checked属性和change事件
select使用value和change事件

<input id="name"/>显示值：<p id="text"></p>
let Obj = {}
Object.defineProperty(obj, 'name', {
  get() {},
  set(v) {document.getElementById('text').innerText = val}
})
name.addEventListener('keyup', () => { obj.name=e.target.value})

### 虚拟dom在vue中做了什么？
虚拟dom：vue2.x才有的，本质是js对象，跨平台。
vue的渲染过程：将真实dom转化为虚拟dom（js对象），2：更新的时候对比
### 虚拟dom是如何提升vue的渲染效率的？
局部更新（节点数据）
将直接操作dom的地方拿到2个js对象中去做比较



### vue-router和location.href区别
location.href是原生js，简单方便，会刷新页面
vue-router：实现了按需加载，减少了dom消耗

### hash模式和history模式和abstract模式
hash模式：浏览器“#”，以及后面的都成为hash，虽然在url后面有#。但是http请求中没有，用来指导浏览器动作，hash不会重加载页面
history：采用h5新特性，提供2个新方法：pushState和replaceSatte对浏览器历史记录栈修改，以及popState事件的监听到状态变更
abstract：支持所有js运行缓存，nodejs，如果发现没有浏览器的API会强制进入这个模式
### vue路由传参
this.$router.push({path: '', params:{}, query: {} })可以通过query和params。也可以直接将参数拼接着url后面，实现动态传参
### vue路由的钩子函数
导航钩子种类：全局导航钩子，组件内钩子，路由独享钩子
  全局的路由钩子：beforeEach，afterEach
  单个的路由钩子：beforeEnter
  组件内的路由钩子：beforeRouteEnter，beforeRouteLeave，beforeRouteUpdate
全局的：
  const router = new VueRouter({...})
  router.beforeEach((to, from, next) => {}) from：当前导航要离开的路由，next一定要调用不然会阻塞路由
  router.afterEach((to, from) => {}) 后置钩子没有next
组件内导航钩子，beforeRouteEnter不能获取组件实例this，因为当守卫执行前，实例还没有被创建出来，剩下2个钩子可以获取组件实例
路由独享的钩子：它是在路由配置上直接定义的，参数的使用和全局前置守卫一样。不同的是路由独享钩子是定义在路由记录汇总，全局路由守卫定义在入口文件
    路由独享守卫只在路由进入时有效，全局路由守卫是所有路由跳转都会被拦截

### vuex缺点
### mutations和actions为什么要区分