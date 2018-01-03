<?php
/**
 * Created by PhpStorm.
 * User: samsuj
 * Date: 11/17/2017
 * Time: 1:58 PM
 */

$servername = "localhost";
$username = "influxiq_foremos";
$password = "P@ss0987";
$dbname='influxiq_foremost_laborotaries';

$con=mysql_connect($servername,$username,$password);
//print_r($con);
$dbsel=mysql_select_db($dbname,$con);