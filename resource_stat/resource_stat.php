<?php
	$output = shell_exec('cat /proc/stat');
?>

pushResourceStat('<?php echo str_replace("\n", "|", "$output"); ?>');