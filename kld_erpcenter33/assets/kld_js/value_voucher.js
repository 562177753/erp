//页面加载之前执行登录验证
$(document).ready(function() {
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
});
var quanju;

//bui表格操作
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
	//	定义store数据
	var Store = BUI.Data.Store;
	//创建表格
	var Grid = Grid;
	//配置表格信息
	var columns = [{
			"title": "优惠券编号",
			"dataIndex": "coupon_code",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "申请人",
			"dataIndex": "create_id",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "产品包",
			"dataIndex": "package_name",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "申请时间",
			"dataIndex": "create_time",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "类型",
			"dataIndex": "discount_types",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "使用期限",
			"dataIndex": "coupon_date",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "金额/折扣",
			"dataIndex": "discount_amount",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "状态",
			"dataIndex": "coupon_status",
			elCls: 'center',
			width:"11%",
		},
		{
			"title": "操作",
			"dataIndex": "",
			elCls: 'center',
			width:"12%",
			renderer: function() {
				var block_up = '<button action="block_up"   class="button button-default grid-command block_up">停用</button>';
				return block_up;
			}
		},
	];

   //导出表格
   $("#leading_out").click(function(){
   	var class_type=$("#class_type").val(); //类型
   	var amount_money=$("#amount_money").val();  //折扣
   	var time_limit_1=$("#time_limit_1").val(); //开始时间
   	var time_limit_2=$("#time_limit_2").val(); //结束时间
   	var Class_xing=$("#Class_xing").val(); //产品包
   	var filing_date=$("#filing_date").val();  //申请日期
   	var _status=$("#_status").val();
		var grid=$("#grid .bui-grid-body table tr").eq(1).children("td").eq(0).children("div").children("span").text();
		if(grid==""){
			return false;
		}else{
   			$(this).attr("href",SERVICE_URL+"coupon_outexcel?userid="+ encodeURI(pmAgent.userid) +"&discount_types="+ encodeURI(class_type) +"&coupon_begindate="+encodeURI(time_limit_1)+"&coupon_enddate="+encodeURI(time_limit_2)+"&package_id="+encodeURI(Class_xing)+"&limit=1000&pageIndex=0&coupon_status="+encodeURI(_status)+"&discount_amount="+encodeURI(amount_money)+"&create_time="+encodeURI(filing_date)+"");		
		}
   });


	//缓存数据
	var store = new Store({
		url: SERVICE_URL + 'coupon_search?callback=?',
		method: 'GET',
		dataType: 'jsonp',
		autoLoad: false, //自动加载数据
		params: { //配置初始请求的参数
			userid: pmAgent.userid,
			start : 0,
		},
		pageSize: 10,
	});
	
	//	查询.
	$(function() {
		$('#btnSearch').on("click", function() {
			var amount_money = $("#amount_money").val(); //金额折扣
			var Class_xing = $("#Class_xing").val(); //班型
			var class_type = $("#class_type").val(); //类型
			var _status = $("#_status").val(); //状态
			var filing_date = $("#filing_date").val(); //申请日期
			var time_limit_1 = $("#time_limit_1").val(); //使用期限1
			var time_limit_2 = $("#time_limit_2").val(); //使用期限2
			var params_1 = { //配置初始请求的参数
				userid: pmAgent.userid,    //
				discount_types: class_type, //类型
				coupon_begindate: time_limit_1, //开始期限
				coupon_enddate: time_limit_2, //结束期限
				coupon_status: _status, //状态
				discount_amount: amount_money,
				create_time: filing_date, //申请日期
				package_id:Class_xing,
				bui_type: 'true'
			}
			store.load(params_1);
		});	
	});

	//数据添加到表格
	grid = new Grid.Grid({
		render: '#grid',
		width:"100%",
		columns: columns,
		store: store,
		bbar: {
			pagingBar: true
		}
	});
	grid.render();

	//申请时间
	var datepicker = new Calendar.DatePicker({
		trigger: '.calendar',
		autoRender: true
	});

	//点击表格
	grid.on('cellclick', function(ev) {
		var record = ev.record,
		field = ev.field, //点击对应列的dataIndex
		target = $(ev.domTarget); //点击
		quanju = record;
		if(target.hasClass("block_up")) {
			dialog2.show();
		}
	});

	//停用弹出框
	var dialog2 = new Overlay.Dialog({
		title: '停用',
		width: 400,
		contentId: 'block_up',
		//配置DOM容器的编号
		success: function() {
			$.ajax({
				url: SERVICE_URL + 'coupon_stop?callback=?',
				dataType: 'jsonp',
				data: {
					userid: pmAgent.userid,
					coupon_code: quanju.coupon_code,
				},
				jsonp: 'callback',
				success: function(result) {
					for(var i in result) {
						if(result[i].retcode == "1") {
							store.load();
							BUI.Message.Alert(result[i].retmsg);
						} else {
							BUI.Message.Alert(result[i].retmsg);
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("请求错误：" + data + "错误的原因：" + Error)
				},
			});
			this.close();
		}
	});

	//查询-产品包
	$(function() {
		$.ajax({
			url: SERVICE_URL + 'coupon_class?callback=?',
			dataType: 'jsonp',
			data: {
				userid: pmAgent.userid,
			},
			jsonp: 'callback',
			success: function(result) {
//				console.log(result)		
				var opt=$("<option>产品</option>");
				$("#Class_xing").append(opt);
				var package_name='';
				for(var i in result) {
				package_name += "<option value="+result[i].package_id+">" + result[i].package_name + "</option>";
					
				}	
				$("#Class_xing").append(package_name);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("请求错误：" + data + "错误的原因：" + Error)
			},
		});
	});
});

$(document).ready(function() {
    $('.js-example-basic-single').select2();
});