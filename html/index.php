<?php
@session_start();
?>
<?php
if(!isset($_SESSION['is_login'])) {
    include('header_first.php');
}else{
    include('header.php');

}
?>

<body>

 <!-- /top menu -->

 <?php
 function generateRandomString($length = 10) {
     $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     $charactersLength = strlen($characters);
     $randomString = '';
     for ($i = 0; $i < $length; $i++) {
         $randomString .= $characters[rand(0, $charactersLength - 1)];
     }
     return $randomString;
 }
 $err='';
 if(isset($_POST) && count($_POST)>0 && $_POST['submit']=='submit'){

     $sql=mysql_query("select * from user_info where personal_email='".$_POST['personal_email']."'");
      if(mysql_num_rows($sql)>0){
          $err= 'Please enter another email. this email is already exists';
      }
      else {
          $password=generateRandomString();
          $addtime = date('Y-m-d');
          $sql = "INSERT INTO `user_info` (`first_name`, `last_name`, `personal_email`,`password`, `secondary_email`, `cellphone`, `address`, `city`, `state`, `postal_code`, `best_time`, `healthcare_industry_year`, `carrer_change`, `doctor_count`, `get_started`, `additional_info`, `background_info`, `greatest_attribute`, `add_time`) VALUES ('" . $_POST['first_name'] . "', '" . $_POST['last_name'] . "', '" . $_POST['personal_email'] . "','".$password."','" . $_POST['secondary_email'] . "', '" . $_POST['cellphone'] . "', '" . $_POST['address'] . "', '" . $_POST['city'] . "', '" . $_POST['state'] . "', '" . $_POST['postal_code'] . "', '" . $_POST['best_time'] . "', '" . $_POST['healthcare_industry_year'] . "', '" . $_POST['carrer_change'] . "', '" . $_POST['doctor_count'] . "', '" . $_POST['get_started'] . "', '" . $_POST['additional_info'] . "', '" . $_POST['background_info'] . "', '" . $_POST['greatest_attribute'] . "', '" . $addtime . "')";
          mysql_query($sql);

          $to = 'shawnhull@foremostlabratories.com,betoparedes@foremostlaboratories.com';
          //$to = 'Shawn@bluecoastsavings.com,beto@betoparedes.com,drbennymorris@yahoo.com';
          // $to = 'hiifte@gmail.com,iftekarkta@gmail.com';
          $subject = 'New Form Submission from website http://influxiq.com/foremost-laborotaries/ By '.ucwords($_POST['first_name'].' '.$_POST['last_name']);
          $from = $_POST['personal_email'];

// To send HTML mail, the Content-type header must be set
          $headers = 'MIME-Version: 1.0' . "\r\n";
          $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Create email headers
          $headers .= 'From: ' . $from . "\r\n" .
              'Reply-To: ' . $from . "\r\n" .
              'X-Mailer: PHP/' . phpversion();

// Compose a simple HTML email message
          $message = '<html><body><div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;">';
          $message .= '<img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 0 auto; margin-top: 20px;">';
          $message .= '<h2 style="display: block; text-align: center; padding: 15px 0; text-transform: uppercase; font-size: 22px; color: #1faeed; margin: 0px;">User Information</h2>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; border-top: solid 1px #ddd; color: #1faeed;">Name : <span style="color: #000;"> ' . $_POST["first_name"] . ' ' . $_POST["last_name"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Personal Email :  <span style="color: #000;">' . $_POST["personal_email"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Secondary Email : <span style="color: #000;"> ' . $_POST["secondary_email"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Cell Phone : <span style="color: #000;"> ' . $_POST["cellphone"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;" >Address : <span style="color: #000;"> ' . $_POST["address"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">City : <span style="color: #000;"> ' . $_POST["city"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">State : <span style="color: #000;"> ' . $_POST["state"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Postal Code : <span style="color: #000;"> ' . $_POST["postal_code"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Best Time To Reach Me : <span style="color: #000;"> ' . $_POST["best_time"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Heathcare Industry Experience   <span style="color: #000;">: ' . $_POST["healthcare_industry_year"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Reason For Career Change/sideline Income  :  <span style="color: #000;">' . $_POST["carrer_change"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Doctor/Clinics Relation :  <span style="color: #000;">' . $_POST["doctor_count"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Ready To Started : <span style="color: #000;"> ' . $_POST["get_started"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed; background: #ddd;">Additional Info : <span style="color: #000;"> ' . $_POST["additional_info"] . '</span></div>';
          $message .= '<div style="width:auto; padding: 10px; border-bottom: solid 1px #ddd; color: #1faeed;">Background In Health Industry : <span style="color: #000;"> ' . $_POST["background_info"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px;  color: #1faeed; background: #ddd;" >Greatest Attributes : <span style="color: #000;"> ' . $_POST["greatest_attribute"] . '</span></div>';
          $message .= '<div style="width: auto; padding: 10px;  color: #1faeed;" ><h2 style="text-align: center; font-size: 22px; color: #1faeed; display: block; width: 100%; padding: 0px; margin: 0px;">Login Info</h2></div>';
          $message .= '<div style="width: auto; padding: 10px;  color: #1faeed; background: #ddd;" >Username : <span style="color: #000;"> '.$_POST['personal_email'].'</span></div>';
          $message .= '<div style="width: auto; padding: 10px;  color: #1faeed;" >Password : <span style="color: #000;">'.$password.'</span></div>';
          $message .= '</div></body></html>';
          mail($to, $subject, $message, $headers);



          //$from1 = 'Shawn@bluecoastsavings.com,beto@betoparedes.com,drbennymorris@yahoo.com,iftekarkta@gmail.com';
           $from1 = 'Admin';
          $subject1 = 'Thank you for submitting the questionnaire to Foremost Labs';
          $to1 = $_POST['personal_email'];

// To send HTML mail, the Content-type header must be set
          $headers1 = 'MIME-Version: 1.0' . "\r\n";
          $headers1 .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Create email headers
          $headers1 .= 'From: ' . $from1 . "\r\n" .
              //'Reply-To: ' . $from1 . "\r\n" .
              'X-Mailer: PHP/' . phpversion();
          $message1='<div style="width: 600px; margin: 0 auto; padding: 10px; border-radius: 10px; border: solid 5px #1faeed; font-family: Arial; font-size: 14px; color: #333;"><img src="http://influxiq.com/foremost-laborotaries/images/logo.png" style="display: block; margin: 20px auto; "><div style="padding:10px; font-size: 14px; color: #333; line-height:22px;"><span style="font-size:16px; color:#29b0de;">Dear <span style="color:#333;">'.ucwords($_POST['first_name'].' '.$_POST['last_name']).',</span></span><br/><br/>Please feel free to return to our website and log in to learn the clinical details of the Lab sales opportunities we offer.<br/>Once you have logged in the top navigation will activate for you to review the details of the different lab work opportunities we have for your physicians.<br/><br/><span style="font-size:14px; color:#29b0de;">User <span style="color:#333;">'.$_POST['personal_email'].',</span></span><br/><span style="font-size:14px; color:#29b0de;">Password <span style="color:#333;">'.$password.',</span></span><br/><br/>Login: http://www.foremostlaboratories.com/login.php <br/><br/>We will get back in touch with you very soon!<br/><br/>Thanks</div></div>';

          mail($to1, $subject1, $message1, $headers1);

          $_SESSION['is_login'] = true;
          $_POST = array();
         // if (count($_POST) > 0) {
              ?>
              <script>
                  $(function () {
                      $('#formsubmitModal').modal('show');
                      setTimeout(function () {
                          $('#formsubmitModal').modal('hide');
                          //window.location.reload();
                      }, 4000)
                  })

              </script>
              <?php
        //  }
      }
 }






?>









<div class="home_banner_wrapper">

    <h2>Earn north of 6 figures from just one qualified physician practice</h2>


    <img src="images/home_banner_img2.jpg" alt="#"  class="home_banner_img2">

    <div class="home_banner_con">



        <img src="images/home_bammer_arrow_img.png" alt="#"  class="home_bammer_arrow_img">


        <h3>We are <span>looking</span> for</h3>

        <h4>Laboratory Sales Representative<br/>
            Foremost Labs - United States<br/>
            Full-time, Part-time, Commission
        </h4>

        <div class="homebannerdevider"></div>


     <?php if(!isset($_SESSION['is_login'])) {?>   <a href="index.php#myDiv" class="homebannerlink"> Fill out our questionnaire and get hired</a> <?php } ?>

    </div>


</div>





<div class="container-fluid home_block1">
 
 <h2>THE OPPORTUNITY</h2>
 <h3>Earn <span>$4,000</span> to <span>$10,000</span> a month from just one qualified practice!</h3>


<div class="home_qualify_btn"><a href="index.php#myDiv" > See if you Qualify</a></div>


<div class="home_block1_text_div">

<div class="home_block1_text">

<ul>
  <li>We are currently expanding our team of experienced healthcare sales professionals who will represent the future of healthcare. We have a unique 
   business model that focuses on the trends and needs for complex laboratory testing services of today's providers. </li>

  <li>Our position is perfectly suited to work alongside any other non-conflicting healthcare position you currently have. You can set your own hours 
  and work remotely, with the possibility for extraordinary income.</li>

  <li>We are a four year old rapidly growing laboratory services company offering cutting edge high complexity laboratory services. We in addition 
   offer the latest technology in allergy testing, a blood spot test verses blood draw and trans dermal immunotherapy treatment.</li>

  <li>Foremost Laboratories is committed to providing the highest level of methodologies and accuracy for toxicology confirmation testing and 
   PGX – complemented with unparalleled customer service and expertise.</li>

  <li>Our innovative and value-focused approach enables us to provide gold-standard results to a vast spectrum of physicians requiring substance 
   abuse confirmation tests and PGX.</li>

  <li>Our physician demographic encompasses pain management, psychiatry, OBGYN, primary care, addiction clinics, and more. Foremost 
   Laboratories is a CLIA certified and COLA accredited, high complexity reference laboratory.</li>

  <!--<li>Additionally, Foremost enables scaled services for governmental entities and regulatory bodies.</li>

  <li>Benefits to the doctor include enhanced analytical information to help improve patient outcomes and documentation related to 
   MIPPS/MACRA comliance.</li>-->

</ul>
</div>
 <img src="images/home_img1.jpg" alt="#" class="home_img1">

<div class="clearfix"></div>

</div>
 
 
 
 </div>






 <div class="home_middle_block">



     <img src="images/home_page_middle_banner_mobile.jpg" alt="#" class="home_middle_block_mobile">

     <div class="home_middle_block_wrapper">

         <h2>IF YOU KNOW THE PHYSICIANS OR HAVE RELATIONSHIPS WITH THE OFFICE STAFF MEMBERS IN THE FOLLOWING TAXONOMIES WE HAVE THE PERFECT INCOME VERTICAL.
             WITH THESE RELATIONSHIPS THIS IS BY FAR THE EASIEST SALE IN THE INDUSTRY. </h2>

            <ul>

                  <li><label>OBGYN</label></li>
                  <li><label>General Practice</label></li>
                  <li><label>Family Medicine</label></li>
                  <li><label>Primary Care</label></li>


                <li><label>Cardiology</label></li>
                <li><label>Neurology</label></li>
                <li><label>Internal Medicine</label></li>
                <li><label>Endocrinology</label></li>


                <li><label>DO
                    <span>(Doctor of Osteopathy)</span></label>

                </li>

                <li><label>Pain Management
                <span>(Integrated Practices)</span></label>
                </li>

                <li><label>Integrated<br/>
                    Specialty Groups</label></li>
                <li><label>You can work part
                    time or full time.</label>
                </li>




                <div class="clearfix"></div>
            </ul>
         <div class="clearfix"></div>

     </div>

 </div>



 <?php if(!isset($_SESSION['is_login'])){
//echo 11;
     ?>

 <div class="home_form_block" id="myDiv">
     <h1>Foremost Laboratories Qualifying Questionnaire</h1>

     <h3>To be considered for employment with Foremost Laboratories, please fill out this interview questionnaire. Once received, your hiring coordinator will be in<br/>
         touch to schedule a telephone interview. All information will be private and used only in relation to this application.<br/>
         It will not be provided to any 3rd parties.</h3>


     <form method="post" action="" onsubmit="return validationform()">


         <div class="form_div1">
             <span class="error"><?php echo @$err?></span>
             <div class="form-group">
                 <label>First Name <span>*</span></label>
                 <input type="text" name="first_name" id="first_name"  class="form-control" value="<?php echo @$_POST['first_name']?>">

                  <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     Last Name <span>*</span></label>
                 <input type="text" name="last_name" id="last_name" class="form-control" value="<?php echo @$_POST['last_name']?>">

                 <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     Personal Email<span>*</span></label>
                 <input type="text" name="personal_email" id="personal_email" class="form-control" value="<?php echo @$_POST['personal_email']?>">

                 <div class="clearfix"></div>
             </div>


             <div class="form-group">
                 <label>
                     Secondary Email
                     </label>
                 <input type="text" name="secondary_email" id="secondary_email" class="form-control" value="<?php echo @$_POST['secondary_email']?>">

                 <div class="clearfix"></div>
             </div>


             <div class="form-group">
                 <label>
                     Cell Phone <span>*</span></label>
                 <input type="text" name="cellphone" id="cellphone" class="form-control" value="<?php echo @$_POST['cellphone']?>">

                 <div class="clearfix"></div>
             </div>


             <div class="form-group">
                 <label>
                   Street Address <span>*</span></label>
                 <input type="text" name="address" id="address" class="form-control" value="<?php echo @$_POST['address']?>">

                 <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     City <span>*</span></label>
                 <input type="text" name="city" id="city" class="form-control" value="<?php echo @$_POST['city']?>">

                 <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     State  <span>*</span></label>
                 <input type="text" name="state" id="state" class="form-control" value="<?php echo @$_POST['state']?>">

                 <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     Postal Code  <span>*</span></label>
                 <input type="text" name="postal_code" id="postal_code" class="form-control" value="<?php echo @$_POST['postal_code']?>">

                 <div class="clearfix"></div>
             </div>

             <div class="form-group">
                 <label>
                     Best Time To Reach You </label>
                 <input type="text" name="best_time" id="best_time" class="form-control" value="<?php echo @$_POST['best_time']?>">

                 <div class="clearfix"></div>
             </div>


             <div class="clearfix"></div>


         </div>
         <div class="form_div2">

             <h2>How long have you worked in the healthcare industry? <span>*</span></h2>

             <div class="form-group">
                 <input type="radio" <?php if(@$_POST['healthcare_industry_year']=='1 to 2 Years'){?> checked="checked" <?php } ?> name="healthcare_industry_year" value="1 to 2 Years">
                 <label>1 to 2 Years </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="healthcare_industry_year" <?php if(@$_POST['healthcare_industry_year']=='2 to 4 Years'){?> checked="checked" <?php } ?> name="healthcare_industry_year" value="2 to 4 Years">
                 <label> 2 to 4 Years  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="healthcare_industry_year" <?php if(@$_POST['healthcare_industry_year']=='4 to 10 Years'){?> checked="checked" <?php } ?> name="healthcare_industry_year" value="4 to 10 Years">
                 <label>  4 to 10 Years  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="healthcare_industry_year" <?php if(@$_POST['healthcare_industry_year']=='Over 10 Years'){?> checked="checked" <?php } ?> name="healthcare_industry_year" value="Over 10 Years">
                 <label> Over 10 Years </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="healthcare_industry_year" <?php if(@$_POST['healthcare_industry_year']=='No healthcare industry background, but I have good contacts with physicians'){?> checked="checked" <?php } ?> name="healthcare_industry_year" value="No healthcare industry background, but I have good contacts with physicians">
                 <label> No healthcare industry background, but I have good contacts with physicians. </label>
                 <div class="clearfix"></div>
             </div>


             <div class="clearfix"></div>

             </div>

         <div class="form_div2">

             <h2>Are you looking for a career change or to create sideline income? Please explain. <span>*</span></h2>

             <textarea name="carrer_change" id="carrer_change"><?php echo @$_POST['carrer_change']?></textarea>

             <div class="clearfix"></div>

         </div>

         <div class="form_div2">

             <h2>How many doctor/clinic relationships do you have that you can visit immediately?  <span>*</span></h2>

             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='1 to 5'){?> checked="checked" <?php } ?>   value="1 to 5">
                 <label>1 to 5  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='6 to 20'){?> checked="checked" <?php } ?>  value="6 to 20">
                 <label> 6 to 20  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='20 to 50'){?> checked="checked" <?php } ?>  value="20 to 50">
                 <label> 20 to 50   </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='50 to 100'){?> checked="checked" <?php } ?>  value="50 to 100">
                 <label>50 to 100  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='100 to 500'){?> checked="checked" <?php } ?>  value="100 to 500">
                 <label>100 to 500  </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="doctor_count" <?php if(@$_POST['doctor_count']=='500 or more'){?> checked="checked" <?php } ?>  value="500 or more">
                 <label>500 or more   </label>
                 <div class="clearfix"></div>
             </div>


             <div class="clearfix"></div>

         </div>

         <div class="form_div2">

             <h2>When are you ready to get started? <span>*</span></h2>

             <div class="form-group">
                 <input type="radio" name="get_started" <?php if(@$_POST['get_started']=='Tomorrow'){?> checked="checked" <?php } ?>  value="Tomorrow">
                 <label>Tomorrow</label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="get_started" <?php if(@$_POST['get_started']=='Next Week'){?> checked="checked" <?php } ?>  value="Next Week">
                 <label>Next Week   </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group" >
                 <input type="radio" name="get_started" <?php if(@$_POST['get_started']=='This Week'){?> checked="checked" <?php } ?>  value="This Week">
                 <label>This Week </label>
                 <div class="clearfix"></div>
             </div>
             <div class="form-group">
                 <input type="radio" name="get_started" <?php if(@$_POST['get_started']=='This Month'){?> checked="checked" <?php } ?>  value="This Month">
                 <label>This Month   </label>
                 <div class="clearfix"></div>
             </div>



             <div class="clearfix"></div>

         </div>

         <div class="form_div2">

             <h2>share any additional info that will help us in making a decision to move forward and hire you: </h2>

             <textarea name="additional_info" id="additional_info"><?php echo @$_POST['additional_info']?></textarea>

             <div class="clearfix"></div>

         </div>

         <div class="form_div2">

             <h2>Please tell us your background in the healthcare industry:  </h2>

             <textarea name="background_info" id="background_info"><?php echo @$_POST['background_info']?></textarea>

             <div class="clearfix"></div>

         </div>

         <div class="form_div2">

             <h2>Please tell us your greatest attribute as a marketer and sales person: </h2>

             <textarea name="greatest_attribute" id="greatest_attribute"><?php echo @$_POST['greatest_attribute']?></textarea>

             <div class="clearfix"></div>

         </div>


         <input type="submit" name="submit" value="submit" class="home_subbtn">

     </form>



 </div>


 <?php }

