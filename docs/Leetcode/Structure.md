---
title: 数据结构
sidebarDepth: 2
---

## 栈

这里均不考虑动态内存释放问题

### 155. 最小栈

用一个辅助栈记录每次入栈后的最小值

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.arr = []
  this.length = 0
  var HelpMinStack = function () {
    this.arr = []
  }

  HelpMinStack.prototype.push = function (x) {
    this.arr.push(x)
  }

  HelpMinStack.prototype.pop = function () {
    this.arr.pop()
  }

  HelpMinStack.prototype.top = function () {
    return this.arr[this.arr.length - 1]
  }
  var h = new HelpMinStack()
  this.h = h
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.arr.push(x)
  this.length++

  const t = this.h.top()
  if (t === undefined) {
    this.h.push(x)
  } else {
    if (x < t) {
      this.h.push(x)
    } else {
      this.h.push(t)
    }
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.length--
  this.arr.pop()
  this.h.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.arr[this.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.h.top()
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

### 844.比较含退格的字符串

双指针、栈都 ok

```cpp
bool backspaceCompare(char * S, char * T){
    unsigned int sLen = strlen(S);
    unsigned int tLen = strlen(T);
    char * sStack = (char *)malloc(sizeof(char)*sLen);
    char * tStack = (char *)malloc(sizeof(char)*tLen);
    int sTop=-1,tTop=-1;
    for(int i=0;i<sLen;i++){
        if(S[i]=='#'){
            if(sTop!=-1)sTop--;
        }else{
            sStack[++sTop]=S[i];
        }
    }
    for(int i=0;i<tLen;i++){
        if(T[i]=='#'){
            if(tTop!=-1)tTop--;
        }else{
            tStack[++tTop]=T[i];
        }
    }
    if(sTop!=tTop)return false;
    for(int i=0;i<=sTop;i++){
        if(sStack[i]!=tStack[i])return false;
    }
    return true;
}
```

### 496.下一个更大的元素 1

单调栈,官方解答的动图很清晰

1. 找出第二个数组中每个元素对应的下一个更大元素,用哈希表存储

2. 单调栈中没有出栈的元素均是没有下一个更大的元素的,对应将哈希表中值赋为-1

3. 遍历第一个数组,即可找到每个元素的下一个更大的元素

```cpp
int* nextGreaterElement(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize){
    //返回数组
    int * ret = (int*)malloc(sizeof(int)*nums1Size);
    //单调栈
    int * stack = (int*)malloc(sizeof(int)*nums2Size);
    //哈希表,存储每个元素对应的下一个更大元素
    int * hashMap = (int*)malloc(sizeof(int)*10000);
    //栈顶
    int top=-1;
    for(int i=0;i<nums2Size;i++){
        while(top!=-1&&nums2[i]>stack[top]){
            hashMap[stack[top--]] = nums2[i];
        }
        stack[++top]=nums2[i];
    }
    //将栈中剩余元素pop出,并更新哈希表
    while (top>-1) {
        hashMap[stack[top--]]=-1;
    }
    for(int i=0;i<nums1Size;i++){
        ret[i]=hashMap[nums1[i]];
    }
    free(stack);
    free(hashMap);
    *returnSize = nums1Size;
    return ret;
}
```

### 682.棒球比赛

用栈记录每回合得分

```cpp
int calPoints(char ** ops, int opsSize){
    if(!opsSize)return 0;
    //score总得分,tmp存储栈顶元素
    int score=0,tmp;
    //栈,记录每回合得分
    int stack[opsSize];
    int top=-1;

    for(int i=0;i<opsSize;i++){
        tmp=stack[top];
        if(isalpha(ops[i][0])){
            if(ops[i][0]=='C'){
                score-=stack[top--];
            }else{
                score+=tmp*2;
                stack[++top]=tmp*2;
            }
        }else if((ops[i][0]>='0'&&ops[i][0]<='9')||ops[i][0]=='-'){
            score+=atoi(&ops[i][0]);
            stack[++top]= atoi(&ops[i][0]);
        }else{
            score+=tmp+stack[top-1];
            stack[top+1]=tmp+stack[top-1];
            top++;
        }
    }
    return score;
}
```

### 1021.删除最外层的括号

stack 栈对元素进行检索

我们程序对'('都进行入栈操作,只要确保 stack 栈中栈顶不是'(',我们就可以将当前检索的元素入栈到结果

1. 当前元素是'(',入 stack 栈,栈顶不是'(',同时入结果栈

2. 当前元素是')',判断 stack 栈,如果只有一个元素,说明我们找到了一个原语最外层括号,不是的话,就将当前元素入栈结果

```cpp
char * removeOuterParentheses(char * S){
    int len = strlen(S);
    char stack[len+1];
    //栈顶
    int top=-1;
    //结果栈栈顶
    int j=0;
    //主要逻辑
    for(int i=0;i<len;i++){
        if(S[i]=='('){
            stack[++top]=S[i];
            if(top!=0)S[j++]=S[i];
        }else{
            if(top!=0)S[j++] = S[i];
            top--;
        }
    }
    //对结果做处理
    S[j] ='\0';
    return S;
}
```

### 1047.删除字符串中的所有相邻重复项

栈的基本操作

```cpp
char * removeDuplicates(char * S){
    int len = strlen(S);
    int top=-1;
    for(int i=0;i<len;i++){
        if(top!=-1&&S[i]==S[top]){
            top--;
        }else{
            S[++top] = S[i];
        }
    }
    S[++top] = '\0';
    return S;
}
```

## 链表

### 83. 删除排序链表中的重复元素

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  var temp = null
  let cur = head
  while (cur) {
    if (!temp) {
      temp = cur
    } else if (temp.val !== cur.val) {
      temp.next = cur
      temp = cur
    }
    cur = cur.next
  }
  if (temp) {
    temp.next = null
  }
  return head
}
```

### 206. 反转链表

```js
var reverseList = function (head) {
  let prev = null,
    cur = head
  while (cur != null) {
    let nextTmp = cur.next
    cur.next = prev
    prev = cur
    cur = nextTmp
  }
  return prev
}
```

### 面试题 22. 链表中倒数第 k 个节点

快慢指针

```cpp
struct ListNode* getKthFromEnd(struct ListNode* head, int k){
    if(k<1)return NULL;
    if(!head)return NULL;
    struct ListNode* p = head;
    struct ListNode* p1 = head;
    int j=0;
    while(j<k){
        p = p->next;
        j++;
    }
    if(!p&&j>k)return NULL;
    while(p){
        p = p->next;
        p1 = p1->next;
    }
    return p1;
}
```

## 二叉树

### 226.翻转二叉树

递归层序遍历

```cpp
struct TreeNode* invertTree(struct TreeNode* root){
    if(root==NULL)return root;
    struct TreeNode* tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    invertTree(root->left);
    invertTree(root->right);
    return root;
}
```

### 637.二叉树的平均值

先序遍历二叉树,同时一个数组记录每一层节点数之和,一个数组记录每一层节点数
depth 记录二叉树深度,根结点为 1
buffer 记录层节点数之和
num 记录层节点数
len 指针记录层数,也就是结果数组的长度

```cpp
void visitTree( struct TreeNode * root , double * buffer , int * num , int * len , int depth ){
    if(root==NULL)return;
    *( buffer+depth-1 ) += root->val;
    *( num+depth-1 ) += 1;
    if(depth>*len)*len = depth;
    visitTree( root->left , buffer , num , len , depth+1 );
    visitTree( root->right , buffer , num , len , depth +1 );
}

double * averageOfLevels( struct TreeNode * root , int * returnSize ){
    *returnSize = 1;
    if( root == NULL )return NULL;
    double * buffer = ( double * )malloc( sizeof( double ) * 1024 );
    int depth=1;
    int * num = ( int * )malloc( sizeof( int ) * 1024 );
    for( int i = 0 ; i < 1024 ; i++ ){
        *( buffer + i ) = 0.0;
        *( num + i ) = 0;
    }
    visitTree( root , buffer , num , returnSize , depth );
    for( int i = 0 ; i <*returnSize ; i++ )*( buffer + i ) = *( buffer + i ) / *( num + i );
    free( num );
    return buffer;

}
```

### 104.二叉树的最大深度

先序遍历:
指针 depth 记录最大深度
depth2:每深入一层,就会+1

```cpp
void prevTree(struct TreeNode* root,int * depth,int depth2){
    if(root==NULL)return;
    if(depth2>*depth)*depth=depth2;
    prevTree(root->left,depth,depth2+1);
    prevTree(root->right,depth,depth2+1);
}

int maxDepth(struct TreeNode* root){
    if(root==NULL)return 0;
    int depth=1;
    prevTree(root,&depth,1);
    return depth;
}
```

### 938.二叉搜索树的范围和

二叉树先序遍历,同时根据边界值校验

特性:
左子树<当前节点
右子树>当前节点

1. 当前节点<最大值时,遍历右子树
2. 当前节点>最小值时,遍历左子树

```cpp
void prevTree(struct TreeNode* root,unsigned int* count,int L,int R){
    if(!root)return;
    if(root->val>=L&&root->val<=R)*count+=root->val;
    if(root->val>L)prevTree(root->left,count,L,R);
    if(root->val<R)prevTree(root->right,count,L,R);
}

int rangeSumBST(struct TreeNode* root, int L, int R){
    unsigned int count=0;
    prevTree(root,&count,L,R);
    return count;
}
```
