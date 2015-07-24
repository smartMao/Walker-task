
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

	}
