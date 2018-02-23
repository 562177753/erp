$(document).ready(function() {
		 	//读取本地session储存
 pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	};
	//姓名
	$("#pmAgent_name").text(pmAgent.name);
	
			//项目
	$.ajax({
		url: SERVICE_URL + 'get_project',
		dataType: 'jsonp',
		data: {
			userid: pmAgent.userid,
		},
		jsonp: 'callback',
		success: function(result) {
			$("#project_name").empty();
			var opt1 = $("<option>请选择</option>");
			$("#project_name").append(opt1);
			for(var i in result) {
				var opt = $("<option value=" + result[i].project_id + ">" + result[i].project_name + "</option>");
				$("#project_name").append(opt);
			}

		}
	});
});	
	
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
	
	
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {

		//申请时间
	var datepicker = new Calendar.DatePicker({
		trigger: '.calendar',
		autoRender: true
	});
	
	
	//项目变化
$("#project_name").change(function() {
	$("#s1_1_1").empty();
	$("#s1_1_2").empty();
	$("#s2_1_1").empty();
	$("#s2_1_2").empty();
	var project_name1 = $("#project_name").val();
	$.ajax({
		url: SERVICE_URL + 'get_college',
		dataType: 'jsonp',
		data: {
			userid: pmAgent.userid,
			project: project_name1,
		},
		jsonp: 'callback',
		success: function(result) {
			$("#s1_1_1").empty();
			for(var i in result) {
				var odiv = $("<div style='height:30px;line-height:30px;' data-id=" + result[i].project_id + ">" + result[i].project_name + "</div>");
				$("#s1_1_1").append(odiv);
			}
		}
	});
});

//院校点击下拉菜单
$("#row_yx").on("click", "#s1_1_1 div", function() {
	//将数据添加到操作数据框中
	var id_temp='';	
	var _this = $("<p style='text-align: center;display:inline-block;height:30px;width:150px;'><a data-id_2=" + $(this).data("id") + " style='margin-left:5px;line-height: 30px;'>" + $(this).text() + "</a><b>X</b></p>");	
	for(var i = 0; i < $("#s1_1_2 a").length; i++) {
		id_temp = $("#s1_1_2 a").eq(i).data("id_2");
		if(id_temp == $(this).data("id")) {
			return false;
		}	
	}
	$("#s1_1_2").append(_this);
	
	//延迟执行
	setTimeout(function(){
//		向产品包中添加
		var data_id_2='';
		 for(var i=0;i<$("#s1_1_2 a").length;i++){	 	
		 	data_id_2+=$("#s1_1_2 a").eq(i).data("id_2")+',';
		 }
		 console.log(data_id_2);
		 $.ajax({
		url: SERVICE_URL + 'get_major',
		dataType: 'jsonp',
		data: {
			userid: pmAgent.userid,
			college: data_id_2,
		},
		jsonp: 'callback',
		success: function(result) {
			$("#s2_1_1").empty();
			$("#s2_1_2").empty();
			for(var i in result) {
				var odiv = $("<div style='height:30px;line-height:30px;' data-id=" + result[i].package_id + ">" + result[i].package_name + "</div>");
				if($("#s1_1_2 a").length==0){
					return false;
				}else{
					$("#s2_1_1").append(odiv);
				}				
			}			
			}
		});		 
	},500)
});

////产品包点击下拉菜单
$("#row_yx2").on("click", "#s2_1_1 div", function() {
var _this = $("<p style='text-align: center;;display:inline-block;height:30px;width:150px;'><a data-id_2=" + $(this).data("id") + " style='margin-left:5px;line-height: 30px;'>" + $(this).text() + "</a><b>X</b></p>");
	var array = Array();
	for(var i = 0; i < $("#s2_1_2 a").length; i++) {
		var id_temp = $("#s2_1_2 a").eq(i).data("id_2")
		if(id_temp == $(this).data("id")) {
			return false;
		}
	}
	$("#s2_1_2").append(_this);
});

//院校点击删除
$("#row_yx").on("click", "#s1_1_2 p>b", function() {
$(this).parent("p").remove();
$("#s2_1_2").empty();
$("#s2_1_1").empty();
 var data_id_3='';		
		 for(var i=0;i<$("#s1_1_2 a").length;i++){	 	
		 	data_id_3+=$("#s1_1_2 a").eq(i).data("id_2")+',';
		 }
		  $.ajax({
		url: SERVICE_URL + 'get_major',
		dataType: 'jsonp',
		data: {
			userid: pmAgent.userid,
			college: data_id_3,
		},
		jsonp: 'callback',
		success: function(result) {
			$("#s2_1_1").empty();
			for(var i in result) {
				var odiv = $("<div style='height:30px;line-height:30px;' data-id=" + result[i].package_id + ">" + result[i].package_name + "</div>");
				if($("#s1_1_2 a").length==0){
					return false;
				}else{
					$("#s2_1_1").append(odiv);
				}				
			}			
			}
		});	
});

//产品包点击删除
$("#row_yx2").on("click", "#s2_1_2 p>b", function() {
	$(this).parent("p").remove();
});
	
});	
	

	//类型
	$(function(){
//		value_type
		$("#value_type").change(function(){
			 if($("#value_type").val()=="1"){
			 	$("#ospan").text("金额:");
			 	$("#ospan2").text("元");
			 }else if($("#value_type").val()=="0"){
			 	$("#ospan").text("折扣:");
			 	$("#ospan2").text("折");
			 }
		});
	});

