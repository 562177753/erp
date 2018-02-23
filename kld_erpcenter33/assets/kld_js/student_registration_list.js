//学员咨询信息列表
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
	//定义store数据
	var Store = BUI.Data.Store;
	var Grid = Grid;
	//	表头与内容的配置
	var columns = [{
			"title": "姓名",
			"dataIndex": "name",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "手机号",
			"dataIndex": "mobile",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "咨询日期",
			"dataIndex": "zixun_time",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "报名点",
			"dataIndex": "zixun_bmd",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "受理人",
			"dataIndex": "teacher_name",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "预约状态",
			"dataIndex": "isyuyue",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "报名状态",
			"dataIndex": "isbaoming",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "是否交定金",
			"dataIndex": "isdingjin",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "支付完成状态",
			"dataIndex": "iszhifu",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "退款记录",
			"dataIndex": "istuikuan",
			elCls: 'center',
			"width":"9%",
		},
		{
			"title": "咨询师",
			"dataIndex": "zixunshi_id",
			elCls: 'center',
			"width":"10%",
		}
	];
   	
	//手机号码
	var home_phone_1 = $("#home_phone_1").val();
	//姓名
	var home_name_1 = $("#home_name_1").val();
	//  缓存数据
	var store = new Store({
		url: SERVICE_URL+'stuinfo_search?callback=?',
		dataType: 'jsonp',
		method: 'GET',
        loadMask: true,
		autoLoad: true, //自动加载数据
		params: { //配置初始请求的参数
			userid: pmAgent.userid,
			bui_type: 'true',
			mobile:home_phone_1,
			name:home_name_1,
			start : 0,
		},
		pageSize: 3,	    
	});

	grid = new Grid.Grid({
		render: '#grid',
//		forceFit: true, // 列宽按百分比自适应
		 width:'100%',
		columns: columns,
		emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
		store: store,
		bbar: {
			// pagingBar:表明包含分页栏
			pagingBar: true
		},

		pageSize: 3,
	});
	grid.render();
    
    //这是订金详情的弹出框
     var dialog_auditPass = new Overlay.Dialog({
            title:'订金缴纳',
            width:650,
            contentId:'earnest_student_registration_modal',
            success:function () {
            var datetimepicker = $("#datetimepicker").val(); //预留日期
			var data_stu_id = $("#btn_bm_1").find("option:selected").data("stu_id");
			var data_ord_id = $("#btn_bm_1").find("option:selected").data("ord_id");
			var btn_bm_1=$("#btn_bm_1").val();
			userEntity=quanju;
			sessionStorage.setItem('seeeion', JSON.stringify(userEntity));	
			if(datetimepicker==""||datetimepicker==undefined||datetimepicker==null||btn_bm_1==""||btn_bm_1==undefined||btn_bm_1==null||btn_bm_1=="--请选择--"){
			    BUI.Message.Alert("截止日期或报名点不能为空！");
			    return false;
			}	
              this.close();
			location.href = "../kld_enroll/earnest_student_registration.html?jk=" + encodeURI(quanju.name) + "&jk1=" + encodeURI(quanju.highest_education_code) + "&jk2=" + encodeURI(quanju.mobile) + "&jk3=" + encodeURI(quanju.qq) + "&jk4=" + encodeURI(quanju.identity_type_code) + "&jk5=" + encodeURI(quanju.identity_id) + "&jk6=" + encodeURI(data_stu_id) + "&jk8=" + encodeURI(data_ord_id) + "&datetimepicker=" + encodeURI(datetimepicker) +"";
            },
            cancel: function() {
		     $("#btn_bm_1>option").eq(0).attr("selected",true);
		   }
         });
           
           //获取当前日期
          function showData(){
		    var mydate = new Date();
		    var str = "" + mydate.getFullYear() + "-";
		    str += (mydate.getMonth()+1)<10?'0'+(mydate.getMonth()+1):(mydate.getMonth()+1) + "-";
		    str += mydate.getDate()<10?'0'+mydate.getDate():mydate.getDate();
		    return str;
		}
           var time_=showData();
           //日历
		     var datepicker = new Calendar.DatePicker({
		            trigger:'.calendar',
		            minDate :time_,
		            autoRender : true
		          });
    
    	//查看学员
		$(function() {
			$("#see").on("click", function() {
				store.load();
				dosee.show();
		$.ajax({
			url: SERVICE_URL + 'student_search?callback=?',
			jsonp: 'callback',
			dataType: 'jsonp',
			data: {
				stu_id: quanju.stu_id,
				userid: pmAgent.userid,
			},
			success: function(data) {
				$("#btn_age").empty();
		for(var i in data.rows){
								//姓名
			var btn_name_1 = $("#btn_name_1").val(data.rows[i].name);
			//证件类型
			var btn_zj_1 = $("#btn_zj_1").val(data.rows[i].identity_type_code);
			//证件号
			var btn_zjh_1 = $("#btn_zjh_1").val(data.rows[i].identity_id);
			//年龄
			var btn_sex = $("#btn_sex").val(data.rows[i].age);
			//出生日期
			var btn_riqi_1 = $("#btn_riqi_1").val(data.rows[i].birthday);
			//性别
			if(data.rows[i].sex_code == "男") {
				var opt = $("<option >女</option>");
				var btn_age = $("#btn_age").append(opt);
			} else if(data.rows[i].sex_code == "女") {
				var opt = $("<option >男</option>");
				var btn_age = $("#btn_age").append(opt);
			} else if(data.rows[i].sex_code == undefined) {
				$("#btn_age").empty();
				var opt = $("<option >男</option>");
				var opt1 = $("<option >女</option>");
				var btn_age = $("#btn_age").append(opt);
				var btn_age = $("#btn_age").append(opt1);
			}
			var opt = $("<option value=" + data.rows[i].sex_code + "  selected='selected'>" + data.rows[i].sex_code + "</option>");
			var btn_age = $("#btn_age").append(opt);
			//				
			//最高学历
			var btn_xueli_2 = $("#btn_xueli_2").val(data.rows[i].highest_education_code);
			//户籍
			var btn_hj_2 = $("#btn_hj_2").val(data.rows[i].hk_address);
			//手机号码
			var btn_phone_2 = $("#btn_phone_2").val(data.rows[i].mobile);
			//qq
			var btn_qq_2 = $("#btn_qq_2").val(data.rows[i].qq);
			//邮箱
			var btn_em_2 = $("#btn_em_2").val(data.rows[i].email);
			//家庭电话
			var btn_jt_phone = $("#btn_jt_phone").val(data.rows[i].home_phone);
			//办公电话
			var btn_bg_phone = $("#btn_bg_phone").val(data.rows[i].office_phone);
			//微信号
			var btn_wx_1 = $("#btn_wx_1").val(data.rows[i].weixin_id);
			//紧急联系人
			var btn_jj_phone = $("#btn_jj").val(data.rows[i].emergency_contact);
			//紧急联系人电话
			var btn_jj_phone = $("#btn_jj_phone").val(data.rows[i].emergency_phone);
			//毕业院校
			var schoolofgraduation=$("#graduate_institutions").val(data.rows[i].schoolofgraduation);
            //工作年份
            var workyear_2=$("#workyear_2").val(data.rows[i].workyear);
				}
			}
	    	});
			})
		});
		//学员报名
		$(function() {
			$("#sign_up").on("click", function() {
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));			
				$("#mobile_select").val(quanju.mobile);
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));	
				location.href = "pay_student_registration_list.html?bm=" + encodeURI(quanju.name) + "&bm1=" + encodeURI(quanju.highest_education_code) + "&bm2=" + encodeURI(quanju.mobile) + "&bm3=" + encodeURI(quanju.qq) + "&bm4=" + encodeURI(quanju.identity_type_code) + "&bm5=" + encodeURI(quanju.identity_id) + "&bm6=" + encodeURI(quanju.stu_id) + "&mobile=" + encodeURI(quanju.mobile) + "&isyuyue="+encodeURI(quanju.isyuyue)+"";
			});
		});
			//报名单
			//order_search
			if(quanju!=""&&quanju!=undefined&&quanju!=null){
					$.ajax({
					url:SERVICE_URL+'order_main_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: quanju.stu_id,
					},
					jsonp: 'callback',
					success: function(result) {
						var opt1 = "";
						$("#btn_bm_1").empty();
						opt = $("<option>--请选择--</option>");
						$("#btn_bm_1").append(opt);
						for(var i in result.rows) {
							var ord_status=result.rows[i].ord_status_code;
							opt1 = '<option data-ord_id="' + result.rows[i].ord_id_zong + '" data-dj="' + result.rows[i].offer_amount + '"data-rq="' + result.rows[i].session_date_name + '" data-bx="' + result.rows[i].package_name + '" data-xm="' + result.rows[i].project_name + '" data-yx="' + result.rows[i].project_level_name + '" data-stu_id="' + result.rows[i].stu_id + '"   value=' + result.rows[i].ord_id_zong + '>' + result.rows[i].ord_id_zong + '</option>'
							if(ord_status=="未支付")
							{
								$("#btn_bm_1").append(opt1);
							}
							
						}
					}
				});
			}
					
	   //点击详情
		$("#auditPass").click(function(){
			$("#sp_name3").text(quanju.name);
				$("#sp_tel3").text(quanju.mobile);
				$("#org_school_id").text(quanju.zixun_bmd);
				$("#create_user_id").text(pmAgent.name);
				$("#id_xm").attr("disabled", false);
				$("#id_yx").attr("disabled", false);
				$("#id_bx").attr("disabled", false);
				$("#stu_djje").attr("disabled", false);
				$("#datetimepicker").attr("disabled", false);
				$("#btn_bm_1").attr("disabled", false);
			    dialog_auditPass.show();
		});
    
    		//咨询未报名   
		$(function() {
			$("#stu_zx").on("click", function() {
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));	
				location.href = "new_onsultation_worksheet.html?zx=" + encodeURI(quanju.name) + "&zx1=" + encodeURI(quanju.highest_education_code) + "&zx2=" + encodeURI(quanju.mobile) + "&zx4=" + encodeURI(quanju.identity_type_code) + "&zx5=" + encodeURI(quanju.identity_id) + "&zx6=" + encodeURI(quanju.stu_id) + "&zx7=" + encodeURI(quanju.operator_id) + "&isyuyue="+encodeURI(quanju.isyuyue)+""
			})
		});
    
	//点击表格
	grid.on('rowselected', function(ev) {
		var record = ev.record;
		quanju = record;
		
		$.ajax({
					url:SERVICE_URL+'order_main_search?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						stu_id: quanju.stu_id,
					},
					jsonp: 'callback',
					success: function(result) {
						var opt1 = "";
						$("#btn_bm_1").empty();
						opt = $("<option>--请选择--</option>");
						$("#btn_bm_1").append(opt);
						for(var i in result.rows) {
							var ord_status=result.rows[i].ord_status_code;
							opt1 = '<option data-ord_id="' + result.rows[i].ord_id_zong + '" data-dj="' + result.rows[i].offer_amount + '"data-rq="' + result.rows[i].session_date_name + '" data-bx="' + result.rows[i].package_name + '" data-xm="' + result.rows[i].project_name + '" data-yx="' + result.rows[i].project_level_name + '" data-stu_id="' + result.rows[i].stu_id + '"   value=' + result.rows[i].ord_id_zong + '>' + result.rows[i].ord_id_zong + '</option>'
							if(ord_status=="未支付")
							{
								$("#btn_bm_1").append(opt1);
							}
							
						}
					}
				});
		
		
		//电话号码
		var phone_1 = $("#phone_1").html("");
		phone_1.html(record.mobile);
		//姓名
		var name_1 = $("#name_1").html("");
		name_1.html(record.name);
		//户口所在地
		var hk_1 = $("#hk_1").html("");
		hk_1.html(record.hk_address)
		//工作年份
		var gz_1 = $("#gz_1").html("");
		gz_1.html(record.workyear)
		//毕业院校
		var by_1 = $("#by_1").html("");
		by_1.html(record.schoolofgraduation)
		//年龄
		var nl_1 = $("#nl_1").html("");
		nl_1.html(record.age);
		//最高学历
		var xl_1 = $("#xl_1").html("");
		xl_1.html(record.highest_education_code)

		$("#grid_registration_list").empty();
		$("#grid_earnest_list").empty();
		//调用 报名单,定金选项卡
		$("#Tab_switch2").css("display", "block");
		tab_1();
		//判断子表单是否显示
		 if($("#grid_registration_list table>tr").length==0){
		 	 $("#Sub_order").empty();
		 }
		 //tab显示
		$("#Tab_switch,#_TAB").css("display", "block");
	});
	//报名单select
	$(function() {
		$("#btn_bm_1").on("change", function() {
			$("#stu_djje").val("");
			$("#datetimepicker").val("");
			$("#id_xm").empty("");
			$("#id_yx").empty("");
			$("#id_bx").empty("");
			var data_dj = $("#btn_bm_1").find("option:selected").data("dj");
			var data_rq = $("#btn_bm_1").find("option:selected").data("rq");
			var data_xm = $("#btn_bm_1").find("option:selected").data("xm");
			var data_yx = $("#btn_bm_1").find("option:selected").data("yx");
			var data_bx = $("#btn_bm_1").find("option:selected").data("bx");
			var data_stu_id = $("#btn_bm_1").find("option:selected").data("stu_id");
			var opt1 = $("<option value=" + data_xm + ">" + data_xm + "</option>");
			var opt2 = $("<option value=" + data_yx + ">" + data_yx + "</option>");
			var opt3 = $("<option value=" + data_bx + ">" + data_bx + "</option>");
//			$("#datetimepicker").val(data_rq);
			$("#id_xm").append(opt1);
			$("#id_yx").append(opt2);
			$("#id_bx").append(opt3);
		});
	});
   
      //新增学员手机号查询
   $(function(){
   	   $("#btn_phone_1").blur(function(){
   	   	  var mobile= $("#btn_phone_1").val();
   	   	   	$.ajax({
				url: SERVICE_URL + 'stu_last_zixun_id?callback=?',
				dataType: 'jsonp',
				data: {
					mobile:mobile,
				},
				jsonp: 'callback',
				success: function(result) {
//				 console.log(result);
				 for(var i in result){
				   $("#counselor_attach").val(result[i].zixunshi_name);
				 }
				}
			});
   	   });
   });


	//报名单弹窗
	var doing = new Overlay.Dialog({
		title: "新增学员信息",
		zIndex : '100',
		//配置DOM容器的编号
		contentId: 'xingzen_modal',
		success: function() {
			//姓名
			var name_2 = $("#name_2").val();
			//电话号码
			var btn_phone_1 = $("#btn_phone_1").val();
			//qq
			var btn_qq_1 = $("#btn_qq_1").val();
			//证件号
			var btn_identity_id_1 = $("#btn_identity_id_1").val();
			//证件类型
			var btn_identity_type_code = $("#btn_identity_type_code").val();
			//最高学历
			var btn_xueli_1 = $("#btn_xueli_1").val();
			//出生日期
			var datetimepicker_2 = $("#datetimepicker_2").val();
			//户口所在地
			var btn_huju_1 = $("#btn_huju_1").val();
			//邮箱
			var btn_em = $("#btn_em").val();
			//毕业院校
			var schoolofgraduation = $("#schoolofgraduation").val();
			//是否预约
			var order = $("#order").val();
			//工作年份
			var workyear = $("#workyear").val();
			//性别
			var sex_code = $("#sex_code").val();
			//
				$.ajax({
					url:SERVICE_URL+'student_add?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						qq: btn_qq_1,
						identity_id: btn_identity_id_1, //证件号码
						identity_type_code: btn_identity_type_code, //证件类型
						mobile: btn_phone_1, //电话
						name: name_2, //姓名
						highest_education_code: btn_xueli_1, //最高学历
						birthday: datetimepicker_2, //出生年月日
						hk_address: btn_huju_1, //户籍所在地
						email: btn_em, //邮箱
						schoolofgraduation: schoolofgraduation, //毕业院校
						order: order, //是否预约
						workyear: workyear,
						sex_code: sex_code,
					},
					jsonp: 'callback',
					success: function(result) {

						for(var i in result) {
							var result_ = result[i].retcode;
							if(result_ == 1) {							
								//姓名
								$("#name_2").val("");
								//电话号码
								$("#btn_phone_1").val("");
								//qq
								$("#btn_qq_1").val("");
								//证件号
								$("#btn_identity_id_1").val("");
								//出生日期
								$("#datetimepicker_2").val("");
								//户口所在地
								$("#btn_huju_1").val("");
								//邮箱
								$("#btn_em").val("");
								//毕业院校
								$("#schoolofgraduation").val("");
								for(var i in result) {
									store.load();
									BUI.Message.Alert(result[i].retmsg);
								   doing.hide();
								}
								var result_1 = $("#btn_xinzen_2").attr("data-dismiss", "modal");
								$("#xingzen_modal .modal-body input").val("");

							} else {
								BUI.Message.Alert(result[i].retmsg);
								$("#btn_xinzen_2").removeAttr("data-dismiss");
							}

						}

					}
				});

		},
		cancel: function() {
			$("#xingzen_modal input").val("")
			$("#name_2").val("");
			$("#btn_phone_1").val("");
			$("#btn_identity_id_1").val("");
			$("#btn_qq_1").val("");
			$("#schoolofgraduation").val("");
			$("#btn_huju_1").val("");
			$("#datetimepicker_2").val("");
			$("#btn_em").val("");
			$("#workyear").val();
		}
	});
	//新增
	$("#btn_xinzen").on("click", function() {
		doing.show();
	});

	//查看学员弹窗
	var dosee = new Overlay.Dialog({
		title:"查看学员",
		//配置DOM容器的编号
		contentId: 'view_student_information_modal',
		success: function() {
			//姓名
			var btn_name_1 = $("#btn_name_1").val();
			//证件类型
			var btn_zj_1 = $("#btn_zj_1").val();
			//证件号
			var btn_zjh_1 = $("#btn_zjh_1").val();
			//年龄
			var btn_sex = $("#btn_sex").val();
			//出生日期
			var btn_riqi_1 = $("#btn_riqi_1").val();
			//性别
			var btn_age = $("#btn_age").val();
			//最高学历
			var btn_xueli_2 = $("#btn_xueli_2").val();
			//户籍
			var btn_hj_2 = $("#btn_hj_2").val();
			//手机号码
			var btn_phone_2 = $("#btn_phone_2").val();
			//qq
			var btn_qq_2 = $("#btn_qq_2").val();
			//邮箱
			var btn_em_2 = $("#btn_em_2").val();
			//家庭电话
			var btn_jt_phone = $("#btn_jt_phone").val();
			//办公电话
			var btn_bg_phone = $("#btn_bg_phone").val();
			//微信号
			var btn_wx_1 = $("#btn_wx_1").val();
			//紧急联系人
			var btn_jj_phone = $("#btn_jj").val();
			//紧急联系人电话
			var btn_jj_phone = $("#btn_jj_phone").val();
            //毕业院校
            var schoolofgraduation=$("#graduate_institutions").val();
            //工作年份
              var workyear_2=$("#workyear_2").val();
				$.ajax({
					url:SERVICE_URL+'student_mod?callback=?',
					dataType: 'jsonp',
					data: {
						userid: pmAgent.userid,
						name: btn_name_1, //姓名
						identity_type_code: btn_zj_1, //证件类型
						identity_id: btn_zjh_1, //证件号码
						age: btn_sex, //年龄
						birthday: btn_riqi_1, //出生日期
						sex_code: btn_age, //性别
						highest_education_code: btn_xueli_2, //最高学历
						hk_address: btn_hj_2, //户籍
						qq: btn_qq_2, //QQ
						email: btn_em_2, //邮箱
						home_phone: btn_jt_phone, //家庭电话
						office_phone: btn_bg_phone, //办公电话
						weixin_id: btn_wx_1, //微信号
						emergency_contact: btn_jj_phone, //紧急联系人
						emergency_phone: btn_jj_phone, //紧急联系人电话
						stu_id: quanju.stu_id, //学员id
						schoolofgraduation:schoolofgraduation,//毕业院校
						workyear:workyear_2,  //工作年份
					},
					jsonp: 'callback',
					success: function(result) {
						for(var i in result) {							
							var result_ = result[i].retcode;
							if(result_ == 1) {
								dosee.hide();
								BUI.Message.Alert(result[i].retmsg);
								
								$.ajax({
									url: SERVICE_URL+'student_search?callback=?',
									jsonp: 'callback',
									dataType: 'jsonp',
									data:{
										stu_id:quanju.stu_id,
										userid: pmAgent.userid,
									},
									success:function(data){
										for(var i in data.rows){
										//电话号码
								     $("#phone_1").html(data.rows[i].mobile);
									//姓名
									 $("#name_1").html(data.rows[i].name);
									//户口所在地
									 $("#hk_1").html(data.rows[i].hk_address);
									//工作年份
									$("#gz_1").html(data.rows[i].workyear);
									//毕业院校
									 $("#by_1").html(data.rows[i].schoolofgraduation);
									//年龄
									$("#nl_1").html(data.rows[i].age);
									//最高学历
									var xl_1 = $("#xl_1").html(data.rows[i].highest_education_code);
									}
										store.load();
										console.log(quanju);
								  }		
								});
								
		                     } else {
								BUI.Message.Alert(result[i].retmsg);
							}
						}
					}
				});
		}
	})

	//添加定金
	$(function() {
		$("#earnest_student_1").on("click", function() {
			var datetimepicker = $("#datetimepicker").val(); //预留日期
			var data_stu_id = $("#btn_bm_1").find("option:selected").data("stu_id");
			var data_ord_id = $("#btn_bm_1").find("option:selected").data("ord_id");
			userEntity=quanju;
			sessionStorage.setItem('seeeion', JSON.stringify(userEntity));
			location.href = "../kld_enroll/earnest_student_registration.html?jk=" + encodeURI(quanju.name) + "&jk1=" + encodeURI(quanju.highest_education_code) + "&jk2=" + encodeURI(quanju.mobile) + "&jk3=" + encodeURI(quanju.qq) + "&jk4=" + encodeURI(quanju.identity_type_code) + "&jk5=" + encodeURI(quanju.identity_id) + "&jk6=" + encodeURI(data_stu_id) + "&jk8=" + encodeURI(data_ord_id) + "&datetimepicker=" + encodeURI(datetimepicker) +"";
		});
	});

    //	查询.
	$(function() {
		$('#btnSearch').on("click", function() {
			//电话号码
			var home_phone_2 = '';
			home_phone_2 = $("#home_phone_1").val();
			//学员姓名
			var home_name_2 = '';
			home_name_2 = $("#home_name_1").val();
			var params_1 = { //配置初始请求的参数
				userid: pmAgent.userid,
				name: home_name_2,
				mobile: home_phone_2,
				bui_type: 'true',
				start : 0,
			}
			store.load(params_1);			
		});	
	});
});

