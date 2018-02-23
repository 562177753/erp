<?php
if (($_FILES["file"]["type"] == "application/pdf")
&& ($_FILES["file"]["size"] < 20000000))
  {
  if ($_FILES["file"]["error"] > 0)
    {
	  echo '<div id="upload_name_pdf" >' ."Return Code: " . $_FILES["file"]["error"].'</div>';
    }
  else
    {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
      $date=date('Y-m-d H:i:s');
      $new_name=str_replace(".pdf","",$_FILES["file"]["name"]).strtotime($date).random(4).".pdf";
    if (file_exists("" . $new_name))
      {
      echo '<div id="upload_name_pdf">' . $_FILES["file"]["name"] . " already exists. ".'</div>';
      }
    else
      {
      $date=date('Y-m-d H:i:s');
      $new_name=str_replace(".pdf","",$_FILES["file"]["name"]).strtotime($date).random(4).".pdf";
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "" . $new_name);
      echo '<div id="upload_name_pdf">' . $new_name.'</div>';
      }
    }
  }
else
  {
  echo "Invalid file";
  echo '<div id="upload_name_pdf">' . "Invalid file".'</div>';
  }


/**
* 产生随机字符串
*
* @param int $length 输出长度
* @param string $chars 可选的 ，默认为 0123456789
* @return string 字符串
*/
function random($length, $chars = '0123456789') {
$hash = '';
$max = strlen($chars) - 1;
for($i = 0; $i < $length; $i++) {
$hash .= $chars[mt_rand(0, $max)];
}
return $hash;
}
?>
