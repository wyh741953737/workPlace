### 为什么说Vue是渐进式js框架
自由组合功能,用自己想用或者能用的功能特性。
### 库和框架的区别
react是一个库，库是用户主动调用库里方法,vue是一个框架，框架的特点是我们只能被别人调用
### vue子组件和父组件执行顺序
加载渲染:beforeCreate(父)=>created（父）=>beforeMount（父）=> beforeCreate(子)=>created(子)=>beforeMount(子)=>mounted(子)=>mounted(父)
更新：beforeUpdate(父)=>beforeUpdate(子)=>updated(子)=>updated(父)
销毁：beforeDestory(父)=>beforeDestory(子)=>destoryed(子)=>destoryed(父)
### v-el作用
提供一个在页面上已存在的dom元素作为Vue实例挂载的目标，可以是css选择器，也可是HTMLElement实例
### vue中el属性和$mount优先级
会先判断是否有el属性，没有就执行vm.$mount，如果有el还会判断是否有template
### 如果data里面的数据不做响应式怎么办？
数据放到vue实例外，Object.freeze()
### 如何获取data中某个数据的初始状态？
this.$options.data().num
### 动态给vue的data添加新属性为什么没有响应式？
data里的属性全都在initState函数（created之前）里通过Object.defineProperty实现了响应式，后来加的要通过vue.set实现响应式，或Object.assign，或者$foreUpdate重新渲染仅影响实例本身和插入插槽内容的子组件，而不是所有组件
### Vue.observable
### vue2以及vue3响应式数据的理解
响应式数据的核心是数据变化能知道，vue2采用defineProperty将数据定义成响应式
拦截所有getter和setter，缺陷是要递归。不存在的属性无法被监控到。
vue3采用proxy直接可以对对象拦截，不需要重写set和get方法，性能高不需要递归。
对数组没有采用defineProperty，数组长但是用户不会操作索引更改数据。
vue2中减少层级数据嵌套，不要太深，如果不需要响应式的数据就不要放在data中，合理使用Object.defineProperty.尽量缓存使用过的变量。
### vue中如何检测数组变化？
vue2中没有使用defineProperty检测数组（性能差）。
通过原型链+函数劫持重写数组的7个方法，缺陷是不能检测到索引更改数组的变化。
检测到数组变化，也会去observeArray，遍历数组每一项，进行observe，性能也不好。
### vue中如何进行依赖收集
每个属性和对象都有自己的dep属性，存放它所收集的依赖watcher，当属性变化，会通知自己的watcher去更新。
每个组件渲染过程都会创建一个渲染watcher（watcher有3种：渲染watcher，计算属性watcher，用户watcher）一个属性可能会有多个watcher，反过来，一个watcher有多个dep。

