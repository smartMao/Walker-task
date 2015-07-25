/* 
	此Js文件功能为：在账目添加页面，点击账目icon后，添加到选择icon中	
*/




var addContent = document.getElementById('add-content');
var accountTypeList = addContent.getElementsByClassName("a");

var selectedType = document.getElementById('selected-type');


for( var i=0; i<accountTypeList.length-1; i++ ){

	accountTypeList[i].onclick = function(){

		// 获取点击账目icon
		var accountType   = this.getElementsByTagName('p')[0].innerText;
		var iconColorCode = this.getElementsByTagName('i')[0].getAttribute('colorAttr');
		var iconCode      = this.getElementsByTagName('i')[0].getAttribute('iconAttr');
		
		var selectedIcon  = selectedType.getElementsByTagName("i")[0];
		var selectedTypeWord = selectedType.getElementsByTagName('p')[0];

		// 改变已点击的icon
		selectedTypeWord.innerText = accountType;
		selectedIcon.innerText = iconCode;
		selectedIcon.style.color = 'rgb(' + iconColorCode + ')';
	}

}



