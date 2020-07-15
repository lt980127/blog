---
title: javascript相关知识
sidebarDepth: 3
---

> [冴羽写博客的地方](https://github.com/mqyqingfeng/Blog)

> [前端你应该了解的数据结构与算法](https://juejin.im/post/5b331bc7f265da598451fd88#comment)

## 数据类型

- **值类型(基本类型)：字符串(string)、数值(number)、布尔值(boolean)、undefined、空值(null)、symbol**

  ```js
  //string
  var str = 'hello'

  //number 另外NaN是个特殊的number,表示无法计算的结果
  var num = 10
  //NaN判断方法
  isNaN(NaN) //true

  //boolean
  var bool1 = true
  var bool2 = false

  //null
  var empty = null

  //undefined 或者定义了变量未赋值
  var a = undefined

  //symbol
  var s1 = Symbol()
  var s2 = Symbol()
  s1 === s2 //false
  ```

- **引用类型：对象（Object）、数组（Array）、函数（Function）**

  ```js
  //Object
  var obj = {
    name: 'xjq',
  }

  //Array
  var arr = [1, 2, 3]

  //Function
  function fun() {
    console.log('fun')
  }
  ```

## 数据类型区别

- **值类型**

  占用空间固定，保存在栈中（当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，基础变量的值是存储在栈中，而引用变量存储在栈中的是指向堆中的数组或者对象的地址，这就是为何修改引用类型总会影响到其他指向这个地址的引用变量。）

- **引用类型**

  占用空间不固定，保存在堆中（当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。）

  <div style="text-align: center;">
    <img src="https://xjq-blog.oss-cn-shenzhen.aliyuncs.com/blog/typeOfData/reference-type.png"/>
  </div>

## 类型判断

- **typeof**

  typeof 可以识别简单基本类型值(比如:number,string,boolean),但对于复合类型(Object,Array,Function)却只能识别 Function,

  ```js
  typeof 10 //number
  typeof '' //string
  typeof true //boolean
  typeof Array //object
  typeof Object //object
  typeof function () {} //function
  typeof undefined //undefined
  typeof {} // object
  typeof [] // object
  typeof null // object
  ```

- **instanceof**

  instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性

  ```js
  console.log(Object instanceof Object) //true
  console.log(Function instanceof Function) //true
  console.log(Number instanceof Number) //false
  console.log(String instanceof String) //false
  console.log(Function instanceof Object) //true
  ```

## 作用域

**作用域是指程序源代码中定义变量的区域。**

**静态作用域(词法作用域)与动态作用域**

1. 静态作用域:静态作用域(即词法作用域)中的函数遇到既不是形参也不是函数内部定义的局部变量的变量时，会去函数定义时的环境中查询。

2. 动态作用域:动态作用域中的函数遇到既不是形参也不是函数内部定义的局部变量的变量时，到函数调用时的环境中查。

**既不是形参也不是函数内部定义的局部变量的变量即自由变量。形参或函数内部定义的局部变量即约束变量。**

**全局作用域与块级作用域(函数作用域):**

1. 全局作用域在 js 代码中任何地方都有定义

2. 块级作用域:在 js 中也就是函数作用域,在声明他们的函数体以及这个函数体嵌套的任意函数体内有定义

```js
var a = 'global'
function block() {
  console.log(a) //输出undefined,因为a在函数体内重新定义,在函数体内定义的a取代全局变量a
  var a = 'block' //变量作用域提升到函数顶层,执行此行语句前为undefined,未赋值
  console.log(a) //block
}
```

## 闭包

**闭包是指那些能够访问自由变量的函数,自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。**

## 垃圾回收

js 具有自动垃圾回收机制,执行环境负责管理代码执行过程中使用的内存

### 标记清除

这是最常用的垃圾回收方式

当变量进入环境（例如，在函数中声明一个变量）时，将这个变量标记为 “进入环境” 。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为我们在这个环境中可能随时会用到它们。当变量离开环境时，则将其标记为 “离开环境”。

### 引用计数

引用计数的含义就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，这个值的引用次数就是 1。如果同一个值又被赋值给另一个变量，则引用次数加 1。相反，如果包含对这个值的引用的变量有取了另一个值，则引用次数减 1。当这个值的引用次数变为 0 时，说明已经没法再访问这个值了，因此可以将其占用的内存回收了。

这种回收方式会出现一个问题,那就是循环引用,比如两个对象的属性互相引用,在自己递归实现深拷贝的时候有碰到,需要注意,因此这种回收方式很少用

## call、apply、bind 实现

### 1. call

- **call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法**

- **call 的实现思路:当函数调用 call 的时候,将函数设置为对象的属性,执行函数后删除,执行时函数 this 已经指向 call 方法参数对象**

  ```js
  //目标对象
  var foo = {
    value: 1,
  }
  //目标函数
  var bar = function () {
    console.log(this.value) //1
  }
  //call方法
  Function.property.call2 = function (context) {
    //这里this为bar函数
    context.fn = this
    context.fn()
    delete context.fn
  }
  //调用
  bar.call2(foo)
  ```

- #### 绑定参数

  ```js
  Function.prototype.call2 = function (context) {
    // 首先要获取调用call的函数，用this可以获取
    console.log(arguments)
    var args = []
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i + 1])
    }
    context.fn = this
    context.fn(...args)
    delete context.fn
  }

  // 测试一下
  var foo = {
    value: 1,
  }

  function bar(a, b, c) {
    console.log(this.value, a, b, c)
  }

  bar.call2(foo, 'a', 'b', 2)
  ```

## 浅拷贝、深拷贝

### 浅拷贝

1. #### 数组的浅拷贝

```js
//1.
arr.concat()
//2.
arr.slice()
```

2. #### 实现浅拷贝

```js
function clone(obj) {
  if (typeof obj != 'object') return obj
  var res = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key]
    }
  }
  return res
}
```

### 深拷贝

**1. 序列化对象实现深拷贝,不能识别函数**

```js
JSON.parse(JSON.stringfy(obj))
```

**2. 手动实现,在浅拷贝的基础上递归即可**

```js
//WeakMap解决对象循环引用问题
function deepClone(obj, weakMap = new WeakMap()) {
  if (typeof obj != 'object') return obj
  var isArray = obj instanceof Array
  var res = isArray ? [] : {}
  if (!isArray) {
    if (weakMap.get(obj)) return {}
    weakMap.set(obj, {}.toString.call(obj))
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], weakMap)
    }
  }
  return res
}
```

## 排序算法

稳定性:待排序的记录中,存在多个具有相同关键字的记录,经过排序后,这些记录的相对序列保持不变,则称算法是稳定的,否则是不稳定的

### 冒泡排序

- **相邻元素两两比较**

```js
function bubbleSort(arr){
  let len = arr.length
  for(int i=0;i<len-1;i++){
    for(int j=0;j<len-i;j++){
      if(arr[j]>arr[j+1]){
        let temp = arr[j]
        arr[j]=arr[j+1]
        arr[j+1]=temp
      }
    }
  }
  return arr
}
```

### 快速排序

```js
```

### 选择排序

- **将每个元素 a 与其对应后面的元素比较,保存最小值的下标,与 a 对换**

```js
function selectSort(arr) {
  let len = arr.length
  let temp, minIdx
  for (let i = 0; i < len - 1; i++) {
    minIdx = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j
      }
    }
    temp = arr[minIdx]
    arr[minIdx] = arr[i]
    arr[i] = temp
  }
  return arr
}
```

### 插入排序

最佳情况：T(n) = O(n)
最坏情况：T(n) = O(n2)
平均情况：T(n) = O(n2)

```js
function insert(arr) {
  let len = arr.length
  let temp
  for (let i = 0; i < len - 1; i++) {
    let preIdx = i
    let current = arr[i + 1]
    while (preIdx >= 0 && current < arr[preIdx]) {
      arr[preIdx + 1] = arr[preIdx]
      preIdx--
    }
    arr[preIdx + 1] = current
  }
  return arr
}
```

## 数组去重

### 循环

```js
//双重循环
function unique(arr) {
  let res = [arr[0]]
  let len = arr.length
  for (let i = 1; i < len; i++) {
    let flag = true
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      res.push(arr[i])
    }
  }
  return res
}
//利用indexOf
function unique(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}
```

### 对象属性去重

```js
function unique(arr) {
  let len = arr.length
  let res = []
  let obj = {}
  for (let i = 0; i < len; i++) {
    if (!obj.hasOwnProperty(arr[i])) {
      obj[arr[i]] = arr[i]
    }
  }
  return Object.values(arr)
}
```

> [Js 的事件循环(Event Loop)机制以及实例讲解](https://segmentfault.com/a/1190000015317434)

## js 事件循环

**js 是单线程语言,事件循环是为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，防止主线程阻塞**

- **主线程**

  一些具有回调函数的事件将进入执行栈中,等待主线程读取,等待主线程读取,遵循先进先出原则。主线程循环：即主线程会不停的从执行栈中读取事件，会执行完所有栈中的同步代码。当遇到一个异步事件后，并不会一直等待异步事件返回结果，而是会将这个事件挂在与执行栈不同的队列中，我们称之为任务队列(Task Queue)。当主线程将执行栈中所有的代码执行完之后，主线程将会去查看任务队列是否有任务。如果有，那么主线程会依次执行那些任务队列中的回调函数。

- **宏任务与微任务**

  异步任务分为 宏任务(macrotask) 与 微任务 (microtask)，

  宏任务(macrotask):
  script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

  微任务(microtask):
  Promise、 MutaionObserver、process.nextTick(Node.js 环境)

- **Event Loop(事件循环)**

  1. 执行栈选择最先进入队列的宏任务
  2. 然后执行微任务
  3. ...循环执行完全部任务(宏任务-微任务-宏任务)

## Promise

- 实现

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function MyPromise(fn) {
  let self = this
  self.value = null
  self.error = null
  self.status = PENDING
  self.onFulfilled = null
  self.onRejected = null
  function resolve(value) {
    if (self.status === PENDING) {
      setTimeout(() => {
        this.status = FULFILLED
        self.value = value
        self.onFulfilled(self.value)
      })
    }
  }

  function reject(error) {
    if (self.status === PENDING) {
      setTimeout(() => {
        console.log(self)
        this.status = REJECTED
        self.error = error
        self.onRejected(self.error)
      })
    }
  }
  fn(resolve, reject)
}

MyPromise.prototype.then = function (onFulfilled) {
  console.log(onFulfilled, onRejected)
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else {
    onRejected(this.error)
  }
  return this
}
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
```

> [JavaScript 深入之史上最全--5 种 this 绑定全面解析 #20](https://github.com/yygmind/blog/issues/20)

## this 绑定规则

**1. 默认绑定:根据函数调用位置**

```js
function baz() {
  // 当前调用栈是：baz
  bar() // <-- bar的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置在 baz 中

  console.log('bar')
  foo() // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置在 bar 中

  console.log('foo')
}

baz() // <-- baz 的调用位置
```

**2. 隐式绑定:当函数引用有上下文对象时，隐式绑定规则会把函数中的 this 绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。**

```js
//在·对象中调用,指向对象,谁调用即指向谁
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo,
}

obj.foo() // 2
```

**3. 显示绑定:通过 call 或者 apply 方法。**

```js
var foo = function () {
  console.log(this.a) //1
}
var obj = {
  a: 1,
}
foo.call(obj)
```

**4. new 绑定**

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

**5. 箭头函数:箭头函数的 this 是在定义函数时绑定的，不是在执行过程中绑定的**

## 继承

## 造世主 Object

- **原型概念**

  每一个 js 对象(除 null)都有另一个对象有关联,这里另一个对象就是原型,每个对象都从原型继承属属性

- **对象创建方式**

  1. 对象直接量

  ```js
  var o1 = {}
  ```

  2. 关键字 new,实现一个 new,然后创建一个对象的过程

     1. 创建一个没有原型的对象

     2. 将传入的构造函数的 prototype 绑定到创建的对象原型

     3. 构造函数 this 指向创建的对象,附带我们传入的参数,没有这一步,我们 new 一个对象的时候就没有构造函数生成的属性

  ```js
  function newObject() {
    //1.
    var obj = Object.create(null)
    //去除参数里的构造函数
    Constructor = [].shift.call(arguments)
    //2.
    obj.__proto__ = Constructor.prototype
    //3.
    Constructor.apply(obj, arguments)

    return obj
  }

  var factory = (name.age){
    this.name=name
    this.age=age
  }

  var obj = newObject(factory,'xjq',23)
  ```

  3. Object.create

  ```js
  var o1 = Object.create({ a: 1, b: 2 })
  //传入null可以创建没有原型的对象
  var o2 = Object.creare(null)
  ```

## 观察者模式

```js
function eventEmitter() {
  this.handlers = {}
}

eventEmitter.prototype.on = function (type, handle) {
  if (!this.handlers[type]) {
    this.handlers[type] = []
  }
  this.handlers[type].push(handle)
}

eventEmitter.prototype.emit = function () {
  var type = Array.prototype.shift.call(arguments)
  if (!this.handlers[type]) {
    return
  }
  this.handlers[type].forEach((item, index) => {
    var handler = this.handlers[type][index]
    handler.apply(this, arguments)
  })
}

const _ = new eventEmitter()

_.on('test', function ({ a }) {
  console.log('test' + a)
})

_.emit('test', { a: 111 })
```

## 数组

### 扁平化数组

#### 递归

```js
function flatten(arr) {
  let res = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = [...res, flatten(item)]
    } else {
      res.push(item)
    }
  })
  return res
}
```

### es3 中的一些方法

**1. join:将数组中的元素转化为字符串连接到一起**

```js
var arr = [1, 2, 3]
arr.join() //"1,2,3"
arr.join('') //"123"
arr.join(' ') //"1 2 3"
```

**2. reverse:将数组中的元素颠倒顺序,返回逆序数组**

```js
var arr = [1, 2, 3]
arr.reverse() //[3,2,1]
```

**3. sort:返回排序后的数组**

```js
var arr = ['cba', 'abc', 'bac']
//不带参数时按字母表排序
arr.sort() //["abc","bac","cba"]

