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
var _pdf;
var _pdf2;
var ord_id_zong;
$(document).ready(function() {
	//读取本地session储存
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	req = GetRequest();
	$("#sp_name").html(req.bm); //姓名
	if($("#sp_name").html() == "undefined") $("#sp_name").html("");
	$("#sp_xl").html(req.bm1); //最高学历
	if($("#sp_xl").html() == "undefined") $("#sp_xl").html("");
	$("#sp_phone").html(req.bm2); //手机号
	if($("#sp_phone").html() == "undefined") $("#sp_phone").html("");
	$("#sp_qq").html(req.bm3); //QQ 
	if($("#sp_qq").html() == "undefined") $("#sp_qq").html("");
	$("#sp_lx").html(req.bm4); //证件类型
	if($("#sp_lx").html() == "undefined") $("#sp_lx").html("");
	$("#sp_sf").html(req.bm5); //证件号码
	if($("#sp_sf").html() == "undefined") $("#sp_sf").html("");
	$("#mobile_select").val(req.bm2);
	$("#mobile_select2").val(req.bm2);
});

BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form'], function(Search, Page, Data, Overlay, Grid, Form) {
	//定义store数据
	var Store = Data.Store;
	var columns = [{
		"title": "姓名",
		"dataIndex": "name"
	}];

	//  缓存数据
	var store = new Store({
		url: SERVICE_URL + 'student_search?callback=?',
		dataType: 'jsonp',
		autoLoad: false, //自动加载数据
		proxy: {
			method: 'POST',
		},
		params: {},
		pageSize: 5,
	});

	//验证码
	var dialog_shotmsg = new Overlay.Dialog({
		title: '协议',
		width: 600,
		zIndex : '100',
		height: 520,
		//配置DOM容器的编号
		contentId: 'Product_Suites',
		success: function() {
			var sp_name = $("#sp_name").text(); //姓名
			var sp_xl = $("#sp_xl").text(); //最高学历
			var sp_phone = $("#sp_phone").text(); //手机号
			var sp_qq = $("#sp_qq").text(); //qq
			var sp_lx = $("#sp_lx").text(); //证件类型
			var sp_sf = $("#sp_sf").text(); //证件号码	
			if($('#protocol_ordio').is(':checked')) {
				var select_kq = $("#select_kq").val(); //考期
				var select_jg = $("#select_jg").text(); //班型价格
				var select_yhm = $("#select_yhm").val(); //优惠码
				var select_yhje = $("#select_yhje").text(); //优惠金额   
				var select_jyje = $("#select_jyje").text(); //交易金额
				var select_xm = $("#select_xm").val(); //项目
				var select_yx = $("#select_yx").val(); //院校
				var select_bx = $("#select_bx").val(); //班型
				var val_payPlatform = $('input[name="optionsRadiosinline"]:checked ').val(); //单选按钮
				var relief_product = $("#relief_product").val(); //指定调剂学院
				$.ajax({
					url: SERVICE_URL + 'order_add?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: req.bm6,
						offer_amount: select_yhje, //优惠金额
						total_amount: select_jyje, //订单总金额
						project_id: select_xm, //项目
						project_level_id: select_yx, //院校
						package_id: select_bx, //班型  
						session_date_name: select_kq, //考期
						whether_relief: val_payPlatform, //是否调剂
						coupon_code: select_yhm, //优惠码
						relief_product: relief_product, //指定调剂学院
					},
					jsonp: 'callback',
					success: function(result) {
						for(var i in result) {
							if(result[i].retcode == 1) {
								dialog_shotmsg.hide();
								$("#protocol_ordio").attr("checked", false);
								$("#ValidateBox").val("");
								$("#bear_fruit").html("");
								$("#Protocol_button").hide();
								window.BUI.Message.Alert(result[i].retmsg);
								var _name = $("#sp_phone").text();
								window.location = "student_registration_list.html?bf=" + _name + "";
							}
						}
						$("#Product_Suites").hide();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
				});
			} else {
				var bui = window.BUI.Message.Alert("请阅读协议后同意协议。");
			}

		},
		cancel: function() {
			$("#protocol_ordio").attr("checked", false);
			$("#Protocol_button").css("display", " none");
			$("#ValidateBox").val("");
			$("#bear_fruit").html("");
		}
	});

	//验证码
	var dialog_shotmsg2 = new Overlay.Dialog({
		title: '协议',
		width: 600,
		zIndex : '100',
		height: 520,
		//配置DOM容器的编号
		contentId: 'Product_Suites2',
		success: function() {
			var sp_name = $("#sp_name").text(); //姓名
			var sp_xl = $("#sp_xl").text(); //最高学历
			var sp_phone = $("#sp_phone").text(); //手机号
			var sp_qq = $("#sp_qq").text(); //qq
			var sp_lx = $("#sp_lx").text(); //证件类型
			var sp_sf = $("#sp_sf").text(); //证件号码
			if($('#protocol_ordio2').is(':checked')) {
				var select_kq = $("#select_kq").val(); //考期
				var select_jg = $("#select_jg").text(); //班型价格
				var select_yhm = $("#select_yhm").val(); //优惠码
				var select_yhje = $("#select_yhje").text(); //优惠金额   
				var select_jyje = $("#select_jyje").text(); //交易金额
				var select_xm = $("#select_xm").val(); //项目
				var select_yx = $("#select_yx").val(); //院校
				var select_bx = $("#select_bx").val(); //班型
				var val_payPlatform = $('input[name="optionsRadiosinline"]:checked ').val(); //单选按钮
				var relief_product = $("#relief_product").val(); //指定调剂学院
				$.ajax({
					url: SERVICE_URL + 'order_add?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: req.bm6,
						offer_amount: select_yhje, //优惠金额
						total_amount: select_jyje, //订单总金额
						project_id: select_xm, //项目
						project_level_id: select_yx, //院校
						package_id: select_bx, //班型  
						session_date_name: select_kq, //考期
						whether_relief: val_payPlatform, //是否调剂
						coupon_code: select_yhm, //优惠码
						relief_product: relief_product, //指定调剂学院
					},
					jsonp: 'callback',
					success: function(result) {
						for(var i in result) {
							if(result[i].retcode == 1) {
								$("#protocol_ordio2").attr("checked", false);
								window.location.href = "_payment.html?_pay=" + encodeURI(sp_name) + "&_pay2=" + encodeURI(sp_xl) + "&_pay3=" + encodeURI(sp_phone) + "&_pay4=" + encodeURI(sp_qq) + "&_pay5=" + encodeURI(sp_lx) + "&_pay6=" + encodeURI(sp_sf) + "&_pay7=" + encodeURI(req.bm6) + "&ord_id_zong=" + encodeURI(result[i].ord_id_zong) + "";
							} else {
								//console.log(result)
								window.BUI.Message.Alert(result[i].retmsg);
							}
						}

					}
				});
			} else {
				window.BUI.Message.Alert("请阅读协议后同意协议。");
			}

		},
		cancel: function() {
			$("#protocol_ordio2").attr("checked", false)
			$("#Protocol_button2").css("display", " none");
			$("#ValidateBox2").val("");
			$("#bear_fruit2").html("");
		}
	});

	//参考日期
	$(function() {
		var d = new Date();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		var time = d.getHours() + ":" + d.getMinutes();
		var output = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month;
		$("#select_kq").val(output);
	})
	var Calendar = BUI.Calendar
	var inputEl = $('#select_kq'),
		monthpicker = new BUI.Calendar.MonthPicker({
			trigger: inputEl,
			// month:1, //月份从0开始，11结束
			autoHide: true,
			align: {
				points: ['bl', 'tl']
			},
			//			year:2000,
			success: function() {
				var month = this.get('month'),
					year = this.get('year');
				inputEl.val(year + '-' + (month + 1)); //月份从0开始，11结束
				this.hide();
			},
			cancel: function() {
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

	// 联动自定义类型
	BUI.Form.Group.Select.addType('type0', {
		url: SERVICE_URL + 'get_project_class?userid=' + pmAgent.userid + '&callback=?',
	});
	//指定联动的根作用域，表格
	var form = new Form.Form({
		srcNode: '#J_form2'
	}).render();

	//定义二级键值对
	var college = new Array();
	//定义三级键值对
	var class_info = new Array();
	//	表头与内容的配置
	//联动
	$(function() {
		$.ajax({
			url: SERVICE_URL + 'get_project_class?callback=?',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
			},
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
							banxing.price_min = result_class[k].price_min;
							class_info.push(banxing);
						}
					}
				}

			}
		});
	});
	//	二级联动
	$("#select_yx").on("change", function() {
		var pid = $("#select_xm").val();
		var opt;
		var id_self = $("#select_yx").val();
		//清空调剂下拉
		if($("#optionsRadios2").is(":checked")) {
			$("#relief_product").empty();
		} else {
			for(var idx = 0; idx < college.length; idx++) {
				if(college[idx].pid == pid && college[idx].id != id_self) {
					//给调剂学院增加下拉选项
					opt = $("<option value='" + college[idx].id + "'>" + college[idx].name + "</option>")
					$("#relief_product").append(opt);
//					console.log(opt[0].innerHTML)
				}
			}
		}

	});
	//   三级
	$("#select_bx").on("change", function() {
		var pid = $("#select_yx").val();
		var opt;
		var id_self = $("#select_bx").val();
		for(var idx = 0; idx < class_info.length; idx++) {
			if(class_info[idx].pid == pid && class_info[idx].id == id_self) {
				var price = class_info[idx].price;
				var zhuanye = class_info[idx].name;
				var price_min = class_info[idx].price_min;
				$("#select_jg").text(price);
				$("#floor_price").text(price_min);
				var youhui = $("#select_yhje").text();
				//              console.log(price_min);
				if(youhui == "" || youhui == null) {
					youhui = 0;
				}
				var yjiao = price - youhui;
				$("#select_jyje").text(yjiao);
				
					$("#a_png img").attr("alt", "向下箭头");
				    $("#a_png img").attr("src", "../assets/kld_js/png_1.png");
					$("#select_sect").hide();
			}
		}
		
		$.ajax({
			url: SERVICE_URL + 'package_check?callback=?',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
				package_id:$("#select_bx").val(),
			},
			
			jsonp: 'callback',
			success: function(result) {
				console.log(result);
				for(var i in result){
					if(result[i].avail==null||result[i].avail=='-1'||result[i].avail=='0'||result[i].retcode!='1'){
					    BUI.Message.Alert("产品包已售空，请调换产品包！");
				     }
				}
				

			}
		});
	});

	//单选按钮
	$(function() {
		$('#optionsRadios2').click(function() {
			if($(this).is(":checked")) {
				$("#relief_product").empty();
			}
		})
		$('#optionsRadios1').click(function() {
			if($(this).is(":checked")) {
				var pid = $("#select_xm").val();
				var opt;
				var id_self = $("#select_yx").val();
				//清空调剂下拉
				$("#relief_product").empty();
				for(var idx = 0; idx < college.length; idx++) {
					if(college[idx].pid == pid && college[idx].id != id_self) {
						//给调剂学院增加下拉选项
						opt = $("<option value='" + college[idx].id + "'>" + college[idx].name + "</option>")
						$("#relief_product").append(opt);
					}
				}
			}
		});

	});

	$(function() {
		$("#select_bx").on("change", function() {
			$("#select_yhm").val("");
			var data_dj = $("#select_bx").find("option:selected").data("dj");

		});
	});

	//优惠码
	$(function() {
		$("#select_yhm").blur(function() {
			var select_bx = $("#select_bx").val();
			var select_yhm = $("#select_yhm").val();
			$.ajax({
				url: SERVICE_URL + 'coupon_check?callback=?',
				dataType: 'jsonp',
				data: {
					package_id: select_bx,
					coupon_code: select_yhm,
					stu_id: req.bm6,
				},
				jsonp: 'callback',
				success: function(result) {
					for(var i in result) {
						if(result[i].retcode == "1") {
							window.BUI.Message.Alert(result[i].retmsg);
							$("#select_yhje").text(result[i].discount_amount);
							var select_jg = $("#select_jg").text();
							var select_yhje = $("#select_yhje").text();
							if(select_yhje == "" || select_yhje == null) {
								select_yhje = 0;
							}
							$("#select_jyje").text(select_jg - select_yhje);
						} else {
							$("#select_yhm").val("");
							window.BUI.Message.Alert(result[i].retmsg);
						}

					}

				}
			});
		});

		//点击箭头
		$("#a_png").click(function() {
			$.ajax({
				url: SERVICE_URL + 'coupon_search?callback=?',
				dataType: 'jsonp',
				data: {
					userid: "%",
					coupon_status: "未使用",
					mobile: req.bm2,
				},
				success: function(result) {
					var a_png = $("#a_png img").attr("alt");
					$("#select_sect").empty();
					for(var i in result.rows) {
						var odiv = $("<div>" + result.rows[i].coupon_code + "</div>");
						$("#select_sect").append(odiv);
					}
					if(a_png == "向下箭头") {
						if($("#select_sect div").length != 0) {
							$("#select_sect").show();
						}
						$("#a_png img").attr("alt", "向上箭头");
						$("#a_png img").attr("src", "../assets/kld_js/png_2.png");
					} else {
						$("#a_png img").attr("alt", "向下箭头");
						$("#a_png img").attr("src", "../assets/kld_js/png_1.png");
						$("#select_sect").hide();
					}

				}
			});

		});
		

		//点击优惠券
		$("body").on("click", "#select_sect div", function() {
			var otext = $(this).text();
			$("#select_yhm").val(otext);
			var select_bx = $("#select_bx").val();
			var select_yhm = $("#select_yhm").val();
			$.ajax({
				url: SERVICE_URL + 'coupon_check?callback=?',
				dataType: 'jsonp',
				data: {
					package_id: select_bx,
					coupon_code: select_yhm,
					stu_id: req.bm6,
				},
				jsonp: 'callback',
				success: function(result) {
					for(var i in result) {
						if(result[i].retcode == "1") {
							window.BUI.Message.Alert(result[i].retmsg);
							$("#select_yhje").text(result[i].discount_amount);
							var select_jg = $("#select_jg").text();
							var select_yhje = $("#select_yhje").text();
							if(select_yhje == "" || select_yhje == null) {
								select_yhje = 0;
							}
							$("#select_jyje").text(select_jg - select_yhje);
						} else {
							window.BUI.Message.Alert(result[i].retmsg);
						}

					}

				}
			});
			$("#select_sect").hide();
			$("#a_png img").attr("alt", "向下箭头");
		    $("#a_png img").attr("src", "../assets/kld_js/png_1.png");
		});

	});

	// 保存按钮
	$(function() {
		$("#a_bcun").click(function() {
			var select_bx = $("#select_bx").val();
			var select_kq = $("#select_kq").val();
			if(select_bx == "" || select_bx == undefined || select_bx == null) {
				window.BUI.Message.Alert("产品包不能为空");
			} else {
				if(select_kq == "" || select_kq == undefined || select_kq == null) {
					window.BUI.Message.Alert("考期不能为空");
				} else {
					dialog_shotmsg.show();

					var select_bx3 = $("#select_bx").val(); //班型
					$.ajax({
						type: 'POST',
						url: SERVICE_URL + 'package_pdf?callback=?',
						dataType: 'json',
						data: {
							package_id: select_bx3,
						},
						success: function(data) {
							for(var i in data) {
								_pdf = data[i].pdf_path;
								pdf1(_pdf);
							}

						},
						error: function(data) {
							console.log(data)
						}
					});
					//					
					setTimeout(function() {
						if($("#page_num").text() == $("#page_count").text()) {
							$("#Protocol_button").css("display", "block");
						}
					}, 500)

				}

			}

			$("#bear_fruit").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", "disabled");
		});
	});

	//	咨询未报名
	$(function() {
		$("#wei_nm").click(function() {
			var sp_name = $("#sp_name").text();
			var sp_phone = $("#sp_phone").text();
			var sp_lx = $("#sp_lx").text();
			var sp_sf = $("#sp_sf").text();
			var stu_id = req.bm6;
			window.location.href = "new_onsultation_worksheet.html?zx=" + encodeURI(sp_name) + "&zx2=" + encodeURI(sp_phone) + "&zx4=" + encodeURI(sp_lx) + "&zx5=" + encodeURI(sp_sf) + "&zx6=" + encodeURI(stu_id) + "&isyuyue="+encodeURI(req.isyuyue)+"";
		});
	});

	$(function() {
		$("#bao_payment").on("click", function() {
			var select_bx = $("#select_bx").val();
			var select_kq = $("#select_kq").val();
			if(select_bx == "" || select_bx == undefined || select_bx == null) {
				window.BUI.Message.Alert("产品包不能为空");
			} else {
				if(select_kq == "" || select_kq == undefined || select_kq == null) {
					window.BUI.Message.Alert("考期不能为空");
				} else {
					dialog_shotmsg2.show();
					var select_bx3 = $("#select_bx").val();
					$.ajax({
						type: 'POST',
						url: SERVICE_URL + 'package_pdf?callback=?',
						dataType: 'json',
						data: {
							package_id: select_bx3,
						},
						success: function(data) {
							for(var i in data) {
//								console.log(data[i].pdf_path);
								_pdf2 = data[i].pdf_path;
								pdf2(_pdf2);
							}

						},
						error: function(data) {
							console.log(data)
						}
					});

					setTimeout(function() {
						if($("#page_num2").text() == $("#page_count2").text()) {
							$("#Protocol_button2").css("display", "block");
						}
					}, 500);

				}

			}
			$("#bear_fruit2").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", "disabled");
		});
	});

});

