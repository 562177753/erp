
$(document).ready(function() {
	
   pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
});

var quan="";
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form','bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form,Calendar) {

	//	定义store数据
	var Store = BUI.Data.Store;
    var Grid = Grid;
	//	表头与内容的配置
	var columns = [{
			"title": "学生姓名",
			"dataIndex": "stu_name",
			elCls: 'center',
			width:"8%",
			editor: {
				xtype: 'text',
				rules: {
					required: true
				}
			}
		},
		{
			"title": "性别",
			"dataIndex": "stu_sex",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "学员电话",
			"dataIndex": "stu_phone",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "到访机构时间",
			"dataIndex": "reservation_date",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "状态",
			"dataIndex": "state",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "项目",
			"dataIndex": "reservation_porject_frist_name",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "学院",
			"dataIndex": "reservation_porject_second_name",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "推荐班型",
			"dataIndex": "reservation_class_name",
			width:"8%",
			elCls: 'center'
		},
		{
			"title": "预约价格",
			"dataIndex": "price",
			width:"8%",
			elCls: 'center'
		},
			{
			"title": "归属咨询师",
			"dataIndex": "create_id",
			width:"8%",
			elCls: 'center',
		},
		{
			"title": "备注",
			"dataIndex": "",
			elCls: 'center',
			width:"8%",
			renderer : function () {
             var cz = '<a action="cz"   class="grid-command btn1">查看</a>';
              return cz;
            }
		},
		
		{
			"title": "操作",
			"dataIndex": "",
			width:"12%",
			elCls: 'center',
			renderer: function() {
				var df = '<a action="df"   class="grid-command btn1">到访</a>';
				var wd = '<span action="wd" class="grid-command btn1">未到访</span>';
				return df + '</br>' + wd ;
			}
		}
	];

	  var datepicker = new Calendar.DatePicker({
            trigger:'#stu_time1',
            autoRender : true
          });
	//学员手机号
	var stu_phone_search = $("#stu_phone_search").val();
	//学员姓名
	var stu_name = $("#stu_name").val();
	//日期
	var stu_time1 = $("#stu_time1").val();

	//  缓存数据
	var store = new Store({
		url:SERVICE_URL+'reservation_search?callback=?',
		method : 'GET',
		dataType: 'jsonp',
		autoLoad: true, //自动加载数据
		params: { //配置初始请求的参数
			userid: pmAgent.userid,
			stu_phone: stu_phone_search,
			stu_name: stu_name,
			reservation_date: stu_time1,
			bui_type: 'true'
		},
		pageSize: 5,
	});

    grid = new Grid.Grid({
  	render: '#grid',
  	width:"100%",
//  forceFit: true,	// 列宽按百分比自适应
  	columns: columns,
  	emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
  	store: store,
  	bbar: {
  		// pagingBar:表明包含分页栏
  		pagingBar: true
  	}
  });
     	grid.render();
	 
	var ramek;
	
	//点击未到访按钮
	grid.on('cellclick', function(ev) {
		var sender = $(ev.domTarget);
		var name = sender.attr('action');
		var record = ev.record;
		if(name=="cz"){
			$("#modal-body").html(record.remark);
			dialog_shotmsg.show();
		}
		//未到访
		if(name == "wd") {
			BUI.Message.Show({
          title : '',
          msg : '成功',
          icon : 'question',
          buttons : [
            {
              text:'确定',
              elCls : 'button button-primary',
              handler : function(){
				$.ajax({
					url:SERVICE_URL+'reservation_novisit?callback=?',
					dataType: 'jsonp',
					data: {
						r_bill_id: record.r_bill_id,
						userid: pmAgent.userid,
						liushi_memo: "没钱",
						liushi_code: "没钱"
					},
					jsonp: 'callback',
					success: function(result) {
//						console.log("请求成功");
						
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("请求错误：" + data + "错误的原因：" + Error)
					},
					
				});
                this.close();
               store.load();
               
              }
            },
            {
              text:'取消',
              elCls : 'button',
              handler : function(){
                this.close();
              }
            }
 
          ]
        });
		}
		//到访
		else if(name=="df"){
			var res_phone=record.stu_phone;
                 top.topManager.openPage({
				    id : '37',
				    href :"kld_enroll/student_registration_list.html",
				     search : "zd="+res_phone+"",
				  });
				   top.topManager.reloadPage();          
		}      
	});
	
	 //弹出框
		var dialog_shotmsg = new Overlay.Dialog({
		//配置DOM容器的编号
		 title:'备注',
         width:500,
        height:300,
		contentId: 'content2',
		success: function() {
			 this.close();
			 $(".modal-body").html(ramek)
		}
	});

	//	查询.
	$(function() {
		$('#btnSearch').on("click",function() {
			//电话号码
			var catch_role_name = '';
			catch_role_name = $("#stu_phone_search").val();
			//学员姓名
			var stu_name = '';
			stu_name = $("#stu_name").val();
			//日期
			var stu_time1 = '';
			stu_time1 = $("#stu_time1").val();
                
			var params_1 = { //配置初始请求的参数
				userid: pmAgent.userid,
				stu_phone: catch_role_name,
				stu_name: stu_name,
				reservation_date: stu_time1,
				bui_type: 'true'
			}
			store.load(params_1);
		});

	});
});

