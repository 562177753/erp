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
		console.log(req);
	$("#sp0").html(req.xq);  //total_amount
     if($("#sp0").html()=="undefined") $("#sp0").html("");
	$("#sp1").html(req.xq1);    //total_amount
	 if($("#sp1").html()=="undefined") $("#sp1").html("");
	$("#sp2").html(req.xq2);   //
	 if($("#sp2").html()=="undefined") $("#sp2").html("");
	$("#sp3").html(req.xq3);    // 
	 if($("#sp3").html()=="undefined") $("#sp3").html("");
	$("#sp4").html(req.xq4);   //
	 if($("#sp4").html()=="undefined") $("#sp4").html("");
});

BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
	
	// seach
	$(function() {
				$.ajax({
					url:SERVICE_URL+'order_main_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id:req.stu_id,
						ord_id_zong:req.ord_id,
						limit:1,
						pageIndex:0,
					},
					jsonp: 'callback',
					success: function(result) {
						for(var i in result.rows) {
						  $("#project_name").html(result.rows[i].project_name); //项目
						  $("#project_level_name").html(result.rows[i].project_level_name); //院校
						  $("#product_name").html(result.rows[i].package_name); //班型
						  $("#apply_time").html(result.rows[i].apply_time); //报名日期
						  $("#training_fee").html(result.rows[i].training_fee); //培训费用
//						  $("#authority").html(result.rows[i].training_fee); //官方考试费用
//						  $("#exam_agent_fee").html(result.rows[i].exam_agent_fee); //代报费用
//						  $("#other_fee").html(result.rows[i].other_fee); //其他费用
						  $("#offer_amount").html(result.rows[i].offer_amount); //优惠费用
						  $("#total_amount").html(result.rows[i].total_amount); //订单总计
						  $("#paidup_amount").html(result.rows[i].paidup_amount); //实际已付
						  $("#ord_status_code").html(result.rows[i].ord_status_code); //订单状态
						  $("#biz_status_code").html(result.rows[i].biz_status_code); //业务类型
						 $("#method_rel_code").html(result.rows[i].payment_type_code); //缴费类型
						 $("#operator_id").html(result.rows[i].create_name); //课程顾问
						 $("#reg_loc_id").html(result.rows[i].bmd_name); //报名点
						 $("#specialty_id").html(result.rows[i].package_name); //专业
						  if(result.rows[i].whether_relief=="0"){
						 	$("#whether_relief").html("不接受调剂"); //是否接受调剂
						 }else if(result.rows[i].whether_relief=="1"){
						 	$("#whether_relief").html("接受调剂"); //是否接受调剂
						 }			
//						 $("#relief_product").html(result.rows[i].relief_product); //指定调剂院校
//						 $("#paidup_amount").html(result.rows[i].); //订金
						 $("#subscription_fee").text(result.rows[i].subscription_fee);
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});
	});
});

//点击返回按钮
	$("div>.btn_fanhui").click(function(){
		var _name=$("#sp1").text();
	    window.location="student_registration_list.html?bf="+_name+"";
	});