//发送短信验证请求
$("#Get_verification_code").click(function() {
	$("#bear_fruit").html("");
	var countdown = 30;
	var _this = $(this);
	//设置button效果，开始计时  
	_this.attr("disabled", "true");
	_this.val(countdown + "秒后重新获取");
	//启动计时器，1秒执行一次  
	var timer = setInterval(function() {
		if(countdown == 0) {
			clearInterval(timer); //停止计时器  
			_this.removeAttr("disabled"); //启用按钮  
			_this.val("重新发送验证码");
		} else {
			countdown--;
			_this.val(countdown + "秒后重新获取");
		}
	}, 1000);
	$.ajax({
		type: 'POST',
		url: SERVICE_URL + 'yzm_send?callback=?',
		dataType: 'json',
		data: {
			phone: req.bm2,
			msg: "sign_up",
		},
		success: function(data) {
			for(var i in data) {
				if(data[i].retcode == "1") {
					window.BUI.Message.Alert(data[i].retmsg);
				} else if(data[i].retcode == "-200") {
					window.BUI.Message.Alert(data[i].retmsg);
				}
			}
		}
	});
	return false;
});

$("#ValidateBox").focus(function() {
	$("#bear_fruit").html("");
});

//验证短信
$("#ValidateBox").blur(function() {
	var ValidateBox = $("#ValidateBox").val();
	$.ajax({
		type: 'POST',
		url: SERVICE_URL + 'yzm_check?callback=?',
		dataType: 'json',
		data: {
			phone: req.bm2,
			yzm: ValidateBox,
		},
		success: function(data) {
			for(var i in data) {
				if(data[i].retcode == "1") {
					$("#bear_fruit").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", false);

				} else {
					$("#bear_fruit").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", "disabled");

				}
				$("#bear_fruit").html(data[i].retmsg);
			}

		}
	});
});

