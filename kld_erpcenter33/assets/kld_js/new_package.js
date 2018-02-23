BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
	//登录账号
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}

	// 获取url
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
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

	//开关  1:用于创建，2用于详情， 3用于修改
	var falg = req.falg;
    
    //接口
    var _PACKAGE='';
    
	//页面标题
	var _name = decodeURI(req.name);
	$("._name").text(_name);

	//日期
	var datepicker = new Calendar.DatePicker({
		trigger: '.calendar',
		autoRender: true
	});

	//新建的状态
	if(falg == 1) {
		_PACKAGE="package_add";
		_untion();
	}
	//详情的状态
	else if(falg == 2) {
		$(".display_none").css({
			"width": "100%",
			"height": "100%",
			"position": "absolute",
			"display": "block",
		});
		$("body input,body select").attr("disabled", "disabled");
		$("#package_mark").removeAttr("contenteditable");
		$(".odelet").hide();
		$(".row_8 button").eq(0).hide();
		_bianji();
	}
	//修改
	else if(falg == 3) {
		_PACKAGE="package_mod";
		_bianji();
		
	}

//支付类型
$(function(){
		$.ajax({
			url: SERVICE_URL+'payment_way_select?callback=?',
			data: {
				userid: pmAgent.userid,
				type:"package",
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(result) {
				for(var i in result){
					var parent=result[i];
					for(var k in parent.child){
						var oble='';
						oble+="<span type='button' style='margin-left:26px;margin-right:5px;' class='button button-primary'><label> <input  type='checkbox' name='payment_type' value="+parent.child[k].payment_name+">&nbsp;"+parent.child[k].payment_name+"</label></span>";
						$("#type_zhifu").append(oble);
					}
				}
			}
		});
});

	//产品包编辑需要调用函数
	function _bianji() {
		var arr = '';
		var a_course_price='';
		var a_course_discount_perent='';
		var payment_name='';
		$.ajax({
			url: SERVICE_URL + 'package_info?callback=?',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
				package_id: req.package_id,
			},
			jsonp: 'callback',
			success: function(result) {
				var package_name = $("#package_name"); //产品包名称	
				$("#org_region_id").empty().attr("disabled", "disabled"); //大区
				$("#pro_first_id_2").empty().attr("disabled", "disabled"); //一级项目
				$("#pro_second_id_2").empty().attr("disabled", "disabled"); //二级项目
				var product_start_time = $("#product_start_time"); //产品开始时间
				var product_end_time = $("#product_end_time"); //产品结束时间
				var discount_number = $("#discount_number"); //优惠数量
				var lowest_discount = $("#input_lowest"); //最低价
				var happy_start_hour = $("#happy_start_hour"); //优惠开始时间
				var happy_end_hour = $("#happy_end_hour"); //优惠结束时间
				var package_price = $("#package_price"); //标准价格
				var package_desc = $("#package_mark"); //描述
				var opt1 = '';
				var opt2 = '';
				var opt3 = '';
				for(var i in result) {
					arr = result[i].a_course;
					a_course_price= result[i].a_course_price;
					a_course_discount_perent= result[i].a_course_discount_perent;
					payment_name=result[i].payment_name;
					package_name.val(result[i].package_name);
					product_start_time.val(result[i].product_start_time);
					product_end_time.val(result[i].product_end_time);
					discount_number.val(result[i].discount_number);
					lowest_discount.val(result[i].lowest_discount);
					happy_start_hour.val(result[i].happy_start_hour);
					happy_end_hour.val(result[i].happy_end_hour);
					package_price.val(result[i].package_price);
					package_desc.text(result[i].package_desc);
					opt1 = "<option value=" + result[i].area_id + ">" + result[i].area_name + "<option>";
					opt2 = "<option value=" + result[i].pro_first_id + ">" + result[i].pro_first_name + "<option>";
					opt3 = "<option value=" + result[i].pro_second_id + ">" + result[i].pro_second_name + "<option>";
				}
				$("#org_region_id").append(opt1);
				$("#pro_first_id_2").append(opt2);
				$("#pro_second_id_2").append(opt3);
				//版型
				$.ajax({
					url: SERVICE_URL + 'class_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						status_code: "CS_ON_SALE",
						pro_first_id: $("#pro_first_id_2").val(),
						pro_second_id: $("#pro_second_id_2").val(),
						org_region_id: $("#org_region_id").val(),
					},
					jsonp: 'callback',
					success: function(result) {
						var opt = "";
						$("#class_select").empty();
						for(var i in result) {
							opt += "<div data-id=" + result[i].class_id + " data-class_cost=" + result[i].class_cost + " data-class_price=" + result[i].class_price + " data-end_data="+result[i].end_data+" data-start_data="+result[i].start_data+">" + result[i].class_name + "</div>";
						}
						$("#class_select").append(opt);
						
						//带入版型
						var class_select = $("#class_select>div");
						var _arry = arr.split(',');
						var _this='';
						for(var k = 0; k < _arry.length; k++) {
							var arr1 = _arry[k];
							for(var i = 0; i < class_select.length; i++) {
								var arr2 = class_select.eq(i);
								if(arr1==arr2.data("id")){
									 _this += "<div class='_body' data-id_2=" + arr2.data("id") + "><div>" + arr2.text() + "</div><div>"+arr2.data("start_data") +"</div><div>"+arr2.data("end_data")+"</div><div class='class_cost'>" + arr2.data("class_price") + "</div><div>" + arr2.data("class_cost") + "</div><div><input type='text' class='oinput'  placeholder='金额'></div><div>优惠比例:<input type='text' class='_bli'></div><div class=''><a  class='_delet'>删除</a></div></div>";
								}
							}
						}
						$(".row_6_body").append(_this);
						//最低价和返点
						var a_course_price1=a_course_price.split(",");
						var row_div= $(".row_6_body>div");
						var a_course_discount_perent1=a_course_discount_perent.split(",");
						for(var p=0;p<a_course_price1.length;p++){
							row_div.eq(p).find(".oinput").val(a_course_price1[p]);
							row_div.eq(p).find("._bli").val(a_course_discount_perent1[p]);
						}
						//支付类
						var zfu = payment_name.split(",");
					   	var type_zf=$("#type_zhifu>span input");
					   	for(var m=0;m<type_zf.length;m++){
					   		 var isarr1 = $.inArray(type_zf.eq(m).val(), zfu);
					   		if(isarr1 != -1){
					   			type_zf.eq(m).attr('checked', 'checked');
					   		}
					   	}
					   	new_data();
					}
				});

			}
		});
		
	}
	
	function new_data(){
		//日历	          
    var new_start=$("#product_start_time");
    var new_end=$("#product_end_time");
    var new_start_hour=$("#happy_start_hour");
    var new_end_hour=$("#happy_end_hour");
    var new_end_2='';
    var new_start_2='';
   new_start_hour.attr("disabled",false);
   new_end_hour.attr("disabled",false);
    var _Calendar=  new Calendar.DatePicker({
            trigger:'.calendar1',
            minDate : new_start.val(),
            maxDate : new_end.val(),
            autoRender: true
          });
     $("#product_end_time").on("blur",function(){
     	new_start_hour.val("");
   	     new_end_hour.val("");
     	if(new_start.val()!=""&&new_end.val()!=""){
     		new_start_hour.attr("disabled",false);
     		new_end_hour.attr("disabled",false);
     		new_end_2=new_end.val();
     		new_start_2=new_start.val();
     	  new Calendar.DatePicker({
            trigger:'.calendar1',
            minDate : new_start_2,
            maxDate : new_end_2,
            autoRender: true
          });
     	}else{
     		  new_start_hour.val("");
   			  new_end_hour.val("");
     		new_start_hour.attr("disabled","disabled");
     		new_end_hour.attr("disabled","disabled");
     	}
     });

	$("#product_start_time").on("blur",function(){
		new_start_hour.val("");
   			  new_end_hour.val("");
     	if(new_start.val()!=""&&new_end.val()!=""){
     		new_start_hour.attr("disabled",false);
     		new_end_hour.attr("disabled",false);
     		new_end_2=new_end.val();
     		new_start_2=new_start.val();
     	  new Calendar.DatePicker({
            trigger:'.calendar1',
            minDate : new_start_2,
            maxDate : new_end_2,
            autoRender: true
          });
     	}else{
     		new_start_hour.val("");
   			new_end_hour.val("");
     		new_start_hour.attr("disabled","disabled");
     		new_end_hour.attr("disabled","disabled");
     	}
     });
	}

	//创建产品包需要调用函数
	function _untion() {
		// 新建联动自定义类型
		BUI.Form.Group.Select.addType('type1', {
			url: SERVICE_URL + 'package_tri_lnk?&useage=edit&callback=?',
		});
		//指定联动的根作用域，表格
		var form1 = new Form.Form({
			srcNode: '#searchForm1'
		}).render();

		//大区
		$("#org_region_id").on("change", function() {
			$("#class_select,.row_6_body").empty();
		});

		//一级
		$("#pro_first_id_2").on("change", function() {
			$("#class_select,.row_6_body").empty();
		});

		//新建二级项目
		$("#pro_second_id_2").on("change", function() {
			var pro_first_id_2 = $("#pro_first_id_2").val();
			var pro_second_id_2 = $("#pro_second_id_2").val();
			var org_region_id = $("#org_region_id").val();
			$("#class_select,.row_6_body").empty();
			if($(this).val() == "") {
				return false;
			}
			$.ajax({
				url: SERVICE_URL + 'class_search?callback=?',
				dataType: 'jsonp',
				data: {
					userid: pmAgent.userid,
					status_code: "CS_ON_SALE",
					pro_first_id: pro_first_id_2,
					pro_second_id: pro_second_id_2,
					org_region_id: org_region_id,
				},
				jsonp: 'callback',
				success: function(result) {
					var opt = "";
					$("#class_select").empty();
					for(var i in result) {
						var class_lowest=result[i].class_lowest;
						if(class_lowest==undefined)
						{
							class_lowest=0;
						};
						opt += "<div data-id=" + result[i].class_id + " data-class_cost=" +class_lowest + " data-class_price=" + result[i].class_price + " data-end_data="+result[i].end_data+" data-start_data="+result[i].start_data+">" + result[i].class_name + "</div>";
						
					}
					$("#class_select").append(opt);
				}
			});
		});
		
		//日期类型       
    var new_start=$("#product_start_time");
    var new_end=$("#product_end_time");
    var new_start_hour=$("#happy_start_hour");
    var new_end_hour=$("#happy_end_hour");
    var new_end_2='';
    var new_start_2='';
    
     $("#product_end_time").on("blur",function(){
     	new_start_hour.val("");
   			  new_end_hour.val("");
     	if(new_start.val()!=""&&new_end.val()!=""){
     		new_start_hour.attr("disabled",false);
     		new_end_hour.attr("disabled",false);
     		new_end_2=new_end.val();
     		new_start_2=new_start.val();
     	  new Calendar.DatePicker({
            trigger:'.calendar1',
            minDate : new_start_2,
            maxDate : new_end_2,
            autoRender: true
          });
     	}else{
     		new_start_hour.val("");
   			  new_end_hour.val("");
     		new_start_hour.attr("disabled","disabled");
     		new_end_hour.attr("disabled","disabled");
     	}
     });

    $("#product_start_time").on("blur",function(){
    	new_start_hour.val("");
   			  new_end_hour.val("");
     	if(new_start.val()!=""&&new_end.val()!=""){
     		new_start_hour.attr("disabled",false);
     		new_end_hour.attr("disabled",false);
     		new_end_2=new_end.val();
     		new_start_2=new_start.val();
     	  new Calendar.DatePicker({
            trigger:'.calendar1',
            minDate : new_start_2,
            maxDate : new_end_2,
            autoRender: true
          });
     	}else{
     		new_start_hour.val("");
   			  new_end_hour.val("");
     		new_start_hour.attr("disabled","disabled");
     		new_end_hour.attr("disabled","disabled");
     	}
     });
	}
	
	
	//点击提交
		$(".row_8 button").eq(0).click(function() {
		var payment_name = ""; //支付类型名称
		$('input[name="payment_type"]:checked').each(function() {
			payment_name += $(this).val() + ",";
		});
		var _body = $("._body");
		var product_id = "";
		var discount_number = $("#discount_number").val(); //优惠数量
		var org_region_id = $("#org_region_id").val(); //大区
		//班型id
		for(var i = 0; i < _body.length; i++) {
			product_id += _body.eq(i).data("id_2") + ",";
		}
		//班型定价
		var oinput = $(".oinput");
		var a_course_price = '';
		oinput.each(function() {
			a_course_price += $(this).val() + ",";
		});
		//优惠比例
		var _bli = $("._bli");
		var a_course_discount_perent = '';
		_bli.each(function() {
			a_course_discount_perent += $(this).val() + ",";
		});
		var product_start_time = $("#product_start_time").val(); //产品开始售卖日期
		var product_end_time = $("#product_end_time").val(); //产品结束日期
		var happy_start_hour = $("#happy_start_hour").val(); //产品开始优惠时间
		var happy_end_hour = $("#happy_end_hour").val(); //产品结束优惠时间
		var package_price = $("#package_price").val(); //标准价格
		var lowest_discount = $("#input_lowest").val(); //最低价
		var package_name = $("#package_name").val(); //产品包名称
		var package_desc = $("#package_mark").text(); //产品包说明
		$.ajax({
			url: SERVICE_URL +_PACKAGE+'?callback=?',
			data: {
				userid: pmAgent.userid,
				package_id:req.package_id,
				discount_number: discount_number,
				area_id: org_region_id,
				a_course: product_id,
				a_course_price: a_course_price,
				a_course_discount_perent: a_course_discount_perent,
				product_start_time: product_start_time + " 00:00:00",
				product_end_time: product_end_time + " 00:00:00",
				happy_end_hour: happy_end_hour + " 00:00:00",
				happy_start_hour: happy_start_hour + " 00:00:00",
				package_price: package_price,
				lowest_discount: lowest_discount,
				payment_name: payment_name,
				package_name: package_name,
				package_desc: package_desc,
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(result) {
				for(var i in result) {
					if(result[i].retcode == 1) {
						BUI.Message.Alert(result[i].retmsg);
						//session获取
						var _package = sessionStorage.getItem('_package');
						var _package1 = '';
						if(_package != "" && _package != undefined && _package != null) {
							_package1 = JSON.parse(_package);
						}
						//session储存
						var _sess = {
							area_id: "" + _package1.area_id + "",
							pro_first_id: "" + _package1.pro_first_id + "",
							pro_second_id: "" + _package1.pro_second_id + "",
							package_name: "" + _package1.package_name + "",
							status_code: "" + _package1.status_code + "",
						};
						sessionStorage.setItem('_package', JSON.stringify(_sess));
						window.location = 'sales_product_list.html';
					} else {
						BUI.Message.Alert(result[i].retmsg);
					}
				}
			}
		});
	});
});

