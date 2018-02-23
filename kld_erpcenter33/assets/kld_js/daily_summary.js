
$(document).ready(function() {
//	读取本地session储存
	pmAgent = pmAgent.load();
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
});


BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
        //------start-------------pos--------------
        var  columns_1 = [
            {title : '收费时间',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '学院姓名',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '操作人',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '单号',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '产品包',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '金额',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付名称',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付类型',dataIndex :'a',elCls: 'center', width:"11%"},
            {
					title: '操作',
					dataIndex: '',
					width: "12%",
					elCls: 'center',
					renderer: function(value, obj) {
						var command = '<ul class="toolbar bui-inline-block">';
				    	command += '<li><button class="button button-info pos_delet">修改</button></li>';
				    	return command;
					}
				}
          ];
	  var data=[{"a":"111","b":"2222","c":"333"}];
	  var store_1 = new Data.Store({
	  	  data:data,
//          url : 'data/grid-data.php',
			 params : { //配置初始请求的参数
//            a : 'a1',
//            b : 'b1'
            },
            autoLoad:true, //自动加载数据       
            pageSize:3	// 配置分页数目
          }),
          
          grid_1 = new Grid.Grid({
            render:'#grid',
            columns : columns_1,
            loadMask: true, //加载数据时显示屏蔽层
            store: store_1,
             bbar:{
                pagingBar:true
            }
          });
 
        grid_1.render();
        
               
	var doing = new Overlay.Dialog({
		title: "修改",
		zIndex : '100',
		width:635,
		//配置DOM容器的编号
		contentId: 'modal',
		success: function() {

		},
		cancel: function() {
		
		}
	});
        
             //日历
     var datepicker = new Calendar.DatePicker({
         trigger:'.calendar',
           autoRender : true
       });
       
       grid_1.on('cellclick', function(ev) {
			var record = ev.record, //点击行的记录
			parment = record;
			field = ev.field, //点击对应列的dataIndex
			target = $(ev.domTarget); //点击的元素
			if(target.hasClass("pos_delet")) {
				doing.show();
			}
		});	
       
       //pos
