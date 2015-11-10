<?php include ('includes/header.php'); ?>

<div id="gf-root">
<div class="wrapper">

<div class="holder">
    <div class="promo-text">
        <h1>— Добро пожаловать в МИРЭА!</h1>
    </div>
    <?php include ('includes/navi.php'); ?>

	    

</div><!--end holder-->
</div><!--end wrapper-->
<div class="svg-holder hidden">
	<div class="svg-view hided" data-level="-1"></div>
	<div class="svg-view hided" data-level="0"></div>
	<div class="svg-view hided" data-level="1"></div>
	<div class="svg-view hided" data-level="2"></div>
	<div class="svg-view hided" data-level="3"></div>
</div>
</div><!--end root-->

<aside id="map-zoom" class="map-controls">
    <a class="btn-border plus" onclick="svg.zoomIn()"></a>
    <a class="btn-border minus" onclick="svg.zoomOut()"></a>
</aside>
<footer id="map-controls">
	<div class="tab-buttons">
		<ul class="inline">
			<li>
			<div class="select-container">
			<label for="corpus-selector">Корпус</label>
			<select id="corpus-selector">
				<option value="a">А</option>
				<option value="d">Д</option>
				<option value="b" disabled>Б</option>
				<option value="v" disabled>В</option>
				<option value="g" disabled>Г</option>
			</select>
			</div>
			<li>
			<div class="overflow" data-corpus="a">
				<a data-level="0" class="btn"><span class="level" >0</span><span class="floor">А-1xx</span></a>
				<a data-level="1" class="btn"><span class="level" >1</span><span class="floor">А-2xx</span></a>
				<a data-level="2" class="btn"><span class="level" >2</span><span class="floor">А-3xx</span></a>
				<a data-level="3" class="btn"><span class="level" >3</span><span class="floor">А-4xx</span></a>
			</div>
			<div  class="overflow" data-corpus="d">
				<a data-level="-1" class="btn"><span class="level" >-1</span><span class="floor">Д-1xx</span></a>
				<a data-level="0"  class="btn"><span class="level" >0</span><span class="floor">Д-2xx</span></a>
				<a data-level="1"  class="btn"><span class="level" >1</span><span class="floor">Д-3xx</span></a>
				<a data-level="2"  class="btn"><span class="level" >2</span><span class="floor">Д-4xx</span></a>
			</div>
		</ul>
	</div>
</footer>
<?php include ('includes/footer.php'); ?>