//需要按其他方式排序时,需要传入比较方法,根据参数方法返回的值负数、0、正数决定排序顺序
var arr = [123, 23, 3]
arr.sort(function (a, b) {
  return a - b
}) //[3,23,123]
arr.sort(function (a, b) {
  return b - a
}) //[123,23,1]
```

**4. concat:合并数组,具体使用如下**

```js
var arr = [1, 2, 3]

//参数为非数组时
arr.concat(4, 5) //[1,2,3,4,5]

//参数为数组时
arr.concat([4, 5]) //[1,2,3,4,5]

//多个参数都为数组时
arr.concat([4, 5], [6, 7]) //[1,2,3,4,5,6,7]

//多个参数数组与非数组都有时
arr.concat(4, [5, [6, 7]]) //[1,2,3,4,5,[6,7]],这里不会递归扁平化数组
```

**5. slice:数组切片**

```js
var arr = [1, 2, 3, 4, 5]
//两个参数,第一个为起始下标,第二个截止下标,左开右闭
arr.slice(0, 3) //[1,2,3]

//一个参数,起始下标到数组尾部
arr.slice(3) //[4,5]

//
arr.slice(1, -1) //[2,3,4]
arr.slice(-3, -2) //[3]
```

**6. splice:往数组插入或删除元素,第三种情况多参数时稍微有点复杂**

```js
//只有一个参数时,返回从指定数组中删除的元素数组,原来的数组会改变
var arr = [1, 2, 3, 4, 5]
arr.splice(3) //[5],arr为[1,2,3,4]