//发送短信验证请求2
$("#Get_verification_code2").click(function() {
	$("#bear_fruit2").html("");
	var countdown = 30;
	var _this = $(this);
	//设置button效果，开始计时  
	_this.attr("disabled", "true");
	_this.val(countdown + "秒后重新获取");
	//启动计时器，1秒执行一次  
	var timer = setInterval(function() {
		if(countdown == 0) {
			clearInterval(timer); //停止计时器  
			_this.removeAttr("disabled"); //启用按钮  
			_this.val("重新发送验证码");
		} else {
			countdown--;
			_this.val(countdown + "秒后重新获取");
		}
	}, 1000);
	$.ajax({
		type: 'POST',
		url: SERVICE_URL + 'yzm_send?callback=?',
		dataType: 'json',
		data: {
			phone: req.bm2,
			msg: "sign_up",
		},
		success: function(data) {
			for(var i in data) {
				if(data[i].retcode == "1") {

					window.BUI.Message.Alert(data[i].retmsg);
				} else if(data[i].retcode == "-200") {

					window.BUI.Message.Alert(data[i].retmsg);
				}
			}
		},
		error: function(data) {
			window.BUI.Message.Alert(data);
		}
	});
	return false;
});

$("#ValidateBox2").focus(function() {
	$("#bear_fruit2").html("");
});

