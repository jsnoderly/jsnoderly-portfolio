<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Untitled</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        
        <h2>working the numbers</h2>

		<form>
			Enter Current Account Balance: <input name="currentAcctBalance" id="currentAcctBalance" type="text" value="" />
		</form>

        <script src="js/app.js"></script>
        <script src="js/jquery-1.10.2.min.js"></script>
        <script>

        $(document).ready(function() {

	        // currentAccountBalance will be updated by the user
	        //var currentAccountBalance = $("currentAcctBalance").value;

			function getCurrentBalance (currentAccountBalance,currentPendingDebitBalance) {
				var currentAvailableBalance = currentAccountBalance - currentPendingDebitBalance;
				alert(currentAvailableBalance);
			}

       });

		</script>

		<a href="#" onclick="getCurrentBalance(149,450);">Current Balance</a>

    </body>
</html>