$(function () {
    var Pwidth = $(window).width();
    var Pheight = $(window).height();
    var oBox1 = document.getElementById('box1');
    var oBox2 = document.getElementById('box2');
    var people = document.getElementById('people');
    var score = document.getElementById('score');
    var jieshao = document.getElementById('jieshao');
    var ready = document.getElementById('ready');

    var preLeft = null;
    // 接球总数
    var count = 0;
    // 掉落总数
    var diaoLuoCount = 0;

    $('#ready').on('click',function(){
        jieshao.style.display = "none";

        oBox1.style.display = "block";
        oBox2.style.display = "block";
        people.style.display = "block";

        lefttuxiang(oBox1, 20);
        righttuxiang(oBox2, 20);
    
    
        // 监听鼠标移动事件，并把鼠标left位置发给底部的图像，图像固定在底部，只能左右移动
        $(document).on('mousemove',function (e) {
            // 边界检测
            if(e.pageX<79){
                $('#people').css({
                    left: 0
                });
            }else if(e.pageX>(Pwidth-79)){
                $('#people').css({
                    left: Pwidth - 158
                });
            }else{
                $('#people').css({
                    left: e.pageX - 79
                });
            }
            
        });   

    });

    function lefttuxiang(obj, time) {
        // 设置变量
        // 变量1：球的起始left值
        var defaultLeft = 0;
        // 设置球从屏幕的上半部分飞出
        var suiJiTop = Math.random() * 300;
        // 设置球的运动轨迹 抛物线的弯曲率，数字越小抛的越远
        var suiJiLv = [0.0005, 0.0007, 0.0009, 0.0011, 0.002];
        // 计算一个随机的下标，用于取上面的suiJiLv
        var suijixiabiao = Math.floor(Math.random() * 5);
        // 开启定时器，开始运动
        obj.timeId = setInterval(function () {
            // 球的left值在原来的基础上增加10
            defaultLeft += 10;
            // 将计算的坐标，存在变量里，方便后面用于计算
            var x = defaultLeft;
            var y = suiJiLv[suijixiabiao] * defaultLeft * defaultLeft + suiJiTop;
            obj.style.left = x + 'px';
            obj.style.top = y + 'px';

            // 判断球是否撞到接球的图片
            var picLeft = $('#people').position().left;
            var picTop = $('#people').position().top;
            if(x>=(picLeft-15) && x<=(picLeft+200) && y>=(picTop-15)){
                // 击中
                // 满足条件，清除此次运动的定时器
                clearInterval(obj.timeId);
                // 重新调用自己，开始下次运动
                lefttuxiang(obj, time);
                // 得分+1
                count++;
                score.innerText = count;  
                $(score).stop(true,false).animate({width:50,height:50,top:-20,right:-20,lineHeight:'50px'},500,function(){
                    $(score).css({width:25,height:25,top:-10,right:-10,lineHeight:'25px'});
                });        
            }

            // 判断是否运动出屏幕，决定是否停止此次运动。
            if (x > Pwidth || y > Pheight) {
                diaoLuoCount++;
                if(diaoLuoCount>=5){
                    alert('游戏结束');
                    // 刷新页面
                    location.reload();
                }
                // 满足条件，清除此次运动的定时器
                clearInterval(obj.timeId);
                // 重新调用自己，开始下次运动
                lefttuxiang(obj, time);
            }
        }, time);
    }
    function righttuxiang(obj, time) {
        // 变量1：球的起始right值
        var defaultRight = 0;
        var suiJiTop = Math.random() * 300;
        var suiJiLv = [0.0005, 0.0007, 0.0009, 0.0011, 0.002];
        var suijixiabiao = Math.floor(Math.random() * 5);
        obj.timeId = setInterval(function () {
            
            // 球的right值在原来的基础上增加10
            defaultRight += 10;
            var x = defaultRight;
            var y = suiJiLv[suijixiabiao] * defaultRight * defaultRight + suiJiTop;
            obj.style.right = x + 'px';
            obj.style.top = y + 'px';

            // 判断球是否撞到接球的图片
            var boxLeft = obj.offsetLeft;
            
            var picLeft = $('#people').position().left;
            var picTop = $('#people').position().top;
            if(boxLeft>=(picLeft-15) && boxLeft<=(picLeft+200) && y>=(picTop-15)){
                // 击中
                // 满足条件，清除此次运动的定时器
                clearInterval(obj.timeId);
                // 重新调用自己，开始下次运动
                righttuxiang(obj, time);
                // 得分+1
                count++;
                score.innerText = count;     
                $(score).stop(true,false).animate({width:50,height:50,top:-20,right:-20,lineHeight:'50px'},500,function(){
                    $(score).css({width:25,height:25,top:-10,right:-10,lineHeight:'25px'});
                });        
            }

            if (x > Pwidth || y > Pheight) {
                diaoLuoCount++;
                if(diaoLuoCount>=5){
                    alert('游戏结束');
                    location.reload();
                }
                clearInterval(obj.timeId);
                righttuxiang(obj, time);
            }
        }, time);
    }


});