//验证短信2
$("#ValidateBox2").blur(function() {
	var ValidateBox = $("#ValidateBox2").val();
	$.ajax({
		type: 'POST',
		url: SERVICE_URL + 'yzm_check?callback=?',
		dataType: 'json',
		data: {
			phone: req.bm2,
			yzm: ValidateBox,
		},
		success: function(data) {
			for(var i in data) {
				if(data[i].retcode == "1") {
					$("#bear_fruit2").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", false);

				} else {
					$("#bear_fruit2").parents(".bui-stdmod-body").nextAll(".bui-stdmod-footer").children(".button-primary").eq(0).attr("disabled", "disabled");

				}
				$("#bear_fruit2").html(data[i].retmsg);
			}

		}
	});
});

//	pdf
function pdf1() {
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	var url = 'http://' + location.host + '/kld_erpcenter/kld_enroll/' + _pdf + '';
	//               var url="尚德荣誉.pdf";
	// The workerSrc property shall be specified.
	PDFJS.workerSrc = 'pdf.worker.js';

	var pdfDoc = null,
		pageNum = 1,
		pageRendering = false,
		pageNumPending = null,
		scale = 0.8,
		canvas = document.getElementById('the-canvas'),
		ctx = canvas.getContext('2d');

	/**
	 * Get page info from document, resize canvas accordingly, and render page.
	 * @param num Page number.
	 */
	function renderPage(num) {
		pageRendering = true;
		// Using promise to fetch the page
		pdfDoc.getPage(num).then(function(page) {
			var viewport = page.getViewport(scale);
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render PDF page into canvas context
			var renderContext = {
				canvasContext: ctx,
				viewport: viewport
			};
			var renderTask = page.render(renderContext);

			// Wait for rendering to finish
			renderTask.promise.then(function() {
				pageRendering = false;
				if(pageNumPending !== null) {
					// New page rendering is pending
					renderPage(pageNumPending);
					pageNumPending = null;
				}
			});
		});

		// Update page counters
		document.getElementById('page_num').textContent = pageNum;
	}

	/**
	 * If another page rendering in progress, waits until the rendering is
	 * finised. Otherwise, executes rendering immediately.
	 */
	function queueRenderPage(num) {
		if(pageRendering) {
			pageNumPending = num;
		} else {
			renderPage(num);
		}
	}

	/**
	 * Displays previous page.
	 */
	function onPrevPage() {
		if(pageNum <= 1) {
			return;
		}
		$("#Protocol_button").css("display", "none");
		pageNum--;
		queueRenderPage(pageNum);
	}
	document.getElementById('prev').addEventListener('click', onPrevPage);

	/**
	 * Displays next page.
	 */
	function onNextPage() {
		if(pageNum >= pdfDoc.numPages) {
			return;
		}
		if(pageNum + 1 >= pdfDoc.numPages) {
			$("#Protocol_button").css("display", "block");
		}

		pageNum++;
		queueRenderPage(pageNum);
	}
	document.getElementById('next').addEventListener('click', onNextPage);

	/**
	 * Asynchronously downloads PDF.
	 */
	PDFJS.getDocument(url).then(function(pdfDoc_) {
		pdfDoc = pdfDoc_;
		document.getElementById('page_count').textContent = pdfDoc.numPages;

		// Initial/first page rendering
		renderPage(pageNum);
	});
};

