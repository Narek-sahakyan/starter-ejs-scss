<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Progect title</title>
</head>
<body>
	<?php
	$rootDir = opendir(__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."build");
	$dirArray = [];
	while($element = readdir($rootDir)) {
	  if ((substr($element, 0, 1) != ".") && strrpos($element, '.htm')) {
		$dirArray[] = $element;
	  }
	}
	closedir($rootDir);
	$projectCount = count($dirArray) ;
	if ($projectCount > 0) { sort($dirArray); }
	?>
	<div class="main-container">
		<span> <?php echo ($projectCount > 0)? $projectCount : "No"; ?> Projects</span>
		<ul class="index-list">
		<?php if ($projectCount > 0) : ?>
			<?php foreach ($dirArray as $dir):?>
			<li><a href="../build/<?php echo $dir ;?>"><?php echo $dir ;?></a></li>
			<?php endforeach; ?>
		<?php else: ?>
			<li><a href="#">Nothing here, start adding projects to your server.</a></li>
		<?php endif; ?>
		</ul>
	</div>
</body>
</html>