var quan = "";
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
var req;
$(function() {
	//读取本地session储存
	 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	req = GetRequest();
	var jyong = req.jk7;
	quan = req.jk15;

	$("#jk_name").text(req.jk); //姓名
	if($("#jk_name").html() == "undefined") $("#jk_name").html("");
	$("#jk_zgxl").text(req.jk1); //最高学历
	if($("#jk_zgxl").html() == "undefined") $("#jk_zgxl").html("");
	$("#jk_tel").text(req.jk2); //手机号
	if($("#jk_tel").html() == "undefined") $("#jk_tel").html("");
	$("#jk_qq").text(req.jk3); //qq
	if($("#jk_qq").html() == "undefined") $("#jk_qq").html("");
	$("#jk_zjlx").text(req.jk4); //证件类型
	if($("#jk_zjlx").html() == "undefined") $("#jk_zjlx").html("");
	$("#jk_zjhm").text(req.jk5); //证件号码
	if($("#jk_zjhm").html() == "undefined") $("#jk_zjhm").html("");
	$("#ear_baomd").text(req.tj4); //报名单	
	
});
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
	//定义store数据
	var Store = Data.Store;
	
		//  缓存数据
		var store = new Store({
			url: '',
			pageSize: 5,
		});

	//seach
	$(function() {
			$.ajax({
				url:SERVICE_URL+'order_main_search?callback=?' ,
				dataType: 'jsonp',
				data: {
					userid: pmAgent.userid,
					ord_id_zong: req.jk6_1,
					limit: 1,
					pageIndex: 0,
				},
				jsonp: 'callback',
				success: function(result) {
					console.log(result);
					for(var i in result.rows) {
						ord_id = result.rows[i].ord_id;
						$("#ear_bmd").text(result.rows[i].reg_loc_id); //报名点
						$("#ear_xdsj").text(result.rows[i].create_time); //下单时间
						$("#ear_djzt").text(result.rows[i].ord_status_code); //订单状态
						var op1 = $("<option  >" + result.rows[i].project_name + "</option>");
						$("#ear_xm").prepend(op1); //项目
						var op2 = $("<option >" + result.rows[i].project_level_name + "</option>");
						$("#ear_yx").prepend(op2); //院校
						var op3 = $("<option >" + result.rows[i].package_name + "</option>");
						$("#ear_bx").prepend(op3); //班型
						var op4 = $("<option >" + result.rows[i].specialty_id + "</option>");
						$("#ear_zy").prepend(op4); //专业
						$("#ear_jehj").text(result.rows[i].total_amount); //金额合计

						$("#ear_ddje").html(result.rows[i].subscription_fee); //订金金额
						$("#yzfu").html(result.rows[i].paidup_amount); //已支付
					    $("#total_amount").text(result.rows[i].total_amount); //金额合计
						$("#ear_ysje2").html(result.rows[i].amount_receivable); //待支付
						$("#ear_ysje").html(result.rows[i].total_amount); //应收金额
					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("请求错误：" + data + "错误的原因：" + Error)
				},
				timeout: 30000
			});
	});

	//缴费按钮
	$(function() {
		var req = GetRequest();
		$("#footer .btn-primary").click(function() {
			var ochenkbox = $("input[name='SCH_PAY_CASH']").val();
			var input_1 = $("#input_1").val();
			var input_2 = $("#input_2").val();
			var ear_baomd = $("#ear_baomd").text();
				$.ajax({
					url:SERVICE_URL+'payement_details_mod?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						one_payment_id: req.jk14,
						payment_method_code: ochenkbox,
						amount: input_1,
						ord_id: req.jk6_1,
						method_rel_code: input_2,
					},
					jsonp: 'callback',
					success: function(result) {
						$("#input_1").val("");
						$("#input_2").val("");
						for(var i in result) {
							if(result[i].retcode == 1) {
								var _name=$("#jk_tel").text();
	   							 window.location="student_registration_list.html?bf="+_name+"";
							} else {
								$("#input_1").val("");
								$("#input_2").val("");
								BUI.Message.Alert(result[i].retmsg);
							}
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});
		});
	});

});


var array1=[];
var array2=[];
//请求支付方式
$(function(){
	 	$.ajax({
					url: SERVICE_URL+'payment_way_select?callback=?',
					dataType: 'jsonp',
					data: {
						ord_id_zong:req.jk6_1,
						userid:pmAgent.userid,
					},
					jsonp: 'callback',
					success: function(result) {	
//						console.log(result);
                     for(var i in result){
                     	 var parent_name=$("<label class='btn btn-info btn_parent_name' style='margin-left:30px;margin-right:30px;'>"+result[i].parent_name+"</label>");
                     	 $(".span1").append(parent_name);
                     	
                     	array1.push(result[i].parent_name);

                     	array2.push(result[i].child);                    	
                     }     
				 }					
				});
					       
					$("body").on("click",".btn_parent_name",function(){
						 $(".row_2").empty();
                          var n=$(this).text();
						 var get_id1=get_id(array1,array2,n);
						 for(var k in get_id1){
						 var odiv=$("<div class='span4'><label class='btn btn-primary'> <input  type='radio' style='width:30px;' name='payment_code' data-code="+get_id1[k].payment_code+" value="+get_id1[k].payment_name+">"+get_id1[k].payment_name+"</label></div>")
						 $(".row_2").append(odiv);
						 }
					}); 
		    	});

//定义的函数，寻找对应级
function get_id(arr,arr1,n) {
            var i;
             var arrn=[];
            $.each(arr,function (index) {
                if(arr[index] == n){
                    i = index;
                }
            })

            $.each(arr1,function (index) {
                if(i== index){
                    arrn = arr1[index];
                }
            })
            return arrn;       
        }




//点击返回按钮
	$("div>.btn_fanhui").click(function(){
		var _name=$("#jk_tel").text();
	    window.location="student_registration_list.html?bf="+_name+"";
	});