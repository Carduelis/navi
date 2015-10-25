<?php include ('includes/header.php'); ?>

<div class="svg-wrapper">
    <div class="svg-holder">
		<div class="tab-view" data-corpus="a" data-level="0" data-floor="1">
			<?php include("img/test.svg"); ?>
		</div>
		<div class="tab-view" data-corpus="a" data-level="1" data-floor="2" id="a12">
			<?php include("img/A-left-Test.svg"); ?>
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
</div>

<?php include ('includes/footer-svg.php'); ?>