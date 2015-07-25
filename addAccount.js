/*  
	此Js文件功能是：在添加账目的页面，点击发布按钮后，获取账目的类型、金额。将数据插入到LocalStorage中
*/


function addAccount(){


	var time = new Date().getTime();
	var data = new Object();

	data.accountTime  = time;
	
	/*  
		input1\input2 说明:因为在账目添加页面,有计算器,用户可以不计算账目就发布,也可以计算后在发布账目,
						   input1:代表没使用过计算器的金额, input2:代表使用过计算器后的金额
	*/
	var selectedBox = document.getElementById('selected-type');
	data.accountType = selectedBox.getElementsByTagName('p')[0].innerText; // 账目类型名

	var accountMoney = 0;

	var input1 = document.getElementById('textfield1').value;
	var input2 = document.getElementById('textfield3').value;

	if( input2 == ''){

		// 没使用计算器
		data.accountMoney = input1.replace('￥','');  // 账目金额
		
	}else{

		// 使用过计算器
		data.accountMoney = input2.replace('￥','');  // 账目金额
	}
	
	
	strData = JSON.stringify( data ); // 将对象转换为 json 格式字符串
	localStorage.setItem( data.accountTime , strData ); // 账目时间戳做 key

	alert('添加账目成功！返回账目列表！');
	window.location = 'index.html';

	//localStorage.clear();

	

	//localStorage.clear();

	

}



