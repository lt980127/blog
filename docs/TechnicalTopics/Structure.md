---
title: 数据结构
---

## 栈

```js
function Stack(arr) {
  this.arr = arr
}

Stack.prototype.push = function (o) {
  this.arr.push(o)
}

Stack.prototype.pop = function (o) {
  this.arr.pop(o)
}

Stack.prototype.isEmpty = function (o) {
  return this.arr.length === 0
}

Stack.prototype.top = function (o) {
  return this.arr[this.arr.lenght - 1]
}

Stack.prototype.clear = function (o) {
  this.arr = []
}
Stack.prototype.size = function (o) {
  return this.arr.length
}
```

## 队列

```js
function Queue() {
  this.arr = []
}

Queue.prototype.enqueue = function (o) {
  this.arr.push(o)
}

Queue.prototype.dequeue = function (o) {
  this.arr.shift()
}

Queue.prototype.front = function (o) {
  return this.arr[0]
}

Queue.prototype.isEmpty = function (o) {
  return this.arr.length === 0
}

Queue.prototype.size = function (o) {
  return this.arr.length
}
```

## 链表

单链表

```js
function Node(elem) {
  this.elem = elem
  this.next = null
}

function LinkedList() {
  this.node = null
  this.next = null
  this.head = null
  this.length = 0
}

LinkedList.prototype.append = function (o) {
  const node = new Node(o)

  if (this.head === null) {
    this.head = node
    this.node = node
  } else {
    this.node.next = node
    this.node = node
  }

  this.length++
}

LinkedList.prototype.insert = function (position, elem) {
  const len = this.length()
  if (position < 0 || position > len) {
    throw new Error('越界')
  }
  if (position === undefined || elem === undefined) {
    throw new Error('insert调用参数不全')
  }
  if (position === len) {
    this.append(elem)
    return
  }
  let index = 0
  let cur = this.head

  while (index < position) {
    cur = cur.next
    index++
  }
  let nextNode = cur.next
  let newNode = new Node(elem)
  newNode.next = nextNode
  cur.next = newNode

  this.length++
}

LinkedList.prototype.find = function (elem) {
  let cur = this.head
  while (cur) {
    if (cur.elem === elem) {
      return cur
    }
    cur = cur.next
  }
  return null
}

LinkedList.prototype.findPre = function (elem) {
  let cur = this.head
  while (cur) {
    if (cur.next && cur.next.elem === elem) {
      return cur
    }
    cur = cur.next
  }
  return null
}

LinkedList.prototype.remove = function (elem) {
  const preNode = this.findPre(elem)
  console.log(preNode)
  if (!preNode) {
    throw new Error('找不到该元素')
  }
  preNode.next = preNode.next.next
  this.length--
}

LinkedList.prototype.log = function () {
  let cur = this.head
  while (cur) {
    console.log(cur.elem)
    cur = cur.next
  }
}
```

### 双向链表

```js
function Node(elem) {
  this.elem = elem
  this.next = null
  this.pre = null
}

function LinkedList() {
  this.node = null
  this.head = null
  this.length = 0
}

LinkedList.prototype.append = function (elem) {
  const newNode = new Node(elem)
  if (this.head) {
    this.node.next = newNode
    newNode.pre = this.node
  } else {
    this.head = newNode
  }
  this.node = newNode
}

LinkedList.prototype.find = function (elem) {
  let cur = this.head
  while (cur) {
    if (cur.elem === elem) {
      return cur
    }
    cur = cur.next
  }
  return null
}

LinkedList.prototype.remove = function (elem) {
  let findNode = this.find(elem)
  if (!findNode.pre) {
    findNode.next.pre = null
    this.head = findNode.next
  } else if (!findNode.next) {
    findNode.pre.next = null
  } else {
    let nextNode = findNode.next
    findNode.pre.next = nextNode
    nextNode.pre = findNode.pre
  }

  findNode = null
}

LinkedList.prototype.log = function () {
  let cur = this.head
  while (cur) {
    console.log(cur)
    cur = cur.next
  }
}
```