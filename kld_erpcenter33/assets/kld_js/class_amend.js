/**
 * Created by admin on 2017/11/26/0016.
 */

//获取url
function GetRequest() {
//	var url = location.search; //获取url中"?"符后的字串
    var url = decodeURI(location.search);
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
var response;
$(document).ready(function () {
//读取本地session储存
    pmAgent = pmAgent.load();
    if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
        window.location = '../login.html';
        return;
    }
    response = GetRequest();
    var class_index = response.class; //获取修改行
    $("#project").val(response.pro_id);//项目
    if ($("#project").val() == "undefined") $("#project").val("");
    $("#school").val(response.sec_id); //院校
    if ($("#school").val() == "undefined") $("#school").val("");
    $("#class_name").val(response.bx); //班型名称
    if ($("#class_name").val() == "undefined") $("#classname").val("");
    $("#status").val(response.zt); //班型状态
    if ($("#status").val() == "undefined") $("#status").val("");
    $("#plan_num").val(response.jhrs);  //计划招生
    if ($("#plan_num").val() == "undefined") $("#plan_num").val("");
    $("#class_price").val(response.bzj);  //标准价格
    if ($("#class_price").val() == "undefined") $("#class_price").val("");
    $("#class_cost").val(response.zdj);//最低价格
    if ($("#class_cost").val() == "undefined") $("#class_cost").val("");
    $("#class_selling_price").val(response.sell);//售卖价格
    if ($("#class_selling_price").val() == "undefined") $("#class_selling_price").val("");
    $("#price_standard").val(response.bjfc);//标准价格分成
    if ($("#price_standard").val() == "undefined") $("#price_standard").val("");
    $("#price_nonstandard").val(response.fbfc);//非标准价格分成
    if ($("#price_nonstandard").val() == "undefined") $("#price_nonstandard").val("");
    $("#class_start_time").val(response.star);//班型开始时间
    if ($("#class_start_time").val() == "undefined") $("#class_start_time").val("");
    $("#class_end_time").val(response.end);//班型结束时间
    if ($("#class_end_time").val() == "undefined") $("#class_end_time").val("");
    $("#school_detail").val(response.js);//班型介绍
    if ($("#school_detail").val() == "undefined") $("#school_detail").val("");
    // $("#protocol").val(response.xy);//班型协议
    // if ($("#protocol").val() == "undefined") $("#protocol").val("");
    //读取本地session储存

    //监听input
    // var fileList = '';
    // $('#protocol').on('change', function () {
    //     fileList = this.files[0].name;//上传协议
        // console.log(fileList);
    // });
    // 展示协议
    $('#look').on('click',function () {
        window.location.href = "../build/generic/web/viewer_1.html?pdf_path=" + encodeURI(response.xy)+"";
        // window.location.href = "../build/generic/web/viewer.html";
    });
    //点击上传提示框
    var fileInner='';
    $('#t3').on('click',function () {
        setTimeout(function () {
             fileInner = $("#iframe_display")[0].contentWindow.document.getElementById("upload_name_pdf").innerHTML;
            if(fileInner!=='Invalid file'){
                BUI.Message.Alert('上传成功');
            }else{
                BUI.Message.Alert('上传失败');
            }

        },"500");
    })
    $('#submit').click(function () {
        var project_id = $('#project').val();//项目
        var college_id = $('#school').val();//院校
        var class_name = $('#class_name').val();//班型
        var status_code = '';  //班型状态
        if ($("#status").val() == '上架') {
            status_code = 'CS_ON_SALE';
        } else if ($("#status").val() == '下架') {
            status_code = 'CS_STOPPED_SEL';
        }
        // console.log(class_status);
        var plan_num = $('#plan_num').val();//计划招生人数
        var class_price = $('#class_price').val();//标准价格
        var class_price_cost = $('#class_cost').val(); //最低价格
        // var class_selling_price=$('#class_selling_price').val();//售卖价格
        var price_nonstandard = $('#price_nonstandard').val();//非标准价格分成
        var class_price_standard = $('#price_standard').val();//标准价格分成
        var class_start_time = $('#class_start_time').val();
        var class_end_time = $('#class_end_time').val();//班型售卖结束时间
        // var pdf= $("#iframe_display")[0].contentWindow.document.getElementById("upload_name_pdf").innerHTML;
        var pdf=fileInner;
        console.log(pdf);
        if(pdf==''){
            pdf=response.xy
        }
        console.log(pdf);
        // else if(pdf!==''){
        //     pdf= $("#iframe_display")[0].contentWindow.document.getElementById("upload_name_pdf").innerHTML;
        // }

        var school_detail = $('#school_detail').val();//班型介绍

        if(project_id=='' || college_id=='' || class_name=='' || plan_num=='' || class_price=='' || class_price_cost=='' || price_nonstandard=='' || class_price_standard=='' || class_start_time=='' || class_end_time==''){
            BUI.Message.Alert('请填写必填项');
        }else if(project_id!='' && college_id!='' && class_name!='' && plan_num!='' && class_price!='' && class_price_cost!='' && price_nonstandard!='' && class_price_standard!='' && class_start_time!='' && class_end_time!=''){
            post_1(
                // 'http://10.76.1.222:8080/erp_service/class_type_update?callback=?',
                SERVICE_URL+'class_type_update?callback=?',
                {
                    userid: pmAgent.userid,
                    pro_first_id: project_id,//项目
                    pro_second_id: college_id,//院校
                    class_id:class_index,
                    class_name: class_name,//班型
                    status_code:status_code,//班型状态
                    plan_recruit_num: plan_num,//计划招生人数
                    class_price: class_price,//标准价格
                    class_lowest: class_price_cost,//最低价格
                    // class_mand: class_selling_price,
                    class_price_standard: class_price_standard,//非标准价格分成
                    class_price_nonstandard: price_nonstandard,//标准价格分成
                    start_data:class_start_time,
                    end_data: class_end_time,
                    pdf_path:pdf,//上传文件
                    class_desc:school_detail//班型介绍
                }
            )
        }

    });
    function post_1(URL, PARAMS) {
        $.ajax({
            type: "post",
            url: URL,
            dataType: 'jsonp',
            data: PARAMS,
            jsonp: 'callback',
            success: function (result) {
                if(result.retcode==1) {
                    BUI.Message.Alert(result.retmsg,function () {
                        window.location.href="../kld_prod/class_type.html";
                    },'success');
                }else {
                    BUI.Message.Alert(result.retmsg);
                }
                // BUI.Message.Alert('保存'+ result.retmsg);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BUI.Message.Alert("新增失败：" + data + "错误的原因：" + Error)
            },
        });

    };

});


BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar', 'bui/uploader','bui/tooltip'], function (Search, Page, Data, Overlay, Grid, Form, Select, Calendar, Uploader,Tooltip) {
    //定义store数据
    // var Store = Data.Store;
    // var Grid = Grid;
    var datepicker = new Calendar.DatePicker({
        trigger:'#class_start_time',
        autoRender : true
    });
    var datepicker1 = new Calendar.DatePicker({
        trigger:'#class_end_time',
        autoRender : true
    });


});



