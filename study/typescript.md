## 安装
npm i -g typescript

Webpack集成：
 npm i ts-loader source-map-loader
 将下面配置合并到webpack.config.js
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};

## 转换到TypeScript文件
将js转换到.ts， 将jsx转为tsx， noEmitOnError选项可以调整ts的严格性。
如果你不想将没有明确的类型默认推断为any，可以在修改文件之前启用noIkmplicitAny。


### 由模块导入
你可能会看到一些类似Cannot find name ’require‘、’define‘ 的错误，遇到这种情况说明你再使用模块，你仅需要告诉typescript它们是存在的

// for nide/commamjs
declare function require(path: string): any
或 // for RequireJS/AMD
declare function define(...args: any[]): any
最好是避免使用这些调用而改用TS的导入语法
首先你要使用ts的module标记来启用一些模块系统，可用的选项有common.js, amd, system and umd
如果你代码中有一下代码：Node/commonJs
var foo = require("foo");
foo.doStuff();
或者下面的requireJs/AMD
define(["foo], function(foo) {
    foo.doStuff();
})
那你可以写作下面的ts代码
import foo = require("foo");
foo.doStuff();

### 获取声明文件
如果你开始做转换到ts导入，你可能会遇到Cannot find module ‘foo'这样的错，那你只需要这样做：
npm i -s @types/lodash
如果你没有使用commonjs模块选项，就需要将modulesResolution选项设置为node，之后你就可以导入lodash了，并获取精确地自动补全功能。

### 由模块导出
模块导出可以如下写法：
 export function feedPets(pets) { .... }
 或者 var express = require("express")
     var app = express();
 或者 function foo() {... }
      module.exports = foo;
在typescript里 你可以使用: function foo() {... }
                         export = foo

### 过多或者过少的参数



### typescript类型
1) 布尔：boolean
2) 数字：number，包括整数和浮点数
3) 字符串：string
4) 数组： string|number...[]  arr:Array<string> = ['1', '2']
元组tuple，属于数组中的一种，
let arr:[string,number,boolean]=['1',2,true]
5) 枚举：enum，0：支付，1：未支付，2：异常
enum Flag {
    success=1,
    error=2
}
var f:Flag = flag.success
enum Color {
    ping=1,
    green
}
如果green没有值，就以上一个为基准，2

6）任意类型any
7） null和undefined
8）void类型
 void表示没有任何类型，一般用于定义方法时方法没有返回值
 function test:void() {}
9）never类型
 never是其他类型，包括null和undefined的子类型，代表从不会出现的值。比如抛出异常， null ，undefined。
 a=(() => {
   throw new Error('错误’)
 })()

 ### 函数
 function run() {} 函数声明
 var run = function() {} 匿名函数
 function run():string  {} // 返回值类型得是string
 var run = function():number{}

 定义方法传参： function getInfo(name:string, age:number):string{} 

 - 函数重载
 java方法的重载指的是2个或者2个以上同名函数，参数不一样，这时候会出现函数重载的情况
 typescript中的重载，通常为同一个函数提供多个函数类型定义来实现多种功能
 function css(config:object) {}
 function css(config,value) {} es5中出现同名函数，后面的会覆盖前面的

 function getInfo（name：string，age：number）:string
 function getInfo(age:number):number
 function getInfo(str:any):string

箭头函数
setTimeout(() => {},1000)


### 类
es5里面的类
function Person() {
    this.name='张三'
    this.age=13
}
var p = new Person()
alert(p.name)

构造函数和原型链里面增加方法
function Person() {
    this.name='张三'
    this.age=13
    this.run=function() {}
}
Person.prototype.sex='男'
原型链上面的属性会被多个实例继承，构造函数的的不会被继承

类里面的静态方法
function Person() {
    this.name='张三'
    this.age=13
}
Person.getInfo=function() { console.log('我是静态方法')}

Web类继承Person类，原型链+对象冒充，可以继承构造函数的，不可继承原型链的
function Person() {
    this.name='张三'
    this.age=13
}
Person.prototype.sex='男'
function Web() {
    Person.call(this) // 对象冒充实现继承
}


typescript通过classs
class Person {
    name: string,
    constructor(n:string) { //构造函数 实例化类的时候触发的方法
        this.name=n
    }
    run():void{
        alert(this.name)
    }
}
var p = new Person('Eileen')
p.run()


Typescript中实现继承 extends， super
class Person {
    name: string;
    constructor(name:string) {
        this.name=name
    }
    run():string {
        return this.name
    }
}

class Web extends Person {
    constructor(name:string) {
        super(name)
    }
}
var w = new Web('李四')
w.run()                                                     

类里面的修饰符：public，private，protected
public在类里面，子类，类外面都可以访问
protected在类里面，子类里面可以访问，类外面无法访问
privated只能在类里面访问，子类和类外面都无法访问

静态属性和方法：
function Person() {
    this.run = function() {}  // 实例方法
    static print() {}  // 静态方法，静态方法无法调用类里面的属性，如果要访问就得降属性变为静态的
}
Person.name='哈哈‘ 静态属性
Person.say = function() {} // 静态方法


多态：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现。多态也是继承的一种表现

class Amimal{
    name: string
    constructor(name:string) {
        this.name = name
    }
    eat() { // 具体吃什么不知道，由继承它的子类去实现。

    }
}

class Dog extends Animal{
    constructor(name:string) {
        super(name)
    }
    eat() {
        return this.name+'eat'
    }
}

抽象方法、类;typescript中的抽象类，是提供其他类继承的基类，不能直接被实例化
typescript中abstract关键字定义抽象类和抽象方法，抽献类的抽象方法不包含具体实现并且必须在派生类中实现

// 抽象类和抽象方法用来定义标准。比如Animal这个类要求他的子类必须包含eat方法
abstract class Animal {
    public name:string;
    constructor(name) {}
    abstract eat():any
}

var dog = new Animal() // 错误，抽象类无法被实例化
class Dog extends Animal {
    eat() {} // 必须有抽象方法eat,其他不一定非要
}





