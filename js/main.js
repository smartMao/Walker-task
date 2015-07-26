/**
 * Created by Administrator on 2015/7/26.
 */
function addEvent(obj,type,fn){
    if(document.addEventListener){
        obj.addEventListener(type,fn,false)
    }
}
function removeEvent(obj,type,fn){
    if(document.removeEventListener){
        obj.removeEventListener(type,fn,false)
    }
}
function gteStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr]
}
var get={
    byClass:function(aclass,parent){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(aclass)
        }
        var Oparent=parent?document.getElementById(parent):document,
            eles=[],
            elemts=Oparent.getElementsByTagName("*");
        for(var i=0;i<elemts.length;i++){
            if(elemts[i].className == aclass){
                eles.push(elemts[i])
            }
        }
        return eles;
    }
};
window.onload=function(){
    var aLi=get.byClass("box-con");
    var theBox=get.byClass("theBox")[0];
    var nav_list=get.byClass("nav-list")[0];
    var mainTOP=get.byClass("index-main")[0];
    var head_left=get.byClass("head-nav-left")[0];
    var startTouch,moveTouch,aboveX=0;

    /* 导航动画 开始 */
    var anima=true
    var slider={
        touchStart:function(e){
            e.preventDefault();
            if(!anima){
                return
            }
            $(this).toggleClass("change_wirte_color");
            $(nav_list).slideToggle(500,function(){
                if(mainTOP.offsetTop > 100){
                    $(mainTOP).animate({top:mainTOP.offsetTop - 100 +"px"},500)

                }else{
                    $(mainTOP).animate({top:mainTOP.offsetTop + 100 +"px"},500)
                }
            });
        }
    };
    addEvent(head_left,"touchstart",slider.touchStart);
    /* 导航动画 结束 */

    /* 跳转到添加页面 开始 */
    var location_to_addpage={
        touchStart:function(e){
            e.preventDefault();
            $(this).toggleClass("change_wirte_color")
            location.href="addPage.html"
        }
    };
    var add_one_Li=document.getElementsByClassName("head-wirte")[0];
    addEvent(add_one_Li,'touchstart',location_to_addpage.touchStart)
    /* 跳转到添加页面 结束 */

    /* 左右滑动效果 开始 */
    var event={
        touchStart:function(e){
            //记录手指初始位置
            e.preventDefault();
            var touch = e.changedTouches[0];
            startTouch={
                x:touch.pageX||touch.clientX
            };
            addEvent(this,'touchmove',event.touchMove)
            addEvent(this,'touchend',event.touchEnd)
        },
        touchMove:function(e){
            //计算手指移动的距离= 停止位置 - 初始位置
            e.preventDefault();
            if(e.changedTouches.length>1 || e.scale && e.scale !==1){
                return
            }
            var touch= e.changedTouches[0];
            moveTouch={
                x:touch.pageX||touch.clientX
            };
            //将移动的距离赋值给对应li
            this.style.left=aboveX+(moveTouch.x - startTouch.x)+"px";
        },
        touchEnd:function(){
            //当手指离开屏幕后执行
            aboveX=parseInt(this.style.left);
            if(aboveX > 0){
                $(this).animate({left:0},200);
                aboveX=0
            }
            //theBox.offsetWidth - this.offsetWidth 表示 可移动的范围值
            if(aboveX < 0 && aboveX < -(theBox.offsetWidth - this.offsetWidth)){
                $(this).animate({left:-(theBox.offsetWidth - this.offsetWidth)},200);
                aboveX=-(theBox.offsetWidth - this.offsetWidth)
            }
            //清除事件
            removeEvent(this,'touchmove',event.touchMove);
            removeEvent(this,'touchmove',event.touchEnd)
        }
    };
    //判断设备是否支持滑动事件
    var modlie= 'ontouchstart' in window
    if(modlie){
        for(var i=0;i<aLi.length;i++){
            addEvent(aLi[i],'touchstart',event.touchStart)
        }
    }else{
        alert('请在手机端登录网站')
    }

    /* 左右滑动效果 结束 */
}