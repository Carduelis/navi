<form name="link_users_to_room" method="post">
	<div class="form-group">
		<label for="tagId">Внутренний id объекта</label>
		<input type="text" name="tagId" id="tagId" disabled="disabled">
	</div>
	<div class="form-group">
		<label for="userId">Выберите сотрудника для привязки к помещению</label>
		<select id="userId">
			<option value="">Иванов Иван</option>
			<option value="">Петров Петр</option>
		</select>
	</div>
	<div class="form-group">
		<a class="simple-btn" onclick="sendData($(this),['tagId','userId'])">Сохранить в БД</a>
		<div id="message"></div>
	</div>
</form>