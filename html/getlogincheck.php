<?php
@session_start();
    include('db.php');
if(isset($_POST['username'])){
   $username=$_POST['username'];
}if(isset($_POST['password'])){
   $password=$_POST['password'];
}
    $sql=mysql_query("select * from user_info where personal_email='".$username."' and password='".$password."'");
    $num= mysql_num_rows($sql);
if($num>0){
    $_SESSION['is_login']=true;
}
echo $num;
?>