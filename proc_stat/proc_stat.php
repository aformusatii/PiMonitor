<?php
	$output = shell_exec('cat /proc/stat');
	echo "$output";
?>