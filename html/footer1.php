
<div class="container-fluid footer_block1">

    <div class="container">
        <div class="footer_block1_left">Subscribe to Our weekly newsletter</div>
        <div class="footer_block1_right">
            <input type="text"  placeholder="Enter Valid Email Address" class="footer_block1input">

            <input type="submit" value="Submit" class="footer_block1btn">
            <div class="clearfix"></div>
        </div>

        <div class="clearfix"></div>


    </div>

</div>
<?php
if(!isset($_SESSION['is_login'])){?>

    <div class="container-fluid footer_block2 footer_block_part2">
        <div class="container">
            <div class="footer_block2_con1"> <a href="index.php"><img src="images/logo.png" alt="#"></a></div>
            <div class="footer_block2_con2">
                <ul>
                    <li class="nav1"><a href="javascript:void(0)">We test for</a></li>

                    <li> <a href="quantitative_urine_analysis.php" > Quantitative Urine Analysis (QUA)</a></li>
                    <li> <a href="substance_monitoring.php" > Substance Monitoring</a></li>
                    <li> <a href="the_pharmacogenetic.php" > The Pharmacogenetic Test </a></li>
                    <li> <a href="essential_wellness.php">  Essential Wellness Blood Test Panel </a></li>
                    <!--<li> <a href="allergen_Immunotherapy.php" >   Allergen Immunotherapy    </a></li>-->
                    <li> <a href="allergy_finger_prick_test.php" > Allergy Finger Prick Test</a></li>
                    <li> <a href="login.php" >Login</a></li>
                </ul>

                <div class="clearfix"></div>
                <div class="footer_block2_con3"> Copyright &copy; 2017 Foremost Laboratories. All rights reserved.</div>
                <div class="clearfix"></div>
            </div>

        </div>
    </div>
<?php } else {
    ?>
<div class="container-fluid footer_block2">
    <div class="container">
        <div class="footer_block2_con1"> <a href="index.php"><img src="images/logo.png" alt="#"></a></div>
        <div class="footer_block2_con2">
            <ul>
                <li><a href="index.php" > Home </a></li>
                <li><a href="index.php#myDiv"> Get Hired</a></li>
                <li> <a href="quantitative_urine_analysis.php" > Quantitative Urine Analysis (QUA)</a></li>
                <li> <a href="substance_monitoring.php" > Substance Monitoring</a></li>
                <li> <a href="the_pharmacogenetic.php" > The Pharmacogenetic Test </a></li>
                <li> <a href="essential_wellness.php">  Essential Wellness Blood Test Panel </a></li>
              <!--  <li> <a href="allergen_Immunotherapy.php" >   Allergen Immunotherapy    </a></li>-->
                <li> <a href="allergy_finger_prick_test.php" > Allergy Finger Prick Test</a></li>
                <li> <a href="login.php" >Login</a></li>
            </ul>
        </div>
        <div class="footer_block2_con3"> Copyright &copy; 2017 Foremost Laboratories. All rights reserved.</div>
        <div class="clearfix"></div>
    </div>
</div>
<?php } ?>