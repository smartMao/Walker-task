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

    /* �������� ��ʼ */
    var slider={
        touchStart:function(e){
            e.preventDefault();
            $(nav_list).slideToggle(500);
            if(mainTOP.offsetTop > 100){
                $(mainTOP).animate({top:mainTOP.offsetTop - 100 +"px"},500)
            }else{
                $(mainTOP).animate({top:mainTOP.offsetTop + 100 +"px"},500)
            }
        }
    };
    addEvent(head_left,"touchstart",slider.touchStart);
    /* �������� ���� */

    /* ���һ���Ч�� ��ʼ */
    var event={
        touchStart:function(e){
            //��¼��ָ��ʼλ��
            e.preventDefault();
            var touch = e.changedTouches[0];
            startTouch={
                x:touch.pageX||touch.clientX
            };
            addEvent(this,'touchmove',event.touchMove)
            addEvent(this,'touchend',event.touchEnd)
        },
        touchMove:function(e){
            //������ָ�ƶ��ľ���= ֹͣλ�� - ��ʼλ��
            e.preventDefault();
            if(e.changedTouches.length>1 || e.scale && e.scale !==1){
                return
            }
            var touch= e.changedTouches[0];
            moveTouch={
                x:touch.pageX||touch.clientX
            };
            //���ƶ��ľ��븳ֵ����Ӧli
            this.style.left=aboveX+(moveTouch.x - startTouch.x)+"px";
        },
        touchEnd:function(){
            //����ָ�뿪��Ļ��ִ��
            aboveX=parseInt(this.style.left);
            if(aboveX > 0){
                $(this).animate({left:0},200);
                aboveX=0
            }
            //theBox.offsetWidth - this.offsetWidth ��ʾ ���ƶ��ķ�Χֵ
            if(aboveX < 0 && aboveX < -(theBox.offsetWidth - this.offsetWidth)){
                $(this).animate({left:-(theBox.offsetWidth - this.offsetWidth)},200);
                aboveX=-(theBox.offsetWidth - this.offsetWidth)
            }
            //����¼�
            removeEvent(this,'touchmove',event.touchMove);
            removeEvent(this,'touchmove',event.touchEnd)
        }
    };
    //�ж��豸�Ƿ�֧�ֻ����¼�
    var modlie= 'ontouchstart' in window
    if(modlie){
        for(var i=0;i<aLi.length;i++){
            addEvent(aLi[i],'touchstart',event.touchStart)
        }
    }else{
        alert("�����ֻ���ƽ���ϵ�¼��վ")
    }

    /* ���һ���Ч�� ���� */
}