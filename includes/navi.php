<section class="wrapper">
<ul class="navigation">
<li>
    <a class="button toggler" id="room"><span class="name">Найти аудиторию</span>
        <span class="description">Просто введите номер аудитории и система покажет вам маршрут</span>
    </a>
    
    <div class="toggleBlock" id="roomBLock">
        <form>
            <ul class="in-line">
                <li class="corpus">
                    <select>
                        <option>А</option>
                        <option>Б</option>
                        <option>В</option>
                        <option>Г</option>
                        <option>Д</option>
                    </select>
                    <span>Корпус</span>
                <li class="number">
                    <input type="number" maxlength="3">
                    <span>Номер</span>
                <li class="postfix">
                    <input type="text" maxlength="3">
                    <span>Постфикс</span>
                <li class="go">
                    <a class="btn"></a>
                    <span>Вперед</span>
            </ul>
        </form>
    </div>
<li>
    <a class="button toggler" id="person"><span class="name">Найти кабинет сотрудника</span>
        <span class="description">Введите должность и/или ФИО интересующего человека, затем система подскажет как добраться, а также приемные часы</span>
    </a>
    <div class="toggleBlock" id="personBlock">
        <form>
            <ul class="in-line">
                <li class="person-name">
                    <input type="text" maxlength="3">
                    <span>Фамилия/Должность</span>
                <li class="go">
                    <a class="btn"></a>
                    <span>Найти</span>
            </ul>
        </form>
    </div>
<li>
    <a class="button" id="organization"><span class="name">Перечень кафедр, отделений, организаций</span>
        <span class="description">Как пройти в деканат? Где можно покушать? Где бухгалтерия? А также отобразит рабочие часы</span>
    </a>
    
<li>
    <a class="button toggler" id="routes"><span class="name">День открытых дверей</span>
        <span class="description">Найти институт, кафедру, подать документы</span>
    </a>
    <div class="toggleBlock" id="routesBlock">
        <ul>
            <li><a href="">Подать документы</a>
            <li><a href="">Заполнить анкету</a>
            <li><a href="">Институт ИТ</a>
            <li><a href="">Институт Кибернетики</a>
            <li><a href="">Институт РТС</a>
            <li><a href="">Институт Экономики и Управления</a>
        </ul>
    </div>
    
<li>
    <a class="button" id="map" onclick="openMap()"><span class="name">Перейти к карте</span>
        <span class="description">Интерактивная карта корпусов, аудиторий и помещений</span>
    </a>
</ul>
</section>