//	pdf2
function pdf2() {
	// If absolute URL from the remote server is provided, configure the CORS
	// header on that server.
	//				var url="尚德荣誉.pdf";
	var url = 'http://' + location.host + '/kld_erpcenter/kld_enroll/' + _pdf2 + '';
	// The workerSrc property shall be specified.
	PDFJS.workerSrc = 'pdf.worker.js';

	var pdfDoc = null,
		pageNum = 1,
		pageRendering = false,
		pageNumPending = null,
		scale = 0.8,
		canvas = document.getElementById('the-canvas2'),
		ctx = canvas.getContext('2d');

	/**
	 * Get page info from document, resize canvas accordingly, and render page.
	 * @param num Page number.
	 */
	function renderPage(num) {
		pageRendering = true;
		// Using promise to fetch the page
		pdfDoc.getPage(num).then(function(page) {
			var viewport = page.getViewport(scale);
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render PDF page into canvas context
			var renderContext = {
				canvasContext: ctx,
				viewport: viewport
			};
			var renderTask = page.render(renderContext);

			// Wait for rendering to finish
			renderTask.promise.then(function() {
				pageRendering = false;
				if(pageNumPending !== null) {
					// New page rendering is pending
					renderPage(pageNumPending);
					pageNumPending = null;
				}
			});
		});

		// Update page counters
		document.getElementById('page_num2').textContent = pageNum;
	}

	/**
	 * If another page rendering in progress, waits until the rendering is
	 * finised. Otherwise, executes rendering immediately.
	 */
	function queueRenderPage(num) {
		if(pageRendering) {
			pageNumPending = num;
		} else {
			renderPage(num);
		}
	}

	/**
	 * Displays previous page.
	 */
	function onPrevPage() {
		if(pageNum <= 1) {
			return;
		}
		$("#Protocol_button2").css("display", "none");
		pageNum--;
		queueRenderPage(pageNum);
	}
	document.getElementById('prev2').addEventListener('click', onPrevPage);

	/**
	 * Displays next page.
	 */
	function onNextPage() {
		if(pageNum >= pdfDoc.numPages) {
			return;
		}

		if(pageNum + 1 == pdfDoc.numPages) {
			$("#Protocol_button2").css("display", "block");
		}
		pageNum++;
		queueRenderPage(pageNum);
	}
	document.getElementById('next2').addEventListener('click', onNextPage);

	/**
	 * Asynchronously downloads PDF.
	 */
	PDFJS.getDocument(url).then(function(pdfDoc_) {
		pdfDoc = pdfDoc_;
		document.getElementById('page_count2').textContent = pdfDoc.numPages;

		// Initial/first page rendering
		renderPage(pageNum);
	});
};

//点击返回
$("#btn_fanhui").click(function() {
	var _name = $("#sp_phone").text();
	window.location = "student_registration_list.html?bf=" + _name + ""
});