//两个参数时
arr = [1, 2, 3, 4, 5]
arr.splice(1, 3) //[2,3,4],arr为[1,5]

//三个参数以上,第一个参数决定删除元素起始下标,第二个决定删除个数,后面的删除是待插入数组,从第一个参数下标开始插入
arr = [1, 2, 3, 4, 5, 6]
arr.splice(1, 2, [2, 3], 0) //[2,3],arr为[1,[2,3],0,4,5,6]
```

**7. 首尾插入删除方法:push、pop、shift、unshift**

**8. toString:将每个元素转为字符串、并输出以逗号为分隔符的字符串列表**

```js
var arr = [1, 2, 3]
arr.toString() //"1,2,3"

//递归转化
arr = [1, 2, 4, [4, 5, [6, 7]]]
arr.toString() //"1,2,4,4,5,6,7"
```

### es5 中定义了 9 个新的数组方法来遍历、映射、过滤、检测、简化、检索数组

**1. forEach(常用):从头至尾遍历数组,为每个元素调用指定的函数,forEach 有三个参数:分别是数组元素、元素索引、数组本身,forEach 无法提前终止遍历**

**2. map:将调用的数组的每个元素传给指定的函数,并返回一个新数组,不影响原数组(react 中经常使用)**

```js
var arr = [1, 2, 4]
arr.map(function (x) {
  return x * x
}) //[1,4,16]
```

**3. filter:filter 方法返回的数组元素是调用数组的一个子集,传递的函数用作逻辑判断,返回 true 或 false,true 则代表元素是子集成员**

```js
var arr = [1, 2, 3, 4, 5]
arr.filter(function (x) {
  return x < 3
}) //[1,2]
```

**4. every 和 some:数组的逻辑判断,他们对数组元素应用指定的函数进行判断,返回 true 或 false,every 方法针对所有元素,当数组中所有元素调用函数返回 true 时才返回 true,some 只要有一个返回 true,即为 true**

```js
var arr = [1, 2, 3, 4]
arr.every(function (x) {
  return x > 0
}) //true
arr.some(function (x) {
  return x > 3
}) //true
```

**5. reduce:用指定的函数将数组元素进行组合,生成单个值,他有两个参数,第一个是处理函数,第二个是初始值,不传时默认数组第一个元素**

```js
var arr = [1, 2, 3, 4]
//求和操作
arr.reduce(function (x, y) {
  return x + y
}, 0) //10

