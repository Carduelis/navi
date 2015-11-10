<?php
$tagId = $_GET["tagId"];
$roomName = $_GET["roomName"];


mysql_connect('localhost','root','31071992');
mysql_select_db('mirea');
mysql_query("insert into rooms values('$tagId','$roomName','')");

echo "The data has been succesfully stored";
?>