---
title: 数组
---

## 217.存在重复元素

先排序,然后相邻元素对比

```cpp
int cmp_int(int* a,int* b){
    return *a-*b;
}
bool containsDuplicate(int* nums, int numsSize){
    if(numsSize==0||numsSize==1)return false;
    qsort(nums,numsSize,sizeof(int),cmp_int);
    for(int i=1;i<numsSize;i++){
        if(nums[i]==nums[i-1])return true;
    }
    return false;
}
```

## 34. 在排序数组中查找元素的第一个和最后一个位置

双指针,指针 i 从头往后扫描,指针 j 从后往前

```cpp
int* searchRange(int* nums, int numsSize, int target, int* returnSize){
    int * ret = (int*)malloc(sizeof(int)*2);
    int i=0,j=numsSize-1;
    *returnSize=2;
    ret[0]=-1;
    ret[1]=-1;
    while(i<=j){
        if(nums[i]==target){
            ret[0]=i;
            while((i<numsSize-1)&&(nums[i+1]==target))i++;
            ret[1]=i;
            return ret;
        }else{
            i++;
        }
        if(nums[j]==target){
            ret[1]=j;
            while((j>0)&&(nums[j-1]==target))j--;
            ret[0]=j;
            return ret;
        }else{
            j--;
        }
    }
    return ret;
}
```

## 989.数组形式的整数加法

大数相加,实现加法..

```cpp
int* addToArrayForm(int* A, int ASize, int K, int* returnSize){
    int * ret = (int*)malloc(sizeof(int)*10001);
    for(int i=0;i<10001;i++)ret[i]=0;
    *returnSize=0;

    int i,j=ASize,tmp=0;
    while(K>0||j>0){
        i=K%10;
        K = K/10;
        if(j<=0){
            A[j]=0;
        }else{
            j--;
        }

        ret[*returnSize] += (i+A[j])%10+tmp;
        tmp=i+A[j]>=10?1:0;
        if(ret[*returnSize]>=10){
            ret[*returnSize]=ret[*returnSize]%10;
            tmp=1;
        }
        *returnSize+=1;
    }
    if(tmp==1)ret[(*returnSize)++]=1;
    // 数组反转
    int l=-1,p=*returnSize;

    while((++l)<(--p)){
        tmp=ret[l];
        ret[l]=ret[p];
        ret[p]=tmp;
    }
    return ret;
}
```

## 面试题 57. 和为 s 的两个数字

头尾指针扫描

```cpp
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize){
    if(numsSize<=1){
        *returnSize=0;
        return nums;
    }
    int * ret = (int*)malloc(sizeof(int)*2);
    *returnSize=2;
    int i=0,j=numsSize-1;
    while(i<j){
        if((nums[i]+nums[j])>target){
          j--;
        }else if((nums[i]+nums[j])==target){
            ret[0]=nums[i];
            ret[1]=nums[j];
            break;
        }else{
           i++;
        }

    }
    return ret;
}
```

## 66. 加一

从数组尾部开始循环,,判断两个条件即可,循环到第一个元素还是进 1 就在数组前面加一个为 1 的元素,如果当前元素+1 后不等于 10,直接返回即可,还是 js 写起来更奔放

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let i = digits.length - 1
  while (i >= 0) {
    digits[i] += 1
    if (digits[i] === 10) {
      digits[i] = 0
      if (i === 0) return [1, ...digits]
      i--
    } else {
      return digits
    }
  }
}
```

## 1389. 按既定顺序创建目标数组

```js
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
  let ret = []
  for (let i in nums) {
    ret.splice(index[i], 0, nums[i])
  }
  return ret
}
```

## 561. 数组拆分 I

排序后,取奇数项的和,通过排序,可使得相邻两位数的差最小

```js
var arrayPairSum = function (nums) {
  nums = nums.sort((a, b) => a - b)
  let ret = 0
  for (let i = 0; i < nums.length; i += 2) ret += nums[i]
  return ret
}
```
