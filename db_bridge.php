<?php
	
	$form= $_GET["form"];

	mysql_connect('localhost','root','31071992');
	mysql_select_db('mirea');
	@mysql_query('set character_set_client="utf8"'); 
	@mysql_query('set collation_connection="utf8_general_ci"'); 
	echo "$form";
if($form == 'link_roomnnumber_to_id'){

	// Проверка на наличие записанных данных в таблице БД
		// echo "$tagId";
		$tagId = $_GET["tagId"];
		$roomNumber = $_GET["roomNumber"];
		$query = "SELECT * FROM rooms WHERE tagId='$tagId'";
		$res = mysql_query($query);
		// echo "$res"; 

		$r =  mysql_num_rows($res);
		// echo "     $r";

		if(mysql_num_rows($res)>0) {

			echo 'Тупое было, пошло нахуй с моей борды.';

		} else {
			mysql_query("insert into rooms values('$tagId','$roomNumber','','')");

			echo "Ты богоподобен, информация о данной аудитории будет хранится веками.";

		}

		$r=0;
		//
		} else if($form == 'add_roomname'){
		$tagId = $_GET["tagId"];
		$roomName = $_GET["roomName"];
		$query = "SELECT * FROM rooms WHERE tagId='$tagId'";
		$res = mysql_query($query);
		if(mysql_num_rows($res)>0) {
		mysql_query("UPDATE rooms SET roomName='$roomName' WHERE tagId='$tagId'");
			echo "Описание аки сократ брат";

		} else {
			

			echo "это говно и боян сэр(";

		}

		} else{ echo "hueta";
		}

	mysql_close();
?>