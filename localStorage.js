
	var addAccount   = document.getElementById('add-account');
	var accountType  = document.getElementById('account-type');
	var accountMoney = document.getElementById('account-money');
	var accountDesc  = document.getElementById('account-desc');
	var accountList  = document.getElementById('account-list');


	function saveStorage(){

		var time = new Date().getTime();
		var data = new Object();

		data.accountType  = accountType.value;
		data.accountMoney = accountMoney.value;
		data.accountDesc  = accountDesc.value;
		data.accountTime  = time;

		strData = JSON.stringify( data ); // 将对象转换为 json 格式字符串
		localStorage.setItem( data.accountTime , strData ); // 账目时间戳做 key
 
		alert('添加账目成功！返回账目列表！');
		window.location = 'index.html';

		//localStorage.clear();
		/* 因添加账目后 不需要在本页面插入数据,所以注释 */
		// var content = "<ul><li>"+ data.accountType +"</li><li>"+ data.accountMoney +"</li><li>"+ data.accountDesc +"</li><li>"+ data.accountTime +"</li></ul>";
		
		// var element = document.createElement("div");
		// element.innerHTML = content; //  创建一个div元素节点, 并把content内容放进此节点内

		// var firstChild = accountList.getElementsByTagName('div')[0];
		// accountList.insertBefore( element , firstChild); // insert到第一个div节点之前

		
	}

	function findAllStorage(){

		for( k in localStorage ){

			var dataObj = JSON.parse( localStorage.getItem(k) ); // 循环地把每一条字符串数据解析回JSON对象

			var date = new Date( dataObj.accountTime ); // 把时间戳传入
			var mouth = date.getMonth()+1; // 月份
		
			var accountDate = date.getFullYear() +'/'+ mouth +'/'+ date.getDate(); // 日期
			console.log(accountDate);

			//var content = "<ul><li>"+ dataObj.accountType +"</li><li>"+ dataObj.accountMoney +"</li><li>"+ dataObj.accountDesc +"</li><li>"+ dataObj.accountTime +"</li></ul>";

			var content = "<div class='theBox'><div class='box-icon'><i class='iconfont'>&#xe61f;</i></div><div class='box-text'><!-- type --><h4>"+ dataObj.accountType +"</h4></div><div class='box-money'><!--<p>+</p>--><!-- 金额 --><input value='"+ dataObj.accountMoney +"' type='text' disabled='disabled'></div><div class='box-time'><p>"+ accountDate +"</p></div><div class='box-change'><div class='box-change-write'><i class='iconfont'>&#xe691;</i></div><div class='box-change-del'><i class='iconfont'>&#xe675;</i></div></div></div>";




			var element = document.createElement("li");
			element.innerHTML = content;

			var accountList_li = accountList.getElementsByTagName('li');
			console.log(accountList_li);

			accountList.insertBefore( element ,accountList_li[0] ); // insert到第一个div节点之前
		}

	}

	findAllStorage();


	function getDate( timestamp ){ 
		var timestamp=new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") 
		return timestamp; 
	} 
