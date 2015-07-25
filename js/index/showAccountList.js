
	var addAccount   = document.getElementById('add-account');
	var accountType  = document.getElementById('account-type');
	var accountMoney = document.getElementById('account-money');
	var accountDesc  = document.getElementById('account-desc');
	var accountList  = document.getElementById('account-list');




function findAllStorage(){

		for( k in localStorage ){

			var IncomeAndPay = "-"; // "  + - " 加减号表示
			var IconCode = '';
			var IconColor = '';

			var dataObj = JSON.parse( localStorage.getItem(k) ); // 循环地把每一条字符串数据解析回JSON对象

			var date = new Date( dataObj.accountTime ); // 把时间戳传入
			dataObj.accountTime = date.getFullYear() +'/'+ (date.getMonth()+1) + '/'+ date.getDate(); // 日期

			switch( dataObj.accountType){
				case '收入':
					IncomeAndPay = '+';
				break;
			}

			switch( dataObj.accountType){
				case '收入':
					IconCode = '&#xe61f;';
					IconColor = '142,212,152';
				break;

				case '衣服':
					IconCode = '&#xe605;';
					IconColor = '243,159,97';
				break;

				case '餐饮':
					IconCode = '&#xe669;';
					IconColor = '254,137,136';
				break;

				case '网购':
					IconCode = '&#xe88d;';
					IconColor = '198,179,156';
				break;

			
				case '交通':
					IconCode = '&#xe88d;';
					IconColor = '111,178,222';
				break;

				case '话费':
					IconCode = '&#xe62c;';
					IconColor = '218,90,76';
				break;

				case '其余':
					IconCode = '&#xe6b3;';
					IconColor = '253,196,3';
				break;

			}	



			var content = "<div class='theBox'><div class='box-icon'><i class='iconfont' style='color: rgb("+ IconColor +")'>"+ IconCode +"</i></div><div class='box-text'><h4>"+ dataObj.accountType +"</h4></div><div class='box-money'><input value='"+ IncomeAndPay + dataObj.accountMoney +"' type='text' disabled='disabled'></div><div class='box-time'><p>"+ dataObj.accountTime +"</p></div><div class='box-change'><div class='box-change-write'><i class='iconfont'>&#xe691;</i></div><div class='box-change-del'><i class='iconfont'>&#xe675;</i></div></div></div>";


			var element = document.createElement("li");

			element.className = 'box-con';
			element.innerHTML = content;

			accountList_li = accountList.getElementsByTagName('li');
			accountList.insertBefore( element ,accountList_li[0] ); // insert到第一个div节点之前
		}

	}

	findAllStorage();


	function getDate( timestamp ){ 
		var timestamp=new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
		return timestamp; 
	} 