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
	req= GetRequest();
	console.log(req);
	$("#jk_name").html(req.py); //姓名
	if($("#jk_name").html() == "undefined") $("#jk_name").html("");
	$("#jk_zgxl").html(req.py1); //最高学历
	if($("#jk_zgxl").html() == "undefined") $("#jk_zgxl").html("");
	$("#jk_tel").html(req.py2); //手机号
	if($("#jk_tel").html() == "undefined") $("#jk_tel").html("");
	$("#jk_qq").html(req.py3); //QQ 
	if($("#jk_qq").html() == "undefined") $("#jk_qq").html("");
	$("#jk_zjlx").html(req.py4); //证件类型
	if($("#jk_zjlx").html() == "undefined") $("#jk_zjlx").html("");
	$("#jk_zjhm").html(req.py5); //证件号码
	if($("#jk_zjhm").html() == "undefined") $("#jk_zjhm").html("");
	
	 	//读取本地session储存
 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
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


   //参考日期
     var Calendar = BUI.Calendar
          var inputEl = $('#mo_cjkq'),
        monthpicker = new BUI.Calendar.MonthPicker({
          trigger : inputEl,
         // month:1, //月份从0开始，11结束
          autoHide : true,
          align : {
            points:['bl','tl']
          },
          //year:2000,
          success:function(){
            var month = this.get('month'),
              year = this.get('year');
            inputEl.val(year + '-' + (month + 1));//月份从0开始，11结束
            this.hide();
          }
        });
        monthpicker.render();
        monthpicker.on('show',function(ev){
          var val = inputEl.val(),
            arr,month,year;
          if(val){
            arr = val.split('-'); //分割年月
            year = parseInt(arr[0]);
            month = parseInt(arr[1]);
            monthpicker.set('year',year);
            monthpicker.set('month',month - 1);
          }
        });
	// seach
	$(function() {
				$.ajax({
					url:SERVICE_URL+'order_main_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id:req.py6,
						ord_id_zong:req.ord_id_zong,
						limit:1,
						pageIndex:0,
					},
					jsonp: 'callback',
					success: function(result) {
						console.log(result);
						for(var i in result.rows) {
//							console.log(result.rows[i].project_id);
							var opt1=$("<option value='"+result.rows[i].project_id+"'>"+result.rows[i].project_name+"</option>");
							$("#select_xm").append(opt1);  //项目状态
							var opt2=$("<option value='"+result.rows[i].project_level_id+"'>"+result.rows[i].project_level_name+"</option>");
							$("#select_yx").append(opt2);  //院校状态
							var opt3=$("<option value='"+result.rows[i].class_id+"'>"+result.rows[i].package_name+"</option>");
							$("#select_bx").append(opt3);  //班型状态
							var opt4=$("<option value='"+result.rows[i].specialty_id+"'>"+result.rows[i].package_name+"</option>");
							$("#mo_zhunaye").append(opt4);  //专业状态
							$("#yingjje").text(result.rows[i].amount_receivable);  //应交金额
							ord_id_zong=result.rows[i].ord_id_zong;
							$("#ear_ysje").html(result.rows[i].total_amount); //应收金额
							$("#ear_ddje").html(result.rows[i].subscription_fee);  //订金金额
						    $("#yzfu").html(result.rows[i].paidup_amount);  //已支付
						  
						    $("#ear_ysje2").html(result.rows[i].amount_receivable);  //待支付
						    $("#ord_status_code").text(result.rows[i].ord_status_code);  //订单状态
						    $("#create_time").text(result.rows[i].create_time);  //下单时间
						     $("#reg_loc_id").text(result.rows[i].reg_loc_id);  //报名点
						    $("#total_amount").text(result.rows[i].total_amount);  //金额合计
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});
		});

		//缴费按钮
		$(function(){
			$("#jiaofei").click(function(){
			var stu_id=req.py6;
		   var ochenkbox = $("input[name='payment_code']:checked").val();
			var ochenkbox_1= $("input[name='payment_code']:checked").data("code");
	        var input_1=$("#input_1").val();
	         var input_2=$("#input_2").val();
	         var ear_baomd=$("#ear_baomd").text();
				$.ajax({
					url:SERVICE_URL+'payement_details_add',
					dataType: 'jsonp',
					data:{
						userid: pmAgent.userid,
						stu_id: stu_id,
						payment_type:"报名单",
						ord_id_zong:ord_id_zong,
						ord_id:ord_id_zong,
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
						ord_id_zong:req.ord_id_zong,
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
$(".btn_return").click(function(){
var _name=$("#jk_tel").text();
window.location="student_registration_list.html?bf="+_name+"";
});
