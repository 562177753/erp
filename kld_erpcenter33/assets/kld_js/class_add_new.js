/**
 * Created by admin on 2017/11/14/0014.
 */
BUI.use(['common/search', 'common/page', 'bui/data', 'bui/overlay', 'bui/grid', 'bui/form', 'bui/select', 'bui/calendar', 'bui/uploader','bui/tooltip'], function (Search, Page, Data, Overlay, Grid, Form, Select, Calendar, Uploader,Tooltip) {
    var datepicker = new Calendar.DatePicker({
        trigger: '#class_start_time',
        autoRender: true
    });
    var datepicker1 = new Calendar.DatePicker({
        trigger: '#class_end_time',
        autoRender: true
    });
    //二级联动
    BUI.Form.Group.Select.addType('type0', {
        proxy: {//加载数据的配置项
            // url: 'http://10.76.1.222:8080/erp_service/class_type_select_yuanban?callback=?',
            url:SERVICE_URL + 'class_type_select_yuanban?callback=?',
            userid: pmAgent.userid,
            dataType: 'jsonp'  //使用jsonp
        },
    });
    new Form.Form({
        srcNode: '#Form'
    }).render();


    //大区军团二级联动
    BUI.Form.Group.Select.addType('type1', {
        proxy: {//加载数据的配置项
            // url: 'http://10.76.1.222:8080/erp_service/class_type_region_legion?callback=?',
            url:SERVICE_URL + 'class_type_region_legion?callback=?',
            userid: pmAgent.userid,
            dataType: 'jsonp'  //使用jsonp
        },
    });
    new Form.Form({
        srcNode: '#Form'
    }).render();

    //监听input
    // var fileList = '';
    // $('#protocol').on('change', function () {
    //     fileList = this.files[0].name;//上传协议
    //      console.log(fileList);
    // });
    var fileInner='';
    $('#t3').on('click',function () {
        setTimeout(function () {
             fileInner = $("#iframe_display")[0].contentWindow.document.getElementById("upload_name_pdf").innerHTML;
            if(fileInner!=='Invalid file'){
                BUI.Message.Alert('上传成功');
            }else{
                BUI.Message.Alert('上传失败');
            }

        },"700");
    })

//获取输入值
    $('#submit').click(function () {
        var project_id = $('#project_id').val();
        var college_id = $('#college_id').val();
        var plan_recruit_num = $('#plan_recruit_num').val();
        var org_region_id = $('#part_id').val();
        var org_school_id = $('#opr_college_id').val();
        var class_name = $('#class_name').val();
        var class_price = $('#class_price').val();
        var class_cost = $('#class_cost').val();
        var class_price_standard = $('#class_price_standard').val(); //标准价格分成
        var class_price_nonstandard = $('#class_price_nonstandard').val();//非标准价格分成
        var class_start_time = $('#class_start_time').val();
        var class_end_time = $('#class_end_time').val();//班型售卖结束时间
        // var pdf= $("#iframe_display")[0].contentWindow.document.getElementById("upload_name_pdf").innerHTML;  //协议名称
        var pdf=fileInner;
        console.log(pdf);
        var class_detail = $('#school_detail').val();//班型描述

        if(project_id==''|| college_id=='' || plan_recruit_num=='' || org_region_id=='' || org_school_id=='' ||class_name=='' || class_price=='' || class_cost=='' || class_price_standard=='' ||class_price_nonstandard=='' || class_start_time=='' || class_end_time=='' ||pdf=='Invalid file' ||pdf==''){
            BUI.Message.Alert('请填写必填项');

        }else if(project_id!=''&& college_id!='' && plan_recruit_num!='' && org_region_id!='' && org_school_id!='' &&class_name!='' && class_price!='' && class_cost!='' && class_price_standard!='' &&class_price_nonstandard!='' && class_start_time!='' && class_end_time!='' && pdf!='Invalid file' && pdf!=''){
            post_1(
                // 'http://10.76.1.222:8080/erp_service/class_type_add?callback=?',
                SERVICE_URL + 'class_type_add?callback=?',
                {
                    userid: pmAgent.userid,
                    pro_first_id: project_id,
                    pro_second_id: college_id,
                    org_region_id: org_region_id,//大区
                    org_school_id: org_school_id,//军团
                    plan_recruit_num: plan_recruit_num,
                    class_name: class_name,
                    class_price: class_price,
                    class_lowest: class_cost,//最低价格
                    // class_mand: class_selling_price,//售卖价格
                    class_price_standard: class_price_standard,
                    class_price_nonstandard: class_price_nonstandard,
                    // class_code: class_code,//班型状态
                    start_data: class_start_time,
                    end_data: class_end_time,
                    class_desc: class_detail,//班型描述
                    pdf_path: pdf,//上传文件

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
                // for (var i in result) {
                //       var result_ = result[i].retcode;
                //       if (result_ == 1) {
                //           store.load();
                //           BUI.Message.Alert(result[i].retmsg);
                //           var result_1 = $("#btn_ck_1").attr("data-dismiss", "modal");
                //            $("#view_student_information_modal .modal-body input").val("");
                //       } else {
                //           BUI.Message.Alert(result[i].retmsg);
                //           $("#btn_ck_1").removeAttr("data-dismiss");
                //       }
                //   }
                if(result[0].retcode==1){
                    BUI.Message.Alert(result[0].retmsg,function () {
                        window.location.href="../kld_prod/class_type.html";
                    },'success');
                }else{
                    BUI.Message.Alert(result[0].retmsg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BUI.Message.Alert("新增失败：" + data + "错误的原因：" + Error)
            },
        });

    };

   // var t3 = new Tooltip.Tip({
   //      //trigger : '#t3', //不设置触发点
   //      align:{
   //          node : '#t3'
   //      },
   //      alignType : 'top',
   //      offset : 10,
   //      triggerEvent : 'click',
   //      autoHideType:'click',
   //      title : '上传完成',
   //      elCls : 'tips tips-success',
   //      titleTpl : '<span class="x-icon x-icon-small x-icon-error"><i class="icon icon-white icon-bell"></i></span>\
   //      <div class="tips-content">{title}</div>'
   //  });
   //  t3.render();
   //
   //  $('#t3').on('click',function(){
   //      t3.show();
   //  });


});

$(document).ready(function () {
    pmAgent = pmAgent.load();
    if ((!pmAgent) || (pmAgent.is_login != 'Y')) {
        window.location = '../login.html';
        return;
    }

});
