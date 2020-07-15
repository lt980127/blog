---
title: 排序
---

## 26. 删除排序数组中的重复项

快慢指针

```cpp
int removeDuplicates(int* nums, int numsSize){
    if(numsSize==0){
        return 0;
    }
    int index=0;
    for(int i=1;i<numsSize;i++){
        if(nums[index]!=nums[i]){
            nums[++index]=nums[i];
        }
    }
    return ++index;
}
```

## 349. 两个数组的交集

排序,去重,双指针

```cpp
//去重,这里在原数组上操作,返回非重数组段长度
int set(int* arr,int size){
    if(size<2)return size;
    int index=0;
    for(int i=1;i<size;i++){
        if(arr[i]!=arr[index]){
            arr[++index]=arr[i];
        }
    }
    return ++index;
}

//将相同字段加入新数组
int* mainrun(int* arr1,int index1,int* arr2,int index2,int *returnSize){
    int *res;
    int j=0,i=0,len,index=0;
    len = index1<index2?index1:index2;
    res = (int*)malloc(sizeof(int)*len);
    while(j<index2&&i<index1){
        if(arr1[i]>arr2[j]){
            j++;
        }else if(arr1[i]==arr2[j]){
            res[index++]=arr1[i];
            i++;
            j++;
        }else{
            i++;
        }
    }
      *returnSize = index;
    return res;
}
int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize){
    int index2,index1,*ret;
    //排序
    quickSort(nums1,0,nums1Size-1);
    quickSort(nums2,0,nums2Size-1);

    //去重拿到两个非重数组长度
    index1 = set(nums1,nums1Size);
    index2 = set(nums2,nums2Size);

    //运行主函数,拿到结果
    ret = mainrun(nums1,index1,nums2,index2,returnSize);
    return ret;
}

```

## 360. 两个数组的交集 2

这题紧接两个数组的交集,1 中先排序再去重再筛选相同元素,这题免去去重即可(省事,溜了溜了)

```cpp
//将相同字段加入新数组
int* mainrun(int* arr1,int nums1Size,int* arr2,int nums2Size,int *returnSize){
    int *res;
    int j=0,i=0,len,index=0;
    len = nums1Size<nums2Size?nums2Size:nums1Size;
    res = (int*)malloc(sizeof(int)*len);
    while(j<nums2Size&&i<nums1Size){
        if(arr1[i]>arr2[j]){
            j++;
        }else if(arr1[i]==arr2[j]){
            res[index++]=arr1[i];
            i++;
            j++;
        }else{
            i++;
        }
    }
    *returnSize = index;
    return res;
}
int* intersect(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize){
    int *ret;

    //快排
    quickSort(nums1,0,nums1Size-1);
    quickSort(nums2,0,nums2Size-1);

    //运行主函数,拿到结果
    ret = mainrun(nums1,nums1Size,nums2,nums2Size,returnSize);
    return ret;
}
```

## 976. 三角形的最大周长

先做排序,然后从高位循环找到第一组便是最大周长

```cpp
int largestPerimeter(int* A, int ASize){

    //快排
    quickSort(A, 0, ASize-1);

    for(int i=ASize-1;i>1;i--){
        if(A[i]<A[i-1]+A[i-2]){
            return A[i]+A[i-1]+A[i-2];
        }
    }
    return 0;
}
```

## 922. 按奇偶排序数组 2

#### 解法一

双指针,遍历奇数项,对比另一指针所指偶数项,不符合条件即调换位置

时间复杂度很高,在遍历偶数项时 while 循环所致

```cpp
int* sortArrayByParityII(int* A, int ASize, int* returnSize){
    int tmp;
    int j=1;
    for(int i=0;i<ASize;i+=2){
        if(A[i]%2!=0){
            while(j<ASize){
                if(A[j]%2==0){
                    tmp =A[i];
                    A[i]=A[j];
                    A[j]=tmp;
                    break;
                }else{
                    j+=2;
                }
            }
        }
    }
    *returnSize=ASize;
    return A;
}
```

## 面试题 10.01. 合并排序的数组

从数组尾部遍历对比

```cpp
void merge(int* A, int ASize, int m, int* B, int BSize, int n){
    int i = m-1;
    int j = n-1;
    while(ASize--){
        if(i < 0) {
            *(A+ASize) = *(B+j--);
        }else if(j < 0) {
            *(A+ASize) = *(A+i--);
        }else{
            *(A+ASize) = (*(A+i)>*(B+j)?*(A+i--):*(B+j--));
        }
    }
}
```

## 242. 有效的字母异位词

1. 用一个 26 容量的数组初始化为{0}

2. 遍历字符串,以第一个字符串中字符为索引对桶数组元素+1,以第二个字符串中字符为索引对桶数组元素-1

3. 遍历桶数组,有元素不为 1 直接返回 false

```cpp
#include <string.h>
bool isAnagram(char * s, char * t){
    int sLen,tLen;
    sLen = strlen(s);
    tLen = strlen(t);
    if(sLen!=tLen){
        return false;
    }
    int e[26] = {0};
    for(int i=0;i<sLen;i++){
        e[(int)s[i]-97]++;
        e[(int)t[i]-97]--;
    }
    for(int i=0;i<26;i++){
        if(e[i]!=0){
            return false;
        }
    }
    return true;
}
```

## 179. 最大数

冒泡排序,比较相邻元素合成字符串之后的降序排序

```js
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
  let tmp
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if ('' + nums[i] + nums[j] < '' + nums[j] + nums[i]) {
        tmp = nums[i]
        nums[i] = nums[j]
        nums[j] = tmp
      }
    }
  }
  let ret = nums.join('')
  return ret == 0 ? '0' : ret
}
```
