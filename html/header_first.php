<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foremost Laboratories</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link href="css/media.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>


    <script>


        $(document).ready(function(){
            //alert(8);
            if (window.location.hash == "#myDiv") {
                $('html, body').animate({
                    scrollTop: $("#myDiv").offset().top
                }, 1000);
            }
        });
    </script>




</head>
<body>
<?php
include('db.php');
?>

<div class="container-fluid top_menublock top_menublock2">
    <div class="container">



        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 logodiv">

            <a href="index.php"><img src="images/logo.png" alt="#"></a>

        </div>

        <div class="nav2"><a href="javascript void(0)">We test for</a></div>

        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 menublock_wrapper">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <span class="responsivemenu">MENU</span>

                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li style="background: none"><a href="index.php"  > Home</a></li>
                            <li style="background: url(../images/new_menu2.jpg) no-repeat right center)" class="nav1"><a href="javascript void(0)">We test for</a></li>



                            <li> <a href="javascript:void(0)" > Quantitative Urine Analysis (QUA)</a></li>
                            <li> <a href="javascript:void(0)" > Substance Monitoring</a></li>
                            <li> <a href="javascript:void(0)" > The Pharmacogenetic Test </a></li>
                            <li> <a href="javascript:void(0)">  Essential Wellness Blood Test Panel </a></li>
                           <!-- <li> <a href="javascript:void(0)" >   Allergen Immunotherapy    </a></li>-->
                            <li> <a href="allergy_finger_prick_test.php" > Allergy Finger Prick Test</a></li>
                            <li><a href="index.php#myDiv" class="active"> Get Hired</a></li>

                        </ul>
                    </div>
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
            </nav>
        </div>
    </div>
</div>