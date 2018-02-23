BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
	//读取本地session储存
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}

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

	$("#package_name").text(req.package_name); //产品包名称
	$("#a_course_price").text(req.a_course_price); //产品包售价

	var array1 = [];
	var array2 = [];
	//请求支付方式
	$(function() {
		$.ajax({
			url: SERVICE_URL + 'get_org_fx?callback=?',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
			},
			jsonp: 'callback',
			success: function(result) {
				var parent_name = "";
				array1.length = 0;
				array2.length = 0;
				for(var i in result) {
					parent_name = $("<dl class='odl'><dt title='隐藏'><span>" + result[i].text + "</span> <input type='checkbox' /> </dt></dl>");
					$(".daqu").append(parent_name);
					array1.push(result[i].text);
					array2.push(result[i].children);
				}
			}
		});

		//点击标题
		$("body").on("click", ".odl>dt", function() {

			var n = $(this).children("span").text();
			var get_id1 = get_id(array1, array2, n);
			$(this).siblings("dd").remove();
			var odiv = "";
			for(var k in get_id1) {
				odiv = $("<dd class='' data-value=" + get_id1[k].id + ">" + get_id1[k].text + "</div>")
				$(this).parent().append(odiv);
			}
			if($(this).attr("title") == "隐藏") {
				$(this).attr("title", "显示");
				$(this).siblings("dd").show();
			} else if($(this).attr("title") == "显示") {
				$(this).attr("title", "隐藏");
				$(this).siblings("dd").hide();
			}
		});
	});

	//点击全选
	$("body").on("click", ".odl>dt>input", function() {
		var n = $(this).siblings("span").text();
		var get_id1 = get_id(array1, array2, n);
		$(this).parent().siblings("dd").remove();
		var odiv = "";
		for(var k in get_id1) {
			odiv = $("<dd class='' data-value=" + get_id1[k].id + ">" + get_id1[k].text + "</div>")
			$(this).parent().parent().append(odiv);
		}
		//----------------------------------------
		var parent1 = $(this).parents(".odl").index();
		if($(".log_1 .odiv").length > 0) {
			$(".log_1").empty();
		}
		if($(".odl>dt>input:checked").length > 0) {
			if($(this).is(":checked")) {
				$(".odl>dt>input").attr("checked", false);
				$(this).attr("checked", true);
				var odl = $(this).parent("dt").parent("dl").children("dd");
				var oa = '';
				for(var i = 0; i < odl.length; i++) {
					var data_valu = odl.eq(i).data("value");
					oa = $("<div class='odiv'><a href='#' data-index=" + parent1 + " data-value2=" + data_valu + ">" + odl.eq(i).text() + "</a><b>X</b></div>");
					$(".log_1").append(oa);
				}
			}
		}
	});

	//点击院校
	var _length = "";
	var _index = "";
	$(function() {
		//	$(".odl>dd").click(function(){
		$("body").on("click", ".odl>dd", function() {
			var parent1 = $(this).parent().index();
			_index = parent1;
			var data_valu = $(this).data("value");
			var odiv2 = $(".log_1>div>a");
			var odd = $("<div class='odiv'><a href='#' data-index=" + parent1 + " data-value2=" + data_valu + ">" + $(this).text() + "</a><b>X</b></div>");
			for(var i = 0; i < odiv2.length; i++) {
				if(parent1 != odiv2.eq(i).data("index")) {
					$(".odl>dt>input").attr("checked", false);
					$(".log_1").empty();
				}
				if(odiv2.eq(i).data("value2") == data_valu) {
					return false;
				}
			}
			//如果全部选中，将input框也选中
			var length_1 = $(this).parent(".odl").children("dd").length;
			_length = length_1;
			var length_2 = $(".log_1>div>a").length + 1;
			if(length_1 == length_2) {
				$(this).parent(".odl").children("dt").find("input").attr("checked", "checked");
			}
			$(".log_1").append(odd);
		});
	});

	//定义的函数，寻找对应级
	function get_id(arr, arr1, n) {
		var i;
		var arrn = []
		$.each(arr, function(index) {
			if(arr[index] == n) {
				i = index;
			}
		})
		$.each(arr1, function(index) {
			if(i == index) {
				arrn = arr1[index];
			}
		})
		return arrn;
	}

	//点击删除
	$(".log_1").on("click", ".odiv>b", function() {
		$(this).parent().remove();
		var length_2 = $(".log_1>div>a").length;
		if(_length != length_2) {
			$(".odl").eq(_index).children("dt").find("input").attr("checked", false);
		}
	});

	//返回按钮
	$("#btn_fanhui").click(function() {
		var package_name = req.package_name; //产品包名称
		var a_course_price = req.a_course_price; //产品包售价
		var package_id = req.package_id; //产品id
		window.location = "sales_office_relation.html?package_name=" + encodeURI(package_name) + "&a_course_price=" + encodeURI(a_course_price) + "&package_id=" + encodeURI(package_id) + "";
	});

	//点击提交
	$("#btn_success").click(function() {
		var _data = $(".odiv>a");
		var _value = '';
		for(var i = 0; i < _data.length; i++) {
			_value += _data.eq(i).data("value2") + ",";
		}
		$.ajax({
			url: SERVICE_URL + 'package_fx_add?callback=?',
			data: {
				userid: pmAgent.userid,
				school_number: _value,
				package_id: req.package_id,
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(result) {
				for(var i in result) {
					if(result[i].retcode == 1) {
						BUI.Message.Alert(result[i].retmsg);
						var package_name = req.package_name; //产品包名称
						var a_course_price = req.a_course_price; //产品包售价
						var package_id = req.package_id; //产品id
						window.location = "sales_office_relation.html?package_name=" + encodeURI(package_name) + "&a_course_price=" + encodeURI(a_course_price) + "&package_id=" + encodeURI(package_id) + "";
					} else {
						BUI.Message.Alert(result[i].retmsg);
					}
					console.log(result);
				}
			}
		});
	});

});