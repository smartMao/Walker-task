 var EventUtil = {//建新对象
         addHandler:function(element,type,func){//添加事件
            if(element.addEventListener){
                element.addEventListener(type,func,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+ type,func);
            }else{
                element["on"+ type] = func;
            }     
         },
         getEvent:function(event){//获取Event对象
             return event?event:window.event;         
         },
         getTarget:function(event){//获得事件目标
             return event.target || event.srcElement;
         },
         preventDefault:function(event){//阻止事件的默认行为
            if(event.preventDefault){
                return event.preventDefault();//非IE
            }else{
                event.returnValue = false;//IE
            }
         },
         removeHandler:function(element,type,func){//取消事件
            if(element.removeEventListener){
                element.removeEventListener(type,func,false);
            }else if(element.detachEvent){
                element.detachEvent("on"+ type,func);
            }else{
                element["on"+ type] = null;
            }
         },
         stopPropagation:function(event){//取消事件的冒泡
             if(event.stopPropagation){
                event.stopPropagation();//非IE
            }else{
                event.cancelBubble = true;//IE
            }
         }
    };
    var eqNote = document.getElementById("eq");
    var input4 = document.getElementById("textfield4"),
        input1 = document.getElementById("textfield1"),
        input2 = document.getElementById("textfield2"),
        input3 = document.getElementById("textfield3"),
        f_span = document.getElementById("fuhao"),
        fuhao = "",//记录算数符号
        fuhao1 = "",
        str1 = "",
        str2 = "",
        str3 = "",
        str5 ="",
        clk = 0,//计算次数
        reg1 = /^-?[1-9]\d*\.?\d*$/,//除以0开头的数字的格式
        reg2 = /^-?0(?!\d)\.?\d*$/,//以0开头的小数,0后面不能跟数字，(?!\d)表示0后面不跟数字，但是不占位，用[^\d]就不行，它无论如何会匹配一个字符0..123也匹配。
        reg3 = /^-?0{2,}/,//0出现2次或者更多
        reg4 = /^-$/,//负号重复2次或者更多
        str4 = false,//判断计算符号是否被点击
        input4_str="";//input4.value;
    var clickNum = function(){ 
        var value = this.value;
        
        if(!str4){//算数符号未点击，此时输入的数字赋值给str1
            if(/[0-9]|\./.test(value)){//只允许输入数字和小数点
                if(clk == 2){
                    str1 = "";//点击=号后如果直接点击数字按钮则清空STR1，str2,重新开始一个新的计算
                    str2 = "";
                    clk = 0;
                }
                if(reg1.test(str1+value) || reg2.test(str1 + value)){//判断输入的数字格式
                    if(!reg3.test(str1 + value )){//不能连续输入多个0
                        str1 += value;//赋值到数值1
                        input4.value = str1;
                        input1.value = "￥" + str1;
                    }
                }
            }
        }else{//算数符号已点击,此时赋值给str2
            if(/[0-9]|\./.test(value)){
                if(reg1.test(str2+value) || reg2.test(str2 + value)){//判断输入的数字格式
                    if(!reg3.test(str2 + value )){//不能连续输入多个0
                        str2 += value;//赋值到数值1
                        input4.value = str2;
                        input2.value = "￥" + str2;
                    }
                }
            }
        }

        if(/[%+×÷-]/.test(value) && str2 == ""){//判断输入的值为算数符号加减乘除时要做的事
            if(str1 != "" && str1 !="-"){//str1不为空和不是只有负号的时候
                str4 = true;//算数符号已经点击
                //clk=1;
                fuhao = value;
                fuhao1 = fuhao;
                f_span.innerHTML = fuhao1;
            }else{
                if(reg4.test(str1 + value)){//负号不能输入多次
                    str1 = value;
                    //alert(str1);
                    input4.value = str1;//str1允许输入负号一次
                    input1.value = str1;
                }
            }            
        }
        if(/[%+×÷-]/.test(value) && str2 != ""){//当str2不为空的时候，输入符号就相当于做等号=操作；
            if(clk == 0){
              // alert(1);
                str1 = str1 - 0;//转换为数字

                str2 = str2 - 0;
                switch(fuhao1){//判断输入的符号执行相应的计算
                        case "+":
                            input4.value = str1 + str2;
                            input3.value = str1 + str2;
                            break;
                        case "-":
                            input4.value = str1 - str2;
                            input3.value = str1 - str2;
                            break;
                                 
                        }
                str1 = input4.value;//把结果赋值给str1，方便继续计算
                //alert(str1);
                //input1.value = str1;
                str2 = "";//清空str2
                input2.value = "";
                str4 = false;//设置符号点击初始化
                clk = 1;
        }
        if(clk == 1 || clk == 2){
        
           	var res = parseFloat(input3.value.replace('￥','')); // 转换之前的结果为数字
           
           	str1 = res;
            input1.value = "￥" + res;

            str2 = "";
            input2.value = str2;
            fuhao1 = value;
            f_span.innerHTML = fuhao1;
            clk = 0;
            str4 = true;
        }
    }
        if(value == "="){ //点击等号执行  

            eqNote.innerText = '='; 
                 
            if(str1 != "" && str2 !=""){//str1与str2不为空时才执行，否则不执行

                str1 = parseFloat(str1) - 0;//转换为数字
                str2 = parseFloat(str2) - 0;
                
                switch(fuhao1){//判断输入的符号执行相应的计算
                        case "+":
                            //input4.value = str1+str2;
                            input3.value = "￥" + (str1 + str2);
                            break;
                        case "-":
                            //input4.value = str1-str2;
                            input3.value = "￥" + (str1 - str2);
                            break;
                        
                        }
                }
                //str1 = input4.value;//把结果赋值给str1，方便继续计算
                //input1.value = str1;
                //alert(1);
                //str2 = "";//清空str2
                str4 = false;//设置符号点击初始化
                clk = 2;
                //fuhao = "";
        }
        if(value == "C"){
            str1 = "";
            str2 = "";
            str4 = false;
            fuhao = "";
            input4.value = 0;
            clk = 0;
            input1.value = "";
            input2.value = "";
            f_span.innerHTML = "";
            input3.value = "";
            eqNote.innerText = "";
           
        }
        if(value == "←"){

            if(str1 == ""){
                str4 = false;
            }


            if(fuhao1 =="" && str1!=""){
                //alert(12);
                str1 += "";
                str1 = str1.substring(0,str1.length-1);

                input1.value = "￥" + str1;
                input4.value = str1;

                if( str1 == '' ){ // 如果没数字了 ￥ 也要清除
                    input1.value = '';
                }
            }

            if(str2 == "" && fuhao1 != ""){
                fuhao1 = "";
                f_span.innerHTML = fuhao1;
                str4 = false;
                //alert(str1);
            }
            if(input3.value == "" && str2 != ""){
                //alert(1);
                str2 +="";
                str2 = str2.substring(0,str2.length-1);
                //alert(str2);
                input2.value = str2;
                input4.value = str2;
                str4 = true;
                eqNote.innerText = "";
            }


            if(input3.value != ""){
                input3.value = input3.value.substring(0,input3.value.length-1);    
                input4.value = input3.value;            
            }
        }
    }
    var box = document.getElementById("btn_div");
    var inputArr = box.getElementsByTagName("input");
    for(i=0;i<inputArr.length;i++){
        EventUtil.addHandler(inputArr[i],"click",clickNum);
    }
