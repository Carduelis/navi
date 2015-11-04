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
	<div class="tab-view" data-corpus="a" data-level="0" data-floor="1">
		<?php include("img/test.svg"); ?>
	</div>
	<div class="tab-view" data-corpus="a" data-level="1" data-floor="2" id="a12">
		<?php include("img/level1.svg"); ?>
	</div>
	<div class="tab-view" data-corpus="a" data-level="2" data-floor="3">
		<?php include("img/A-left.svg"); ?>
	</div>
	<div class="tab-view" data-corpus="a" data-level="3" data-floor="4">
		<?php include("img/A-left.svg"); ?>

	</div>
	<div class="tab-view" data-corpus="d" data-level="-1" data-floor="1">
   		<?php include("img/world-polygon.svg"); ?>	

	</div>
	<div class="tab-view" data-corpus="d" data-level="0" data-floor="2">
		<span>empty</span>

	</div>
	<div class="tab-view" data-corpus="d" data-level="1" data-floor="3">
		<span>empty</span>

	</div>
	<div class="tab-view" data-corpus="d" data-level="2" data-floor="4">
		<span>empty</span>

	</div>
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
<?php include ('includes/footer.php'); ?>