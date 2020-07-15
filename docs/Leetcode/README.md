---
title: 动态规划、贪心
sidebarDepth: 2
---

## 动态规划

### 面试题 10- I. 斐波那契数列

f(n)=f(n-1)+f(n-2)

```cpp
int fib(int n){
    if(n==0)return 0;
    if(n==1)return 1;
    unsigned long sum=1,ret=1,tmp;
    for(int k=2;k<n;k++){
        tmp=ret;
        ret=(sum+ret)%1000000007;
        sum=tmp;
    }
    return ret;
}
```

### 面试题 10- II. 青蛙跳台阶问题

同[斐波那契数列](./#面试题-10-i-斐波那契数列)

```cpp
int numWays(int n){
    if(n==0)return 1;
    int pre=0,cur=1,tmp,ret=1;
    for(int i=0;i<n;i++){
        tmp = ret;
        ret = (cur+pre)%1000000007;
        pre = cur;
        cur = ret;
    }
    return ret;
}
```

### 1137. 第 N 个泰波那契数

f(n)=f(n-1)+f(n-2)+f(n-3)

```cpp
int tribonacci(int n){
    if(n==0)return 0;
    if(n==1)return 1;
    if(n==2)return 1;
    unsigned int ret=2,l=1,j=1,tmp;
    for(int k=3;k<n;k++){
        tmp=ret;
        ret += l+j;
        j=l;
        l=tmp;
    }
    return ret;
}
```

### 70. 爬楼梯

f(n) = f(n-1) + f(n-2)

```cpp
int climbStairs(int n){
    if(n==1){
        return 1;
    }
    if(n==2){
        return 2;
    }
    int pre=1,cur=2,ret=2,tmp;
    for(int i=0;i<n-2;i++){
        ret = pre+cur;
        tmp = cur;
        cur = ret;
        pre = tmp;
    }
    return ret;
}
```

### 198.打家劫舍

A[],索引 k

f(k) = max(f(k-2)+A[k],f(k-1))

```cpp
int rob(int* nums, int numsSize){
    if(numsSize==2){
        return max(nums[0],nums[1]);
    }
    if(numsSize==1){
        return nums[0];
    }
    int cur=0,pre=0,tmp;
    for(int i=0;i<numsSize;i++){
        tmp = cur;
        cur = max(cur,pre+nums[i]);
        pre = tmp;
    }
    return cur;
}
```

### 53.最大子序和

问题分解

1. 只有一个元素,最大值就是 nums[0]

2. 两个元素时,前一个元素已经为最大值,只需要将它与后一个元素的和与后一个元素做比较即可,也就是 max(subMax+nums[i],nums[i])

3. i 个元素时,问题也可分解为,最后一个元素与前面元素的比较,前面元素每次的比较我们将最大值存储在 subMax 中,则 i 个元素的最大值为 max(subMax+nums[i],nums[i])

4. subMax 存储的是 i-1 个元素时的最大值,而我们需要循环整个数组,取最大的 subMax,所以在每次循环中,及时对比上一个 subMax,取其中较大值存储为全局最大值 ret

```cpp


int maxSubArray(int* nums, int numsSize){
    if(numsSize==1){
        return nums[0];
    }
    int ret=nums[0],subMax=nums[0];
    for(int i=1;i<numsSize;i++){
        subMax = max(subMax+nums[i],nums[i]);
        ret = max(subMax,ret);
    }
    return ret;
}
```

### 392.判断子序列

#### 解法一

双指针,false 的情况,需要遍历 n 次,用 i 当初 s 串索引,最后也用 i 来判断,遍历完 i 与 s 串长相等为 true

```cpp
bool isSubsequence(char * s, char * t){
    int i=0,j=0;
    unsigned long sLen,tLen;
    sLen =strlen(s);
    tLen =strlen(t);
    while (i<sLen&&j<tLen) {
        if(s[i]==t[j]){
            i++;
            j++;
        }else{
            j++;
        }
    }
    if(i==sLen){
        return true;
    }
    return false;
}
```

#### 解法二

遍历 s 串,用 s[i]再在遍历 t 串的时候比较,遍历完 t 串没有找到相等的,直接 return false,遍历完 s 串都没有返回 false,说明 s 串最后一个字符也在 t 串中找到了,则直接返回 true

```cpp
bool isSubsequence(char * s, char * t){
    unsigned long sLen,tLen;
    sLen =strlen(s);
    tLen =strlen(t);
    int position=0,flag;
    for(int k=0;k<sLen;k++){
        flag=false;
        for(int i=position;i<tLen;i++){
            if(s[k]==t[i]){
                position=i+1;
                flag=true;
                break;
            }
        }
        if(!flag){
            return false;
        }
    }
    return true;
}
```

### 面试题 42. 连续子数组的最大和

动态规划,同[53.最大子序和](./#_53-最大子序和)

## 贪心算法

### 121.买卖股票的最佳时机 1

贪心算法:在每一步中都采用当前最优解

```cpp
int maxProfit(int* prices, int pricesSize){
    int min = INT_MAX;
    int max_value=0;
    for(int i=0;i<pricesSize;i++){
        if(prices[i]<min)min=prices[i];
        max_value=fmax(max_value,prices[i]-min);
    }
    return max_value;
}
```

### 122.买卖股票的最佳时机 2

如果明天减今天的价格是正的,就加到最大利润

```cpp
int maxProfit(int* prices, int pricesSize){
    int max_profit=0;
    for(int i=0;i<pricesSize-1;i++)if((prices[i+1]-prices[i])>0)max_profit+=prices[i+1]-prices[i];
    return max_profit;
}
```

## 堆

### 面试题 40. 最小的 k 个数

1. 快排

```cpp
int min(const int* a,const int* b)return *a-*b;

int* getLeastNumbers(int* arr, int arrSize, int k, int* returnSize){
    qsort(arr,arrSize,sizeof(arr[0]),min);
    *returnSize=k;
    return arr;
}
```

2. 堆排序
