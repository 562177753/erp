//获取url
function GetRequest() {
//	var url = location.search; //获取url中"?"符后的字串
    var url=decodeURI(location.search);
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
var req;

$(document).ready(function() {
		 	//读取本地session储存
 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	req = GetRequest();
	$("#zx_name").html(req.zx);  
	if($("#zx_name").html()=="undefined") $("#zx_name").html("");
	$("#zx_tel").html(req.zx2); //手机号
	if($("#zx_tel").html()=="undefined") $("#zx_tel").html("");
	$("#zx_zjlx").html(req.zx4); //证件类型
	if($("#zx_zjlx").html()=="undefined") $("#zx_zjlx").html("");
	$("#zx_zjhm").html(req.zx5); //证件号码
	if($("#zx_zjhm").html()=="undefined") $("#zx_zjhm").html("");
    $("#gw_kc").html(pmAgent.name);  //课程顾问
	if($("#gw_kc").html()=="undefined") $("#gw_kc").html("");    
	$("#zu_sj").html(req.zx8);  //咨询时间
	if($("#zu_sj").html()=="undefined") $("#zu_sj").html("");  
	$("#bumen").html(req.zx9);  
	if($("#bumen").html()=="undefined") $("#bumen").html("");
	$("#sf_yy").val(req.isyuyue);  //是否预约
});


BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
		//保存按钮
	     $(function(){  	
	       $("#id_bcun").click(function(){
	        var run_off=$("#run_off").val();  
	        var name=$("#zx_name").text();
	        var cause=$("#cause").val();
	        var sf_yy=$("#sf_yy").val();
				$.ajax({
					url:SERVICE_URL+'stu_wastage_add?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: req.zx6,
						run_off:run_off,
						name:pmAgent.userid,
						bespoke:sf_yy,
						cause:cause,
					},
					jsonp: 'callback',
					success: function(result) {
						console.log(result);
						$("#input_1").val("");
	                    $("#input_2").val("");
						for(var i in result){
							if(result[i].retcode==1){
								 BUI.Message.Alert(result[i].retmsg);
						}else{
							$("#input_1").val("");
	                        $("#input_2").val("");
							 BUI.Message.Alert(result[i].retmsg);
						}
						}						
					}
				});
	     	  });
	     });
		
	});	
	//点击返回
	$("#btn_fanhui").click(function(){
		var _name=$("#zx_tel").text();
	    window.location="student_registration_list.html?bf="+_name+"";
	});