//点击班型显示
$("#class_type").click(function() {
	if($("#class_type").is(".foo_show")) {
		$(".class_select").show();
		return false;
	}
});
//班型隐藏
$(document).bind("click", function(e) {　　　　　　
	var target = $(e.target);　　　　　　
	if(target.closest(".class_select").length == 0) {　　　　　　
		$(".class_select").hide();　　　　　　
	}　　　　　　　　　　
});

//班型搜索
$(function() {
	var search_input = $("#class_input");
	var search_div = $("#class_select div");
	search_input.on("keyup", function() {
		$("#class_select div:contains(" + search_input.val().trim() + ")").show();
		$("#class_select div:not(:contains(" + search_input.val().trim() + "))").hide();
		if($("#class_input").val() == '') {
			for(var i = 0; i < $("#class_select div").length; i++) {
				$("#class_select div").eq(i).css("display", "block")
			}
		}
	});
	////班型点击下拉菜单
	$(".class_select").on("click", "#class_select div", function() {
		var _this = $("<div class='_body' data-id_2=" + $(this).data("id") + "><div>" + $(this).text() + "</div><div>"+$(this).data("start_data") +"</div><div>"+$(this).data("end_data")+"</div><div >" + $(this).data("class_price") + "</div><div class='class_cost2'>" + $(this).data("class_cost") + "</div><div><input type='text' class='oinput'  placeholder='金额'></div><div>优惠比例:<input type='text' class='_bli'></div><div class=''><a  class='_delet'>删除</a></div></div>");
		var array = Array();
		for(var i = 0; i < $(".row_6_body ._body").length; i++) {
			var id_temp = $(".row_6_body ._body").eq(i).data("id_2")
			if(id_temp == $(this).data("id")) {
				return false;
			}
		}
		$(".row_6_body").append(_this);
		//最低价格
		var lowest_discount = 0;
		var class_cost = $(".class_cost2");
		class_cost.each(function() {
			lowest_discount += +$(this).text();
			$("#input_lowest").val(lowest_discount);
		});
	});
});

