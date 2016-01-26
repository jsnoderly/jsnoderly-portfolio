<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Geolocation with HTML5</title>

        <style type="text/css">
        	.feature {
        		background-color: lightblue;
        		padding: 2px;
        	}
        </style>
    </head>
    <body>

		<script>
			/* check for geolocation */
			if ("geolocation" in navigator) {
					/* geolocation is available */
					document.write("<p>Feature check: <span class=feature>geolocation feature available</span></p>");
			} else {
				/* geolocation IS NOT available */
					document.write("geolocation is not home");
			}
		</script>

        <h1>Geolocation Test</h1>
        <p>Get geolocation and set it as a cookie called user_geolocation.</p>
        <p>Code example on Mozilla here: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation">Mozilla tutorial here</a></p>
		<p><button onclick="geoFindMe()">Show my location</button></p>

		<div id="out"></div>

		<h2>Get Cookie</h2>
		<div id="cookie"></div>

        <script>

			function getQueryVariable(variable) {
				var query = window.location.search.substring(1);
			    var vars = query.split("&");
			    for (var i=0;i<vars.length;i++) {
			    	var pair = vars[i].split("=");
			    	if(pair[0] == variable){return pair[1];}
			    }
				return(false);
			}

        	// Get username from query string
        	if(getQueryVariable("name")) {
        		var queryStringName = getQueryVariable("name");
        	} else {
        		alert("no query string?");
        	}

			function geoFindMe() {
			  var output = document.getElementById("out");

			  if (!navigator.geolocation){
			    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
			    return;
			  }

			  function success(position) {
			    var latitude  = position.coords.latitude;
			    var longitude = position.coords.longitude;

        		// Get Lat/Long
				var location = latitude + "/" + longitude;
				alert(location);

        		// set cookies
        		document.cookie = "firstname=" + queryStringName;
        		document.cookie = "location=" + location;

			    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

			    var img = new Image();
			    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

			    output.appendChild(img);
			  };

			  function error() {
			    output.innerHTML = "Unable to retrieve your location";
			  };

			  output.innerHTML = "<p>Locating…</p>";

			  navigator.geolocation.getCurrentPosition(success, error);

			  // Show cookies
			  showCookies();
			}

			// print cookies to the page
        	var showCookies = function () {
        		var outputCookie = document.getElementById('cookie');
        		outputCookie.innerHTML = document.cookie;
        	}

        </script>
    </body>
</html>

