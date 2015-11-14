<form name="link_roomnames_to_id" method="post">
	<div class="form-group">
		<label for="tagId">Внутренний id данного объекта</label>
		<input type="text" name="tagId" id="tagId" disabled="disabled">
	</div>
	<div class="form-group">
		<label for="roomName">Введите название помещения</label>
		<input type="text" name="roomName" id="roomName">	
	</div>
	<div class="form-group">
		<a class="simple-btn" onclick="sendData(['tagId','roomName'])">Сохранить в БД</a>
		<div id="message"></div>
	</div>
</form>