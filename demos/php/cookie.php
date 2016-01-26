<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cookies in PHP</title>
    </head>
    <body>

	<h1>Cookies in PHP</h1>
	<?php  
	if (isset($_GET['cookiecheck'])) {

		if (isset($_COOKIE['testcookie'])) {
			print "Cookies are enabled";
		} else {
			print "Cookies are not enabled";
		}

	} else {

		setcookie('testcookie', "testvalue");
		die(header("Location: " . $_SERVER['PHP_SELF'] . "?cookiecheck=1"));

	}
	?>

    </body>
</html>