//报名单的缓存数据
var store_1="";
//报名单,定金选项卡
var tab_1 = function() {
	
	//tab页：报名单、订金、预收款
	BUI.use(['bui/tab', 'bui/mask'], function(Tab) {
		var tab = new Tab.TabPanel({
			srcNode: '#tab',
			elCls: 'nav-tabs',
			itemStatusCls: {
				'selected': 'active'
			},
			panelContainer: '#panel' //如果不指定容器的父元素，会自动生成
		});
		tab.render();
	});
	//tab页：报名单列表
	BUI.use(['common/search', 'bui/grid', 'bui/data', 'bui/overlay'], function(Search, Grid, Data, Overlay) {
		//定义表格
		var Grid = Grid,
			//定义store数据
			Store = Data.Store,
			columns = [{
					title: '订单编号',
					dataIndex: 'ord_id_zong',
					width: "8%",
					elCls: 'center',
				}, {
					title: '姓名',
					dataIndex: 'name',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '受理人',
					dataIndex: 'create_name',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '院校',
					dataIndex: 'project_level_name',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '状态',
					dataIndex: 'ord_status_code',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '创建时间',
					dataIndex: 'create_time',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '支付时间',
					dataIndex: 'zhifu_time',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '原价',
					dataIndex: 'training_fee',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '优惠',
					dataIndex: 'offer_amount',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '实际支付',
					dataIndex: 'paidup_amount',
					width: "8%",
					elCls: 'center',
				},
				{
					title: '操作',
					dataIndex: 'h',
					width: "20%",
					elCls: 'center',
					renderer: function(value, obj) {
						var command = '<ul class="toolbar bui-inline-block">';
				    	
				    	command += '<li><button class="button button-info details_registration_list" style="margin:3px">详情</button></li>';
				    	command += '<li><button class="button button-warning Invalid_registration" data-toggle="modal" data-target="#" style="margin:3px">作废</button></li>';
				    	if (obj.ord_status_code != '已作废') {
				    		command += '<li><button class="button button-primary payment_button" style="margin:3px" >缴款</button></li>';
				    	}
				    	return command;
					}
				}
			];
        
		   store_1 = new Store({
			url: SERVICE_URL+'order_main_search?callback=?',
			dataType: 'jsonp',
			autoLoad: true, //自动加载数据
			params: { //配置初始请求的参数
				userid: pmAgent.userid,
				stu_id: quanju.stu_id,
				bui_type: 'true'
			},
			pageSize: 3,
		});
		var grid = new Grid.Grid({
			render: '#grid_registration_list',
			width:"100%",
//			forceFit: true, // 列宽按百分比自适应
			columns: columns,
			emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
			store: store_1,
			bbar: {
				pagingBar: true
			}
		});
		grid.render();
		grid.on('cellclick', function(ev) {
			var record = ev.record, //点击行的记录
			zidd = record;
			parment = record;
			field = ev.field, //点击对应列的dataIndex
			target = $(ev.domTarget); //点击的元素
			//定义store数据
			$("#Sub_order").empty();
	          		//列表
				BUI.use(['common/search', 'bui/grid', 'bui/data', 'bui/overlay'], function(Search, Grid, Data, Overlay) {
					//定义表格
					var Grid = Grid,
						//定义store数据
						Store = Data.Store,
						columns = [{
								title: '子订单编号',
								dataIndex: 'ord_id',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '产品名称',
								dataIndex: 'product_name',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '项目',
								dataIndex: 'project_name',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '产品包',
								dataIndex: 'product_package',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '转入状态',
								dataIndex: 'ord_status_code',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '课程状态',
								dataIndex: 'lesson_status',
								width: "11%",
								elCls: 'center',
							},
							{
								title: ' 产品价格',
								dataIndex: 'training_fee',
								width: "11%",
							   elCls: 'center',
							},
							{
								title: '子订单金额',
								dataIndex: 'total_amount',
								width: "11%",
								elCls: 'center',
							},
							{
								title: '协议',
								dataIndex: 'training_fee',
								width: "12%",
								elCls: 'center',
								renderer: function() {
									var xy = '<a action="xy"   class="grid-command btn1 look_over">查看</a>';
									return xy;
								}
							},
						];

					var store = new Store({
						url: SERVICE_URL+'order_search?callback=?',
						dataType: 'jsonp',
						autoLoad: true, //自动加载数据
						params: { //配置初始请求的参数
							userid: pmAgent.userid,
							stu_id: zidd.stu_id,
							bui_type: 'true',
							parent_id: zidd.ord_id_zong
						},
					})
				
					var grid = new Grid.Grid({
						render: '#Sub_order',
						width:"100%",
//						forceFit: true, // 列宽按百分比自适应
						columns: columns,
						emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
						store: store,
					});
					grid.render();
					grid.on('cellclick', function(ev) {
						var record = ev.record, //点击行的记录
							field = ev.field, //点击对应列的dataIndex
							target = $(ev.domTarget); //点击的元素
						if(target.hasClass("look_over")) {
							userEntity=quanju;
							sessionStorage.setItem('seeeion', JSON.stringify(userEntity));
							window.location.href = "../build/generic/web/viewer.html?pdf_path="+encodeURI(record.pdf_path)+"&phone="+encodeURI(quanju.mobile)+"";
						}
					});
				});

			if(target.hasClass('details_registration_list')) { //报名单详情      
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));	
				location.href = "../kld_enroll/order_details_list.html?ord_id=" + encodeURI(record.ord_id_zong) + "&stu_id=" + encodeURI(record.stu_id) + "&xq=" + encodeURI(quanju.name) + "&xq1=" + encodeURI(quanju.mobile) + "&xq2=" + encodeURI(quanju.highest_education_code) + "&xq3=" + encodeURI(quanju.identity_type_code) + "&xq4=" + encodeURI(quanju.identity_id) + "&xq5=" + encodeURI(record.project_name) + "";
			}
			if(target.hasClass("Invalid_registration")) { //作废报名单
				//作废
				new Overlay.Dialog({
					title: '作废',
					width: 500,
					height: 130,
					bodyContent: '<p>确定要作废此状态吗？</p>',
					success: function() {
							$.ajax({
								url:SERVICE_URL+'order_cancel?callback=?',
								dataType: 'jsonp',
								data: {
									userid: pmAgent.userid,
									ord_id_zong: record.ord_id_zong,
									stu_id: record.stu_id,
								},
								jsonp: 'callback',
								success: function(result) {
									for(var i in result) {
										store_1.load();
										BUI.Message.Alert(result[i].retmsg);
									}

								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
									console.log("请求错误：" + data + "错误的原因：" + Error)
								},
							});
						this.close();
					}
				}).show();
			}

			if(target.hasClass("payment_button")) { //缴费
				parment = record,
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));
				window.location = "../kld_enroll/_payment2.html?py=" + encodeURI(quanju.name) + "&py1=" + encodeURI(quanju.highest_education_code) + "&py2=" + encodeURI(quanju.mobile) + "&py3=" + encodeURI(quanju.qq) + "&py4=" + encodeURI(quanju.identity_type_code) + "&py5=" + encodeURI(quanju.identity_id) + "&py6=" + encodeURI(parment.stu_id) + "&ord_id_zong=" + encodeURI(parment.ord_id_zong) + "";
			}
		});
	});

	//tab页：订金列表
	BUI.use(['bui/grid', 'bui/data', 'bui/overlay', 'bui/form'], function(Grid, Data, Overlay, Form) {
		var Grid = Grid,
			Store = Data.Store,
			columns = [{
				title: '订单状态',
				dataIndex: 'deposit_cancellation',
				width: "10%",
				elCls: 'center',
			}, {
				title: '下单时间',
				dataIndex: 'payment_time',
				width: "10%",
				elCls: 'center',
			}, {
				title: '项目',
				dataIndex: 'project_name',
				width: "10%",
				elCls: 'center',
			}, {
				title: '院校',
				dataIndex: 'project_level_name',
				width: "10%",
				elCls: 'center',
			}, {
				title: '产品包',
				dataIndex: 'package_name',
				width: "10%",
				elCls: 'center',
			}, {
				title: '金额',
				dataIndex: 'amount',
				width: "10%",
				elCls: 'center',
			}, {
				title: '课程顾问',
				dataIndex: 'operator_id',
				width: "10%",
				elCls: 'center',
			}, {
				title: '操作',
				dataIndex: 'h',
				elCls: 'center',
				width: "30%",
				renderer: function(value, obj, index) {
					
		    var commandLine = '<ul class="toolbar bui-inline-block">';
	    	commandLine += '<li><button class="button button-warning  Invalid_registration_1" data-toggle="modal" data-target="#" style="margin:3px">作废</button></li>';
	    	commandLine += '<li><button class="button button-warning  tanchu" data-toggle="modal" data-target="#" style="margin:3px">详情</button></li>';
	    	
	    	if (obj.deposit_cancellation != '已作废') {
	    		commandLine += '<li><button class="button button-info button button-primary   earnest_student_xiugai" data-toggle="modal"  style="margin:3px">修改</button></li>';
	    	}  	
	    	commandLine += '</ul>';
	    	return commandLine;
				}
			}];

		editing = new Grid.Plugins.DialogEditing({
			contentId: 'content',
			triggerCls: 'btn-edit'
		});
        
		var store = new Store({
				url: SERVICE_URL+'payement_details_search?callback=?',
				dataType: 'jsonp',
				autoLoad: true, //自动加载数据
				params: { //配置初始请求的参数
					userid: pmAgent.userid,
					stu_id: quanju.stu_id,
					payment_type:'定金',
					bui_type: 'true'
				},
				pageSize: 3,
			}),
			grid = new Grid.Grid({
				render: '#grid_earnest_list',
				//	forceFit: true, // 列宽按百分比自适应
				width:"100%",
				columns: columns,
				emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
				plugins: [Grid.Plugins, editing],
				store: store,
				bbar: {
					pagingBar: true
				}
			});
			     
		grid.render();
		grid.on('cellclick', function(ev) {
				var record = ev.record, //点击行的记录
					field = ev.field, //点击对应列的dataIndex
					target = $(ev.domTarget); //点击的元素
				//打印
				if(target.hasClass('print_registration_list')) {
					alert('打印');
				}
				if(target.hasClass('tanchu')){
					$("#student_name").text(quanju.name);  //姓名
					$("#student_mobile").text(quanju.mobile);  //电话号码
					$("#student_zixun_bmd").text(quanju.zixun_bmd); //咨询报名点
					$("#student_operator_id").text(record.operator_id); //课程顾问
					$("#student_ord_id").val(record.ord_id); //报名点
					$("#student_bligate").val(record.bligate); //预留截止
					$("#student_project_name").val( record.project_name); //项目
					$("#student_project_level_name").val(record.project_level_name);  //院校
					$("#student_product_package").val(record.package_name);  //班型
					$("#student_amount").val(record.amount);  //订金金额
					$("#tanchu,#tanchu_2").slideDown("slow");
				}
				//修改
			if(target.hasClass("earnest_student_xiugai")) {  
				userEntity=quanju;
				sessionStorage.setItem('seeeion', JSON.stringify(userEntity));
				window.location = "../kld_enroll/earnest_student_registration2.html?jk=" + encodeURI(quanju.name) + "&jk1=" + encodeURI(quanju.highest_education_code) + "&jk2=" + encodeURI(quanju.mobile) + "&jk3=" + encodeURI(quanju.qq) + "&jk4=" + encodeURI(quanju.identity_type_code) + "&jk5=" + encodeURI(quanju.identity_id) + "&jk6=" + encodeURI(quanju.stu_id) + "&jk6_1=" + encodeURI(record.ord_id) + "&jk14=" + encodeURI(record.one_payment_id) + "";
			}
			if(target.hasClass("Invalid_registration_1")) { //作废订金
				new Overlay.Dialog({
					title: '作废',
					width: 500,
					height: 130,
					bodyContent: '<p>确定要作废订金吗？</p>',
					success: function() {
							$.ajax({
								url:SERVICE_URL+'payement_details_cancel?callback=?',
								dataType: 'jsonp',
								data: {
									userid: pmAgent.userid,
									ord_id: record.ord_id,
									stu_id: record.stu_id,
									one_payment_id: record.one_payment_id,
								},
								jsonp: 'callback',
								success: function(result) {
									for(var i in result) {
										store.load();
										store_1.load();
										BUI.Message.Alert(result[i].retmsg);
									}

								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
									console.log("请求错误：" + data + "错误的原因：" + Error)
								},
							});
						this.close();
					}
				}).show();
			}

		});
	});

}

