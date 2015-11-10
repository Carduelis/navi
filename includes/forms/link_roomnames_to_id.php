<form name="link_roomnames_to_id" method="post">
<table>
	<tr>
		<td>
			<label for="tagId">id данного тега</label>
		</td>
		<td>
			<input type="text" name="tagId" id="tagId" disabled="disabled">
		</td>
	</tr>
	<tr>
		<td>
			<label for="roomName">Введите название помещения</label>
		</td>
		<td>
			<input type="text" name="roomName" id="roomName">
		</td>
	</tr>
	<tr>
		<td></td>
		<td><a class="simple-btn" onclick="sendData(['tagId','roomName'])">Сохранить в БД</a>
	</tr>
	<tr>
		<td></td>
		<td id="message"></td>
	</tr>
</form>