//求积
arr.reduce(function (x, y) {
  return x * y
}, 1)

//求最大值
arr.reduce(function (x, y) {
  return x > y ? x : y
})
```

**6. indexOf 和 lastIndexOf:搜索数组中具有给定值的元素,有就返回第一个元素索引,没有就返回-1,lastIndexOf 是反向搜索**

```js
var arr = [1, 2, 4, 3, 2]

arr.indexOf(2) //1
arr.indexOf(9) //-1
```

## 跨域

- **同源策略**

  同源策略是 js 代码能够操作哪些 web 内容的一条完整的安全限制,引起同源策略的因素有域名、协议(http 和 https)、端口

## window 对象

- **location:浏览器当前窗口显示的 url**

  1. protocol: 协议(http 和 https)
  2. host:域名+端口
  3. hostName:域名
  4. port:端口
  5. search:参数,?后的 url
  6. reload 方法:刷新页面

- **history:该窗口的 history 对象**

  1. length:浏览历史记录数量
  2. back():返回上一次浏览记录
  3. forward():前进
  4. go():跳转多层记录

- **navigator:浏览器厂商和版本信息**

  这篇用到 navigator 对象,区分手机浏览器,[手机浏览器的识别](http://lxjq.icu/Javascript/Browser-identification.html)
