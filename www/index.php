<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Progect title</title>
</head>
<body>
	<?php
	$rootDir = opendir(__DIR__.DIRECTORY_SEPARATOR);
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
	<div class="index-container">
		<span> <?php echo ($projectCount > 0)? $projectCount : "No"; ?> Page</span>
		<ul class="index-list">
		<?php if ($projectCount > 0) : ?>
			<?php foreach ($dirArray as $dir):?>
			<li><a href="<?php echo $dir ;?>"><?php echo $dir ;?></a></li>
			<?php endforeach; ?>
		<?php else: ?>
			<li><a href="#">Nothing here, start adding projects to your server.</a></li>
		<?php endif; ?>
		</ul>
	</div>
</body>
</html>