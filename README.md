## 简介
   
   jquery和原生js写的一个接球的小游戏，比较简单，但是小球运动的路线抛物线的绘制，感觉比较有趣，是使用抛物线方程来绘制的。

## 抛物线方程

[百度百科抛物线方程](https://baike.baidu.com/item/%E6%8A%9B%E7%89%A9%E7%BA%BF%E6%96%B9%E7%A8%8B/2021428)

<pre>
方程的具体表达式为y=a*x*x+b*x+c
1、a>0，则抛物线开口朝上；a<0，则抛物线开口朝下；
2、b=0, 最高点x轴位置为0
3、若抛物线交y轴为正半轴，则c>0。若抛物线交y轴为负半轴，则c<0。
</pre>

   其中使用的公式是y=a*x*x+b*x+c，抛物线开口向下的方程式。
   x为数学上x轴的坐标，y为数学上y轴的坐标，因为js里面y轴是向下为正，所以公式里的a>0 ，抛物线开口朝上
   a是一个常量，这个常量决定抛物线的弯曲率。
   
## 具体实现

   我们这里的思路是，定义一个定时器，每次将x的值增加10个像素，利用公式算出对应的y值，将x值和计算出的y值，赋值给小球坐标，这样可以得到一个抛物线运动的小球。
   
  ``` 
  obj.timeId = setInterval(function () {
            // 球的left值在原来的基础上增加10
            defaultLeft += 10;
            // 将计算的坐标，存在变量里，方便后面用于计算
            var x = defaultLeft;
            // 这里运用抛物线方程计算小球的y值，y = a * x * x + c;
            var y = suiJiLv[suijixiabiao] * defaultLeft * defaultLeft + suiJiTop;
            obj.style.left = x + 'px';
            obj.style.top = y + 'px';
            ...
            },time)
 ```
 
