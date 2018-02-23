$(document).ready(function() {
	$('#submit').on('click', function() {
		var val = $('#username').val();
		if (val==null || val=="" || val==undefined) {
		//	showMessageBox('用户名不能为空', 'am-alert-danger');
			swal("用户名不能为空!", " ", "error");
			return;
		}
		pmAgent.userid = val;
		val = $('#password').val();
		if (!val) {
		//	showMessageBox('密码不能为空', 'am-alert-danger');
		swal("密码不能为空!", " ", "error");
			return;
		}
		pmAgent.password = val;

		var promise = service.login(pmAgent.userid, pmAgent.password);
		promise.then(function(data) {
			// 个人登录信息
			if(data['retcode']==-200)
			{
				swal("登录失败!", " ", "error");
				return;
			}
			if(data['retcode']==-500)
			{
				swal("查询失败!", " ", "error");
				return;
			}
			pmAgent.name = data['name'];
			pmAgent.org_id = data['org_id'];
			pmAgent.org_name = data['org_name'];
			pmAgent.corp_id = data['corpid'];
			pmAgent.corp_name = data['corp_name'];
			pmAgent.department_name = data['department_name'];
			pmAgent.group_name = data['group_name'];
			pmAgent.role_id = data['role_id'];
			pmAgent.role_name = data['role_name'];  //冯JJ 没传
			pmAgent.account = data['account'];	
			pmAgent.user_id = data['user_id'];	    
                pmAgent.is_login = 'Y';
				pmAgent.save();
				window.location = "index.html";
				return;
		})
		.fail(function(data) {
		//	showMessageBox(data, "am-alert-danger");
			swal("登录失败!", " ", "error");
		});
	});
	
	/* $('body').on('keydown', function(event){
		if (event.which == 13)
			$('#login_btn').trigger('click');
	}); */
	
	$('#password').keydown(function(e){
    if(e.keyCode==13){
        	var val = $('#username').val();
		if (val==null || val=="" || val==undefined) {
		//	showMessageBox('用户名不能为空', 'am-alert-danger');
			swal("用户名不能为空!", " ", "error");
			return;
		}
		pmAgent.userid = val;
		val = $('#password').val();
		if (!val) {
		//	showMessageBox('密码不能为空', 'am-alert-danger');
		swal("密码不能为空!", " ", "error");
			return;
		}
		pmAgent.password = val;

		var promise = service.login(pmAgent.userid, pmAgent.password);
		promise.then(function(data) {
			// 个人登录信息
			if(data['retcode']==-200)
			{
				swal("登录失败!", " ", "error");
				return;
			}
			if(data['retcode']==-500)
			{
				swal("查询失败!", " ", "error");
				return;
			}
			pmAgent.name = data['name'];
			pmAgent.org_id = data['org_id'];
			pmAgent.org_name = data['org_name'];
			pmAgent.corp_id = data['corpid'];
			pmAgent.corp_name = data['corp_name'];
			pmAgent.department_name = data['department_name'];
			pmAgent.group_name = data['group_name'];
			pmAgent.role_id = data['role_id'];
			pmAgent.role_name = data['role_name'];  //冯JJ 没传
			pmAgent.account = data['account'];	
			pmAgent.user_id = data['user_id'];	    
                pmAgent.is_login = 'Y';
				pmAgent.save();
				window.location = "index.html";
				return;
		})
		.fail(function(data) {
		//	showMessageBox(data, "am-alert-danger");
			swal("登录失败!", " ", "error");
		});
    }
   });
	
	
	
});


//消息提示框
function showMessageBox(msg, level_css) {
	var message = '<div class="am-text-xs am-alert ' + level_css + '" data-am-alert>'
		+ '<button type="button" class="am-close">&times;</button>'
		+ '<p>' + msg + '</p>'
		+ '</div>';
	$('#validation').html(message);
	// 2秒后自动关闭
	setTimeout('$("#validation").empty();', 2000);
}