//院校搜索
$(function(){
	var search_input=$("#search_input");
			var search_div=$("#s1_1_1 div");
	search_input.on("keyup", function() {
        $("#s1_1_1 div:contains(" + search_input.val().trim() + ")").show();
        $("#s1_1_1 div:not(:contains(" + search_input.val().trim() + "))").hide();
         if ($("#search_input").val() =='') {
        	for(var i=0;i<$("#s1_1_1 div").length;i++){
        		$("#s1_1_1 div").eq(i).css("display","block")
        	}
        }
    });
});

//产品包搜索
$(function(){
	var search_input=$("#search_input2");
	var search_div=$("#s2_1_1 div");
	search_input.on("keyup", function() {
        $("#s2_1_1 div:contains(" + search_input.val().trim() + ")").show();
        $("#s2_1_1 div:not(:contains(" + search_input.val().trim() + "))").hide();
         if ($("#search_input2").val() =='') {
        	for(var i=0;i<$("#s2_1_1 div").length;i++){
        		$("#s2_1_1 div").eq(i).css("display","block")
        	}
        }
    });
});
           //院校隐藏
			$(document).bind("click",function(e){
  　　　　　　  var target  = $(e.target);
  　　　　　  　if(target.closest(".odiv1").length == 0){
      　　　　　　   $(".odiv1").hide();
 　　　　　　     }　　　　
 　　　　　　})
			$("#row_yx").click(function(){
				$(".odiv1").show();
				$(".odiv2").hide();
				return false;
			});

          
		  //产品包隐藏
		   $(document).bind("click",function(e){
  　　　　　　  var target  = $(e.target);
  　　　　　  　if(target.closest(".odiv2").length == 0){
      　　　　　　   $(".odiv2").hide();
 　　　　　　     }　　　　
 　　　　　　})
			$("#row_yx2").click(function(){
				$(".odiv2").show();
				$(".odiv1").hide();
				return false;
			});
			
//点击提交
$("#btn_success").on("click",function(){
		  //产品包获取data属性值
	   var college_text_2 = '';
	   var data_id2='';
	   college_text_2 = ''
		for(var i = 0; i < $("#s2_1_2 a").length; i++) {
			data_id2 = $("#s2_1_2 a").eq(i).data("id_2");
			college_text_2 += data_id2 + ",";		
		}
//		console.log(college_text_2);		
			var value_type = $("#value_type").val();
			var value_sdate = $("#value_sdate").val();
			var value_edate = $("#value_edate").val();
			var value_cnt = $("#value_cnt").val();
			var value_amount = $("#value_amount").val();
			for(var i=0;i<$("#s2_1_2  p>a").lenght;i++){
				 console.log($("#s2_1_2 p>a").eq(i).data("id_2"));
			}
			$.ajax({
				url: SERVICE_URL + 'coupon_add?callback=?',
				dataType: 'jsonp',
				data: {
					userid: pmAgent.userid,
					type: value_type, //类型
					sdate: value_sdate, //使用期限开始
					edate: value_edate, //使用期限结束
					amount: value_cnt, //折扣
					cnt: value_amount, //张数
					package: college_text_2,
				},
				jsonp: 'callback',
				success: function(result) {
					for(var i in result) {
						if(result[i].retcode == "1") {
							$("#value_cnt").val("");
							$("#value_amount").val("");
							$("#value_sdate").val("");
							$("#value_edate").val("");
							$("#s1_1_1").html("");
							$("#s1_1_2").html("");
							$("#s2").html("");
							$("#s2_1_1").html("");
							$("#s2_1_2").html("");
							$("#project_name>option:eq(0)").attr("selected",true);
							window.BUI.Message.Alert(result[i].retmsg);
						} else {
							window.BUI.Message.Alert(result[i].retmsg);

						}
					}
				}
			});
});
