$(document).ready(function() {
   pmAgent = pmAgent.load();
	if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}
});
var req='';
var quanju='';  //定义全局
var _seach='';
$(function(){
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
 req=GetRequest();
})

BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
	//定义store数据
	var Store = Data.Store;
	var Grid = Grid;
	var columns = [
	    { "title" : "一级项目", "width" :"9%", "dataIndex" : "pro_first_name",elCls: 'center', },
	    { "title" : "二级项目", "width" : "9%", "dataIndex" : "pro_second_name",elCls: 'center', },
	    { "title" : "产品包名称", "width" : "9%", "dataIndex" : "package_name",elCls: 'center', },
	    { "title" : "售卖价格", "width" : "9%", "dataIndex" : "package_price",elCls: 'center', },
	    { "title" : "优惠最低价", "width" : "9%", "dataIndex" : "lowest_discount",elCls: 'center', },
	    { "title" : "当前状态", "width" : "9%", "dataIndex" : "status_code",elCls: 'center', },
	    { "title" : "售卖截止日期", "width" : "9%", "dataIndex" : "product_end_time",elCls: 'center', },
	    { "title" : "操作", "width" : "37%", "dataIndex" : "",elCls: 'center', "renderer" : function(value, obj, index) {
	    	var commandLine = '<ul class="toolbar bui-inline-block">';
	    	commandLine += '<li><a action="view" href="javascript:;" class="button button-info">详情</a></li>';
	    	commandLine += '<li><a action="relate_office" href="javascript:;" class="button button-info">可售分校</a></li>';
	    	if (obj.status_code == '上架') {
	    		commandLine += '<li><a action="haltsale" href="javascript:;" class="button button-success">下架</a></li>';
	    	}
	    	else {
	    		commandLine += '<li><a action="onsale" href="javascript:;" class="button button-success">上架</a></li>';
	    	}
	    	commandLine += '<li><a action="edit" href="javascript:;" class="button button-danger">编辑</a></li>';
	    	commandLine += '<li><a action="view_student_relation" href="javascript:;" class="button button-info">学员信息</a></li>';
	    	commandLine += '</ul>';
	    	return commandLine;
	    } }
	];
		//session获取
	var _package = sessionStorage.getItem('_package');
	var _package1='';
	var _package1_area_id="";
	var _package1_pro_first_id='';
	var _package1_pro_second_id='';
	var _package1_package_name='';
	var _package1_status_code='';
	if(_package!=""&&_package!=undefined&&_package!=null){
			_package1 = JSON.parse(_package);
			_package1_area_id=_package1.area_id;
			if(_package1_area_id == "undefined") _package1_area_id="";
			_package1_pro_first_id=_package1.pro_first_id;
			if(_package1_pro_first_id == "undefined") _package1_pro_first_id="";
			_package1_pro_second_id=_package1.pro_second_id;
			if(_package1_pro_second_id == "undefined") _package1_pro_second_id="";
			_package1_package_name=_package1.package_name;
			if(_package1_package_name == "undefined") _package1_package_name="";
			_package1_status_code=_package1.status_code;
			if(_package1_status_code == "undefined") _package1_status_code="";
	}	
	
		//  缓存数据
     var store = new Store({
		url: SERVICE_URL+'package_search?callback=?',
		dataType: 'jsonp',
		method: 'GET',
		autoLoad: true, //自动加载数据
		params: { //配置初始请求的参数			
			userid: pmAgent.userid,	
			 area_id:_package1_area_id,
			 pro_first_id:_package1_pro_first_id,
		     pro_second_id:_package1_pro_second_id,
	    	 package_name:_package1_package_name,
			 status_code:_package1_status_code,
			    pageStart : 2,
		},
		pageSize: 5,
	});
	
	grid = new Grid.Grid({
		render: '#grid',
		width:"100%",
		columns: columns,
		store: store,
		bbar: {
			pagingBar: true
		},
		pageSize: 3,
	});
	grid.render();
	
	//日期
	  var datepicker = new Calendar.DatePicker({
            trigger:'.calendar',
            autoRender : true
          });
	
	
	//	查询.
	$(function() {
		$('#btnSearch').on("click", function() {
			var area_id=$("#area_id").val();  //大区
			var pro_first_id=$("#pro_first_id").val(); //项目
			var pro_second_id=$("#pro_second_id").val();  //院校
			var package_name=$("#class_name").val(); //产品包名称
			var status_code=$("#status_code").val(); //产品包状态
			var params_1 = { //配置初始请求的参数
				userid: pmAgent.userid,
  			    area_id:area_id,
  			    pro_first_id:pro_first_id,
  			    pro_second_id:pro_second_id,
  			    package_name:package_name,
  			    status_code:status_code,
			}
			store.load(params_1);	
			//session储存
			var btn_seach = {
		     area_id:""+$("#area_id").val()+"",
		      pro_first_id:""+$("#pro_first_id").val()+"",
		      pro_second_id:""+$("#pro_second_id").val()+"",
		      package_name:""+$("#class_name").val()+"",
		      status_code:""+$("#status_code").val()+"",
			};
			sessionStorage.setItem('btn_seach', JSON.stringify(btn_seach));
		});	
	});
     
     	// 查询联动自定义类型
	BUI.Form.Group.Select.addType('type0', {
		url: SERVICE_URL + 'package_tri_lnk?&useage=look&callback=?'
	});
	//指定联动的根作用域，表格
	var form = new Form.Form({
		srcNode: '#searchForm'
	}).render();

							
	//新上架
	$(function(){
		$("#NEW_grounding").on("click",function(){
			//session获取
				var btn_seach = sessionStorage.getItem('btn_seach');
				var btn_seach1='';
				if(btn_seach!=""&&btn_seach!=undefined&&btn_seach!=null){
					btn_seach1 = JSON.parse(btn_seach);
				}	
			//session储存
			var _sess = {
		      area_id:""+btn_seach1.area_id+"",
		      pro_first_id:""+btn_seach1.pro_first_id+"",
		      pro_second_id:""+btn_seach1.pro_second_id+"",
		      package_name:""+btn_seach1.package_name+"",
		      status_code:""+btn_seach1.status_code+"",
			};
			sessionStorage.setItem('_package', JSON.stringify(_sess));
           window.location="new_package.html?name="+encodeURI("上架新产品")+"&falg=1";
         });
	});
	
	   //上架弹狂
		var dialog = new Overlay.Dialog({
            title:'操作',
            contentId:'modal_up',
            width:500,
            bodyContent:'<p>确定要执行上架操作吗？</p>',
            success:function () {
             $.ajax({
				url:SERVICE_URL+'package_up?callback=?',
				data:{
					userid:pmAgent.userid,
					package_id:quanju.package_id,
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function(result) {
				 for(var i in result){
						if(result[i].retcode==1){
							BUI.Message.Alert(result[i].retmsg);
							store.load();
							dialog.hide()
						}else{
							BUI.Message.Alert(result[i].retmsg);
						}		
					}
				}
			});
            }
          });
        //下架弹狂  
	     var dialog2= new Overlay.Dialog({
            title:'操作',
            width:500,
            bodyContent:'<p>确定要执行下架操作吗？</p>',
            success:function () {
              $.ajax({
				url:SERVICE_URL+'package_down?callback=?',
				data:{
					userid:pmAgent.userid,
					package_id:quanju.package_id,
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function(result) {
				 for(var i in result){
						if(result[i].retcode==1){
							BUI.Message.Alert(result[i].retmsg);
							store.load();
							dialog2.hide();
						}else{
							BUI.Message.Alert(result[i].retmsg);
						}		
					}
				}
			});
            }
          });
          
	//点击表格操作
	grid.on('cellclick', function(ev) {
		var sender = $(ev.domTarget);
		var name = sender.attr('action');
		var record = ev.record;
		quanju=record;
		if (name == 'view') {   //详情
			//session获取
				var btn_seach = sessionStorage.getItem('btn_seach');
				var btn_seach1='';
				if(btn_seach!=""&&btn_seach!=undefined&&btn_seach!=null){
					btn_seach1 = JSON.parse(btn_seach);
				}	
			//session储存
			var _sess = {
		      area_id:""+btn_seach1.area_id+"",
		      pro_first_id:""+btn_seach1.pro_first_id+"",
		      pro_second_id:""+btn_seach1.pro_second_id+"",
		      package_name:""+btn_seach1.package_name+"",
		      status_code:""+btn_seach1.status_code+"",
			};
			sessionStorage.setItem('_package', JSON.stringify(_sess));
			window.location="new_package.html?name="+encodeURI("产品详情")+"&falg=2&package_id="+ encodeURI(quanju.package_id) +"";
		}
		else if (name == 'relate_office') {  //可售分校
			//session获取
				var btn_seach = sessionStorage.getItem('btn_seach');
				var btn_seach1='';
				if(btn_seach!=""&&btn_seach!=undefined&&btn_seach!=null){
					btn_seach1 = JSON.parse(btn_seach);
				}	
			//session储存
			var _sess = {
		      area_id:""+btn_seach1.area_id+"",
		      pro_first_id:""+btn_seach1.pro_first_id+"",
		      pro_second_id:""+btn_seach1.pro_second_id+"",
		      package_name:""+btn_seach1.package_name+"",
		      status_code:""+btn_seach1.status_code+"",
			};
			sessionStorage.setItem('_package', JSON.stringify(_sess));
			var package_name=quanju.package_name;  //产品包名称
			var package_price=quanju.package_price;  //标注价格
			window.location = "sales_office_relation.html?package_name=" + encodeURI(package_name) + "&package_price="+ encodeURI(package_price) +"&package_id="+ encodeURI(quanju.package_id) +"";
		}
		else if (name == 'haltsale') {  //下架
		  dialog2.show();
		}
		else if (name == 'onsale') {  //上架
		dialog.show();
		}
		else if (name == 'edit') {   //编辑
			//session获取
				var btn_seach = sessionStorage.getItem('btn_seach');
				var btn_seach1='';
				if(btn_seach!=""&&btn_seach!=undefined&&btn_seach!=null){
					btn_seach1 = JSON.parse(btn_seach);
				}	
			//session储存
			var _sess = {
		      area_id:""+btn_seach1.area_id+"",
		      pro_first_id:""+btn_seach1.pro_first_id+"",
		      pro_second_id:""+btn_seach1.pro_second_id+"",
		      package_name:""+btn_seach1.package_name+"",
		      status_code:""+btn_seach1.status_code+"",
			};
			sessionStorage.setItem('_package', JSON.stringify(_sess));
			window.location="new_package.html?name="+encodeURI("修改产品包")+"&falg=3&package_id="+ encodeURI(quanju.package_id) +"";
		}
		else if (name == 'view_student_relation') {  //学员信息
			//window/填充选项
			var area_id=$("#area_id").find("option:selected").text(); //大区
			var pro_first_id=$("#pro_first_id").find("option:selected").text(); //项目
			var pro_second_id=$("#pro_second_id").find("option:selected").text();  //院校
			var package_name=$("#class_name").val(); //产品包名称
			var status_code=$("#status_code").find("option:selected").text(); //产品包状态
			//session储存
			//session获取
				var btn_seach = sessionStorage.getItem('btn_seach');
				var btn_seach1='';
				if(btn_seach!=""&&btn_seach!=undefined&&btn_seach!=null){
					btn_seach1 = JSON.parse(btn_seach);
				}	
			//session储存
			var _sess = {
		      area_id:""+btn_seach1.area_id+"",
		      pro_first_id:""+btn_seach1.pro_first_id+"",
		      pro_second_id:""+btn_seach1.pro_second_id+"",
		      package_name:""+btn_seach1.package_name+"",
		      status_code:""+btn_seach1.status_code+"",
			};
			sessionStorage.setItem('_package', JSON.stringify(_sess));
			window.location = 'sales_student_list.html?&package_id='+ encodeURI(quanju.package_id) +'&area_id='+ encodeURI(area_id) +'&pro_first_id='+ encodeURI(pro_first_id) +'&pro_second_id='+ encodeURI(pro_second_id) +'&package_name='+ encodeURI(package_name) +'&status_code='+ encodeURI(status_code) +'';
		}
	});
});



//重置按钮
$("#btn_cz").click(function(){
	$(".panel-body input").val("");
	$(".select_1").find("option").eq(0).attr("selected","selected");
	$(".select_2").find("option").eq(0).attr("selected","selected");
	$(".select_3").find("option").eq(0).attr("selected","selected");
	$(".select_4").find("option").eq(0).attr("selected","selected");
});


