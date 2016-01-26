
/*
	Hookup API
*/

$(document).ready(function() {

// LOGIN

	// Client side validation
/*	var $employeeLogin = $(employeeLogin);
	var $employeePassword = $(employeePassword);
*/

	// SEARCH RESULTS

	// API URL
	var url = "data/sites.json";
	// http://api.{env}.mynewplace.com/v2/website/find?key={search-key}&startIndex={number}

	// Perform Search
	$("#search").click(function() {

			// If API call success, Return search results
			var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Property</th><th>LeaseStar ID</th><th>OneSite ID</th><th>Website Template</th><th>Content</th><th>Demo Site(s)</th></thead><tr>';


			$.ajax({
			    url: "http://10.13.77.57:8080/v2/website/find?key=Arbours&startIndex=0",
			 
			    // The name of the callback parameter, as specified by the YQL service
			    jsonp: "callback",
			 
			    // Tell jQuery we're expecting JSONP
			    dataType: "jsonp",
			 
			    // Tell YQL what we want and that we want JSON
			    data: {
			        q: "select title,abstract,url from search.news where query=\"cat\"",
			        format: "json"
			    },
			 
			    // Work with the response
			    success: function( response ) {
			        console.log( response ); // server response
			    }
			});


				/*
					Website exists check:
					check status "success" and url not null

					if () {
						searchResultsHTML += '<a href="http://' + data.url + '" id="view" target="_blank">View</a>';
	            		searchResultsHTML += '<a href="" id="view">Delete</a>';
					}
				*/

				searchResultsHTML += '</tr></table>';

				// Display Search Results
				$('#search-results').html(searchResultsHTML);


		// Prevent button default behavior
		return false;

	}); // End Search Click


});
