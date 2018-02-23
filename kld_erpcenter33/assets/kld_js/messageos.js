
 function check(messageForm){//添加数据库记录
    var photo=/^1\d{10}$/;  
	var student_name=$("#"+messageForm).find("input[name='student_name']").val();
	var student_phone=$("#"+messageForm).find("input[name='student_phone']").val();
	var student_diqu=$("#"+messageForm).find("input[name='student_diqu']").val();
	var student_qq=$("#"+messageForm).find("input[name='student_qq']").val();
	var student_email=$("#"+messageForm).find("input[name='student_email']").val();
    if (student_name==""){
		swal("请输入您的姓名!", " ", "success");
    //  alert("请输入您所在城市!");
	  return false;
    }
    if (student_phone==""){
		swal("请输入您的手机号码!", " ", "success");
     // alert("请输入您所在城市!");
	  return false;
    }
    if (photo.test(student_phone)==false){
		swal("请输入您的手机号码!", " ", "success");
     // alert("请输入您所在城市!");
	  return false;
    }
    if (isNaN(student_phone)){
		swal("输入的电话号码非数字!", " ", "success");
      //alert("输入的电话号码非数字!");
	  return false;
    }
    var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
    if (!reg.test(student_phone)) {
        swal("手机号码有误!", " ", "success");
	//	alert("手机号码有误");
		return false;
    }
    if (student_diqu==""){
     swal("请输入您所在城市!", " ", "success");
	 // alert("请输入您所在城市!");
	  return false;
    }
    Allot(student_name,student_phone,student_diqu,student_qq,student_email,'yidiwang')
	swal("恭喜您，信息已提交成功！", " ", "success");
   // alert("恭喜您，信息已提交成功！");
    //window.location.href="http://bj.huluo.com/gc/zkwap1/index2.html";
  }
  function Allot(student_name,student_phone,student_diqu,student_qq,student_email,student_fenpei){
    var getGroups = post(
        'http://36.110.107.219:37651/input_page/input_add.jsp',
        "student_name="+student_name+"&student_phone="+student_phone+"&student_diqu="+student_diqu+"&student_qq="+student_qq+"&student_email="+student_email+"&student_fenpei="+student_fenpei    
    );
  }
// 执行提交
  function post(URL, PARAMS) {
    $.ajax({  
      url:URL,
      dataType:'jsonp',  
          data:PARAMS,  
          jsonp:'callback', 
          success:function(result) {  
            return result;
          },  
          error: function(XMLHttpRequest, textStatus, errorThrown){
          return textStatus;
          },
          timeout:3000  
      });  
  }