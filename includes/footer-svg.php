</div><!--end root-->
<aside class="map-controls">
    <a class="btn-border plus" onclick="svg.zoomIn()"></a>
    <a class="btn-border minus" onclick="svg.zoomOut()"></a>
</aside>
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
				<div class="description" onclick="drawPath(calculatePathArray(coordinates),'testsvg')">
				<span class="lever">Уровень</span>
				<span class="floor">Аудитории</span>
				</div>
			<li>
			<div data-corpus="a">
				<a data-level="0" data-floor="1" class="btn"><span class="level" >0</span><span class="floor">1xx</span></a>
				<a data-level="1" data-floor="2" class="btn"><span class="level" >1</span><span class="floor">2xx</span></a>
				<a data-level="2" data-floor="3" class="btn"><span class="level" >2</span><span class="floor">3xx</span></a>
				<a data-level="3" data-floor="4" class="btn"><span class="level" >3</span><span class="floor">4xx</span></a>
			</div>
			<div data-corpus="d">
				<a data-level="-1" data-floor="1" class="btn"><span class="level" >-1</span><span class="floor">1xx</span></a>
				<a data-level="0" data-floor="2" class="btn"><span class="level" >0</span><span class="floor">2xx</span></a>
				<a data-level="1" data-floor="3" class="btn"><span class="level" >1</span><span class="floor">3xx</span></a>
				<a data-level="2" data-floor="4" class="btn"><span class="level" >2</span><span class="floor">4xx</span></a>
			</div>
		</ul>
	</div>
</footer>


<!-- <script src="js/pathfinding-browser.min.js" type="text/javascript"></script> -->
<script src="js/svg-pan-zoom.min.js" type="text/javascript"></script>
<script src="js/pathfinding-browser.js" type="text/javascript"></script>
<script src="js/hammer.min.js" type="text/javascript"></script>
<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="js/jquery.hammer.min.js" type="text/javascript"></script>
<script src="js/functions.js" type="text/javascript"></script>
<script src="js/path.js" type="text/javascript"></script>


</body>
</html>