
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
var req=GetRequest();

BUI.use(['bui/data', 'bui/grid'], function(Data, Grid) {
		//读取本地session储存
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
	var columns1 = [
   	    { "title" : "一级项目", "width" : "16%", "dataIndex" : "pro_first_name",elCls: 'center', },
   	    { "title" : "二级项目", "width" : "16%", "dataIndex" : "pro_second_name",elCls: 'center', },
   	    { "title" : "产品名称", "width" : "16%", "dataIndex" : "package_name",elCls: 'center',},
   	    { "title" : "招生总数", "width" : "16%", "dataIndex" : "plan_recruit_num",elCls: 'center', },
   	    { "title" : "产品价格", "width" : "16%", "dataIndex" : "package_price",elCls: 'center',},
   	    { "title" : "实际缴费总额", "width" : "20%", "dataIndex" : "sale_total",elCls: 'center',}
	];
	
	var store1 = new Data.Store({ 
		"url" :SERVICE_URL+"package_info?callback=?",
		params: { //配置初始请求的参数
			userid: pmAgent.userid,	
			package_id:req.package_id,
		},
		"autoLoad" : true,
		pageSize: 5,
	});
	
	var grid1 = new Grid.Grid({
		"render" : "#grid1",
		"loadMask" : true,
		"columns" : columns1,
		"store" : store1,
		 "width" : "100%",
		"emptyDataTpl" : "<div class='centered'><p>没有符合条件的记录</p></div>", 
		"plugins" : [BUI.Grid.Plugins.AutoFit]
	});
	grid1.render();
	
	var columns2 = [
//	    { "title" : "序号", "width" : "14%", "dataIndex" : "",elCls: 'center', },
	    { "title" : "学员姓名", "width" : "14%", "dataIndex" : "stu_name",elCls: 'center', },
	    { "title" : "手机号码", "width" : "14%", "dataIndex" : "mobile",elCls: 'center',},
	    { "title" : "订单状态", "width" : "14%", "dataIndex" : "ord_status_code",elCls: 'center',},
	    { "title" : "报考日期", "width" : "14%", "dataIndex" : "biz_date",elCls: 'center',},
	    { "title" : "赠送", "width" : "14%", "dataIndex" : "",elCls: 'center',},
	    { "title" : "实际缴费", "width" :"16%" , "dataIndex" : "paidup_amount",elCls: 'center',}
	];
	
	var store2 = new Data.Store({ 
		"url" :SERVICE_URL+"package_sales?callback=?",
		params: { //配置初始请求的参数
			userid: pmAgent.userid,	
			package_id:req.package_id,
		},
		"autoLoad" : true,
		"pageSize" : 5
	});
	
	var grid2 = new Grid.Grid({
		"render" : "#grid2",
		"loadMask" : true,
		"bbar" : {
			"pagingBar" : true
		},
		"columns" : columns2,
		"store" : store2,
		 "width" : "100%",
		"emptyDataTpl" : "<div class='centered'><p>没有符合条件的记录</p></div>", 
		"plugins" : [BUI.Grid.Plugins.AutoFit]
	});
	grid2.render();
	
	$("#d_excel").on("click",function(){ 
		$(this).attr("href",SERVICE_URL+"package_sales_outexcel?callback?&userid="+pmAgent.userid+"&package_id="+req.package_id+"");
	});
});


//返回按钮
$("#btn_fanhui").click(function(){
	//session获取
	var _package = sessionStorage.getItem('_package');
	var _package1='';
	if(_package!=""&&_package!=undefined&&_package!=null){
		_package1 = JSON.parse(_package);
	}	
	//session储存
	var _sess = {
      area_id:""+_package1.area_id+"",
      pro_first_id:""+_package1.pro_first_id+"",
      pro_second_id:""+_package1.pro_second_id+"",
      package_name:""+_package1.package_name+"",
      status_code:""+_package1.status_code+"",
	};
	sessionStorage.setItem('_package', JSON.stringify(_sess));
	window.location = 'sales_product_list.html?&package_id='+ encodeURI(req.package_id) +'&area_id='+ encodeURI(req.area_id) +'&pro_first_id='+ encodeURI(req.pro_first_id) +'&pro_second_id='+ encodeURI(req.pro_second_id) +'&package_name='+ encodeURI(req.package_name) +'&status_code='+ encodeURI(req.status_code) +'';
});
