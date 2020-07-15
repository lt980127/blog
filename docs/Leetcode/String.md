---
title: 字符串
---

## 14. 最长公共前缀

```js
function longestCommonPrefix(strs) {
  // Talk is cheap, show me the code
  if (!strs.length) return ''
  let prefix = strs[0]
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1)
      if (prefix === '') return ''
    }
  }
  return prefix
}
```

## 125.验证回文串

双指针,主要是验证很麻烦

```cpp
bool isPalindrome(char * s){
    unsigned long len = strlen(s);
    if(!len){
        return true;
    }
    int i=0,j=--len;
    while(i<j){
        if(!isalnum(s[i])){
            i++;
            continue;
        }
        if(!isalnum(s[j])){
            j--;
            continue;
        }

        if(isalpha(s[i])&&isalpha(s[j])){
            if((islower(s[i])&&islower(s[j]))||(isupper(s[i])&&isupper(s[j]))){
                if(s[i]!=s[j])return false;
            }else if(s[i]<s[j]){
                if((s[j]-32)!=s[i])return false;
            }else{
                if((s[i]-32)!=s[j])return false;
            }
        }else{
            if(s[i]!=s[j])return false;
        }
        j--;
        i++;
    }
    return true;
}
```

## 520.检测大写字母

1. 前两个都是大写字母就判断后面的是不是大写

2. 第二个是小写字母就判断后面的是不是小写

```cpp
bool detectCapitalUse(char * word){
    unsigned long len = strlen(word);
    if(!len)return false;
    if(len==1)return true;
    if(isupper(word[0])&&isupper(word[1])){
        for (int i=2; i<len; i++) {
            if(islower(word[i]))return false;
        }
        return true;
    }else if(islower(word[1])){
        for (int i=2; i<len;i++) {
            if(isupper(word[i]))return false;
        }
        return true;
    }
    return false;


}
```

## 28.实现 strStr()

经典 KMP 算法

```cpp
int* cal_next(char* str,int len){
    int *next =(int*)malloc(sizeof(int)*len);
    //这里不初始化为0,会报数组越界,str[i]的时候
    for(int i=0;i<len;i++){
        next[i]=0;
    }
    next[0]=-1;
    int i=0,j=1;
    while (j<len) {
        if(i==-1||str[i]==str[j]){
            i++;
            j++;
            if(j<len)next[j]=i;
        }else{
            i=next[i];
        }
    }
    return next;
}

int strStr(char * haystack, char * needle){
    int hLen,nLen;
    hLen = strlen(haystack);
    nLen = strlen(needle);
    if(!nLen)return 0;
    if(!hLen)return -1;
    int *next_;
    next_ = cal_next(needle,nLen);
    int i=0,j=0;

    while (i<hLen) {
        if(j==-1||haystack[i]==needle[j]){
            i++;
            j++;
            if(j==nLen)return i-j;
        }else{
            j=next_[j];
        }
    }
    return -1;
}
```

## 344.反转字符串

双指针,只不过这里的右指针由左指针计算得出

```cpp
void reverseString(char* s, int sSize){
    if(!sSize||sSize==1)return;
    int i=0,tmp;
    while (i<(sSize/2)) {
        tmp = *(s+i);
        *(s+i) = *(s+sSize-1-i);
        *(s+sSize-1-i) = tmp;
        i++;
    }
}
```

## 58.最后一个单词的长度

1. 空字符串返回 0
2. 全是空格返回 0
3. 有最后一个单词,但是最后一个单词后面有空格,用一个变量 flag 记录

```cpp
int lengthOfLastWord(char * s){
    int len = strlen(s);
    if(!len)return 0;
    len--;
    int flag=0;
    int retLen=0;
    while(len>=0){
        if(s[len]==32&&flag){
            return retLen;
        }else if(s[len]!=32){
            flag=1;
            retLen++;
        }
        len--;
    }
     return retLen;
}
```

## 387.字符串中的第一个唯一字符

计数排序

```cpp
int firstUniqChar(char * s){
    int len = strlen(s);
    if(!len)return -1;

    int en[26]={0};
    for(int i=0;i<len;i++)en[s[i]-'a']++;
    for(int i=0;i<len;i++){
        if(en[s[i]-'a']==1)return i;
    }
    return -1;
}
```

## 103.分糖果 II

以糖果数循环到 0 为止

```cpp
int* distributeCandies(int candies, int num_people, int* returnSize){
    int *ret,tmp=1,j=0;
    ret = (int*)malloc(sizeof(int)*num_people);
    for(int i=0;i<num_people;i++)ret[i]=0;
    while(candies>0){
        if(j==num_people)j=0;
        ret[j++]+=candies<tmp?candies:tmp;
        candies-=tmp++;
    }
    *returnSize=num_people;
    return ret;
}
```
