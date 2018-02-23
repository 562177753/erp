/**
 * Created by admin on 2017/11/14/0014.
 */
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar'], function (Search, Page, Data, Overlay, Grid, Form, Select, Calendar) {
    //定义store数据
    var Store = BUI.Data.Store;
    var Grid = Grid;
    var columns = [
        {"title": "大区", "width": 130, "dataIndex": "org_region_name", elCls: 'center'},
        {"title": "军团", "width": 130, "dataIndex": "org_school_name", elCls: 'center'},
        {"title": "项目", "width": 130, "dataIndex": "pro_first_name", elCls: 'center'},
        {"title": "院校", "width": 130, "dataIndex": "pro_second_name", elCls: 'center'},
        {"title": "班型名称", "width": 150, "dataIndex": "classname", elCls: 'center'},
        {
            "title": "班型状态", "width": 80, "dataIndex": "status_code", elCls: 'center'
        },
        {"title": "标准价格", "width": 80, "dataIndex": "class_price", elCls: 'center'},
        {"title": "最低价格", "width": 80, "dataIndex": "class_lowest", elCls: 'center'},
        // {"title": "售卖价格", "width": 80, "dataIndex": "class_mands", elCls: 'center'},
        {"title": "计划招生人数", "width": 80, "dataIndex": "plan_recruit_num", elCls: 'center'},
        {"title": "已招生人数", "width": 80, "dataIndex": "plan_recruit_num_seled", elCls: 'center'},
        {"title": "班型结束时间", "width": 120, "dataIndex": "end_data", elCls: 'center'},
        {"title": "操作人", "width": 100, "dataIndex": "operator_id", elCls: 'center'},

        {
            "title": "操作", "width": 330, "dataIndex": "", "renderer": function (value, obj, index) {
            if (obj.status_code == '上架') {
                return '<button class="button button-info edit" data-toggle="modal" data-target="#" style="margin:3px">编辑</button>' +
                    // '<button class="button button-primary payment_button online" id="online" style="margin:3px">上架</button>' +
                    '<button class="button button-primary payment_button online" id="online" style="margin:3px">下架</button>' +
                    '<button class="button button-warning delete"  style="margin:3px">删除</button>'
            } else if (obj.status_code == '下架') {
                return '<button class="button button-info edit" data-toggle="modal" data-target="#" style="margin:3px">编辑</button>' +

                    '<button class="button button-primary payment_button online" id="online" style="margin:3px">上架</button>' +
                    '<button class="button button-warning delete"  style="margin:3px">删除</button>'
            }

        }
        }
    ];

    //大区军团二级联动
    BUI.Form.Group.Select.addType('type1', {
        proxy: {//加载数据的配置项
            // url: 'http://10.76.1.222:8080/erp_service/class_type_region_legion?callback=?',
            url:SERVICE_URL +'class_type_region_legion?callback=?',
            // userid: pmAgent.userid,
            dataType: 'jsonp'  //使用jsonp
        },
    });
    new Form.Form({
        srcNode: '#searchForm'
    }).render();

    //联动
    BUI.Form.Group.Select.addType('type0', {
        proxy: {//加载数据的配置项
            // url: 'http://10.76.1.222:8080/erp_service/class_type_select?callback=?',
            url:SERVICE_URL + 'class_type_select?callback=?',
            // userid: pmAgent.userid,
            dataType: 'jsonp'  //使用jsonp
        },
    });
    new Form.Form({
        srcNode: '#searchForm'
    }).render();



    //  缓存数据
    var store = new Store({
        // url: 'http://10.76.1.222:8080/erp_service/class_type_select_admin?callback=?',
        url:SERVICE_URL +'class_type_select_admin?callback=?',
        // userid: pmAgent.userid,
        dataType: 'jsonp',
        method: 'GET',
        autoLoad: true, //自动加载数据
        params: { //配置初始请求的参数
            // userid: pmAgent.userid,
            bui_type: 'true'
        },
        //控制自动上下架
       /* proxy: {
            ajaxOptions: { //ajax的配置项，不要覆盖success,和error方法
                traditional: true,
                type: 'get',
                success: function (result) {
                    dataClass = result.rows;
                    // console.log(dataClass);
                    testData = [];
                    for (var i in dataClass) {
                        var star_time = dataClass[i].start_data;
                        //转换上架时间
                        var start = star_time.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') / 1;
                        //-------------- 待处理后面的0000
                        // console.log("上架时间" + start);
                        function compareTime(time) {
                            var date = new Date();
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();

                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            //处理当前时间
                            var currentdate = year.toString() + month + strDate;
                            var now_time = Number(currentdate);
                            // console.log("当前时间" + now_time);
                            // console.log(typeof(now_time));
                            //状态:0上架 ，1下架
                            if (start > now_time) {
                                return '上架';
                            } else {
                                return '下架';
                            }
                        }

                        var end_time = compareTime(start);
                        // console.log(end_time);
                        var a = {
                            pro_first_name: dataClass[i].pro_first_name,
                            pro_second_name: dataClass[i].pro_second_name,
                            org_region_name: dataClass[i].org_region_name,
                            org_school_name: dataClass[i].org_school_name,
                            classname: dataClass[i].classname,
                            class_code: end_time,  ///////////班型状态
                            class_price: dataClass[i].class_price,
                            class_cost: dataClass[i].class_cost,
                            class_mand: dataClass[i].class_mand,
                            plan_recruit_num: dataClass[i].plan_recruit_num,
                            plan_recruit_num_seled: dataClass[i].plan_recruit_num_seled,
                            end_data: dataClass[i].end_data,
                            operator_id: dataClass[i].operator_id,
                            class_id: dataClass[i].class_id,
                            types_code: dataClass[i].types_code
                        }
                        testData.push(a);
                    }
                     result.rows = testData;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("请求错误：" + data + "错误的原因：" + Error)
                },
            }
        },*/
        pageSize: 5
    });

    grid = new Grid.Grid({
        render: '#grid',
        forceFit: true, // 列宽按百分比自适应
        columns: columns,
        store: store,
        bbar: {
            pagingBar: true  // pagingBar:表明包含分页栏
        },
        pageSize: 3
    });
    grid.render();


    grid.on('cellclick', function (ev) {
        var record = ev.record, //点击行的记录
            field = ev.field, //点击对应列的dataIndex
            target = $(ev.domTarget); //点击的元素
        if (target.hasClass("online")) {
            if (record.status_code == '上架') {
                BUI.Message.Confirm('确定下架?', function () {
                    // store.load();
                    post_1(
                        // 'http://10.76.1.222:8080/erp_service/class_type_update_status?callback=?',
                        SERVICE_URL +'class_type_update_status?callback=?',
                        {
                        class_id: record.class_id,
                        status_code: 'CS_STOPPED_SEL'
                    });
                    function post_1(URL, PARAMS) {
                        $.ajax({
                            url: URL,
                            dataType: 'jsonp',
                            data: PARAMS,
                            jsonp: 'callback',
                            success: function (result) {
                                // result.class_code = '下架';
                                store.load();
                                // if(result.retcode==1) {
                                //     var store = new Store({
                                //         url: 'http://10.76.1.222:8080/erp_service/class_type_select_admin?callback=?',
                                //         dataType: 'jsonp',
                                //         method: 'GET',
                                //         autoLoad: true, //自动加载数据
                                //         params: { //配置初始请求的参数
                                //             userid: pmAgent.userid,
                                //             bui_type: 'true'
                                //         },
                                //             proxy: {
                                //                 ajaxOptions: { //ajax的配置项，不要覆盖success,和error方法
                                //                     traditional: true,
                                //                     type: 'post',
                                //                     success: function (result) {
                                //                         dataClass = result.rows;
                                //                         console.log(dataClass);
                                //                         testData = [];
                                //                         for (var i in dataClass) {
                                //                             var star_time = dataClass[i].start_data;
                                //                             //转换上架时间
                                //                             var start = star_time.replace(/-/g, '').replace(/:/g, '').replace(/ /g, '') / 1;
                                //                             //-------------- 待处理后面的0000
                                //                             console.log("上架时间" + start);
                                //                             // function compareTime(time) {
                                //                             //     var date = new Date();
                                //                             //     var year = date.getFullYear();
                                //                             //     var month = date.getMonth() + 1;
                                //                             //     var strDate = date.getDate();
                                //                             //
                                //                             //     if (month >= 1 && month <= 9) {
                                //                             //         month = "0" + month;
                                //                             //     }
                                //                             //     if (strDate >= 0 && strDate <= 9) {
                                //                             //         strDate = "0" + strDate;
                                //                             //     }
                                //                             //     //处理当前时间
                                //                             //     var currentdate = year.toString() + month + strDate;
                                //                             //     var now_time = Number(currentdate);
                                //                             //     console.log("当前时间" + now_time);
                                //                             //     // console.log(typeof(now_time));
                                //                             //     //状态:0上架 ，1下架
                                //                             //     if (start > now_time) {
                                //                             //         return '上架';
                                //                             //     } else {
                                //                             //         return '下架';
                                //                             //     }
                                //                             // }
                                //
                                //                             // var end_time = compareTime(start);
                                //                             // console.log(end_time);
                                //                             // var a = {
                                //                             //     pro_first_name: dataClass[i].pro_first_name,
                                //                             //     pro_second_name: dataClass[i].pro_second_name,
                                //                             //     org_region_name: dataClass[i].org_region_name,
                                //                             //     org_school_name: dataClass[i].org_school_name,
                                //                             //     classname: dataClass[i].classname,
                                //                             //     // class_code: end_time,  ///////////班型状态
                                //                             //     class_code:dataClass[i].class_code,
                                //                             //     class_price: dataClass[i].class_price,
                                //                             //     class_cost: dataClass[i].class_cost,
                                //                             //     class_mand: dataClass[i].class_mand,
                                //                             //     plan_recruit_num: dataClass[i].plan_recruit_num,
                                //                             //     plan_recruit_num_seled: dataClass[i].plan_recruit_num_seled,
                                //                             //     end_data: dataClass[i].end_data,
                                //                             //     operator_id: dataClass[i].operator_id,
                                //                             //     class_id: dataClass[i].class_id,
                                //                             //     types_code: dataClass[i].types_code
                                //                             // }
                                //                             // testData.push(a);
                                //                         }
                                //                         result.rows = testData;
                                //                     },
                                //                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                                //                         console.log("请求错误：" + data + "错误的原因：" + Error)
                                //                     },
                                //                 }
                                //             },
                                //         pageSize: 5
                                //     }),
                                //     grid = new Grid.Grid({
                                //         render: '#grid',
                                //         forceFit: true, // 列宽按百分比自适应
                                //         columns: columns,
                                //         store: store,
                                //         bbar: {
                                //             pagingBar: true  // pagingBar:表明包含分页栏
                                //         },
                                //         pageSize: 3
                                //     });
                                //
                                //     grid.render();
                                // }
                                // store.load();
                                // result.class_code = '下架'
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
                                console.log("请求错误：" + data + "错误的原因：" + Error)
                            },
                        });
                    }
                }, 'question');
            }
            else if (record.status_code == '下架') {
                BUI.Message.Confirm('确定上架?', function () {
                    post_1(
                        // 'http://10.76.1.222:8080/erp_service/class_type_update_status?callback=?',
                        SERVICE_URL +'class_type_update_status?callback=?',
                        {
                        class_id: record.class_id,
                        status_code: 'CS_ON_SALE'
                    });
                    function post_1(URL, PARAMS) {
                        $.ajax({
                            url: URL,
                            dataType: 'jsonp',
                            data: PARAMS,
                            jsonp: 'callback',
                            success: function (result) {
                                // result.class_code = '上架';
                                 store.load();
                                // console.log(result.class_code);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
                                console.log("请求错误：" + data + "错误的原因：" + Error)
                            },
                        });

                    }
                }, 'question');
            }

        }

        if(record.status_code == '下架'){
            if (target.hasClass("edit")) {
                location.href = "../kld_prod/class_amend.html?pro_id=" + encodeURI(record.pro_first_name) + "&sec_id=" + encodeURI(record.pro_second_name) + "&bx=" + encodeURI(record.classname) + "&zt=" + encodeURI(record.status_code) + "&jhrs=" + encodeURI(record.plan_recruit_num) + "&bzj=" + encodeURI(record.class_price) + "&zdj=" + encodeURI(record.class_lowest) + "&bjfc=" + encodeURI(record.class_price_standard) + "&fbfc=" + encodeURI(record.class_price_nonstandard) + "&xy=" + encodeURI(record.pdf_path) + "&class=" + encodeURI(record.class_id) + "&js=" + encodeURI(record.class_desc) + "&star=" + encodeURI(record.start_data) + "&end=" + encodeURI(record.end_data) + "";
            }

        }else if(record.status_code == '上架'){
            BUI.Message.Alert('此班型在上架状态无法修改!');
            return;
        }
        
        //删除
        if (target.hasClass("delete")) {
            if (record.status_code == '上架') {
                BUI.Message.Alert('<h3>此班型正在上架中,无法删除 !</h3>');
                return;
            }
            if (record.status_code == '下架') {
                BUI.Message.Confirm('确定删除?', function () {
                    // success: function () {

                        post_1( SERVICE_URL +'class_type_delete?callback=?', {
                            class_id: record.class_id,
                        });
                        function post_1(URL, PARAMS) {
                            $.ajax({
                                url: URL,
                                dataType: 'jsonp',
                                data: PARAMS,
                                jsonp: 'callback',
                                success: function (result) {
                                    for (var i in result) {
                                        // BUI.Message.Alert(result.retmsg);
                                        store.load();
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    BUI.Message.Alert("请求错误：" + data + "错误的原因：" + Error);
                                    console.log("请求错误：" + data + "错误的原因：" + Error)
                                },
                            });
                        }

                        this.close();
                    // }


                }, 'question');
            }

        }
    });


    //	查询.
    $(function () {
        $('#btnSearch').on("click", function () {
            var project_id = $("#pro_first_id").val();//项目
            var college_id = $('#pro_second_id').val();//院校
            var class_name = $('#class_names').val();//班型名称;
            var org_region_id = $('#part_id').val();//大区;
            var org_school_id = $('#opr_college_id').val();//军团;
            var class_code = '';  //班型状态
            if ($("#state").val() == '上架') {
                class_code = 'CS_ON_SALE';
            } else if ($("#state").val() == '下架') {
                class_code = 'CS_STOPPED_SEL';
            }
            var params_1 = { //配置初始请求的参数
                userid: pmAgent.userid,
                pro_first_id: project_id,
                pro_second_id: college_id,
                class_id: class_name,
                status_code: class_code,
                org_region_id: org_region_id,//大区
                org_school_id: org_school_id,//军团
                bui_type: 'true'
            };
            store.load(params_1);
        });

    });
    //重置
    $(function () {
        $('#btnReset').click(function () {
            $('#searchForm')[0].reset();
        });
    });

});
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


var response = '';
$(document).ready(function () {
    response = GetRequest();
    pmAgent = pmAgent.load();
    if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
        window.location = '../login.html';
        return;
    }

});
