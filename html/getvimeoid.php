<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:33 PM
 */

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');


$id = $_GET['id'];
/*echo $id;*/
//$vimeo = unserialize(file_get_contents("http://vimeo.com/api/v2/video/$id".".json"));
/*echo $small = $vimeo[0]['thumbnail_small'];
echo $medium = $vimeo[0]['thumbnail_medium'];*/
///echo "http://vimeo.com/api/v2/video/$id".".php";
//print_r(json_decode($vimeo));
//echo $large = $vimeo[0]['thumbnail_large'];
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://vimeo.com/api/oembed.json?url=https://vimeo.com/$id",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$headers = [];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
//echo "<pre>";
print_r(($response));