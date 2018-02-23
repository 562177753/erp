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
$(document).ready(function() {
	 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	req= GetRequest();
	$("#jk_name").html(req._pay); //姓名
	if($("#jk_name").html() == "undefined") $("#jk_name").html("");
	$("#jk_zgxl").html(req._pay2); //最高学历
	if($("#jk_zgxl").html() == "undefined") $("#jk_zgxl").html("");
	$("#jk_tel").html(req._pay3); //手机号
	if($("#jk_tel").html() == "undefined") $("#jk_tel").html("");
	$("#jk_qq").html(req._pay4); //QQ 
	if($("#jk_qq").html() == "undefined") $("#jk_qq").html("");
	$("#jk_zjlx").html(req._pay5); //证件类型
	if($("#jk_zjlx").html() == "undefined") $("#jk_zjlx").html("");
	$("#jk_zjhm").html(req._pay6); //证件号码
	if($("#jk_zjhm").html() == "undefined") $("#jk_zjhm").html("");
   
 	//读取本地session储存

});

BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
	//定义store数据
	var Store = Data.Store;

	//	表头与内容的配置
	var columns = [{
		"title": "姓名",
		"dataIndex": "name"
	}];

	//  缓存数据
	var store = new Store({
		
	});


	// seach
	$(function() {
		var stu_id=req._pay7;
				$.ajax({
					url:SERVICE_URL+'order_main_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id:stu_id,
		                ord_id_zong:req.ord_id_zong,
						limit:1,
						pageIndex:0,
					},
					jsonp: 'callback',
					success: function(result) {
//						console.log(result);
						for(var i in result.rows) {
							var opt1=$("<option value='"+result.rows[i].project_id+"'>"+result.rows[i].project_name+"</option>");
							$("#select_xm").append(opt1);  //项目状态
							var opt2=$("<option value='"+result.rows[i].project_level_id+"'>"+result.rows[i].project_level_name+"</option>");
							$("#select_yx").append(opt2);  //院校状态
							var opt3=$("<option value='"+result.rows[i].package_id+"'>"+result.rows[i].package_name+"</option>");
							$("#select_bx").append(opt3);  //产品包状态
							$("#ear_ysje").html(result.rows[i].total_amount); //应收金额
							$("#ear_ddje").html(result.rows[i].subscription_fee);  //订金金额
						    $("#yzfu").html(result.rows[i].paidup_amount);  //已支付
						   
						    $("#ear_ysje2").html(result.rows[i].amount_receivable);  //待支付
						    $("#ord_status_code").text(result.rows[i].ord_status_code);  //订金状态
						    $("#reg_loc_id").text(result.rows[i].reg_loc_id);  //报名点
						    $("#create_time").text(result.rows[i].create_time);  //下单时间
						    $("#total_amount").text(result.rows[i].total_amount);  //金额合计
						}

					},
				});
		});
	
		//缴费按钮
		$(function(){
			$("#jiaofei").click(function(){
			var stu_id=req._pay7;
		   	var ochenkbox = $("input[name='payment_code']:checked").val();
			var ochenkbox_1= $("input[name='payment_code']:checked").data("code");
	        var input_1=$("#input_1").val();
	         var input_2=$("#input_2").val();
	         var ear_baomd=$("#ear_baomd").text();
			
				$.ajax({
					url:SERVICE_URL+'payement_details_add?callback=?',
					dataType: 'jsonp',
					data:{
						userid: pmAgent.userid,
						stu_id: stu_id,
						payment_type:"报名单",
						ord_id_zong:req.ord_id_zong,
						ord_id:req.ord_id_zong,
						payment_name: ochenkbox,  //支付方式名称
						payment_code: ochenkbox_1,   //支付方式代码
						amount:input_1,
						method_rel_code:input_2,
					},
					jsonp: 'callback',
					success: function(result) {
						$("#input_1").val("");
	                    $("#input_2").val("");
						for(var i in result){
							if(result[i].retcode==1){
								var _name=$("#jk_tel").text();
	   							 window.location="student_registration_list.html?bf="+_name+"";
						}else{
							$("#input_1").val("");
	                        $("#input_2").val("");
							 BUI.Message.Alert(result[i].retmsg);
						}
						}
					}
					
				});
			})
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
						userid:pmAgent.userid,
						ord_id_zong:req.ord_id_zong,
					},
					jsonp: 'callback',
					success: function(result) {	
//						console.log(result);
                     for(var i in result){
                     	 var parent_name=$("<label class='btn btn-info btn_parent_name' style='margin-left:10px;'>"+result[i].parent_name+"</label>");
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
            var arrn = []
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
	$("#btn_fanhui").click(function(){
		var _name=$("#jk_tel").text();
	    window.location="student_registration_list.html?bf="+_name+"";
	});