<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foremost Laboratories</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/login.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>






</head>
<body>


<div class="login_body">

    <img src="images/logo.png" alt="#" class="loginlogo">


    <div class="login_con">
        <h2>login your account</h2>
        <span class="error"></span>
        <div class="form-group userid">
            <input type="text" name="username" id="username" class="form-control " placeholder="Username" >
        </div>

        <div class="form-group password">
            <input name="password" id="password" type="password" class="form-control " placeholder="Password" >
        </div>

         <input type="button" onclick="logininfocheck()" class="login_btn" value="Login" >




      <!--  <a href="javascript void(0)" class="forgotlink">forgot your password</a>-->


    </div>



</div>



</body>

</html>

<script>
    function logininfocheck(){
        username=$('#username').val();
        password=$('#password').val();
        $.post("getlogincheck.php",
            {'username':username,'password':password},
            function(res){
              if(res==0){
                  $('.error').html('Invalid username/password');
                  $('#username').focus();

              }
              else{
                  window.location.href='index.php';
              }
            });
    }
</script>