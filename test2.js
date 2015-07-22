
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

		//localStorage.clear();
		var content = "<ul><li>"+ data.accountType +"</li><li>"+ data.accountMoney +"</li><li>"+ data.accountDesc +"</li><li>"+ data.accountTime +"</li></ul>";
		
		var element = document.createElement("div");
		element.innerHTML = content; //  创建一个div元素节点, 并把content内容放进此节点内

		var firstChild = accountList.getElementsByTagName('div')[0];
		accountList.insertBefore( element , firstChild); // insert到第一个div节点之前

		
	}

	function findAllStorage(){

		for( k in localStorage ){

			var dataObj = JSON.parse( localStorage.getItem(k) ); // 循环地把每一条字符串数据解析回JSON对象
			var content = "<ul><li>"+ dataObj.accountType +"</li><li>"+ dataObj.accountMoney +"</li><li>"+ dataObj.accountDesc +"</li><li>"+ dataObj.accountTime +"</li></ul>";
		
			var element = document.createElement("div");
			element.innerHTML = content;

			var firstChild = accountList.getElementsByTagName('div')[0];
			accountList.insertBefore( element , firstChild); // insert到第一个div节点之前
		}

	}

	findAllStorage();
