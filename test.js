var addAccount   = document.getElementById('add-account');
var accountType  = document.getElementById('account-type');
var accountMoney = document.getElementById('account-money');
var accountDesc  = document.getElementById('account-desc');
var accountList  = document.getElementById('account-list');
var date = new Date();

addAccount.onclick = function(){

	var random = Math.random();

	var accountTypeKey  = random + ' accountType';
	var	accountMoneyKey = random + ' accountMoney';
	var	accountDescKey  = random + ' accountDesc';
	var	accountDateKey  = random + ' accountDate';

	localStorage.setItem( accountTypeKey  , accountType.value);
	localStorage.setItem( accountMoneyKey , accountMoney.value);
	localStorage.setItem( accountDescKey  , accountDesc.value);
	localStorage.setItem( accountDateKey  , date);


	var content = "<ul><li>"+ localStorage.getItem(accountDateKey) +"</li><li>"+ localStorage.getItem(accountTypeKey) +" "+ localStorage.getItem(accountMoneyKey) +"元</li><li>"+ localStorage.getItem(accountDescKey) +"</li></ul>";

	var element = document.createElement("div");
	element.innerHTML = content; //  创建一个div元素节点, 并把content内容放进此节点内

	var firstChild = accountList.getElementsByTagName('div')[0];
	accountList.insertBefore( element , firstChild); // insert到第一个div节点之前

}

/* 

	页面加载时调用
	显示出localStorage里的所有数据
 */

function loadingAccount(){

	localStorage.clear(); 

	//console.log(localStorage);

	for(var k in localStorage){
		//console.log(k);
		
		var splitArr = k.split(' ');
		
		if( tag == splitArr[0] ){ // 俩标记值如果重复,则还在重复范围内,不输出.
			//document.write('1');
		}else{

			var content = "<ul><li>"+ localStorage[splitArr[0] + ' accountDate'] +"</li><li>"+ localStorage[splitArr[0] + ' accountType'] +" "+ localStorage[splitArr[0] + ' accountMoney'] +"元</li><li>"+ localStorage[splitArr[0] + ' accountDesc'] +"</li></ul>";

			var element = document.createElement("div");
			element.innerHTML = content;

			accountList.appendChild(element);
		}

		var tag = splitArr[0]; // 把第一次循环的localStorage数组 标记值 记录, 用于第二次循环时判断标记值是否重复. 
		
	}

}


loadingAccount();

