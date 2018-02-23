BUI.use('common/main', function() {
//	判断是否登录
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = 'login.html';
		return;
	}
	
	  //菜单栏获取json		
		$.ajax({
			url: SERVICE_URL + 'login_menu?callback=?',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
			},
			success: function(config) {
				  new PageUtil.MainPage({
				      modulesConfig : config
				  });	
			}
	    	});
		
	
});



$(document).ready(function(){
	//获取url
function GetRequest() {
	//	var url = location.search; //获取url中"?"符后的字串
	var url = decodeURI(location.search);
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
var req=GetRequest();
// 登录个人信息
pmAgent = pmAgent.load();
$("#login_name").text(pmAgent.name);
});

