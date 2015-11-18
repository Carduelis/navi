<form name="add_roomname" method="post">
	<div class="form-group">
		<label for="tagId">Внутренний id данного объекта</label>
		<input type="text" name="tagId" id="tagId" disabled="disabled">
	</div>
	<div class="form-group">
		<label for="roomName">Введите название помещения</label>
		<input type="text" name="roomName" id="roomName">	
		<span class="description">Например, "Учебная аудитория" или "Отдел кадров"</span>
	</div>
	<div class="form-group">
		<a class="simple-btn" onclick="sendData($(this),['tagId','roomName'])">Сохранить в БД</a>
		<div id="message"></div>
	</div>
</form>

