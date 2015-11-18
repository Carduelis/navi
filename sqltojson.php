<?php
    $host = "localhost";
    $user = "root";
    $pass = "31071992";
    $database = "mirea";

    $connection = mysql_connect($host, $user, $pass) or die("Could not connect to host.");
    mysql_select_db($database, $connection) or die("Could not find database.");

    $result = mysql_query("SELECT roomNumber,roomName FROM rooms");

    $rows = array();
    while($row = mysql_fetch_assoc($result))
    {
        
    $rows[] = $row;
       // $rows[] = $row["roomNumber"];
       // $rows[] = $row["roomName"];
        
       
       // print "<tr><td>".$row['tagId']."".$row['roomName']."</td></tr>";
    }
   // echo "</table>";

$fp = fopen('someshit.json', 'w');
    fwrite($fp, json_encode($rows));
    fclose($fp);

    print json_encode($rows);
    mysql_close($connection);
?>