$("._pos_lable").click(function(){
	$("._pos_body").toggle();
	if($(".oimg_1").attr("alt")=="向下"){
		$(".oimg_1").attr("alt","向上");
		$(".oimg_1").attr("src","../assets/kld_js/xx.png");
	}else if($(".oimg_1").attr("alt")=="向上"){
		$(".oimg_1").attr("alt","向下");
		$(".oimg_1").attr("src","../assets/kld_js/xs.png")
	}
   });
   
   //----------- 转账 -----------
   var columns_2 = [
            {title : '收费时间',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '学院姓名',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '操作人',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '单号',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '班型',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '金额',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付名称',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付类型',dataIndex :'a',elCls: 'center', width:"11%"},
            {
					title: '操作',
					dataIndex: '',
					width: "12%",
					elCls: 'center',
					renderer: function(value, obj) {
						var command = '<ul class="toolbar bui-inline-block">';
				    	command += '<li><button class="button button-info zzhang_delet">删除</button></li>';
				    	return command;
					}
				}
          ];
		var data_2=[{"a":"啊啊啊","b":"啛啛喳喳","c":"顶顶顶顶"}];
		
           var store_2 = new Data.Store({
		  	  data:data_2,
	//          url : 'data/grid-data.php',
				 params : { //配置初始请求的参数
	//            a : 'a1',
	//            b : 'b1'
	            },
	            autoLoad:true, //自动加载数据       
	            pageSize:3	// 配置分页数目
          }),
          
          grid_2 = new Grid.Grid({
            render:'#grid2',
            columns : columns_2,
            loadMask: true, //加载数据时显示屏蔽层
            store: store_2,
            // 底部工具栏
             bbar:{
                // pagingBar:表明包含分页栏
                pagingBar:true
            }
          });
        grid_2.render();
        
         grid_2.on('cellclick', function(ev) {
			var record = ev.record, //点击行的记录
			parment = record;
			field = ev.field, //点击对应列的dataIndex
			target = $(ev.domTarget); //点击的元素
			if(target.hasClass("zzhang_delet")) {
				doing.show();
			}
		});	
        
        //转账
	$("._zhuangzhang_lable").click(function(){
		$("._zhuangzhang_body").toggle();
		if($(".oimg_2").attr("alt")=="向下"){
			$(".oimg_2").attr("alt","向上");
			$(".oimg_2").attr("src","../assets/kld_js/xx.png");
		}else if($(".oimg_2").attr("alt")=="向上"){
			$(".oimg_2").attr("alt","向下");
			$(".oimg_2").attr("src","../assets/kld_js/xs.png")
		}
	});
	
	////-----------------------微信--------------------
	 var columns_3 = [
            {title : '收费时间',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '学院姓名',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '操作人',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '单号',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '班型',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '金额',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付名称',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付类型',dataIndex :'a',elCls: 'center', width:"11%"},
            {
					title: '操作',
					dataIndex: '',
					width: "12%",
					elCls: 'center',
					renderer: function(value, obj) {
						var command = '<ul class="toolbar bui-inline-block">';
				    	command += '<li><button class="button button-info wxin_delet">删除</button></li>';
				    	return command;
					}
				}
          ];
          
	     var data_3=[{"a":"vvvvv","b":"撒大声地撒","c":"顶顶顶顶"}];
	     
          var store_3 = new Data.Store({
	  	  data:data_3,
//          url : 'data/grid-data.php',
			 params : { //配置初始请求的参数
//            a : 'a1',
//            b : 'b1'
            },
            autoLoad:true, //自动加载数据       
            pageSize:3	// 配置分页数目
          }),
          
         grid_3 = new Grid.Grid({
            render:'#grid3',
            columns : columns_3,
            loadMask: true, //加载数据时显示屏蔽层
            store: store_3,
            // 底部工具栏
             bbar:{
                // pagingBar:表明包含分页栏
                pagingBar:true
            }
          });
 
        grid_3.render();
        
        grid_3.on('cellclick', function(ev) {
			var record = ev.record, //点击行的记录
			parment = record;
			field = ev.field, //点击对应列的dataIndex
			target = $(ev.domTarget); //点击的元素
			if(target.hasClass("wxin_delet")) {
				doing.show();
			}
		});	
        
        //微信
	$("._weixin_lable").click(function(){
		$("._weixin_body").toggle();
		if($(".oimg_3").attr("alt")=="向下"){
			$(".oimg_3").attr("alt","向上");
			$(".oimg_3").attr("src","../assets/kld_js/xx.png");
		}else if($(".oimg_3").attr("alt")=="向上"){
			$(".oimg_3").attr("alt","向下");
			$(".oimg_3").attr("src","../assets/kld_js/xs.png")
		}
	});
	
	//-=----------支付宝----------------
      var columns_4= [
            {title : '收费时间',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '学院姓名',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '操作人',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '单号',dataIndex :'a', elCls: 'center',width:"11%"},
            {title : '班型',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '金额',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付名称',dataIndex :'a',elCls: 'center', width:"11%"},
            {title : '支付类型',dataIndex :'a',elCls: 'center', width:"11%"},
            {
					title: '操作',
					dataIndex: '',
					width: "12%",
					elCls: 'center',
					renderer: function(value, obj) {
						var command = '<ul class="toolbar bui-inline-block">';
				    	command += '<li><button class="button button-info zfbao_delet">删除</button></li>';
				    	return command;
					}
				}
          ];  
          
       var data_4=[{"a":"vvv呃呃呃vv","b":"撒大声地的点点滴滴所撒","c":"顶顶顶顶"}];
       
       var store_4= new Data.Store({
	  	  data:data_4,
//          url : 'data/grid-data.php',
			 params : { //配置初始请求的参数
//            a : 'a1',
//            b : 'b1'
            },
            autoLoad:true, //自动加载数据       
            pageSize:3	// 配置分页数目
          }),  
          
          grid_4 = new Grid.Grid({
            render:'#grid4',
            columns : columns_4,
            loadMask: true, //加载数据时显示屏蔽层
            store: store_4,
            // 底部工具栏
             bbar:{
                // pagingBar:表明包含分页栏
                pagingBar:true
            }
          });
 
        grid_4.render();
        
        grid_4.on('cellclick', function(ev) {
			var record = ev.record, //点击行的记录
			parment = record;
			field = ev.field, //点击对应列的dataIndex
			target = $(ev.domTarget); //点击的元素
			if(target.hasClass("zfbao_delet")) {
				doing.show();
			}
		});
        
        //支付宝
		$("._zfbao_lable").click(function(){
			$("._zfbao_body").toggle();
			if($(".oimg_4").attr("alt")=="向下"){
				$(".oimg_4").attr("alt","向上");
				$(".oimg_4").attr("src","../assets/kld_js/xx.png");
			}else if($(".oimg_4").attr("alt")=="向上"){
				$(".oimg_4").attr("alt","向下");
				$(".oimg_4").attr("src","../assets/kld_js/xs.png");
			}
		});
          
});


$("#seach").on("click",function(){
	$(".oimg_4,.oimg_3,.oimg_2,.oimg_1").attr("alt","向下");
	$(".oimg_4,.oimg_3,.oimg_2,.oimg_1").attr("src","../assets/kld_js/xs.png")
	$("._pos_body,._zhuangzhang_body,._weixin_body,._zfbao_body").hide();
});

