BUI.use(['common/search', 'common/page'], function(Search) {
	var columns = [
		{ "title" : "业务单据号", "dataIndex" : "a"},
		{ "title" : "报名日期", "dataIndex" : "b"},
		{ "title" : "分校", "dataIndex" : "c"},
		{ "title" : "报名点", "dataIndex" : "d" },
		{ "title" : "接待人", "dataIndex" : "e"},
		{ "title" : "一级项目", "dataIndex" : "f" },
		{ "title" : "二级项目", "dataIndex" : "g" },
		{ "title" : "班型", "dataIndex" : "h"  },
		{ "title" : "学员姓名", "dataIndex" : "i"  },
		{ "title" : "性别", "dataIndex" : "j"  },
		{ "title" : "学历", "dataIndex" : "k"  },
		{ "title" : "证件号码", "dataIndex" : "l"  },
		{ "title" : "手机号码", "dataIndex" : "m" },
		{ "title" : "订单类型", "dataIndex" : "n"  },
		{ "title" : "单据金额", "dataIndex" : "o" },
		{ "title" : "支付方式", "dataIndex" : "p" },
		{ "title" : "缴费金额", "dataIndex" : "q" },
		{ "title" : "付款票据单号", "dataIndex" : "r" },
		{ "title" : "POS机编号", "dataIndex" : "s" },
		{ "title" : "POS名称", "dataIndex" : "t" },
		{ "title" : "订金备注", "dataIndex" : "u" },
		{ "title" : "分期期数", "dataIndex" : "v" }
	];
	
	var testData = [
	    { a : "3", b : "2017-08-28", c : "南昌校", d : "南昌校", e : "lixuanxi", f : "高教云成人高考", g : "江西师范大学", h : "江西师范大学高升专", i : "张星", j : "女", k : "大专以下", l : "362201199406115441", m : "15180561772", n : "订金", o : "2065.00", p : "转账", q : "2065.00" }
	];
	
	var store = Search.createStore('', { "data" : testData });
	var gridCfg = Search.createGridCfg(columns,{
		// "width" : "100%",
		"emptyDataTpl" : "<div class='centered'><p>没有符合条件的记录</p></div>", 
		"forceFit" : true, 
		"plugins" : [BUI.Grid.Plugins.AutoFit]
	});
	
	new Search({ "autoSearch" : false, "store" : store, "gridCfg" : gridCfg });
});