//订金详情确认按钮
$("#btn_show").click(function(){
	 $("#tanchu").hide();
	 $("#tanchu_2").hide();
});


//row_1
$("#lable_1").on("click", function() {
	$(".row_1").css("display", "none");
	$(".row_1").eq(0).css("display", "block");
})
$("#lable_2").on("click", function() {
	$(".row_1").css("display", "none");
	$(".row_1").eq(1).css("display", "block");
})
$("#lable_3").on("click", function() {
	$(".row_1").css("display", "none");
	$(".row_1").eq(2).css("display", "block");
})
//tab active
$('.oli1').on("click", function() {
	$(".oli1").removeClass("bui-tab-item-selected");
	$(this).addClass("bui-tab-item-selected");
})

$("#oli1").click(function() {
	$("#Tab_switch2").css("display", "block");
})
$("#oli2").click(function() {
	$("#Tab_switch2").css("display", "none");
})

var quanju = '';
var zidd = '';
var parment = '';
$(function() {
	$("#auditPass").on("click", function() {
		$("#earnest_student_1").attr("disabled",false)
		$("#stu_djje").val("");
		$("#datetimepicker").val("");
		$("#id_xm").empty("");
		$("#id_yx").empty("");
		$("#id_bx").empty("");
	});
})
//获取url
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
var req = GetRequest();
var userEntity="";
$(document).ready(function() {
	pmAgent = pmAgent.load();
	
	if((!pmAgent) || (pmAgent.is_login != 'Y')) {
		window.location = '../login.html';
		return;
	}	
	
	//向页面添加数据
	var userJsonStr = sessionStorage.getItem('seeeion');
	if(userJsonStr!=""&&userJsonStr!=undefined&&userJsonStr!=null){
	quanju = JSON.parse(userJsonStr);
//				console.log(quanju);
//					//添加电话号码
	$("#home_phone_1").val(req.bf);
	//电话号码
		var phone_1 = $("#phone_1").html("");
		phone_1.html(quanju.mobile);
		//姓名
		var name_1 = $("#name_1").html("");
		name_1.html(quanju.name);
		//户口所在地
		var hk_1 = $("#hk_1").html("");
		hk_1.html(quanju.hk_address)
		//工作年份
		var gz_1 = $("#gz_1").html("");
		gz_1.html(quanju.workyear)
		//毕业院校
		var by_1 = $("#by_1").html("");
		by_1.html(quanju.schoolofgraduation)
		//年龄
		var nl_1 = $("#nl_1").html("");
		nl_1.html(quanju.age);
		//最高学历
		var xl_1 = $("#xl_1").html("");
		xl_1.html(quanju.highest_education_code)
		$("#_TAB").show();
	   tab_1()
	}		
	if(req.zd!=""&&req.zd!=undefined&&req.zd!=null){
		$("#home_phone_1").val(req.zd);
	}
});



//新建学员身份证
$("#btn_identity_id_1").blur(function(){
	var _number=$(this).val();
	var birthday = _number.substring(6, 10) + "-" + _number.substring(10, 12) + "-" + _number.substring(12, 14);
	if(_number.length!==18){
		return false
	}
	$("#datetimepicker_2").val(birthday);
});

//查看学员身份证
$("#btn_zjh_1").blur(function(){
	var _number2=$(this).val();
	var birthday = _number2.substring(6, 10) + "-" + _number2.substring(10, 12) + "-" + _number2.substring(12, 14);
	if(_number2.length!==18){
		return false
	}
	$("#btn_riqi_1").val(birthday);
	//年龄
	var myDate = new Date(); 
	var month = myDate.getMonth() + 1; 
	var day = myDate.getDate();
	var age = myDate.getFullYear() - _number2.substring(6, 10) - 1; 
	if (_number2.substring(10, 12) < month || _number2.substring(10, 12) == month && _number2.substring(12, 14) <= day) { 
	age++; 
	}
	$("#btn_sex").val(age);
});

//重置按钮
$("#btn_cz").click(function(){
	$("#searchForm input[type=text]").val("");
});

