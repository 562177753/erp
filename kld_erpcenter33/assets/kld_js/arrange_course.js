/**
 * Created by admin on 2017/11/6.
 */

BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function(Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
    var crop_name_arr= [];
    var crop_id_arr = [];
    var school_name_arr = [];
    var school_id_arr = [];
    //二级联动部分
    $(function() {
        //order_search
        post_1(SERVICE_URL+'findOrg?callback=?', {
            userid: pmAgent.userid,
        });
        function post_1(URL, PARAMS) {
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                data: PARAMS,
                jsonp: 'callback',
                success: function (result) {
                    if(result.retcode == -500){
                        BUI.Message.Alert(result.retmsg)
                        // return;
                    }else{
                        for(var i in result) {
                            crop_name_arr.push(result[i].project_name);
                            crop_id_arr.push(result[i].project_id);
                        }
                        $('#service_army').on('click',function (event) {
                            event.stopPropagation();
                            if($("#div1").length > 0) {
                                $('#div1').show();
                            }else{
                                $('#service_army').after('<ul id="div1" style="width: 190px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: #fff"></ul>')
                                var strAdd1 = ''
                                $.each(crop_name_arr, function(index,value){
                                    strAdd1 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>';
                                });
                                $('#div1').append(strAdd1);
                            }

                            $('#div1').on('click',function (e) {
                                var str = e.target.innerText;
                                for(var i in crop_name_arr){
                                    if(crop_name_arr[i] == str){
                                        $('#service_army').val(str);
                                    }
                                }
                                $('#div1').remove();
                            })
                        })
                        $(document).on('click',function () {
                            if($("#div1").length > 0){
                                $('#div1').remove();
                            }
                        })
                        $('#service_army').bind('input propertychange', function() {
                            var input1 = $("#service_army").val();
                            if (input1 == "") {
                                $("#div1 li").show();
                            } else {
                                $("#div1 li").each(
                                    function() {
                                        var cityName = $(this).html();
                                        var re = new RegExp(input1);
                                        if (!re.test(cityName)) {
                                            $(this).hide();
                                        } else {
                                            $(this).show();
                                        }
                                    });
                            }
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求错误：" + data + "错误的原因：" + Error)
                },
            });
        };
    });
    $('#service_army').focus(function () {
        $('#service_school').val('');
        $('#service_army').val('');
        $('#div2').remove();
    })
    // start 院校的输入框

    $('#service_school').on('click',function (event) {
        school_name_arr = [];
        school_id_arr = []
        event.stopPropagation();
        var service_army = $('#service_army').val();
        service_army_id = get_id(crop_name_arr,crop_id_arr,service_army);
        if(service_army_id == undefined){
            return;
        }
        post_1(SERVICE_URL+'findGroup?callback=?', {
            userid: pmAgent.userid,
            first_id:service_army_id
        });
        function post_1(URL, PARAMS) {
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                data: PARAMS,
                jsonp: 'callback',
                success: function (result) {
                    for(var i in result) {
                        school_name_arr.push(result[i].project_name);
                        school_id_arr.push(result[i].project_id);
                    }
                    if($("#div2").length > 0) {
                        $('#div2').show();
                    }else{
                        $('#service_school').after('<ul id="div2" style="width: 190px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: #fff"></ul>')
                        var strAdd2 = '';
                        $.each(school_name_arr, function(index,value){
                            strAdd2 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>';
                        });
                        $('#div2').append(strAdd2);
                    }
                    $('#div2').on('click',function (e) {
                        var str = e.target.innerText;
                        for(var i in school_name_arr){
                            if(school_name_arr[i] == str){
                                $('#service_school').val(str);
                            }
                        }
                        $('#div2').remove();
                    })
                    $('#service_school').bind('input propertychange', function() {
                        var input2 = $("#service_school").val();
                        if (input2 == "") {
                            $("#div2 li").show();
                        } else {
                            $("#div2 li").each(
                                function() {
                                    var cityName = $(this).html();
                                    var re = new RegExp(input2);
                                    if (!re.test(cityName)) {
                                        $(this).hide();
                                    } else {
                                        $(this).show();
                                    }
                                });
                        }
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求错误：" + data + "错误的原因：" + Error)
                },
            });
        };
    })
    $('#service_school').focus(function () {
        $('#service_school').val('');
        $('#div1').remove();
    })
    $(document).on('click',function () {
        if($("#div2").length > 0){
            $('#div2').remove();
        }
    })

    //定义store数据
    var Store = BUI.Data.Store;
    var Grid = Grid;
    //	表头与内容的配置
    var columns = [{
            "title": "项目",
            "dataIndex": "xname",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "院校",
            "dataIndex": "cname",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "班型",
            "dataIndex": "class_name",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "是否排课",
            "dataIndex": "class_status",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "总课时",
            "dataIndex": "sum_class_hour",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "价格（元）",
            "dataIndex": "class_price",
            elCls: 'center',
            "width":"14.3%"
        }, {
            "title": "创建时间",
            "dataIndex": "create_time",
            elCls: 'center',
            "width":"14.3%"
        }];
    //军团
    var service_army = $('#service_army').val();
    //服务院校
    var service_school = $("#service_school").val();
    //班型名称
    var search_banxin = $("#search_banxin").val();
    // 开始时间
    var start_time = $('#start_time').val();
    // 结束时间
    var finish_time = $('#finish_time').val();
    //  缓存数据
    var store = new Store({
        url: SERVICE_URL+'selectClassListByLike?callback=?',
        dataType: 'jsonp',
        method: 'GET',
        autoLoad: false, //自动加载数据
        params: { //配置初始请求的参数
            userid: pmAgent.userid,
            bui_type: 'true'
        },
        proxy : {
            ajaxOptions : { //ajax的配置项，不要覆盖success,和error方法
                traditional : true,
                type : 'get',
                success: function (result) {
                    var arrstatus = result.rows;
                    for(var i in arrstatus){
                        if(arrstatus[i].class_status == '0'){
                            arrstatus[i].class_status = '未排课';
                        }else if(arrstatus[i].class_status == '1'){
                            arrstatus[i].class_status = '已排课';
                        }
                        if(arrstatus[i].sum_class_hour == undefined){
                            arrstatus[i].sum_class_hour = '0小时0分钟'
                        }else{
                            arrstatus[i].sum_class_hour = hourFloat(arrstatus[i].sum_class_hour)
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求错误：" + data + "错误的原因：" + Error)
                },
            }
        },
        pageSize: 3,
    });
    grid = new Grid.Grid({
        render: '#grid',
        // forceFit: true, // 列宽按百分比自适应
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
    $('#teacherName').attr('disabled',true);
    //	查询.
    $(function() {
        $('#btnSearch').on("click", function() {
            $("#grid_registration_list").empty();
            if($("#grid_registration_list").empty()){
                $('#btn_xinzen').attr('disabled',true);
                $('#btn_daoru').attr('disabled',true);
            }
            $('#teacherName').val('');
            $('#teacherName').attr('disabled',true);
            //军团
            var service_army = '';
            service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
            if(service_army_id == undefined){
                service_army_id = '';
            }
            //服务院校
            var service_school = '';
            service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
            if(service_school == undefined){
                service_school = '';
            }
            //班型名称
            var search_banxin = '';
            search_banxin = $("#search_banxin").val();
            //开始时间
            var start_time = '';
            start_time = $("#start_time").val();
            var timer1 = start_time+' 00:00:00.0'
            if(start_time != ''){
                start_time = start_time+' 00:00:00';
            }
            // 结束时间
            var finish_time = '';
            finish_time = $('#finish_time').val();
            var timer2 = finish_time+' 00:00:00.0'
            if(finish_time != ''){
                finish_time = finish_time+' 23:59:59';
            }
            if(timeHm(timer2)-timeHm(timer1)<0){
                BUI.Message.Alert('开始时间不能大于结束时间');
                return;
            }else if(start_time == ""&& finish_time != ""){
                BUI.Message.Alert('开始时间不能为空');
                return;
            }else if(start_time != ""&& finish_time == ""){
                BUI.Message.Alert('结束时间不能为空');
                return;
            }
            //是否排课
            var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
            var params_1 = { //配置初始请求的参数
                userid: pmAgent.userid,
                pro_first_id  : service_army_id,
                pro_second_id: service_school,
                class_name: search_banxin,
                start_time:start_time,
                end_time:finish_time,
                class_status:ispaike,
                bui_type: 'true'
            }
            store.load(params_1);
        });
    });

    //点击表格
    $("#grid_registration_list").empty();
    grid.on('rowselected', function(ev) {
        var record = ev.record;
        quanju = record;
        $('#btn_xinzen').attr('disabled',false);
        $('#btn_daoru').attr('disabled',false);
        $("#grid_registration_list").empty();
        $('#teacherName').val('');
        $('#teacherName').attr('disabled',false);
        // 点击一行班型数据，显示详细的课程数据
        numPage = 0;
        class_1();
    });
    //新增课程
    doing = new Overlay.Dialog({
        title: "新增课程",
        //配置DOM容器的编号
        contentId: 'xingzen_modal',
        zIndex : '100',
        success: function() {
            //课程类型
            var order_class_type_1 = $("#order_class_type_1").val();
            //课程名称
            var class_name_1 = $("#class_name_1").val();
            //授课日期
            var teach_data = $("#teach_data").val();
            //开始时间
            var begin_time_data = $("#begin_time_data").val();
            //结束时间
            var end_time_data = $("#end_time_data").val();
            //授课老师
            var teacher= $("#teacher").val();
            //授课老师id
            var teachers_id = get_id(teacher_name,assistant_id,teacher);
            if(teachers_id == undefined){
                teachers_id = 0;
            }
            //助教老师
            var assistant = $("#assistant").val();
            var assistants_id = get_id(teacher_name,assistant_id,assistant);
            if(assistants_id == undefined){
                assistants_id = 0;
            }
            //直播间id
            var num_home_1 = $("#num_home_1").val();
            //教学备注
            var teach_description = $("#teach_description").val();

            //前一个/后一个小时
            var first_time = outputTimeSub(begin_time_data);
            var last_time = outputTimeAdd(end_time_data);

            var data1 =teach_data+' '+begin_time_data;
            var data2 =teach_data+' '+end_time_data;
            var hour = timeGap2(data1,data2);
            var teacherBegin = timeHm(data1);
            var teacherEnd = timeHm(data2);
            if(teacher == ''){
                if(teacherEnd-teacherBegin<0){
                    BUI.Message.Alert("开始时间不能大于结束时间");
                }else{
                    post_1(SERVICE_URL+'insertLesson?callback=?', {
                        userid: pmAgent.userid,
                        course_plan_id:quanju.class_id,
                        class_name:quanju.class_name,
                        lesson_type: order_class_type_1,
                        lesson_name: class_name_1, //课程名称
                        lesson_date: teach_data, //授课日期
                        begin_time: begin_time_data, //开始时间
                        first_time:first_time,//开始时间的前一个小时
                        end_time: end_time_data, //结束时间
                        last_time:last_time,//结束时间的后一个小时
                        hour:hour,//授课时间差
                        teacher_id:teachers_id,
                        teacher: teacher, //授课老师
                        assistant_id:assistants_id,
                        assistant: assistant, //助教老师
                        live_id: num_home_1, //直播间id
                        description: teach_description,//教学备注
                    });
                    function post_1(URL, PARAMS) {
                        $.ajax({
                            url: URL,
                            dataType: 'jsonp',
                            data: PARAMS,
                            jsonp: 'callback',
                            success: function(result) {
                                for(var i in result) {
                                    var result_ = result[i].retcode;
                                    if(result_ == 200) {
                                        doing.hide();
                                        //课程类型
                                        $("#order_class_type_1").val("");
                                        //课程名称
                                        $("#class_name_1").val("");
                                        //授课日期
                                        $("#teach_data").val("");
                                        //授课星期
                                        // $("#order_lesson_week").val("");
                                        //开始时间
                                        $("#begin_time_data").val("");
                                        //结束时间
                                        $("#end_time_data").val("");
                                        //授课老师
                                        $("#teacher").val("");
                                        //助教老师
                                        $("#assistant").val("");
                                        // 直播间id
                                        $("#num_home_1").val("");
                                        // 教学备注
                                        $("#teach_description").val("");
                                        for(var i in result) {
                                            BUI.Message.Alert(result[i].retmsg);

                                        }
                                        var result_1 = $("#btn_xinzen_2").attr("data-dismiss", "modal");
                                        $("#xingzen_modal .modal-body input").val("");

                                        // start 刷新store
                                        //军团
                                        var service_army = '';
                                        service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                        if(service_army_id == undefined){
                                            service_army_id = '';
                                        }
                                        //服务院校
                                        var service_school = '';
                                        service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                        if(service_school == undefined){
                                            service_school = '';
                                        }
                                        //班型名称
                                        var search_banxin = '';
                                        search_banxin = $("#search_banxin").val();
                                        //开始时间
                                        var start_time = '';
                                        start_time = $("#start_time").val();
                                        var timer1 = start_time+' 00:00:00.0'
                                        if(start_time != ''){
                                            start_time = start_time+' 00:00:00';
                                        }
                                        // 结束时间
                                        var finish_time = '';
                                        finish_time = $('#finish_time').val();
                                        var timer2 = finish_time+' 00:00:00.0'
                                        if(finish_time != ''){
                                            finish_time = finish_time+' 23:59:59';
                                        }
                                        if(timeHm(timer2)-timeHm(timer1)<0){
                                            BUI.Message.Alert('开始时间不能大于结束时间');
                                            return;
                                        }else if(start_time == ""&& finish_time != ""){
                                            BUI.Message.Alert('开始时间不能为空');
                                            return;
                                        }else if(start_time != ""&& finish_time == ""){
                                            BUI.Message.Alert('结束时间不能为空');
                                            return;
                                        }
                                        //是否排课
                                        var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                        var params_1 = { //配置初始请求的参数
                                            userid: pmAgent.userid,
                                            pro_first_id  : service_army_id,
                                            pro_second_id: service_school,
                                            class_name: search_banxin,
                                            start_time:start_time,
                                            end_time:finish_time,
                                            class_status:ispaike,
                                            bui_type: 'true'
                                        }
                                        store.load(params_1);
                                        // end 刷新store
                                        store1.load();
                                    } else {
                                        BUI.Message.Alert(result[i].retmsg);
                                        $("#btn_xinzen_2").removeAttr("data-dismiss");
                                    }
                                }
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                            },
                            timeout: 30000
                        });

                    }
                }
            }else{
                post_1(SERVICE_URL+'findLessonHour?callback=?', {
                    user_id: teachers_id
                });
                function post_1(URL, PARAMS) {
                    $.ajax({
                        url: URL,
                        dataType: 'jsonp',
                        data: PARAMS,
                        jsonp: 'callback',
                        success: function(result) {
                            if(order_class_type_1 == ''){
                                BUI.Message.Alert('课程类型不能为空！')
                                return;
                            }else if(class_name_1 == ''){
                                BUI.Message.Alert('课程名称不能为空！')
                                return;
                            }else if(teach_data== ''){
                                BUI.Message.Alert('授课日期不能为空！')
                            }else if(begin_time_data== ''){
                                BUI.Message.Alert('开始时间不能为空！')
                                return;
                            }else if(end_time_data== ''){
                                BUI.Message.Alert('结束时间不能为空！')
                                return;
                            }
                            var nowHour;
                            var sumHour;
                            for(var i in result){
                                nowHour = result[i].nowHour;
                                sumHour = result[i].maxHour;
                            }
                            var hourGap = sumHour-nowHour;
                            var data1 =teach_data+' '+begin_time_data;
                            var data2 =teach_data+' '+end_time_data;
                            var teacherBegin = timeHm(data1);
                            var teacherEnd = timeHm(data2);
                            var EndBegin = timeGap2(data1,data2);
                            if(teacherEnd-teacherBegin<0){
                                BUI.Message.Alert("开始时间不能大于结束时间");
                            }else if(((+nowHour)+EndBegin)>sumHour){
                                new Overlay.Dialog({
                                    title: '教师课时信息提示',
                                    width: 500,
                                    zIndex : '100',
                                    height: 130,
                                    bodyContent: '<p>该老师的排课时间已超出总课时</p>',
                                    buttons:[
                                        {
                                            text:'继续新增',
                                            elCls : 'button button-primary',
                                            handler : function(){
                                                post_1(SERVICE_URL+'insertLesson?callback=?', {
                                                    userid: pmAgent.userid,
                                                    course_plan_id:quanju.class_id,
                                                    class_name:quanju.class_name,
                                                    lesson_type: order_class_type_1,
                                                    lesson_name: class_name_1, //课程名称
                                                    lesson_date: teach_data, //授课日期
                                                    begin_time: begin_time_data, //开始时间
                                                    first_time:first_time,//开始时间的前一个小时
                                                    end_time: end_time_data, //结束时间
                                                    last_time:last_time,//结束时间的后一个小时
                                                    hour:hour,//授课时间差
                                                    teacher_id:teachers_id,
                                                    teacher: teacher, //授课老师
                                                    assistant_id:assistants_id,
                                                    assistant: assistant, //助教老师
                                                    live_id: num_home_1, //直播间id
                                                    description: teach_description,//教学备注
                                                });
                                                function post_1(URL, PARAMS) {
                                                    $.ajax({
                                                        url: URL,
                                                        dataType: 'jsonp',
                                                        data: PARAMS,
                                                        jsonp: 'callback',
                                                        success: function(result) {
                                                            for(var i in result) {
                                                                var result_ = result[i].retcode;
                                                                if(result_ == 200) {
                                                                    doing.hide();
                                                                    //课程类型
                                                                    $("#order_class_type_1").val("");
                                                                    //课程名称
                                                                    $("#class_name_1").val("");
                                                                    //授课日期
                                                                    $("#teach_data").val("");
                                                                    //授课星期
                                                                    // $("#order_lesson_week").val("");
                                                                    //开始时间
                                                                    $("#begin_time_data").val("");
                                                                    //结束时间
                                                                    $("#end_time_data").val("");
                                                                    //授课老师
                                                                    $("#teacher").val("");
                                                                    //助教老师
                                                                    $("#assistant").val("");
                                                                    // 直播间id
                                                                    $("#num_home_1").val("");
                                                                    // 教学备注
                                                                    $("#teach_description").val("");
                                                                    for(var i in result) {
                                                                        BUI.Message.Alert(result[i].retmsg);
                                                                    }
                                                                    var result_1 = $("#btn_xinzen_2").attr("data-dismiss", "modal");
                                                                    $("#xingzen_modal .modal-body input").val("");

                                                                    // start 刷新store
                                                                    //军团
                                                                    var service_army = '';
                                                                    service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                                                    if(service_army_id == undefined){
                                                                        service_army_id = '';
                                                                    }
                                                                    //服务院校
                                                                    var service_school = '';
                                                                    service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                                                    if(service_school == undefined){
                                                                        service_school = '';
                                                                    }
                                                                    //班型名称
                                                                    var search_banxin = '';
                                                                    search_banxin = $("#search_banxin").val();
                                                                    //开始时间
                                                                    var start_time = '';
                                                                    start_time = $("#start_time").val();
                                                                    var timer1 = start_time+' 00:00:00.0'
                                                                    if(start_time != ''){
                                                                        start_time = start_time+' 00:00:00';
                                                                    }
                                                                    // 结束时间
                                                                    var finish_time = '';
                                                                    finish_time = $('#finish_time').val();
                                                                    var timer2 = finish_time+' 00:00:00.0'
                                                                    if(finish_time != ''){
                                                                        finish_time = finish_time+' 23:59:59';
                                                                    }
                                                                    if(timeHm(timer2)-timeHm(timer1)<0){
                                                                        BUI.Message.Alert('开始时间不能大于结束时间');
                                                                        return;
                                                                    }else if(start_time == ""&& finish_time != ""){
                                                                        BUI.Message.Alert('开始时间不能为空');
                                                                        return;
                                                                    }else if(start_time != ""&& finish_time == ""){
                                                                        BUI.Message.Alert('结束时间不能为空');
                                                                        return;
                                                                    }
                                                                    //是否排课
                                                                    var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                                                    var params_1 = { //配置初始请求的参数
                                                                        userid: pmAgent.userid,
                                                                        pro_first_id  : service_army_id,
                                                                        pro_second_id: service_school,
                                                                        class_name: search_banxin,
                                                                        start_time:start_time,
                                                                        end_time:finish_time,
                                                                        class_status:ispaike,
                                                                        bui_type: 'true'
                                                                    }
                                                                    store.load(params_1);
                                                                    // end 刷新store
                                                                    store1.load();
                                                                } else {
                                                                    BUI.Message.Alert(result[i].retmsg);
                                                                    $("#btn_xinzen_2").removeAttr("data-dismiss");
                                                                }
                                                            }
                                                        },
                                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                                                        },
                                                        timeout: 30000
                                                    });

                                                }
                                                this.close();
                                            }
                                        },{
                                            text:'返回修改',
                                            elCls : 'button button-primary',
                                            handler : function(){
                                                this.close();
                                            }
                                        }
                                    ]
                                }).show();
                            }else{
                                post_1(SERVICE_URL+'insertLesson?callback=?', {
                                    userid: pmAgent.userid,
                                    course_plan_id:quanju.class_id,
                                    class_name:quanju.class_name,
                                    lesson_type: order_class_type_1,
                                    lesson_name: class_name_1, //课程名称
                                    lesson_date: teach_data, //授课日期
                                    begin_time: begin_time_data, //开始时间
                                    first_time:first_time,//开始时间的前一个小时
                                    end_time: end_time_data, //结束时间
                                    last_time:last_time,//结束时间的后一个小时
                                    hour:hour,//授课时间差
                                    teacher_id:teachers_id,
                                    teacher: teacher, //授课老师
                                    assistant_id:assistants_id,
                                    assistant: assistant, //助教老师
                                    live_id: num_home_1, //直播间id
                                    description: teach_description,//教学备注
                                });
                                function post_1(URL, PARAMS) {
                                    $.ajax({
                                        url: URL,
                                        dataType: 'jsonp',
                                        data: PARAMS,
                                        jsonp: 'callback',
                                        success: function(result) {
                                            for(var i in result) {
                                                var result_ = result[i].retcode;
                                                if(result_ == 200) {
                                                    doing.hide();
                                                    //课程类型
                                                    $("#order_class_type_1").val("");
                                                    //课程名称
                                                    $("#class_name_1").val("");
                                                    //授课日期
                                                    $("#teach_data").val("");
                                                    //授课星期
                                                    // $("#order_lesson_week").val("");
                                                    //开始时间
                                                    $("#begin_time_data").val("");
                                                    //结束时间
                                                    $("#end_time_data").val("");
                                                    //授课老师
                                                    $("#teacher").val("");
                                                    //助教老师
                                                    $("#assistant").val("");
                                                    // 直播间id
                                                    $("#num_home_1").val("");
                                                    // 教学备注
                                                    $("#teach_description").val("");
                                                    for(var i in result) {
                                                        BUI.Message.Alert(result[i].retmsg);
                                                    }
                                                    var result_1 = $("#btn_xinzen_2").attr("data-dismiss", "modal");
                                                    $("#xingzen_modal .modal-body input").val("");

                                                    // start 刷新store
                                                    //军团
                                                    var service_army = '';
                                                    service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                                    if(service_army_id == undefined){
                                                        service_army_id = '';
                                                    }
                                                    //服务院校
                                                    var service_school = '';
                                                    service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                                    if(service_school == undefined){
                                                        service_school = '';
                                                    }
                                                    //班型名称
                                                    var search_banxin = '';
                                                    search_banxin = $("#search_banxin").val();
                                                    //开始时间
                                                    var start_time = '';
                                                    start_time = $("#start_time").val();
                                                    var timer1 = start_time+' 00:00:00.0'
                                                    if(start_time != ''){
                                                        start_time = start_time+' 00:00:00';
                                                    }
                                                    // 结束时间
                                                    var finish_time = '';
                                                    finish_time = $('#finish_time').val();
                                                    var timer2 = finish_time+' 00:00:00.0'
                                                    if(finish_time != ''){
                                                        finish_time = finish_time+' 23:59:59';
                                                    }
                                                    if(timeHm(timer2)-timeHm(timer1)<0){
                                                        BUI.Message.Alert('开始时间不能大于结束时间');
                                                        return;
                                                    }else if(start_time == ""&& finish_time != ""){
                                                        BUI.Message.Alert('开始时间不能为空');
                                                        return;
                                                    }else if(start_time != ""&& finish_time == ""){
                                                        BUI.Message.Alert('结束时间不能为空');
                                                        return;
                                                    }
                                                    //是否排课
                                                    var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                                    var params_1 = { //配置初始请求的参数
                                                        userid: pmAgent.userid,
                                                        pro_first_id  : service_army_id,
                                                        pro_second_id: service_school,
                                                        class_name: search_banxin,
                                                        start_time:start_time,
                                                        end_time:finish_time,
                                                        class_status:ispaike,
                                                        bui_type: 'true'
                                                    }
                                                    store.load(params_1);
                                                    // end 刷新store
                                                    store1.load();
                                                } else {
                                                    BUI.Message.Alert(result[i].retmsg);
                                                    $("#btn_xinzen_2").removeAttr("data-dismiss");
                                                }
                                            }
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                                        },
                                        timeout: 30000
                                    });

                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                        },
                        timeout: 30000
                    });

                }
            }
        },
        cancel: function() {
            $("#xingzen_modal input").val("")
            $("#order_class_type_1").val("");
            $("#class_name_1").val("");
            $("#teach_data").val("");
            $("#begin_time_data").val("");
            $("#end_time_data").val("");
            $("#teacher").val("");
            $("#assistant").val("");
            $("#num_home_1").val("");
            $("#teach_description").val("");
        }
    });

    //编辑课程弹框
    bianji = new Overlay.Dialog({
        title: "编辑课程",
        //配置DOM容器的编号
        contentId: 'bianji_modal',
        zIndex : '100',
        success: function() {
            lesson_id = x;
            //课程类型
            var order_class_type_2 = $("#order_class_type_2").val();
            //课程名称
            var class_name_2 = $("#class_name_2").val();
            //授课日期
            var teach_data_2 = $("#teach_data_2").val();
            //开始时间
            var begin_time_data_2 = $("#begin_time_data_2").val();
            //结束时间
            var end_time_data_2 = $("#end_time_data_2").val();
            //授课老师
            var teacher_2= $("#teacher_2").val();
            //授课老师id
            var teacher2_id = get_id(teacher_name,assistant_id,teacher_2);
            if(teacher2_id == undefined){
                teacher2_id = 0;
            }
            //助教老师
            var assistant_2 = $("#assistant_2").val();
            var assistant2_id = get_id(teacher_name,assistant_id,assistant_2);
            if(assistant2_id == undefined){
                assistant2_id = 0;
            }
            //直播间id
            var num_home_2 = $("#num_home_2").val();
            //教学备注
            var teach_description_2 = $("#teach_description_2").val();

            //前一个/后一个小时
            var first_time_2 = outputTimeSub(begin_time_data_2);
            var last_time_2 = outputTimeAdd(end_time_data_2);

            var data1 =teach_data_2+' '+begin_time_data_2;
            var data2 =teach_data_2+' '+end_time_data_2;
            var hour = timeGap2(data1,data2);
            var teacherBegin = timeHm(data1);
            var teacherEnd = timeHm(data2);
            if(teacher_2 == ''){
                if(teacherEnd-teacherBegin<0){
                    BUI.Message.Alert("开始时间不能大于结束时间");
                }else{
                    post_1(SERVICE_URL+'updateLesson?callback=?', {
                        userid: pmAgent.userid,
                        course_plan_id:quanju.class_id,
                        class_name:quanju.class_name,
                        lesson_id:lesson_id,
                        lesson_type: order_class_type_2,
                        lesson_name: class_name_2, //课程名称
                        lesson_date: teach_data_2, //授课日期
                        begin_time: begin_time_data_2, //开始时间
                        first_time:first_time_2,//开始时间的前一个小时
                        end_time: end_time_data_2, //结束时间
                        last_time:last_time_2,//结束时间的后一个小时
                        hour:hour,//授课时间差
                        teacher_id:teacher2_id,
                        teacher: teacher_2, //授课老师
                        assistant_id:assistant2_id,
                        assistant: assistant_2, //助教老师
                        live_id: num_home_2, //直播间id
                        description: teach_description_2,//教学备注
                    });
                    function post_1(URL, PARAMS) {
                        $.ajax({
                            url: URL,
                            dataType: 'jsonp',
                            data: PARAMS,
                            jsonp: 'callback',
                            success: function(result) {
                                for(var i in result) {
                                    var result_ = result[i].retcode;
                                    if(result_ == 200) {
                                        bianji.hide();
                                        //课程类型
                                        $("#order_class_type_2").val("");
                                        //课程名称
                                        $("#class_name_2").val("");
                                        //授课日期
                                        $("#teach_data_2").val("");
                                        //授课星期
                                        // $("#order_lesson_week").val("");
                                        //开始时间
                                        $("#begin_time_data_2").val("");
                                        //结束时间
                                        $("#end_time_data_2").val("");
                                        //授课老师
                                        $("#teacher_2").val("");
                                        //助教老师
                                        $("#assistant_2").val("");
                                        // 直播间id
                                        $("#num_home_2").val("");
                                        // 教学备注
                                        $("#teach_description_2").val("");
                                        for(var i in result) {
                                            BUI.Message.Alert(result[i].retmsg);
                                        }
                                        var result_1 = $("#btn_bianji_2").attr("data-dismiss", "modal");
                                        $("#bianji_modal .modal-body input").val("");

                                        // start 刷新store
                                        //军团
                                        var service_army = '';
                                        service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                        if(service_army_id == undefined){
                                            service_army_id = '';
                                        }
                                        //服务院校
                                        var service_school = '';
                                        service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                        if(service_school == undefined){
                                            service_school = '';
                                        }
                                        //班型名称
                                        var search_banxin = '';
                                        search_banxin = $("#search_banxin").val();
                                        //开始时间
                                        var start_time = '';
                                        start_time = $("#start_time").val();
                                        var timer1 = start_time+' 00:00:00.0'
                                        if(start_time != ''){
                                            start_time = start_time+' 00:00:00';
                                        }
                                        // 结束时间
                                        var finish_time = '';
                                        finish_time = $('#finish_time').val();
                                        var timer2 = finish_time+' 00:00:00.0'
                                        if(finish_time != ''){
                                            finish_time = finish_time+' 23:59:59';
                                        }
                                        if(timeHm(timer2)-timeHm(timer1)<0){
                                            BUI.Message.Alert('开始时间不能大于结束时间');
                                            return;
                                        }else if(start_time == ""&& finish_time != ""){
                                            BUI.Message.Alert('开始时间不能为空');
                                            return;
                                        }else if(start_time != ""&& finish_time == ""){
                                            BUI.Message.Alert('结束时间不能为空');
                                            return;
                                        }
                                        //是否排课
                                        var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                        var params_1 = { //配置初始请求的参数
                                            userid: pmAgent.userid,
                                            pro_first_id  : service_army_id,
                                            pro_second_id: service_school,
                                            class_name: search_banxin,
                                            start_time:start_time,
                                            end_time:finish_time,
                                            class_status:ispaike,
                                            bui_type: 'true'
                                        }
                                        store.load(params_1);
                                        // end 刷新store
                                        store1.load();
                                    } else {
                                        BUI.Message.Alert(result[i].retmsg);
                                        $("#btn_bianji_2").removeAttr("data-dismiss");
                                    }
                                }
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                            },
                            timeout: 30000
                        });

                    }
                }
            }else{
                post_1(SERVICE_URL+'findLessonHour?callback=?', {
                    user_id: teacher2_id
                });
                function post_1(URL, PARAMS) {
                    $.ajax({
                        url: URL,
                        dataType: 'jsonp',
                        data: PARAMS,
                        jsonp: 'callback',
                        success: function(result) {
                            if(order_class_type_2 == ''){
                                BUI.Message.Alert('课程类型不能为空！')
                                return;
                            }else if(class_name_2 == ''){
                                BUI.Message.Alert('课程名称不能为空！')
                                return;
                            }else if(teach_data_2== ''){
                                BUI.Message.Alert('授课日期不能为空！')
                            }else if(begin_time_data_2== ''){
                                BUI.Message.Alert('开始时间不能为空！')
                                return;
                            }else if(end_time_data_2== ''){
                                BUI.Message.Alert('结束时间不能为空！')
                                return;
                            }
                            var nowHour;
                            var sumHour;
                            for(var i in result){
                                nowHour = result[i].nowHour;
                                sumHour = result[i].maxHour;
                            }
                            var hourGap = sumHour-nowHour-oldGap;
                            var data1 =teach_data_2+' '+begin_time_data_2;
                            var data2 =teach_data_2+' '+end_time_data_2;
                            var teacherBegin = timeHm(data1);
                            var teacherEnd = timeHm(data2);
                            var EndBegin = timeGap2(data1,data2);
                            var hourTrue;
                            if(parment.teacher==teacher_2){
                                hourTrue = (+nowHour-oldGap)+EndBegin;
                            }else{
                                hourTrue = (+nowHour)+EndBegin;
                            }
                            if(teacherEnd-teacherBegin<0){
                                BUI.Message.Alert("开始时间不能大于结束时间");
                            }else if(hourTrue>sumHour){
                                new Overlay.Dialog({
                                    title: '教师课时信息提示',
                                    width: 500,
                                    zIndex : '100',
                                    height: 130,
                                    bodyContent: '<p>该老师的排课时间已超出总课时</p>',
                                    buttons:[
                                        {
                                            text:'继续修改',
                                            elCls : 'button button-primary',
                                            handler : function(){
                                                post_1(SERVICE_URL+'updateLesson?callback=?', {
                                                    userid: pmAgent.userid,
                                                    course_plan_id:quanju.class_id,
                                                    class_name:quanju.class_name,
                                                    lesson_id:lesson_id,
                                                    lesson_type: order_class_type_2,
                                                    lesson_name: class_name_2, //课程名称
                                                    lesson_date: teach_data_2, //授课日期
                                                    begin_time: begin_time_data_2, //开始时间
                                                    first_time:first_time_2,//开始时间的前一个小时
                                                    end_time: end_time_data_2, //结束时间
                                                    last_time:last_time_2,//结束时间的后一个小时
                                                    hour:hour,//时间差
                                                    teacher_id:teacher2_id,
                                                    teacher: teacher_2, //授课老师
                                                    assistant_id:assistant2_id,
                                                    assistant: assistant_2, //助教老师
                                                    live_id: num_home_2, //直播间id
                                                    description: teach_description_2,//教学备注
                                                });
                                                function post_1(URL, PARAMS) {
                                                    $.ajax({
                                                        url: URL,
                                                        dataType: 'jsonp',
                                                        data: PARAMS,
                                                        jsonp: 'callback',
                                                        success: function(result) {
                                                            for(var i in result) {
                                                                var result_ = result[i].retcode;
                                                                if(result_ == 200) {
                                                                    bianji.hide();
                                                                    //课程类型
                                                                    $("#order_class_type_2").val("");
                                                                    //课程名称
                                                                    $("#class_name_2").val("");
                                                                    //授课日期
                                                                    $("#teach_data_2").val("");
                                                                    //开始时间
                                                                    $("#begin_time_data_2").val("");
                                                                    //结束时间
                                                                    $("#end_time_data_2").val("");
                                                                    //授课老师
                                                                    $("#teacher_2").val("");
                                                                    //助教老师
                                                                    $("#assistant_2").val("");
                                                                    //直播间id
                                                                    $("#num_home_2").val("");
                                                                    //备注
                                                                    $("#teach_description_2").val("");
                                                                    for(var i in result) {
                                                                        BUI.Message.Alert(result[i].retmsg);
                                                                    }
                                                                    var result_1 = $("#btn_bianji_2").attr("data-dismiss", "modal");
                                                                    $("#bianji_modal .modal-body input").val("");

                                                                    // start 刷新store
                                                                    //军团
                                                                    var service_army = '';
                                                                    service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                                                    if(service_army_id == undefined){
                                                                        service_army_id = '';
                                                                    }
                                                                    //服务院校
                                                                    var service_school = '';
                                                                    service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                                                    if(service_school == undefined){
                                                                        service_school = '';
                                                                    }
                                                                    //班型名称
                                                                    var search_banxin = '';
                                                                    search_banxin = $("#search_banxin").val();
                                                                    //开始时间
                                                                    var start_time = '';
                                                                    start_time = $("#start_time").val();
                                                                    var timer1 = start_time+' 00:00:00.0'
                                                                    if(start_time != ''){
                                                                        start_time = start_time+' 00:00:00';
                                                                    }
                                                                    // 结束时间
                                                                    var finish_time = '';
                                                                    finish_time = $('#finish_time').val();
                                                                    var timer2 = finish_time+' 00:00:00.0'
                                                                    if(finish_time != ''){
                                                                        finish_time = finish_time+' 23:59:59';
                                                                    }
                                                                    if(timeHm(timer2)-timeHm(timer1)<0){
                                                                        BUI.Message.Alert('开始时间不能大于结束时间');
                                                                        return;
                                                                    }else if(start_time == ""&& finish_time != ""){
                                                                        BUI.Message.Alert('开始时间不能为空');
                                                                        return;
                                                                    }else if(start_time != ""&& finish_time == ""){
                                                                        BUI.Message.Alert('结束时间不能为空');
                                                                        return;
                                                                    }
                                                                    //是否排课
                                                                    var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                                                    var params_1 = { //配置初始请求的参数
                                                                        userid: pmAgent.userid,
                                                                        pro_first_id  : service_army_id,
                                                                        pro_second_id: service_school,
                                                                        class_name: search_banxin,
                                                                        start_time:start_time,
                                                                        end_time:finish_time,
                                                                        class_status:ispaike,
                                                                        bui_type: 'true'
                                                                    }
                                                                    store.load(params_1);
                                                                    // end 刷新store
                                                                    store1.load();
                                                                } else {
                                                                    BUI.Message.Alert(result[i].retmsg);
                                                                    $("#btn_bianji_2").removeAttr("data-dismiss");
                                                                }
                                                            }
                                                        },
                                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                                                        },
                                                        timeout: 30000
                                                    });

                                                }
                                                this.close();
                                            }
                                        },{
                                            text:'返回修改',
                                            elCls : 'button button-primary',
                                            handler : function(){
                                                this.close();
                                            }
                                        }
                                    ]
                                }).show();
                            }else{
                                post_1(SERVICE_URL+'updateLesson?callback=?', {
                                    userid: pmAgent.userid,
                                    course_plan_id:quanju.class_id,
                                    class_name:quanju.class_name,
                                    lesson_id:lesson_id,
                                    lesson_type: order_class_type_2,
                                    lesson_name: class_name_2, //课程名称
                                    lesson_date: teach_data_2, //授课日期
                                    begin_time: begin_time_data_2, //开始时间
                                    first_time:first_time_2,//开始时间的前一个小时
                                    end_time: end_time_data_2, //结束时间
                                    last_time:last_time_2,//结束时间的后一个小时
                                    hour:hour,//时间差
                                    teacher_id:teacher2_id,
                                    teacher: teacher_2, //授课老师
                                    assistant_id:assistant2_id,
                                    assistant: assistant_2, //助教老师
                                    live_id: num_home_2, //直播间id
                                    description: teach_description_2,//教学备注
                                });
                                function post_1(URL, PARAMS) {
                                    $.ajax({
                                        url: URL,
                                        dataType: 'jsonp',
                                        data: PARAMS,
                                        jsonp: 'callback',
                                        success: function(result) {
                                            for(var i in result) {
                                                var result_ = result[i].retcode;
                                                if(result_ == 200) {
                                                    doing.hide();
                                                    bianji.hide();
                                                    //课程类型
                                                    $("#order_class_type_2").val("");
                                                    //课程名称
                                                    $("#class_name_2").val("");
                                                    //授课日期
                                                    $("#teach_data_2").val("");
                                                    //开始时间
                                                    $("#begin_time_data_2").val("");
                                                    //结束时间
                                                    $("#end_time_data_2").val("");
                                                    //授课老师
                                                    $("#teacher_2").val("");
                                                    //助教老师
                                                    $("#assistant_2").val("");
                                                    //直播间id
                                                    $("#num_home_2").val("");
                                                    //备注
                                                    $("#teach_description_2").val("");
                                                    for(var i in result) {
                                                        BUI.Message.Alert(result[i].retmsg);
                                                    }
                                                    var result_1 = $("#btn_bianji_2").attr("data-dismiss", "modal");
                                                    $("#bianji_modal .modal-body input").val("");

                                                    // start 刷新store
                                                    //军团
                                                    var service_army = '';
                                                    service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                                                    if(service_army_id == undefined){
                                                        service_army_id = '';
                                                    }
                                                    //服务院校
                                                    var service_school = '';
                                                    service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                                                    if(service_school == undefined){
                                                        service_school = '';
                                                    }
                                                    //班型名称
                                                    var search_banxin = '';
                                                    search_banxin = $("#search_banxin").val();
                                                    //开始时间
                                                    var start_time = '';
                                                    start_time = $("#start_time").val();
                                                    var timer1 = start_time+' 00:00:00.0'
                                                    if(start_time != ''){
                                                        start_time = start_time+' 00:00:00';
                                                    }
                                                    // 结束时间
                                                    var finish_time = '';
                                                    finish_time = $('#finish_time').val();
                                                    var timer2 = finish_time+' 00:00:00.0'
                                                    if(finish_time != ''){
                                                        finish_time = finish_time+' 23:59:59';
                                                    }
                                                    if(timeHm(timer2)-timeHm(timer1)<0){
                                                        BUI.Message.Alert('开始时间不能大于结束时间');
                                                        return;
                                                    }else if(start_time == ""&& finish_time != ""){
                                                        BUI.Message.Alert('开始时间不能为空');
                                                        return;
                                                    }else if(start_time != ""&& finish_time == ""){
                                                        BUI.Message.Alert('结束时间不能为空');
                                                        return;
                                                    }
                                                    //是否排课
                                                    var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                                                    var params_1 = { //配置初始请求的参数
                                                        userid: pmAgent.userid,
                                                        pro_first_id  : service_army_id,
                                                        pro_second_id: service_school,
                                                        class_name: search_banxin,
                                                        start_time:start_time,
                                                        end_time:finish_time,
                                                        class_status:ispaike,
                                                        bui_type: 'true'
                                                    }
                                                    store.load(params_1);
                                                    // end 刷新store
                                                    store1.load();
                                                } else {
                                                    BUI.Message.Alert(result[i].retmsg);
                                                    $("#btn_bianji_2").removeAttr("data-dismiss");
                                                }
                                            }
                                        },
                                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                                        },
                                        timeout: 30000
                                    });

                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                        },
                        timeout: 30000
                    });

                }
            }
        },
        cancel: function() {
            $("#xingzen_modal input").val("")
            $("#order_class_type_1").val("");
            $("#class_name_1").val("");
            $("#teach_data").val("");
            $("#begin_time_data").val("");
            $("#end_time_data").val("");
            $("#teacher").val("");
            $("#assistant").val("");
            $("#num_home_1").val("");
            $("#teach_description").val("");
        }
    });

    //导入课程
    dialog = new Overlay.Dialog({
        title:'导入课程',
        width:500,
        zIndex : '100',
        height:200,
        // closeAction : 'destroy', //每次关闭dialog释放
        //配置DOM容器的编号
        contentId:'content',
        success:function () {
            // class_id = x;
            $('#submit_id').val(quanju.class_id);
            $('#submit_name').val(quanju.class_name)
            var form = document.getElementById('upload');
            formData = new FormData(form);
            $.ajax({
                url:SERVICE_URL+'plAddLesson?callback=?',
                type:"post",
                data:formData,
                // dataType:'jsonp',
                processData:false,
                contentType:false,
                // jsonp: 'callback',
                success:function(res){
                    BUI.Message.Alert(res.substring(14,18));
                    if(res.substring(14,18)=='导入成功'){
                        dialog.hide();
                    }
                    // start 刷新store
                    //军团
                    var service_army = '';
                    service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                    if(service_army_id == undefined){
                        service_army_id = '';
                    }
                    //服务院校
                    var service_school = '';
                    service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                    if(service_school == undefined){
                        service_school = '';
                    }
                    //班型名称
                    var search_banxin = '';
                    search_banxin = $("#search_banxin").val();
                    //开始时间
                    var start_time = '';
                    start_time = $("#start_time").val();
                    var timer1 = start_time+' 00:00:00.0'
                    if(start_time != ''){
                        start_time = start_time+' 00:00:00';
                    }
                    // 结束时间
                    var finish_time = '';
                    finish_time = $('#finish_time').val();
                    var timer2 = finish_time+' 00:00:00.0'
                    if(finish_time != ''){
                        finish_time = finish_time+' 23:59:59';
                    }
                    if(timeHm(timer2)-timeHm(timer1)<0){
                        BUI.Message.Alert('开始时间不能大于结束时间');
                        return;
                    }else if(start_time == ""&& finish_time != ""){
                        BUI.Message.Alert('开始时间不能为空');
                        return;
                    }else if(start_time != ""&& finish_time == ""){
                        BUI.Message.Alert('结束时间不能为空');
                        return;
                    }
                    //是否排课
                    var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                    var params_1 = { //配置初始请求的参数
                        userid: pmAgent.userid,
                        pro_first_id  : service_army_id,
                        pro_second_id: service_school,
                        class_name: search_banxin,
                        start_time:start_time,
                        end_time:finish_time,
                        class_status:ispaike,
                        bui_type: 'true'
                    }
                    store.load(params_1);
                    // end 刷新store

                    store1.load();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error)
                }
            });
            this.close();
        }
    });

    //删除课程
    deleteLesson = new Overlay.Dialog({
        title: '删除',
        width: 500,
        zIndex : '100',
        height: 130,
        bodyContent: '<p>确定要删除此课程吗？</p>',
        success: function() {
            post_1(SERVICE_URL+'deleteLesson?callback=?', {
                course_plan_id:quanju.class_id,
                lesson_id: x
            });
            function post_1(URL, PARAMS) {
                $.ajax({
                    url: URL,
                    dataType: 'jsonp',
                    data: PARAMS,
                    jsonp: 'callback',
                    success: function(result) {
                        for(var i in result) {
                            BUI.Message.Alert(result[i].retmsg);

                            // start 刷新store
                            //军团
                            var service_army = '';
                            service_army_id = get_id(crop_name_arr,crop_id_arr,$("#service_army").val());
                            if(service_army_id == undefined){
                                service_army_id = '';
                            }
                            //服务院校
                            var service_school = '';
                            service_school = get_id(school_name_arr,school_id_arr,$("#service_school").val());
                            if(service_school == undefined){
                                service_school = '';
                            }
                            //班型名称
                            var search_banxin = '';
                            search_banxin = $("#search_banxin").val();
                            //开始时间
                            var start_time = '';
                            start_time = $("#start_time").val();
                            var timer1 = start_time+' 00:00:00.0'
                            if(start_time != ''){
                                start_time = start_time+' 00:00:00';
                            }
                            // 结束时间
                            var finish_time = '';
                            finish_time = $('#finish_time').val();
                            var timer2 = finish_time+' 00:00:00.0'
                            if(finish_time != ''){
                                finish_time = finish_time+' 23:59:59';
                            }
                            if(timeHm(timer2)-timeHm(timer1)<0){
                                BUI.Message.Alert('开始时间不能大于结束时间');
                                return;
                            }else if(start_time == ""&& finish_time != ""){
                                BUI.Message.Alert('开始时间不能为空');
                                return;
                            }else if(start_time != ""&& finish_time == ""){
                                BUI.Message.Alert('结束时间不能为空');
                                return;
                            }
                            //是否排课
                            var ispaike =$('input:radio[name="optionsRadiosinline"]:checked').val();
                            var params_1 = { //配置初始请求的参数
                                userid: pmAgent.userid,
                                pro_first_id  : service_army_id,
                                pro_second_id: service_school,
                                class_name: search_banxin,
                                start_time:start_time,
                                end_time:finish_time,
                                class_status:ispaike,
                                bui_type: 'true'
                            }
                            store.load(params_1);
                            // end 刷新store

                            store1.load();
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
                        console.log("请求错误：" + data + "错误的原因：" + Error);
                    },
                });

            }
            this.close();
        }
    })

    // 教学备注
    dialog_shotmsg = new Overlay.Dialog({
        //配置DOM容器的编号
        title:'教学备注',
        width:500,
        height:300,
        contentId: 'content2',
        success: function() {
            this.close();
        }
    });

    var nowData = showData();
    var datepicker1 = new Calendar.DatePicker({
        trigger:'.section_time',
        autoRender : true
    });
    var datepicker2 = new Calendar.DatePicker({
        trigger:'.section_data',
        minDate : nowData,
        autoRender : true
    });

});
var store1;
var x;
var bianji;
var doing;
var dialog;
var deleteLesson;
var dialog_shotmsg;
var teacher_name = [];
var assistant_id = [];
//获取以前信息的时间差
var oldGap;
//获取当前页数
var numPage = 0;

var nowGap;


// 下边课程的详细信息的表单
var class_1 = function() {
    //课程列表
    BUI.use(['common/search', 'bui/grid', 'bui/data', 'bui/overlay','bui/select'], function(Search, Grid, Data, Overlay,Select) {
        //权限人的id
        var person_id;
        //请求老师的数组
        post_1(SERVICE_URL+'findTeachersByClassId?callback=?', {
            class_id:quanju.class_id,
        });
        function post_1(URL, PARAMS) {
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                data: PARAMS,
                jsonp: 'callback',
                success: function (result) {
                    teacher_name = [];
                    assistant_id = [];
                    for(var i in result) {
                        teacher_name.push(result[i].name);
                        assistant_id.push(result[i].id);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求错误：" + data + "错误的原因：" + Error)
                },
            });
        }
        //定义表格
        var Grid = Grid,
            //定义store数据
            Store = Data.Store,
            columns = [{
                title: '课次',
                dataIndex: 'num_id',
                width: "6.7%",
                elCls: 'center',
            }, {
                title: '班型',
                dataIndex: 'class_name',
                width: "6.7%",
                elCls: 'center',
            }, {
                title: '课程类型',
                dataIndex: 'lesson_type',
                width: "6.7%",
                elCls: 'center',
            }, {
                title: '课程名称',
                dataIndex: 'lesson_name',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '授课星期',
                dataIndex: 'lesson_week',
                width: "6.7%",
                elCls: 'center',
            }, {
                title: '授课日期',
                dataIndex: 'lesson_date',
                width: "6.7%",
                elCls: 'center',
            },  {
                title: '开始时间',
                dataIndex: 'begin_time',
                width: "6.7%",
                elCls: 'center',
            }, {
                title: '结束时间',
                dataIndex: 'end_time',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '授课时间',
                dataIndex: 'time_type_code',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '课时（H）',
                dataIndex: 'hour',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '授课老师',
                dataIndex: 'teacher',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '助教老师',
                dataIndex: 'assistant',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '直播间id',
                dataIndex: 'live_id',
                width: "6.7%",
                elCls: 'center',
            },{
                title: '教学备注',
                dataIndex: '',
                width: "6.7%",
                elCls: 'center',
                renderer : function () {
                    var ck = '<a action="ck"   class="grid-command btn1">查看</a>';
                    return ck;
                }
            }, {
                title: '操作',
                dataIndex: 'h',
                elCls: 'center',
                width: "6.7%",
                renderer: function(value, obj) {
                    //禁止离上课时间小于一个小时的课程的编辑和删除功能
                    var nowTime = showTime();
                    var nowData = showData();
                    var strTimeBegin = obj.lesson_date+' '+obj.begin_time;
                    nowGap = timeGap2(nowTime,strTimeBegin);
                    if(nowData == obj.lesson_date && 0<nowGap && nowGap<1){//0<nowGap &&
                        return '<button class="button button-info details_registration_list" style="margin:3px" disabled="disabled">编辑</button>' +
                            '<button class="button button-warning Invalid_registration" data-toggle="modal" data-target="#" style="margin:3px" disabled="disabled">删除</button>'
                    }else if(obj.person_id == 'GROUP' ){//GROUP,ORG,LEGION,ALL
                        return '<button class="button button-info details_registration_list" style="margin:3px">编辑</button>' +
                            '<button class="button button-warning Invalid_registration" data-toggle="modal" data-target="#" style="margin:3px" disabled="disabled">删除</button>';
                    }else{
                        return '<button class="button button-info details_registration_list" style="margin:3px">编辑</button>' +
                            '<button class="button button-warning Invalid_registration" data-toggle="modal" data-target="#" style="margin:3px">删除</button>';
                    }
                }
            }];
        var dataClass = [];
        var testData = [];
        store1 = new Store({
            url: SERVICE_URL+'findLessonByClass?callback=?',
            dataType: 'jsonp',
            autoLoad: true, //自动加载数据
            params: { //配置初始请求的参数
                userid: pmAgent.userid,
                course_plan_id: quanju.class_id,
                teacher:'',
                bui_type: 'true'
            },
            proxy : {
                ajaxOptions : { //ajax的配置项，不要覆盖success,和error方法
                    traditional : true,
                    type : 'post',
                    success: function (result) {
                        // 权限限制
                        // ---------------------------------------------------------------------------
                        person_id = result.info;
                        // console.log(person_id);
                        if(person_id == 'GROUP'){
                            $('#btn_xinzen').attr('disabled',true);
                            $('#btn_daoru').attr('disabled',true);
                        }
                        // --------------------------------------------------------------------
                        dataClass = result.rows;
                        testData = [];
                        for(var i in dataClass){
                            var str1 = dataClass[i].lesson_date+' '+dataClass[i].begin_time;
                            str2 = hourFloat(dataClass[i].hour);
                            var str3 = dataClass[i].lesson_date+' 00:00:00.0';

                            if(dataClass[i].lesson_date==''||dataClass[i].begin_time==''||dataClass[i].end_time==''){
                                dataClass[i].time_type_code=''
                            }
                            if(dataClass[i].lesson_date=='0000-00-00'){
                                dataClass[i].lesson_date = '';
                            }
                            if(dataClass[i].begin_time=='00:00'){
                                dataClass[i].begin_time = ''
                            }
                            if(dataClass[i].end_time=='00:00'){
                                dataClass[i].begin_time = ''
                            }
                            dataClass[i].hour = str2
                            dataClass[i].time_type_code = amOrPm(str3,str1)
                            var numId;
                            if(numPage == 0){
                                numId = +(numPage*10)+(+i)+1
                            }else{
                                numId = +((numPage -1)*10)+(+i)+1
                            }
                            var a = {
                                num_id:numId,
                                class_name:dataClass[i].class_name,
                                lesson_type:dataClass[i].lesson_type,
                                lesson_name:dataClass[i].lesson_name,
                                lesson_date:dataClass[i].lesson_date,
                                lesson_week:dataClass[i].lesson_week,
                                lesson_id:dataClass[i].lesson_id,
                                begin_time:dataClass[i].begin_time,
                                end_time:dataClass[i].end_time,
                                time_type_code:dataClass[i].time_type_code,
                                hour:dataClass[i].hour,
                                teacher:dataClass[i].teacher,
                                assistant:dataClass[i].assistant,
                                live_id:dataClass[i].live_id,
                                description:dataClass[i].description,
                                person_id:person_id,
                                status:dataClass[i].status
                            }
                            testData.push(a);
                        }
                        result.rows = testData;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("请求错误：" + data + "错误的原因：" + Error)
                    },
                }
            },
            pageSize:10 // 配置分页数目
        })

        grid = new Grid.Grid({
            render: '#grid_registration_list',
            // forceFit: true, // 列宽按百分比自适应
            width:'100%',
            columns: columns,
            store: store1,
            // emptyDataTpl : '<div class="centered"><img alt="Crying" src="http://img03.taobaocdn.com/tps/i3/T1amCdXhXqXXXXXXXX-60-67.png"><h2>查询的数据不存在</h2></div>',
            bbar: {
                pagingBar: true
            },
            pageSize:10
        });
        grid.render();

        //获取当前页数
        $('#grid_registration_list #prev button').on('click',function () {
            numPage = +$('#grid_registration_list').find('.bui-pb-page').val()-1;
        })
        $('#grid_registration_list #next button').on('click',function () {
            numPage = +$('#grid_registration_list').find('.bui-pb-page').val()+1;
        })
        $('#grid_registration_list #skip button').on('click',function () {
            numPage = +$('#grid_registration_list').find('.bui-pb-page').val();
        })
        $('#grid_registration_list #first button').on('click',function () {
            numPage = 1;
        })
        $('#grid_registration_list #last button').on('click',function () {
            numPage = +$('#grid_registration_list').find('#totalPage').text().substring(2,3);
            // console.log(numPage)
        })

        // 通过教师搜索课程
        $('#teacherName').on('click',function (event) {
            event.stopPropagation()
            if($("#divn").length > 0) {
                $('#divn').show();
            }else{
                $('#teacherName').after('<ul id="divn" style="width:160px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: white;z-index: 50"></ul>')
                var strAddn = '';
                $.each(teacher_name, function(index,value){
                    strAddn += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>';
                });
                $('#divn').append(strAddn);
            }

            $('#divn').on('click',function (e) {
                var str =e.target.innerText;
                for(var i in teacher_name){
                    if(teacher_name[i] == str){
                        $('#teacherName').val(str);
                    }
                }
                $('#divn').remove();
            })

        })
        //搜索老师的下拉框
        $(document).on('click',function () {
            if($("#divn").length > 0){
                $('#divn').remove();
            }
        })
        $('#teacherName').bind('input propertychange', function() {
            var inputn = $("#teacherName").val();
            if (inputn == "") {
                $("#divn li").show();
            } else {
                $("#divn li").each(
                    function() {
                        var cityName = $(this).html();
                        var re = new RegExp(inputn);
                        if (!re.test(cityName)) {
                            $(this).hide();
                        } else {
                            $(this).show();
                        }
                    });
            }
        });
        $('#teacherName').focus(function () {
            $('#teacherName').val('');
        })
        $('#btn_sousuo').on('click',function () {
            $('#divn').remove();
            var teacherName = $('#teacherName').val();
            var params_1 = { //配置初始请求的参数
                userid: pmAgent.userid,
                course_plan_id: quanju.class_id,
                teacher:teacherName,
                bui_type: 'true'
            }
            store1.load(params_1);
        })

        //新增课程
        $("#btn_xinzen").on("click", function() {

            //start 新增——老师输入框
            $('#teacher').on('click',function (event) {
                event.stopPropagation();
                var arr3 = teacher_name;
                var index3 = $('#assistant').val()
                if(index3 != ''){
                    arr3 = arrSplice(arr3,index3);
                }
                if($("#div3").length > 0) {
                    $('#div3').show();
                }else{

                    $('#teacher').after('<ul id="div3" style="width:160px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: white"></ul>')
                    var strAdd3 = '';
                    $.each(arr3, function(index,value){
                        strAdd3 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>';
                    });
                    $('#div3').append(strAdd3);
                }

                $('#div3').on('click',function (e) {
                    var str =e.target.innerText;
                    for(var i in arr3){
                        if(arr3[i] == str){
                            $('#teacher').val(str);
                        }
                    }
                    $('#div3').remove();
                })

            })
            $(document).on('click',function () {
                if($("#div3").length > 0){
                    $('#div3').remove();
                }
            })
            $('#teacher').bind('input propertychange', function() {
                var input3 = $("#teacher").val();
                if (input3 == "") {
                    $("#div3 li").show();
                } else {
                    $("#div3 li").each(
                        function() {
                            var cityName = $(this).html();
                            var re = new RegExp(input3);
                            if (!re.test(cityName)) {
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                }
            });
            $('#teacher').focus(function () {
                $('#teacher').val('');
                $('#div4').remove();
            })
            //end 新增——老师输入框

            //start 新增——助教输入框
            $('#assistant').on('click',function (event) {
                event.stopPropagation();
                var arr4 = teacher_name;
                var index4 = $('#teacher').val()
                if(index4 != ''){
                    arr4 = arrSplice(arr4,index4);
                }
                if($("#div4").length > 0) {
                    $('#div4').show();
                }else{
                    $('#assistant').after('<ul id="div4" style="width:160px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: white"></ul>')
                    var strAdd4 = '';
                    $.each(arr4, function(index,value){
                        strAdd4 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>';
                    });
                    $('#div4').append(strAdd4);
                }

                $('#div4').on('click',function (e) {
                    var str =e.target.innerText;
                    for(var i in arr4){
                        if(arr4[i] == str){
                            $('#assistant').val(str);
                        }
                    }
                    $('#div4').remove();
                })

            })
            $(document).on('click',function () {
                if($("#div4").length > 0){
                    $('#div4').remove();
                }
            })
            $('#assistant').bind('input propertychange', function() {
                var input4 = $("#assistant").val();
                if (input4 == "") {
                    $("#div4 li").show();
                } else {
                    $("#div4 li").each(
                        function() {
                            var cityName = $(this).html();
                            var re = new RegExp(input4);
                            if (!re.test(cityName)) {
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                }
            });
            $('#assistant').focus(function () {
                $('#assistant').val('');
                $('#div3').remove();
            })
            //end 新增——助教输入框
            doing.show();
            //start 新增——开始时间
            $('#begin_time_data').on('click',function (event) {
                event.stopPropagation();
                // 计算当前时间的日期时分
                var teachTimeData = $("#teach_data").val();
                var timeNow = showTime();
                var strr = timeNow.substring(8,10);
                if(+strr<10){
                    strr='0'+strr
                }
                var strHm = showHour();
                timeNow = timeNow.substring(0,8)+strr+" "+strHm;
                var timeData= timeNow.substring(0,10);
                var timeHour = +(timeNow.substring(11,13))+1;
                var timeMinute = +(timeNow.substring(14));
                $('#_contentsBegin').remove();
                $('#begin_time_data').after('<div id="_contentsBegin" style="width:198px;height:30px;padding:4px; background-color:#fff; border-radius: 4px;  border:1px solid #c3c3d6;  position:absolute; left:?px; top:?px;z-index:1;">');
                var hourIndex;
                var minuteIndex;
                if(teachTimeData == timeData){
                    hourIndex = timeHour;
                    if(hourIndex>9){
                        $('#_contentsBegin').append('时：'+"<select id='selectH_begin' name='_hour' style='width: 50px'></select>")
                        for (h = hourIndex; h <= 23; h++) {
                            $("<option></option>").val(h).text(h).appendTo($("#selectH_begin"));
                        }
                        $('#_contentsBegin').append(' 分：'+"<select id='selectM_begin' name='_hour' style='width: 50px'></select>")
                        $('#selectM_begin').focus(function () {
                            var textHour = $('#selectH_begin').find("option:selected").text();
                            minuteIndex = timeMinute;
                            if(textHour == timeHour){
                                if(minuteIndex > 9 ){
                                    for (m = minuteIndex; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                    }
                                }else{
                                    for (m = minuteIndex; m <= 9; m++) {
                                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin"));
                                    }
                                    for (m = 10; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                    }
                                }
                            }else{
                                for (m = 0; m <= 9; m++) {
                                    $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin"));
                                }
                                for (m = 10; m <= 59; m++) {
                                    $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                }
                            }
                        })
                        $('#_contentsBegin').append(' <input name="queding" type="button" id="selectBegin" value="确定" />')
                    }else{
                        $('#_contentsBegin').append('时：'+"<select id='selectH_begin' name='_hour' style='width: 50px'></select>")
                        for (h = hourIndex; h <= 9; h++) {
                            $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_begin"));
                        }
                        for (h = 10; h <= 23; h++) {
                            $("<option></option>").val(h).text(h).appendTo($("#selectH_begin"));
                        }
                        $('#_contentsBegin').append(' 分：'+"<select id='selectM_begin' name='_hour' style='width: 50px'></select>")
                        $('#selectM_begin').focus(function () {
                            var textHour = $('#selectH_begin').find("option:selected").text();
                            minuteIndex = timeMinute;
                            if(textHour == timeHour){
                                if(minuteIndex > 9 ){
                                    for (m = minuteIndex; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                    }
                                }else{
                                    for (m = minuteIndex; m <= 9; m++) {
                                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin"));
                                    }
                                    for (m = 10; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                    }
                                }
                            }else{
                                for (m = 0; m <= 9; m++) {
                                    $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin"));
                                }
                                for (m = 10; m <= 59; m++) {
                                    $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                                }
                            }
                        })
                        $('#_contentsBegin').append(' <input name="queding" type="button" id="selectBegin" value="确定" />')
                    }
                    $('#selectH_begin').focus(function () {
                        $('#selectM_begin').empty();
                    })
                    $('#selectBegin').on('click',function (event) {
                        event.stopPropagation();
                        var a = $('#selectH_begin').find("option:selected").text();
                        var b = $('#selectM_begin').find("option:selected").text();
                        if(b == ''){
                            if(+timeMinute<10){
                                b='0'+ timeMinute;
                            }else{
                                b=timeMinute;
                            }
                        }
                        var c = a+":"+b;
                        $('#begin_time_data').val(c);
                        $('#_contentsBegin').remove();
                    })
                }else{
                    $('#_contentsBegin').append('时：'+"<select id='selectH_begin' name='_hour' style='width: 50px'></select>")
                    for (h = 0; h <= 9; h++) {
                        $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_begin"));
                    }
                    for (h = 10; h <= 23; h++) {
                        $("<option></option>").val(h).text(h).appendTo($("#selectH_begin"));
                    }
                    $('#_contentsBegin').append(' 分：'+"<select id='selectM_begin' name='_hour' style='width: 50px'></select>")
                    for (m = 0; m <= 9; m++) {
                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin"));
                    }
                    for (m = 10; m <= 59; m++) {
                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin"));
                    }
                    $('#_contentsBegin').append(' <input name="queding" type="button" id="selectBegin" value="确定" />')
                    $('#selectBegin').on('click',function (event) {
                        event.stopPropagation();
                        var a = $('#selectH_begin').find("option:selected").text();
                        var b = $('#selectM_begin').find("option:selected").text();
                        var c = a+":"+b;
                        $('#begin_time_data').val(c);
                        $('#_contentsBegin').remove();
                    })
                }
                $('#_contentsBegin').on('click',function (event) {
                    event.stopPropagation();
                })
                $('#end_time_data').focus(function () {
                    $('#_contentsBegin').remove();
                })
            })
            $(document).on('click',function () {
                $('#_contentsBegin').remove();
            })
            //end 新增——开始时间

            //start 新增——结束时间
            $('#end_time_data').on('click',function (event) {
                event.stopPropagation();
                $('#_contentsEnd').remove();
                $('#end_time_data').after('<div id="_contentsEnd" style="width:198px;height:30px;padding:4px; background-color:#fff; border-radius: 4px;  border: 1px solid #c3c3d6;  position:absolute; left:?px; top:?px;z-index:1;">');
                $('#_contentsEnd').append('时：'+"<select id='selectH_end' name='_hour' style='width: 50px'></select>")
                for (h = 0; h <= 9; h++) {
                    $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_end"));
                }
                for (h = 10; h <= 23; h++) {
                    $("<option></option>").val(h).text(h).appendTo($("#selectH_end"));
                }
                $('#_contentsEnd').append(' 分：'+"<select id='selectM_end' name='_hour' style='width: 50px'></select>")
                for (m = 0; m <= 9; m++) {
                    $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_end"));
                }
                for (m = 10; m <= 59; m++) {
                    $("<option></option>").val('m').text(m).appendTo($("#selectM_end"));
                }
                $('#_contentsEnd').append(' <input name="queding" type="button" id="selectEnd" value="确定" />')
                $('#_contentsEnd').on('click',function (event) {
                    event.stopPropagation();
                })
                $('#selectEnd').on('click',function (event) {
                    event.stopPropagation();
                    var a = $('#selectH_end').find("option:selected").text();
                    var b = $('#selectM_end').find("option:selected").text();
                    var c = a+":"+b;
                    $('#end_time_data').val(c);
                    $('#_contentsEnd').remove();
                })
                $('#begin_time_data').focus(function () {
                    $('#_contentsEnd').remove();
                })
            })
            $(document).on('click',function () {
                if($("#_contentsEnd").length > 0){
                    $('#_contentsEnd').remove();
                }
            })
            //end 新增——结束时间

            $('#_contentsBegin').remove();
            $('#_contentsEnd').remove();
        });
        // 导入课程
        $("#btn_daoru").on("click", function() {
            $('#files').val("");
            x = parment.class_id;
            dialog.show();
        });


        grid.on('cellclick', function(ev) {
            var record = ev.record;//点击行的记录
            var sender = $(ev.domTarget);
            var name = sender.attr('action');
            parment = record;
            field = ev.field, //点击对应列的dataIndex
            target = $(ev.domTarget); //点击的元素
            // console.log(parment.description)

            //教学备注
            if(name=='ck'&&parment.description!=''){
                dialog_shotmsg.show();
                $("#modal-body").html(parment.description);

            }else if(name=='ck'&&parment.description==''){
                BUI.Message.Alert('还没有备注课程！！！')
            }
            //编辑课程
            if(target.hasClass('details_registration_list')) { //编辑课程

                //start 编辑——老师输入框
                $('#teacher_2').on('click',function (event) {
                    event.stopPropagation();
                    var arr5 = teacher_name;
                    var index5 = $('#assistant_2').val()
                    if(index5 != ''){
                        arr5 = arrSplice(arr5,index5);
                    }
                    if($("#div5").length > 0) {
                        $('#div5').show();
                    }else{
                        $('#teacher_2').after('<ul id="div5" style="width:160px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: white"></ul>')
                        var strAdd5 = '';
                        $.each(arr5, function(index,value){
                            strAdd5 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>'
                        });
                        $('#div5').append(strAdd5);
                    }

                    $('#div5').on('click',function (e) {
                        var str =e.target.innerText;
                        for(var i in arr5){
                            if(arr5[i] == str){
                                $('#teacher_2').val(str);
                            }
                        }
                        $('#div5').remove();
                    })

                })
                $(document).on('click',function () {
                    if($("#div5").length > 0){
                        $('#div5').remove();
                    }
                })
                $('#teacher_2').bind('input propertychange', function() {
                    var input5 = $("#teacher_2").val();
                    if (input5 == "") {
                        $("#div5 li").show();
                    } else {
                        $("#div5 li").each(
                            function() {
                                var cityName = $(this).html();
                                var re = new RegExp(input5);
                                if (!re.test(cityName)) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }
                            });
                    }
                });
                $('#teacher_2').focus(function () {
                    $('#teacher_2').val('');
                    $('#div6').remove();
                })
                //end 编辑——老师输入框

                //start 编辑——助教输入框
                $('#assistant_2').on('click',function (event) {
                    event.stopPropagation();
                    var arr6 = teacher_name;
                    var index6 = $('#teacher_2').val()
                    if(index6 != ''){
                        arr6 = arrSplice(arr6,index6);
                    }
                    if($("#div6").length > 0) {
                        $('#div6').show();
                    }else{
                        $('#assistant_2').after('<ul id="div6" style="width:160px;max-height: 100px;border: 1px solid #ccc;border-radius: 4px;padding: 5px;list-style: none;overflow-y: scroll;position: absolute;background-color: white"></ul>')
                        var strAdd6 = ''
                        $.each(arr6, function(index,value){
                            strAdd6 += '<li name="" style="padding-left:5px;height: 32px;line-height: 30px">'+value+'</li>'
                        });
                        $('#div6').append(strAdd6);
                    }
                    $('#div6').on('click',function (e) {
                        var str =e.target.innerText;
                        for(var i in arr6){
                            if(arr6[i] == str){
                                $('#assistant_2').val(str);
                            }
                        }
                        $('#div6').remove();
                    })

                })
                $(document).on('click',function () {
                    if($("#div6").length > 0){
                        $('#div6').remove();
                    }
                })
                $('#assistant_2').bind('input propertychange', function() {
                    var input6 = $("#assistant_2").val();
                    if (input6 == "") {
                        $("#div6 li").show();
                    } else {
                        $("#div6 li").each(
                            function() {
                                var cityName = $(this).html();
                                var re = new RegExp(input6);
                                if (!re.test(cityName)) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }
                            });
                    }
                });
                $('#assistant_2').focus(function () {
                    $('#assistant_2').val('');
                    $('#div5').remove();
                })
                //end 编辑——助教输入框

                //start 编辑——开始时间
                $('#begin_time_data_2').on('click',function (event) {
                    event.stopPropagation();
                    $('#_contentsBegin2').remove();
                    var teachTimeData = $("#teach_data_2").val();
                    var timeNow = showTime();
                    var strr = timeNow.substring(8,10);
                    if(+strr<10){
                        strr='0'+strr
                    }
                    var strHm = showHour();
                    timeNow = timeNow.substring(0,8)+strr+" "+strHm;
                    var timeData= timeNow.substring(0,10);
                    var timeHour = +(timeNow.substring(11,13))+1;
                    var timeMinute = +(timeNow.substring(14));
                    console.log(timeMinute)
                    $('#begin_time_data_2').after('<div id="_contentsBegin2" style="width:198px;height:30px;padding:4px; background-color:#fff; border-radius: 4px;  border:1px solid #c3c3d6;  position:absolute; left:?px; top:?px;z-index:1;">');
                    var hourIndex;
                    var minuteIndex;
                    if(teachTimeData == timeData){
                        hourIndex = timeHour
                        if(hourIndex>9){
                            $('#_contentsBegin2').append('时：'+"<select id='selectH_begin2' name='_hour' style='width: 50px'></select>")
                            for (h = hourIndex; h <= 23; h++) {
                                $("<option></option>").val(h).text(h).appendTo($("#selectH_begin2"));
                            }
                            $('#_contentsBegin2').append(' 分：'+"<select id='selectM_begin2' name='_hour' style='width: 50px'></select>")
                            $('#selectM_begin2').focus(function () {
                                var textHour = $('#selectH_begin2').find("option:selected").text();
                                minuteIndex = timeMinute
                                if(textHour == timeHour){
                                    if(minuteIndex > 9 ){
                                        for (m = minuteIndex; m <= 59; m++) {
                                            $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                        }
                                    }else{
                                        for (m = minuteIndex; m <= 9; m++) {
                                            $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin2"));
                                        }
                                        for (m = 10; m <= 59; m++) {
                                            $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                        }
                                    }
                                }else{
                                    for (m = 0; m <= 9; m++) {
                                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin2"));
                                    }
                                    for (m = 10; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                    }
                                }
                            })
                            $('#_contentsBegin2').append(' <input name="queding" type="button" id="selectBegin2" value="确定" />')
                        }else{
                            $('#_contentsBegin2').append('时：'+"<select id='selectH_begin2' name='_hour' style='width: 50px'></select>")
                            for (h = hourIndex; h <= 9; h++) {
                                $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_begin2"));
                            }
                            for (h = 10; h <= 23; h++) {
                                $("<option></option>").val(h).text(h).appendTo($("#selectH_begin2"));
                            }
                            $('#_contentsBegin2').append(' 分：'+"<select id='selectM_begin2' name='_hour' style='width: 50px'></select>")
                            $('#selectM_begin2').focus(function () {
                                var textHour = $('#selectH_begin2').find("option:selected").text();
                                minuteIndex = timeMinute
                                if(textHour == timeHour){
                                    if(minuteIndex > 9 ){
                                        for (m = minuteIndex; m <= 59; m++) {
                                            $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                        }
                                    }else{
                                        for (m = minuteIndex; m <= 9; m++) {
                                            $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin2"));
                                        }
                                        for (m = 10; m <= 59; m++) {
                                            $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                        }
                                    }
                                }else{
                                    for (m = 0; m <= 9; m++) {
                                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin2"));
                                    }
                                    for (m = 10; m <= 59; m++) {
                                        $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                                    }
                                }
                            })
                            $('#_contentsBegin2').append(' <input name="queding" type="button" id="selectBegin2" value="确定" />')
                        }
                        $('#selectH_begin2').focus(function () {
                            $('#selectM_begin2').empty();
                        })
                        $('#selectBegin2').on('click',function (event) {
                            event.stopPropagation();
                            var a = $('#selectH_begin2').find("option:selected").text();
                            var b = $('#selectM_begin2').find("option:selected").text();
                            if(b == ''){
                                if(+timeMinute<10){
                                    b='0'+ timeMinute;
                                }else{
                                    b=timeMinute;
                                }
                            }
                            var c = a+":"+b;
                            $('#begin_time_data_2').val(c);
                            $('#_contentsBegin2').remove();
                        })
                    }else{
                        $('#_contentsBegin2').append('时：'+"<select id='selectH_begin2' name='_hour' style='width: 50px'></select>")
                        for (h = 0; h <= 9; h++) {
                            $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_begin2"));
                        }
                        for (h = 10; h <= 23; h++) {
                            $("<option></option>").val(h).text(h).appendTo($("#selectH_begin2"));
                        }
                        $('#_contentsBegin2').append(' 分：'+"<select id='selectM_begin2' name='_hour' style='width: 50px'></select>")
                        for (m = 0; m <= 9; m++) {
                            $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_begin2"));
                        }
                        for (m = 10; m <= 59; m++) {
                            $("<option></option>").val('m').text(m).appendTo($("#selectM_begin2"));
                        }
                        $('#_contentsBegin2').append(' <input name="queding" type="button" id="selectBegin2" value="确定" />')
                        $('#selectBegin2').on('click',function (event) {
                            event.stopPropagation();
                            var a = $('#selectH_begin2').find("option:selected").text();
                            var b = $('#selectM_begin2').find("option:selected").text();
                            var c = a+":"+b;
                            $('#begin_time_data_2').val(c);
                            $('#_contentsBegin2').remove();
                        })
                    }
                    $('#_contentsBegin2').on('click',function (event) {
                        event.stopPropagation();
                    })
                    $('#end_time_data_2').focus(function () {
                        $('#_contentsBegin2').remove();
                    })
                })
                $(document).on('click',function () {
                    if($("#_contentsBegin2").length > 0){
                        $('#_contentsBegin2').remove();
                    }
                })

                //end 编辑——开始时间

                //start 编辑——结束时间
                $('#end_time_data_2').on('click',function (event) {
                    event.stopPropagation();
                    $('#_contentsEnd2').remove();
                    $('#end_time_data_2').after('<div id="_contentsEnd2" style="width:198px;height:30px;padding:4px; background-color:#fff; border-radius: 4px;  border: 1px solid #c3c3d6;  position:absolute; left:?px; top:?px;z-index:1;">');
                    $('#_contentsEnd2').append('时：'+"<select id='selectH_end2' name='_hour' style='width: 50px'></select>")
                    for (h = 0; h <= 9; h++) {
                        $("<option></option>").val(h).text('0'+h).appendTo($("#selectH_end2"));
                    }
                    for (h = 10; h <= 23; h++) {
                        $("<option></option>").val(h).text(h).appendTo($("#selectH_end2"));
                    }
                    $('#_contentsEnd2').append(' 分：'+"<select id='selectM_end2' name='_hour' style='width: 50px'></select>")
                    for (m = 0; m <= 9; m++) {
                        $("<option></option>").val('m').text('0'+m).appendTo($("#selectM_end2"));
                    }
                    for (m = 10; m <= 59; m++) {
                        $("<option></option>").val('m').text(m).appendTo($("#selectM_end2"));
                    }
                    $('#_contentsEnd2').append(' <input name="queding" type="button" id="selectEnd2" value="确定" />')
                    $('#_contentsEnd2').on('click',function (event) {
                        event.stopPropagation();
                    })
                    $('#selectEnd2').on('click',function (event) {
                        event.stopPropagation();
                        var a = $('#selectH_end2').find("option:selected").text();
                        var b = $('#selectM_end2').find("option:selected").text();
                        var c = a+":"+b;
                        $('#end_time_data_2').val(c);
                        $('#_contentsEnd2').remove();
                    })
                    $('#begin_time_data_2').focus(function () {
                        $('#_contentsEnd2').remove();
                    })
                })
                $(document).on('click',function () {
                    if($("#_contentsEnd2").length > 0){
                        $('#_contentsEnd2').remove();
                    }
                })
                //end 编辑——结束时间

                $("#order_class_type_2").val(parment.lesson_type);
                $("#class_name_2").val(parment.lesson_name);
                $("#teach_data_2").val(parment.lesson_date);
                $("#begin_time_data_2").val(parment.begin_time);
                $("#end_time_data_2").val(parment.end_time);
                $("#teacher_2").val(parment.teacher);
                $("#assistant_2").val(parment.assistant);
                $("#num_home_2").val(parment.live_id);
                $("#teach_description_2").val(parment.description);

                //修改之前先获取当前课程的时间差
                var oldBegin = parment.lesson_date+' '+parment.begin_time;
                var oldEnd = parment.lesson_date+' '+parment.end_time;
                oldGap = timeGap2(oldBegin,oldEnd);

                // start 权限------------------------------------------------------------

                if(person_id == 'GROUP'){//GROUP,ORG,LEGION,ALL
                    $('#teacher_2').attr('disabled',true);
                    $('#order_class_type_2').attr('disabled',true);
                    $('#class_name_2').attr('disabled',true);
                    $('#teach_data_2').attr('disabled',true);
                    $('#begin_time_data_2').attr('disabled',true);
                    $('#end_time_data_2').attr('disabled',true);
                    if(parment.status=='2'){
                        $('#assistant_2').attr('disabled',true);
                        $('#num_home_2').attr('disabled',true);
                        $('#teach_description_2').attr('disabled',true);
                    }else if(parment.status=='1'){
                        $('#assistant_2').attr('disabled',false);
                        $('#num_home_2').attr('disabled',false);
                        $('#teach_description_2').attr('disabled',false);
                    }
                }
                // end 权限--------------------------------------------------------------
                x = parment.lesson_id;
                bianji.show();
                $('#_contentsBegin2').remove();
                $('#_contentsEnd2').remove();
            }
            //删除课程
            if(target.hasClass("Invalid_registration")) { //删除课程
                x = parment.lesson_id;
                //删除
                deleteLesson .show();
            }
        });
    });
}

//计算今天的日期
function showData(){
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth()+1)<10?'0'+(mydate.getMonth()+1):(mydate.getMonth()+1) + "-";
    str += mydate.getDate()<10?'0'+mydate.getDate():mydate.getDate();
    return str;
}
//计算今天的时间
function showTime(){
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    var str1 = mydate.getMonth()+1;
    if(+str1<10){
        str1 = '0'+str1;
    }
    str += str1 + "-";
    str += mydate.getDate() + " ";
    str += mydate.getHours() + ":";
    str += mydate.getMinutes();
    return str;
}
//计算现在的时间
function showHour(){
    var mydate = new Date();
    var str = "";
    str += mydate.getHours();
    if(+str<10){
        str = '0'+str+':';
    }else{
        str = str+':';
    }
    var strs = mydate.getMinutes()
    if(+strs<10){
        strs= '0'+ strs
    }
    str+=strs;
    return str;
}
//将两位小数的数字转换为时间
function hourFloat(time) {
    time = time*60
    if(parseInt(time/60)==0&&parseInt(time%60)!=0){
        time = parseInt(time%60)+'分钟'
    }else if(parseInt(time%60)==0&&parseInt(time/60)!=0){
        time = parseInt(time/60)+'小时'
    }else if(parseInt(time/60)==0 && parseInt(time%60)==0){
        time = parseInt(time/60)+'小时'+parseInt(time%60)+'分钟'
    }else{
        time = parseInt(time/60)+'小时'+parseInt(time%60)+'分钟'
    }
    return time;
}
//删除数组中的指定元素
function arrSplice(arr,val) {
    var newArray = [];//定义新的空数组对象
    for(var i=0;i<arr.length;i++) {
        if (arr[i] != val) {//过滤要去除的数组内容
            newArray.push(arr[i]);//填充到新数组对象中
        }
    }
    return newArray;
}
//获取时间的前一个小时的时间
function outputTimeSub(time) {
    var str =  time.substring(0,2);
    str = str - 1;
    if(str<10 && str >= 0){
        str = '0'+str
    }else if(str < 0){
        str = 23;
        str = str;
    }else{
        str = str;
    }
    return str;
}
//获取时间的后一个小时的时间
function outputTimeAdd(time) {
    var str =  time.substring(0,2);
    str = +str + 1;
    if(str<10 && str >= 0){
        str = '0'+str
    }else if(str == 24){
        str = "00";
        str = str;
    }else{
        str = str;
    }
    return str;
}
// 获取值对应的id
function get_id(arr,arr1,n) {
    var i,name_id;
    $.each(arr,function (index) {
        if(arr[index] == n){
            i = index;
        }
    })

    $.each(arr1,function (index) {
        if(i== index){
            name_id = arr1[index]
        }
    })
    return name_id;
}
//获取时间是上午还是下午
function amOrPm(time1,time2) {
    var timer = timeHm(time2)-timeHm(time1);
    var n ;
    hours = parseInt((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if(hours<12 && hours>0){
        n = '上午';
    }else if(hours>=12 && hours<18){
        n = '下午';
    }else if(hours>=18 && hours<=24){
        n = '晚上';
    }
    return n;
}
// 输出时间差
function timeGap(time1,time2) {
    var timeGap = timeHm(time2)-timeHm(time1);
    hours = parseInt((timeGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = (timeGap % (1000 * 60 * 60)) / (1000 * 60);
    if(minutes == 0){
        startNew= hours + "小时";
    }else if(hours == 0){
        startNew= minutes + "分钟";
    }
    else{
        startNew= hours + "小时" + minutes + "分钟";
    }
    return startNew;
}
function timeGap2(time1,time2) {
    var timeGap = timeHm(time2)-timeHm(time1);
    hours = parseInt((timeGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = (timeGap % (1000 * 60 * 60)) / (1000 * 60 * 60);
    minutes = minutes.toFixed(2);
    var startNew = +minutes + hours ;
    return startNew;
}
// 计算毫秒数
function timeHm(dataTime) {
    var starttime = dataTime.replace(new RegExp("-","gm"),"/");
    var starttimeHaoMiao = (new Date(starttime)).getTime();
    return starttimeHaoMiao;
}

var quanju = '';
var parment = '';


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
var req;
$(document).ready(function() {
    req = GetRequest();
    pmAgent = pmAgent.load();
    $("#home_phone_1").val(req.zd);
    if((!pmAgent) || (pmAgent.is_login != 'Y')) {
        window.location = '../login.html';
        return;
    }
})