//班型定价只允许输入数字
$(function() {
	$(".row_6_body").on("keyup", ".oinput", function() {
		var c = $(this);
		if(/[^\d]/.test(c.val())) { //替换非数字字符    
			var temp_amount = c.val().replace(/[^\d]/g, '');
			$(this).val(temp_amount);
		}
	});

	$("._bli").keyup(function() {
		var b = $(this);
		if(/[^\d]/.test(b.val())) { //替换非数字字符    
			var temp_amount = b.val().replace(/[^\d]/g, '');
			$(this).val(temp_amount);
		}
	});

});

//oinput  班型定价
$(function() {
	$(".row_6_body").on("blur", ".oinput", function() {
		var sum = 0;
		var sum2 = '';
		$(".oinput").each(function() {
			sum += +$(this).val(); //+相加
			sum2 += $(this).val() + ",";
		});
		$('#package_price').val(sum);
	});
});

//产品包点击删除
$(".row_6_body").on("click", "._body ._delet", function() {
	$(this).parent().parent().remove();
	var _body=$("._body");
	var row_6_body=  $(".row_6_body");
	var parent=$(this).parent();
	if(_body.length<=0){
		$("#package_price,#input_lowest").val("");
	}
	
});

//返回按钮
$(".row_8 button").eq(1).click(function() {
	//session获取
	var _package = sessionStorage.getItem('_package');
	var _package1 = '';
	if(_package != "" && _package != undefined && _package != null) {
		_package1 = JSON.parse(_package);
	}
	//session储存
	var _sess = {
		area_id: "" + _package1.area_id + "",
		pro_first_id: "" + _package1.pro_first_id + "",
		pro_second_id: "" + _package1.pro_second_id + "",
		package_name: "" + _package1.package_name + "",
		status_code: "" + _package1.status_code + "",
	};
	sessionStorage.setItem('_package', JSON.stringify(_sess));
	window.location = 'sales_product_list.html';
});

