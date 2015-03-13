<?php
	$output = shell_exec('cat /proc/stat');
?>

<?php echo $_GET['callback']; ?>('<?php echo str_replace("\n", "|", "$output"); ?>');