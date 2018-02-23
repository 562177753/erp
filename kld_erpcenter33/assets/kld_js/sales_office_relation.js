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
$("#a_course_price").text(req.package_price); //产品包售价

BUI.use(['bui/tree', 'bui/data', 'bui/form', 'bui/grid'], function(Tree, Data, Form, Grid) {
	//读取本地session储存
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}

	var columns = [{
			"title": "序号",
			"width": '25%',
			"dataIndex": "xuhao",
			elCls: 'center',
		},
		{
			"title": "大区名称",
			"width": '25%',
			"dataIndex": "region_name",
			elCls: 'center',
		},
		{
			"title": "分校名称",
			"width": '25%',
			"dataIndex": "legion_name",
			elCls: 'center',
		},
		{
			"title": "操作",
			"width": "25%",
			"dataIndex": "",
			elCls: 'center',
			"renderer": function(value, obj, index) {
				var commandLine = '<ul class="toolbar bui-inline-block">';
				commandLine += '<li><a action="delete" href="javascript:;" class="button button-danger btn-del">删除</a></li>';
				commandLine += '</ul>';
				return commandLine;
			}
		}
	];

	var store = new Data.Store({
		"url": SERVICE_URL + "package_fx?callback=?",
		dataType: 'jsonp',
		autoLoad: true, //自动加载数据
		params: { //配置初始请求的参数
			userid: pmAgent.userid,
			package_id: req.package_id,
		},
		pageSize: 5,
	});

	var grid = new Grid.Grid({
		"render": "#grid",
		width:"100%",
		"loadMask": true,
		"bbar": {
			"pagingBar": true
		},
		"columns": columns,
		"store": store,
		pageSize: 3,
		emptyDataTpl: '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
	});
	grid.render();

	//点击操作
	grid.on('cellclick', function(ev) {
		var sender = $(ev.domTarget),
			itemEl = $(ev.element),
			item = ev.item;
		var record = ev.record;
       
		if(sender.hasClass('btn-del')) { //点击删除操作
			delFunction(item, record);
		}
	});

	//删除选中的记录
	function delFunction(item, record) {
		BUI.Message.Confirm('确认删除记录？', function() {
				$.ajax({
				url:SERVICE_URL+'package_fx_del?callback=?',
				data:{
					userid:pmAgent.userid,
					school_number:record.id,
					package_id:req.package_id,
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function(result) {
					for(var i in result){
					  if(result[i].retcode==1){
						BUI.Message.Alert(result[i].retmsg);
						store.load();
				     	store.remove(item);
					     }else{
					     	BUI.Message.Alert(result[i].retmsg);
					     }
					}
				
					
				}
			});
		}, 'question');
	};

	//新增分校
	$("#increase_school").click(function() {
		var package_name = req.package_name; //产品包名称
		var package_price = req.package_price; //产品包售价
		var package_id = req.package_id; //产品id
		window.location = "sales_office_school.html?package_name=" + encodeURI(package_name) + "&a_course_price=" + encodeURI(package_price) + "&package_id=" + encodeURI(package_id) + "";
	});

	//返回按钮
	$("#btn_fh").click(function() {
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
});