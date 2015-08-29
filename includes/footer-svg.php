</div><!--end root-->

<footer>
	<div class="tab-buttons">
		<ul class="inline">
			<li>
			<select id="corpus-selector">
				<option value="a">Корпус А</option>
				<option value="d">Корпус Д</option>
				<option value="b" disabled>Корпус Б</option>
				<option value="v" disabled>Корпус В</option>
				<option value="g" disabled>Корпус Г</option>
			</select>
			<li>
				<div class="description">
				<span class="lever">Уровень</span>
				<span class="floor">Аудитории</span>
				</div>
			<li>
			<div data-corpus="a" style="display: block">
				<a data-level="0" data-floor="1" class="btn"><span class="level" >0</span><span class="floor">1xx</span></a>
				<a data-level="1" data-floor="2" class="btn active"><span class="level" >1</span><span class="floor">2xx</span></a>
				<a data-level="2" data-floor="3" class="btn"><span class="level" >2</span><span class="floor">3xx</span></a>
				<a data-level="3" data-floor="4" class="btn"><span class="level" >3</span><span class="floor">4xx</span></a>
			</div>
			<div data-corpus="d">
				<a data-level="-1" data-floor="1" class="btn"><span class="level" >-1</span><span class="floor">1xx</span></a>
				<a data-level="0" data-floor="2" class="btn"><span class="level" >0</span><span class="floor">2xx</span></a>
				<a data-level="1" data-floor="3" class="btn active"><span class="level" >1</span><span class="floor">3xx</span></a>
				<a data-level="2" data-floor="4" class="btn"><span class="level" >2</span><span class="floor">4xx</span></a>
			</div>
		</ul>
	</div>
</footer>

<!--css only modal-->
<!--http://drublic.github.io/css-modal/#!-->


<script src="js/jquery.min.js"></script>
<script src="js/functions.js" type="text/javascript"></script>

<!--slider-->
<link rel="stylesheet" href="js/cs3/idangerous.chopslider-3.4.css"/>
<script src="js/cs3/idangerous.chopslider-3.4.min.js"></script>
<!--end slider-->
<script src="js/bxslider/jquery.bxslider.min.js"></script>
<!--<script src="js/jquery.fittext.js"></script>-->




</body>
</html>