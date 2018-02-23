BUI.use(['common/search', 'common/page'], function(Search) {
	var columns = [
	    { "title" : "序号", "dataIndex" : "" },
   	    { "title" : "申请单号", "dataIndex" : "" },
   	    { "title" : "订单总数", "dataIndex" : "" },
   	    { "title" : "订单应结金额", "dataIndex" : "" },
   	    { "title" : "本次实结金额", "dataIndex" : "" },
   	    { "title" : "返点方式", "dataIndex" : "" },
   	    { "title" : "返点金额", "dataIndex" : "" },
   	    { "title" : "待结总额", "dataIndex" : "" },
   	    { "title" : "状态", "dataIndex" : "" },
   	    { "title" : "申请人", "dataIndex" : "" },
   	    { "title" : "申请日期", "dataIndex" : "" },
   	    { "title" : "操作", "dataIndex" : "", "renderer" : function(value, obj, index) {
   	    	return '';
   	    } }
	];
	
	var store = Search.createStore('');
	var gridCfg = Search.createGridCfg(columns, {
		// "width" : "100%",
		"emptyDataTpl" : "<div class='centered'><p>没有符合条件的记录</p></div>", 
		"forceFit" : true, 
		"plugins" : [BUI.Grid.Plugins.AutoFit]
	});
	
	new Search({ "autoSearch" : false, "store" : store, "gridCfg" : gridCfg });
});