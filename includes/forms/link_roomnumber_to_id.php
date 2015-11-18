<form name="link_roomnnumber_to_id" method="post">
	<div class="form-group">
		<label for="tagId">Внутренний id данного объекта</label>
		<input type="text" name="tagId" id="tagId" disabled="disabled">
	</div>
	<div class="form-group">
		<label for="roomNumber">Введите номер помещения</label>
		<input type="text" name="roomNumber" id="roomNumber">	
		<span class="description">Без пробелов. Корпус - Заглавная русская буква. Постфиксы через дефис. Например, Б204-2, В124-Б</span>
	</div>
	<div class="form-group">
		<a class="simple-btn" onclick="sendData($(this),['tagId','roomNumber'])">Сохранить в БД</a>
		<div id="message"></div>
	</div>
</form>