include('footer1.php');
 ?>



 <div id="formsubmitModal" class="modal fade">
     <div class="modal-dialog">
         <div class="modal-content">

             <div class="modal-body">
                 <p>Form Submitted Successfully!</p>

             </div>

         </div>
     </div>
 </div>
<script>
    function validationform(){

        first_name=$('#first_name').val();
        last_name=$('#last_name').val();
        personal_email=$('#personal_email').val();
        secondary_email=$('#secondary_email').val();
        cellphone=$('#cellphone').val();
        address=$('#address').val();
        city=$('#city').val();
        state=$('#state').val();
        postal_code=$('#postal_code').val();
        best_time=$('#best_time').val();
        healthcare_industry_year=$('input[name=healthcare_industry_year]:checked').val();
        carrer_change=$('#carrer_change').val();
        doctor_count=$('input[name=doctor_count]:checked').val();
        get_started=$('input[name=get_started]:checked').val();
        additional_info=$('#additional_info').val();
        background_info=$('#background_info').val();
        greatest_attribute=$('#greatest_attribute').val();

          if(first_name==''){
                $('.error').html('Please enter first name');
                $('#first_name').focus();
                return false;
            }
            else if(last_name==''){

              $('.error').html('Please enter last name');
              $('#last_name').focus();
              return false;
          }
          else if(personal_email==''){

              $('.error').html('Please enter personal email');
              $('#personal_email').focus();
              return false;
          }


          else if(secondary_email==''){

              $('.error').html('Please enter cellphone');
              $('#cellphone').focus();
              return false;
          }
          else if(cellphone==''){

              $('.error').html('Please enter cell phone');
              $('#cellphone').focus();
              return false;
          }
          else if(address==''){

              $('.error').html('Please enter address');
              $('#address').focus();
              return false;
          }  else if(city==''){

              $('.error').html('Please enter city');
              $('#city').focus();
              return false;
          }  else if(state==''){

              $('.error').html('Please enter state');
              $('#state').focus();
              return false;
          }  else if(postal_code==''){

              $('.error').html('Please enter postal code');
              $('#postal_code').focus();
              return false;
          } else if(best_time==''){

              $('.error').html('Please enter best time to reach you');
              $('#best_time').focus();
              return false;
          }
          else if(typeof(healthcare_industry_year)=='undefined'){

              $('.error').html('Healthcare industry field is required');
              $('#healthcare_industry_year').focus();
              return false;
          } else if(carrer_change==''){

              $('.error').html('Please enter reason of career change');
              $('#carrer_change').focus();
              return false;
          }else if(typeof(doctor_count)=='undefined'){

              $('.error').html('Doctor visit filed is required');
              $('#doctor_count').focus();
              return false;
          }else if(typeof(get_started)=='undefined'){

              $('.error').html('Get started field is required');
              $('#get_started').focus();
              return false;
          }else if(additional_info==''){
              $('.error').html('Please enter additional info');
              $('#additional_info').focus();
              return false;
          }else if(background_info==''){

              $('.error').html('Please enter background info');
              $('#background_info').focus();
              return false;
          }else if(greatest_attribute==''){
              $('.error').html('Please enter greatest attributes');
              $('#greatest_attribute').focus();
              return false;
          }
            else{
              return true;


            }

    }
</script>