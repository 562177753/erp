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
var req = GetRequest();
$(document).ready(function() {
	 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	
	$("#sp_name_2").html(req.xg); //姓名
	if($("#sp_name_2").html() == "undefined") $("#sp_name_2").html("");
	$("#sp_xl_2").html(req.xg1); //最高学历
	if($("#sp_xl_2").html() == "undefined") $("#sp_xl_2").html("");
	$("#sp_phone_2").html(req.xg2); //手机号
	if($("#sp_phone_2").html() == "undefined") $("#sp_phone_2").html("");
	$("#sp_qq_2").html(req.xg3); //QQ 
	if($("#sp_qq_2").html() == "undefined") $("#sp_qq_2").html("");
	$("#sp_lx_2").html(req.xg4); //证件类型
	if($("#sp_lx_2").html() == "undefined") $("#sp_lx_2").html("");
	$("#sp_sf_2").html(req.xg5); //证件号码
	if($("#sp_sf_2").html() == "undefined") $("#sp_sf_2").html("");
	$("#mo_px").text(req.xg9); //培训费用
	if($("#mo_px").html() == "undefined") $("#mo_px").html("");
	$("#mo_zj").html(req.xg8); //订单总价
	if($("#mo_zj").html() == "undefined") $("#mo_zj").html("");
});



BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
	//定义store数据
	var Store = Data.Store;

	//	表头与内容的配置
	var columns = [{}];

	var doing = new Overlay.Dialog({
		//配置DOM容器的编号
		contentId: 'pay_student_registration_modal',
		success: function() {
			var sp_name = $("#sp_name_2").text(); //姓名
			var sp_xl = $("#sp_xl_2").text(); //最高学历
			var sp_phone = $("#sp_phone_2").text(); //手机号
			var sp_qq = $("#sp_qq_2").text(); //qq
			var sp_lx = $("#sp_lx_2").text(); //证件类型
			var sp_sf = $("#sp_sf_2").text(); //证件号码
			var stu_id = req.xg6;
			var ord_id=req.xg7;
			window.location.href = "_payment.html?_pay=" + encodeURI(sp_name) + "&_pay2=" + encodeURI(sp_xl) + "&_pay3=" + encodeURI(sp_phone) + "&_pay4=" + encodeURI(sp_qq) + "&_pay5=" + encodeURI(sp_lx) + "&_pay6=" + encodeURI(sp_sf) + "&_pay7=" + encodeURI(stu_id) + "&_pay8=" + encodeURI(ord_id) + "";
		},

	})

	//  缓存数据
	var store = new Store({
		url: '',
		pageSize: 5,
	});

	//参考日期
	var Calendar = BUI.Calendar
	var inputEl = $('#mo_cjkq'),
		monthpicker = new BUI.Calendar.MonthPicker({
			trigger: inputEl,
			// month:1, //月份从0开始，11结束
			autoHide: true,
			align: {
				points: ['bl', 'tl']
			},
			//year:2000,
			success: function() {
				var month = this.get('month'),
					year = this.get('year');
				inputEl.val(year + '-' + (month + 1)); //月份从0开始，11结束
				this.hide();
			},
			cancel :function(){
				this.hide();
			}
		});
	monthpicker.render();
	monthpicker.on('show', function(ev) {
		var val = inputEl.val(),
			arr, month, year;
		if(val) {
			arr = val.split('-'); //分割年月
			year = parseInt(arr[0]);
			month = parseInt(arr[1]);
			monthpicker.set('year', year);
			monthpicker.set('month', month - 1);
		}
	});

	//定义二级键值对
	var college = new Array();
	//定义三级键值对
	var class_info=new Array();
	//	表头与内容的配置

	//联动
	$(function() {
			$.ajax({
				url:SERVICE_URL+'get_project_class?callback=?',
				dataType: 'jsonp',
//				data: PARAMS,
				jsonp: 'callback',
				success: function(result) {
					for(var i in result) {
						var result_college = result[i].children;
						for(var j in result_college) {
							var coll = new Array();
							coll.id = result_college[j].id;
							coll.name = result_college[j].text;
							coll.pid = result[i].id;
							college.push(coll);
							var result_class = result_college[j].children;
							for(var k in result_class) {
								var banxing = new Array();
								banxing.id = result_class[k].id;
								banxing.name = result_class[k].text;
								banxing.price = result_class[k].price;
								banxing.pid = result_college[j].id;
								class_info.push(banxing);
							}
						}
					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("请求错误：" + data + "错误的原因：" + Error)
				},
			});
	});
	
    $("#select_yx").on("change",function(){
     	   var pid=$("#select_xm").val();
     	   var opt;
     	   var id_self = $("#select_yx").val();
     	   //清空调剂下拉
	   	   $("#mo_zdyx").empty();
     	   for(var idx=0;idx<college.length;idx++)
     	   {
     	   	if(college[idx].pid==pid&&college[idx].id!=id_self)
     	   	{
     	   		//给调剂学院增加下拉选项
     	   		opt=$("<option value='"+college[idx].id+"'>"+college[idx].name+"</option>")
       	   		$("#mo_zdyx").append(opt);
     	   		console.log(opt[0].innerHTML)
     	   	}
     	   }   
     });
     
     $("#select_bx").on("change",function(){
     	   var pid=$("#select_yx").val();
     	   var opt;
     	   var id_self = $("#select_bx").val();
     	   for(var idx=0;idx<class_info.length;idx++)
     	   {
     	   	if(class_info[idx].pid==pid&&class_info[idx].id==id_self)
     	   	{
     	   		var price = class_info[idx].price;
     	   		var zhuanye = class_info[idx].name;
     	   		
     	   		$("#mo_px").text(price)
     	   		var youhui=$("#select_yhje").text();	
     	   		
     	   		$("#mo_zhunaye").val(zhuanye)
     	   		if(youhui==""||youhui==null)
     	   		{
     	   			youhui=0;
     	   		}
     	   		var yjiao=price-youhui;
     	   		$("#select_jyje").text(yjiao);
     	   	}
     	   }    	   
     });

	// 联动自定义类型
	BUI.Form.Group.Select.addType('type0', {
		url:SERVICE_URL+'get_project_class?callback=?',
	});
	//指定联动的根作用域，表格
	var form = new Form.Form({
		srcNode: '#J_form2'
	}).render();

	// 保存按钮
	$(function() {

		$("#btn_bc").click(function() {
			var select_xm = $("#select_xm").val(); //项目
			var select_yx = $("#select_yx").val(); //院校
			var select_bx = $("#select_bx").val(); //班型
			var mo_zhunaye = $("#mo_zhunaye").val(); //专业
			var val_payPlatform = $('.radio_sp input[name="optionsRadiosinline"]:checked ').val(); //单选按钮
			var mo_zdyx = $("#mo_zdyx").val(); //指定院校
			var mo_cjkq = $("#mo_cjkq").val(); //参加考期
            var remark=$("#remark").val();   //备注
            
				$.ajax({
					url:SERVICE_URL+'order_mod?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						ord_id: req.xg7,
						project_id: select_xm, //项目
						project_level_id: select_yx, //院校
						specialty_id: mo_zhunaye, //专业
						class_id:select_bx,  //班型
						whether_relief: val_payPlatform, //调剂
						relief_product: mo_zdyx, //指定院校
						session_date_name: mo_cjkq, //考期
						remark:remark,  //备注
					},
					jsonp: 'callback',
					success: function(result) {
						console.log(result)
						for(var i in result) {
							if(result[i].retcode == 1) {
								BUI.Message.Alert(result[i].retmsg);
								//							location.href="student_registration_list.html";
							} else {
							
								BUI.Message.Alert(result[i].retmsg);
							}
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});
		});
	});

	//咨询未报名
	$(function() {
		$("#stu_zx").click(function() {
			var sp_name = $("#sp_name_2").text();
			var sp_phone = $("#sp_xl_2").text();
			var sp_lx = $("#sp_phone_2").text();
			var sp_sf = $("#sp_qq_2").text();
			var stu_id = req.xg6;
			window.location.href = "new_onsultation_worksheet.html?zx=" + encodeURI(sp_name) + "&zx2=" + encodeURI(sp_phone) + "&zx4=" + encodeURI(sp_lx) + "&zx5=" + encodeURI(sp_sf) + "&zx6=" + encodeURI(stu_id) + "";
		});
	})

	//保存缴费
	$(function() {
		$("#payment").click(function() {
			var select_xm = $("#select_xm").val(); //项目
			var select_yx = $("#select_yx").val(); //院校
			var select_bx = $("#select_bx").val(); //班型
			var mo_zhunaye = $("#mo_zhunaye").val(); //专业
			var val_payPlatform = $('.radio_sp input[name="optionsRadiosinline"]:checked ').val(); //单选按钮
			var mo_zdyx = $("#mo_zdyx").val(); //指定院校
			var mo_cjkq = $("#mo_cjkq").val(); //参加考期
			var yhma = $("#yhma").val(); //优惠吗

				$.ajax({
					url:SERVICE_URL+'order_add?callback=?'',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: req.xg6,
						//				training_fee: select_jg, //报名费用 training_fee
						// 			    offer_amount:select_yhje,   //优惠金额
						//				total_amount: select_jyje, //订单总金额
						project_id: select_xm, //项目
						project_level_id: select_yx, //院校
						class_id: select_bx, //班型
						session_date_name: mo_cjkq, //考期
						whether_relief: val_payPlatform, //是否调剂
						offer_type_code: yhma, //优惠码
						relief_product: mo_zdyx, //指定调剂学院
					},
					jsonp: 'callback',
					success: function(result) {
						//						console.log(result)
						for(var i in result) {
							if(result[i].retcode == 1) {

								BUI.Message.Alert(result[i].retmsg);
								//弹出框

								doing.show();
							} else {
								//							console.log(result)
								BUI.Message.Alert(result[i].retmsg);
							}
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});

		});
	});
    
    //seach
    $(function() {
				$.ajax({
					url:SERVICE_URL+'order_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id:req.xg6,
		                ord_id:req.xg7,
						limit:1,
						pageIndex:0,
					},
					jsonp: 'callback',
					success: function(result) {
						console.log(result);
						for(var i in result.rows) {
							$("#mo_px").html(result.rows[i].training_fee);  //学习费用		
							$("#zongjia").html(result.rows[i].total_amount);  //订单合计金
						    $("#yhje").html(result.rows[i].offer_amount);  //优惠金额
						   $("#select_jyje").html(result.rows[i].amount_receivable); //应交金额
						    var opt1=$("<option disabled='disabled' selected='selected'>"+result.rows[i].project_name+"</option>");
					         $("#select_xm").prepend(opt1);
						   var opt2=$("<option disabled='disabled' selected='selected'>"+result.rows[i].project_level_name+"</option>");
					         $("#select_yx").prepend(opt2);
						  var opt3=$("<option disabled='disabled' selected='selected'>"+result.rows[i].class_name+"</option>");
					         $("#select_bx").prepend(opt3);
					         var specialty_id=result.rows[i].specialty_id;  //专业
						     $("#mo_zhunaye").val(specialty_id);
						   var session_date_name=result.rows[i].session_date_name; //考期
						   $("#mo_cjkq").val(session_date_name);  
						   var whether_relief=result.rows[i].whether_relief;  //是否调剂
						   $("#radio input:radio[value="+whether_relief+"]").attr('checked','true');
						   
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					timeout: 30000
				});
		});


});