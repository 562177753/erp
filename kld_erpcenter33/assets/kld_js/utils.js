var Utils = {
	// 获取页面的GET参数
	getQueryString : function(name) {
		var expr = new RegExp('[\?\&]' + name + '=([^\&]+)');
		var result = location.search.match(expr);
		if (result == null || result.length < 2)
			return '';
		else
			return result[1];
	},
    //获取页面的get参数
    getUrlString : function(name)
    {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
	 if(r!=null)return  decodeURI(r[2]); return null;
    },
	//设置缓存
	set_session : function(key, value) {
		sessionStorage.setItem(key, value);
	},
	
	get_session : function(key) {
		var ret = sessionStorage.getItem(key);
		return ret;
	},
	
	delete_session : function(key) {
		sessionStorage.removeItem(key);
	}
	
	
};
//设置接口地址
var SERVICE_URL = 'http://192.168.1.85:9090/erp_service/';

//设置缓存
var pmAgent = {
	userid : '',
	password : '',
	exten : '', // 实际登录分机号
	is_login_cti : 'N',
//	// 登录后信息
	name : '',
	org_id : '',
	org_name : '',
	corp_id : '',
	corp_name : '',
	department_name : '',
	group_name : '',
	role_id : '',
	role_name : '',
	cti_api : '',
	account : '', // 工号
	is_login : 'N',
//	// 操作方法，序列化后方法失效
	save : function() {
		sessionStorage.setItem('pmAgent', JSON.stringify(this));
	},
	load : function() {
		var ret = sessionStorage.getItem('pmAgent');
		return JSON.parse(ret);
	}
};

var service = {
	login : function(uid, pwd) {
		var promise = $.Deferred();
		var url = SERVICE_URL + 'login?callback=?&userid=' + uid
				+ '&password=' + pwd;

		$.getJSON(url, function(result) {
//			console.log(JSON.stringify(result));
			if (result.length == 0)
				promise.reject('登录失败');
/* 			else if (result[0]['rescode'] == 1)
				promise.resolve(result[0]); */
/* 			else if (result[0]['retcode'] == -500 || result[0]['retcode'] == -200)
				promise.reject(result[0]['resmsg']); */
			else
				promise.resolve(result);
		});
		return promise;
	},
		set_session : function(key, value) {
		sessionStorage.setItem(key, value);
	},
	
	get_session : function(key) {
		var ret = sessionStorage.getItem(key);
		return ret;
	},
	
	delete_session : function(key) {
		sessionStorage.removeItem(key);
	},
	
	alert : function(msg, level, type) {
		if (type == 0) {
			// sweetAlert
			swal({
				"title" : "提示",
				"text" : msg,
				"type" : level, //"warning", "error", "success", "info"
				"confirmButtonText" : "确定",
				"customClass" : "kaladi-sweet-alert"
			});
		}
	}
	
}