默认初始化的时候会调render函数，触发属性依赖收集，读取是数据时会触发这个数据的getter，getter里面判断如果有watcher，就会将watcher收集到Dep
当属性发生修改时会触发setter，setter调用dep.notify()，dep.subs循环拿到每个watcher执行watcher的update方法
### 如何理解vue中的模板编译原理
核心：如何将template转化成render函数
1：将template模板转换成ast
2：对ast语法树进行优化，标记静态节点，diff来做优化的静态节点跳过diff操作
3：代码生成，拼接render函数字符串+new Function + with
4：用ast得到的js对象拼装成render和staticRenderFns函数，render和staticRenderFns函数调用后生成vnode节点
generate(ast, options) {
  const code = 将抽象语法树转化为_c('div', {props: '', domProps: '', on: '{}''})
  return {
    render: ('with(this){return'+code+'}'),
    staticRenderFns: state.staticRenderFns
  }
}
template='<div v-if="show">你好</div>'
compileToFunctions内部调用compile,compile会调用baseCompiled(template, options)得到{ast:{},render: 'with(this){return'+code+'}',staticRenderFns}
baseCompiled内部调用parse将template转化成ast，然后优化标记静态节点，之后调用generate(ast, options)得到render和staticRenderFns函数，和ast合并后返回
### render和template的区别
template是html的渲染方式但是template最终还是要通过render的方式再次编译
render里有个h函数，将单文件组件进行虚拟dom的创建，然后再通过render进行解析
render性能比template好，优先级高于template
### vue3模板编译做了哪些优化？
patchFlag, blockTree, 事件缓存，节点缓存

### vue生命周期钩子是如何实现的？
vue有个方法mergeOptions,将其他属性和生命周期合并转成数组，执行到具体流程时会执行钩子（发布订阅）callHook(vm, 'beforeCreate')
### 动态指令设置以及动态传参
<child @[someType]="handlerSomeEvent()" :[someProps]="100" />
someType: type ? 'click' : 'dbClick'

### vue组件之间参数传递
1：props，$emit父子之间
2: v-model 单选框，复选框等输入控件，父v-model传给子，会自动传一个名为value的prop属性，子通过this.$emit('input', val)就能更改父的v-model的值
3：v-solt父子组件单向通信，在实现可复用组件，向组件传入dom节点，html时刻优先考虑v-solt
4: refs、parent、children。refs可以获取子组件实例或者当前元素。this.$parent获取当前组件的父组件实例，this.$children获取当前组件的子组件实例。
5: vuex,跨层级，项目复杂的情况下使用
6：provider和inject，适用于隔代组件通信，适用于封装组件，祖先实例不需要关心哪个后代实例会用到，其他场景不建议使用，会导致数据来源不明确
7：eventBus 中央事件总线：创建一个vue实例挂载到vue原型上，通过这个vue实例通信。会让全局变量的变化不可测,适用于跨层级跨兄弟间通信。
8：Vue.observable
### nextTick原理
在下一次dom更新循环结束后执行延迟回调。获取更新后的dom。(视图更新后获取真实dom元素)
vue是异步执行dom更新的，一旦观察到数据变化就会开启一个队列，
然后把在同一个事件循环中观察到数据变化的watcher推送到这个队列，
如果这个watcher被触发多次，只会被推送到队列一次
这种缓冲可提升新能。而在下一个事件循环时，vue会清空队列并进行必要的dom更新。
在created操作dom时要放在nextTick中，因为created时dom没有进行任何渲染。
nextTick本身内部采用异步方法但是执行逻辑时采用的是同步（往callbacks里push时是同步）
if(!pending) {pending=true timerFunc()} // 开启一个异步方法，先采用promise.then,然后mutationObserve，之后setImmediate，最后setTimeout。
稍后同步刷新队列
timerFunc = () => { setTimeout(flushCallback,0)}

### Vue.set是如何实现的？
给对象添加属性，对象得是响应式的，那么对象本身有一个dep属性
1：首先判断对象是不是数组，如果是数组，通过splice实现，splice内部会触发notify
2：再判断属性是不是对象本身的，是的话直接赋值就好了
3：判断是不是vue实例，是的话报错不能在vue实例上添加属性
4：如果没有实现响应式，通过defineReactive把属性定义成响应式是的，ob.dep.notify主动通知更新。。
### compute和watch区别
都是基于watcher的，区别是computed数据可以用于页面渲染，watch不行。computed只有在取值时才会执行对应的回调（lazy为true所以不会立即执行）
watch默认会执行一次（拿到老的值）
computed用了dirty属性实现了缓存，是基于依赖缓存的，只有依赖变化才会重新求值。
watch的依赖是单个的，watch可以是异步的，而computed不行

initComputed -> new Watcher(lazy:true,dirty:true默认watcher不执行) -> defineComputed（将属性定义到实例上）->
 crateComputedGetter（创建getter当取值时会执行此方法）-> 
 当用户取值时（dirty为false会返回上一次计算的结果，为true会 -> watcher.evalute计算结果，计算时会进行依赖收集，dirty更改为false

计算属性优先于渲染，保证渲染执行之前都拿到最新的值
 update() {
  if(this.lazy) { // 计算属性
    this.dirty = true
  } else if(this.sync) { // 同步的
    this.run()
  } else {
    queueWatcher(this) // 将watcher放入队列，
  }
 }
computed中没有deep：true，因computed中值用于{{xxx}}模板会调用JSON.stringify({})会对对象取值
### watch中deep是如何实现的？
当用户指定了deep为true，如果当前监控的值是数组类型，会对对象中每一项求值，此时会将当前watcher存入对应属性的依赖中
这样数组中对象变化时也会通知数据更新

### filters
过滤器，全局和局部，当命名冲突时以局部过滤器权重高，{{msg | filterMsg}} Vue.filter('过滤器名', (val) => {}) filters: { 过滤器名: (val){]}}
### props和data谁的优先级更高
在源码initState中，判断顺序依次是：props，methods，data，computed，watch
### 共享组件不会重新渲染问题
我们有时候开发中会把多个路由解析为同一个Vue组件。Vue默认情况下共享组件将不会重新渲染，
如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化，此时我们需要传递key来区分，达到刷新的目的
<template>
  <router-view :key="$route.path"></router-view>
</template>

### v-solt
插槽：创建虚拟节点时，会将组件的儿子的虚拟节点保存起来，当初始化组件时通过插槽将儿子进行分类{a: [vnode], b: [vnode]}
     渲染组件时会拿对应的solt属性节点进行替换操作（插槽的作用域为父组件）
作用域插槽：作用域插槽在解析时不会作为组件的孩子节点，会解析成函数，当子组件渲染时，会调用此函数进行渲染（插槽的作用域为子组件）

具名插槽，普通插槽，作用域插槽

插槽作用域: <template slot="mysolt" slot-scope="props"></template> 子：<solt name="mysolt" :data="list"></solt>
子组件在作用域上绑定的属性会被挂在父组件v-solt接受的对象上
<solt name="mysolt" test="hh"></solt>  父：<template v-solt:default="slotProps"></template>
v-solt缩写：# 只有默认插槽时可以在标签上使用
默认插槽名为default可以省略default直接写v-solt

### misxins
vue复用组件的一种方式，原理类似“对象的继承”，mixins更像是对于组件的拓展。当组件初始化时会调用mergeOptions进行合并，采用策略模式针对不同属性进行合并
如果混入的数据和本身组件中数据有冲突，就会采用就近原则，以组件的为主。
mixin中有很多缺陷：命名冲突问题，依赖问题，数据来源问题。

组件间操作不会污染，组件的methods和components会覆盖混入对象的方法。created和mounted等会被合并调用，
混合对象的钩子函数在组件里的钩子函数之前调用。
在mixins里包含异步请求函数的时候，通过直接调用异步函数获取返回数据
vue3采用组合式API更加方便

Vue.mixin = function(mixin) {
  this.options = mergeOptions(this.options, mixin)
  return this
}
mergeOptions合并属性，生命周期，mergeHook生命周期合并成数组执行的时候依次执行
### 说下你所理解的mvc与mvvc
MVC: 比较早期的mvc是针对后端来说的。用户可以操作view层，control层，逻辑，数据，视图分离。 可以在view里调用model取数据，
也可以在model主动触发view修改视图，control即可以修改model也可以更新view 
缺点：复杂项目中会出现混乱。如视图改变，不知从哪触发（model或用户或control）
mvc并未具体指明各个部分应该承担具体什么职责，相互间如何交互,大量逻辑耦合在control层。

从大层面可将mvc分为服务端mvc和纯客户端mvc 客户端mvc：mvp，mvvm
MVP：模型-视图-presenter（主持人），view和model不能直接交互，只能通过presenter。解决了mvc交互混乱问题 
MVVM:基本和mvp一致。更注重数据驱动视图，新增双向数据绑定。view和model不直接交互.而是和VM绑定，VM除了要响应用户操作外还要维护视图状态

mvp中presenter也要维持视图状态的，但presenter将状态设置到视图上，自己不持有这些状态，
mvvm中，VM是视图状态的来源，视图只是反映VM状态

react不是mvvm框架，但是React可以作为MVVM中第二个V，也就是View； 
MVVM显著特征是双向绑定，而React是单向数据流的库，状态驱动视图。
 react整体是函数式的思想，把组件设计成纯组件、状态和逻辑通过参数传入。
 react本身是面向web端的，它很轻便灵活，只是MVC架构中的view(视图)层,所以它需要配合生态体系中的其他框架或模块来使用。

传统MVVM不能手动操作试图更新，vue中有ref可以手动操作，vue借鉴了mvvm的思想。
 通过new Vue实例的对象是MVVM中的VM，模型通过它将数据绑定到页面上，视图可以通过它将数据映射到模型上
 优点：低耦合，视图可独立于model的变化和修改
      复用：将视图逻辑放到vm里让很多view复用这逻辑
  v-model可以监听数据将数据映射到试图，试图变化可以更新数据。双向

### keep-alive
缓存的是组件实例，vm.$el缓存实例实际是缓存了dom元素，在组件切换时候如果有缓存，直接复用
keep-alive不用做任何渲染操作，内部使用了LRU算法来管理缓存（抽象组件）

内置组件，让被包裹的组件保留状态避免重复渲染
include只有名称匹配的组件会被缓存，exclude匹配到的不会被缓存。exclude优先级比include高: <keep-alive :include="['a','b']"></keep-alive>
初始进去：生命周期:beforeRouteEnter->beforeCreate->created->mounted->actived->beforeRouteLeave->deactived
再次进去：生命周期：beforeRouteEnter->actived...->beforeRouteLeave->deactived
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
组件要复用，若组件data是对象，作用域未隔离，子组件的data相互影响，data是函数，每个实例维护的对象独立。new vue中的实例是不会被复用的不存在引用对象的问题
### v-if和v-for
在vue2.x中，v-for的优先级会比v-if的优先高，如果写在同一个标签上，会每次循环都判断，如果希望边遍历边判断，可以先做成计算属性再在页面上使用
但在vue3.x中这一判断优先级被换了过来
### v-if、v-model、v-for实现原理？普通组件上的v-model指令，组件上的v-model指令
v-for:原理是拼接一个循环函数(拿到el上的iterator）
v-if:自动被转译成三元表达式，
v-model:在组件中就是value+input的语法糖，如果放到表单元素上v-model是有一些差异的，会被解析成一个指令，默认给input事件拼接一个处理中文输入法的问题在运行时要调用指令。
指令处理的时候还会处理修饰符
### v-model原理
v-model本质上是语法糖，v-model在内部为不同的输入使用不同属性并抛出不同事件
原理就是双向数据绑定，通过Object.defineProperty对数据进行劫持，通过监听不同属性对应的事件作出相应的处理。

text和textarea元素使用value属性，input事件
checkbox和radio使用checked属性和change事件
select使用value和change事件

<input id="name"/>显示值：<p id="text"></p>
let Obj = {}
Object.defineProperty(obj, 'name', {
  get() {},
  set(v) {document.getElementById('text').innerText = val}
})
name.addEventListener('keyup', () => { obj.name=e.target.value})

### 虚拟dom在vue中做了什么？
### 虚拟dom是如何提升vue的渲染效率的？
局部更新（节点数据），将直接操作dom的地方拿到2个js对象中去做比较
vue2采用双指针对一些场景做了优化策略（静态节点跳过diff算法）。
头头，尾尾，尾头，头尾进行优化，最后乱序比较就是根据老节点创造一个映射表，用心的去里面找能复用的节点。
vue3优化移动节点的时候采用了最长递增子序列来实现，贪心+二分查找+前驱节点实现O(NlogN)
vue3还有一个blockTree概念，如果是通过模板编译的会把dynamicChildren组成数组直接数组比对，性能更好，如果不能使用这种方式才采用全量对比。

### 组件化
组件-》ast，识别的时候会根据组件创建一个虚拟节点-》转化成真实节点-》插入到页面
- 注册组件，当前实例中可以获取到组件
- vue.extends根据组件创建一个组件类sub
- 创建组件的虚拟节点，虚拟节点上组件会增加生命周期钩子init方法
- 组件的虚拟节点上会包含一个componentOptions(Sub,children...)
- 组件的初始化，就会调用组件的init钩子 new Sub($mount)
- 根据组件内容生成一个虚拟节点，创建节点，插入到页面
### vue组件更新流程
什么情况导致组件更新？
1）组件自己的状态发生改变
2）props变化导致更新，父组件更新导致子组件更新
### vue-router和location.href区别
location.href是原生js，简单方便，会刷新页面
vue-router：实现了按需加载，减少了dom消耗

### 函数组件优势和原理
缺点是：无状态（没有自己的数据源，可以接收props，单纯的页面渲染可以采用函数组件，正常组件是一个类，但函数组件是一个普通函数
无生命周期，没有自己的this
性能高在于不用调用_init方法（没有一大堆的初始化流程，拿到虚拟节点直接返回，只是让函数执行。内部调用组件的render(h)=>h('div','hello'）返回虚拟节点。函数组件没有watcher
Vue.component('comp', {
  functional: true,
  render:(h)=>h('div','hello')
})
### props和emit的实现
- props 
在创建虚拟节点的时候 会被抽离到componentOptions中的propsData中，就是在初始化的时候将propsData定义在了组件的_props上
最后代理到实例上，proxy(vm, '_props',key)
- emit
默认给组件绑定的事件，会定义在组件的实例上，核心是发布订阅$on, $emit，解析时会将事件全部放在vm.$options._parentListeners上
$on会将事件push到vm._events[event]上 // 事件对象
$emit: 取出回调：cbs = vm._events[event] 遍历cbs，然后执行

### inject provide如何实现跨级通信
initProvide会获取用户的provide ，存到vm._provided上
initInject会在当前实例上解析inject，resolveInject核心（不停的通过vm.$parent父组件上找_provided,获取到父亲上定义的数据（数据不是响应式的））、
拿到值后定义到自己身上。
provide和inject绑定并不是可响应的，这是刻意为之，如果你传了一个可监听的对象，那么其对象的property还是可响应式的

### $parent $children
在组件初始化的时候可以拿到父组件构造父子关系，initLifecycle内部，会拿到options.parent,然后给vm.$parent赋值为options.parent
parent.$children.push(vm) // 将子组件和父组件建立关联
### $attrs和$listeners
defineReactive(vm, '$attrs', parentData&&parentData.attr || emptyObject, () => {})
defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {})

### $refs
  $refs = vnode.componentInstance || vnode.elm  获取组件实例
### $attrs是为了解决什么问题出现的？provide和inject不能解决它能解决的问题吗？
v-bind="attrs" v-on="$listeners"可以直接快速的将属性和事件向下传递，不能实现跨级传递
provide和inject主要是跨级，不用层层传递，可以在父组件提供，子组件消费
### vue.use是干什么的？原理是什么
use会执行initUSe函数，initUse函数内部回去判断插件是否安装过，未安装过判断插件是否有install方法并且是函数，有install直接执行install方法，
否则判断插件是不是函数，执行插件
### 组件中写name选项有哪些好处
如果写了name，会Sub.options.components[name] = Sub 将组件注册到components上。
好处：可以在自己组件中循环使用自己的组件
      有了名字可以定位到具体的组件，不停的向上($parent.name='XXX')找到某个组件给这个组件派发事件
### vue常用事件修饰符
v-model.lazy,v-model.trim, v-model.number,
@click.stop,@click.prevent,@click.self,@click.once, @click.capture,
@click.passive在移动端监听滚动事件时会一直触发onScroll卡顿，用passive修饰相当于给onscroll事件加了.lazy修饰符,
@click.native让坐一会变成像html内置标签一样监听原生事件
@click.keyCode
组件在编译的时候会对一些修饰符做处理（根据不同修饰符生成不同代码）
 
### vue中.sync修饰符作用，用法以及实现原理
- .sync在vue3中被删除了，类似v-model语法糖，可以解析出对应的结果
- :xxx.sync="abc" :xxx="abc" :update:xxx="c=>a=c" 可以实现.sync
- v-model默认传递的值叫value和input除非用户改写，
### 如何理解自定义组件
1：生成ast语法树时，遇到指令会给当前元素添加directives属性
2：通过genDirectives生成指令代码
3：在patch前将指令的钩子提取到cbs中，在patch过程调用对应的钩子
4：当执行cbs对应的钩子时，调用对应指令定义的方法。

### v-html会引起哪些问题
可能会引起xss攻击，原理是innerHtml
v-html会替换标签内的子元素

### vue-router有几种钩子？具体是什么，执行流程是怎样的
### vue-router2种模式区别
### Vue中性能优化有哪些？
- 代码优化
1：不要所有数据都放在data中
3：SPA采用keep-alive缓存组件
5：v-if为false时内部不会执行，具有阻断功能，很多情况下使用v-if替代v-show
6：key保证唯一性（vue会采用复用策略）7：Object.freeze冻结数据
8：合理使用路由懒加载，异步组件,9：数据持久化问题（防抖，节流）
- vue加载性能优化
第三方模块按需导入babel-plugin-import
滚动到可视区动态加载,图片懒加载vue-lazyload
- 用户体验
app-skeleton骨架屏,pwa（serviceWorker）
- 打包优化
使用cdn加载第三方模块,多线程打包happypack
- 缓存
客户端缓存，服务端缓存,服务端gzip压缩
### 为什么要使用异步组件
如果组件功能打包出的结果会变大，都可以采用异步的方式加载组件，主要依赖import这个语法，可以实现文件的分割加载
components: {  AddCustomerSchedule: (resolve) => import('../component/AddCustomer)}

### 双向绑定和vuex是否冲突？
### vue内置组件transition，transition-grout源码实现原理
### patch函数都做了什么
### vue.set原理
### 描述组件的渲染和更新过程
渲染组件：会通过Vue.extend方法构建子组件的构造函数，并进行实例化，最终手动调用$mount进行挂载
更新组件会进行patchVnode流程，核心是diff算法

vm._render->调用用户的render方法h=>h(App) =>createElement => 处理children =>判断tag类型，是string类型创建普通dom的vnode，不是就createComponent
=>Ctor=Vue.extend获取子组件的构造函数 => 添加组件的hook（installComponentHooks）{init,patch，insert，destory} =>返回组件vnode

vm._update() -> createElm ->createComponent -> vnode.data.init() ->调用组件的init方法
init方法：new vnode.componentOptions.Ctor(options) -> initLifecycle 初始化父子关系
->child.$mount将渲染后的结果放到vm.$el上，实例化组件的watcher -> insert
### vue3有哪些改进
vue3采用TS来编写，支持compositionAPI，vue3响应式原理变成proxy，
vdom的对比算法更新，只更新vdom的绑定了动态数据的部分
### vue.extend方法
1：缓存ctors
2：sub = (options) {this._init(options)}
3: 以父类原型为目标创建的对象赋值给子类原型sub.prototype
4: 调用mergeOptions将父类的options和当前的options合并
5：如果有props或者computed初始化props和computed
6：给sub添加一些方法并返回sub
### vue中事件绑定原理
1：原生dom事件的绑定，采用的是addEventListener实现
2：组件绑定事件采用的是$on

### compositionAPI解决了哪些问题

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
### 完整的导航解析流程
1：导航被触发
2：在失活的组件里调用离开守卫BeforeRouteLeave
3：调用全局的beforeEach守卫
4：在重用组件里调用beforeRouteUpdate守卫
5：在路由配置里调用beforeEnter
6：解析异步路由组件
7：在被激活的组件里调用beforeRouteEnter
8：调用全局的beforeResolve守卫
9：导航被确认
10：调用全局的afterEach钩子
11：触发dom更新
12：用创建好的实例调用beforeRouteEnter守卫传给next的回调函数
### vuex缺点
### mutations和actions为什么要区分