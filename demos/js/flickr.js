
$(document).ready(function(){

	$('button').click(function() {
		$('button').removeClass('selected'); // remove class for all buttons
		$(this).addClass('selected'); // add class for clicked button

		var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";  // json callback is jsonp
		var searchTerm= $(this).val();
		var photoLimit = 6; // 0 index
		console.log(photoLimit);
		var flickrOptions = {
			id: "73044537@N00",
			tags: searchTerm,
			tagmode: "any",
			format: "json"
		};
		$.getJSON(flickrAPI, flickrOptions, function(data) {

			var photosHTML = '<ul>';
			$.each(data.items, function(idx, photo){

				photosHTML += '<li class="grid-25 tablet-grid-50">';
				photosHTML += '<a href="' + photo.link + '" class="image"><img src="' + photo.media.m + '"></a>';
				photosHTML += '</li>';

				// Limit Photos
				if(idx === photoLimit) {
					return false;
				}

			});
			photosHTML += '</ul>';
			$("#photos").html(photosHTML);

		});

	});

	// SHOW WEATHER
	var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
	var data = {
	q : "Walnut Creek",
	units : "metric"
	};
	function showWeather(weatherReport) {
		$('#temperature').html( weatherReport.name + " " + Math.floor(weatherReport.main.temp * 9 / 5 + 32) + " &deg;");
	}
	$.getJSON(weatherAPI, data, showWeather);

});

