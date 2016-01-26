
// NOTES:
// get Template ID from API (seperate API to get Template name)


$(document).ready(function() {

// LOGIN

	// Client side validation
	var $employeeLogin = $(employeeLogin);
	var $employeePassword = $(employeePassword);
	var searchForm = '<div class="row search"><div class="col-sm-12 text-center"><input type="text" id="search-input" placeholder="Enter PMC, Property Name or ID (Search on LeaseStar or OneSite property ID)" > <button id="search" class="btn-sm btn-primary">GO</button></div></div>';

	// Hide Validation Hints
	$("form span").hide();


	// RP Employee Login
	function isLoginValid() {
		// not empty or minimum chars
		return $employeeLogin.val().length > 3;
	}

	// RP Employee password
	function isPasswordValid() {
		// not empty or minimum chars
		return $employeePassword.val().length > 3;
	}

	// show login validation error
	function loginEvent() {

		// find out if password is valid = greater than 8
		if ( isLoginValid() ) {
			console.log("Login valid");
		} else {
			console.log("Login must be entered");
		}
	}

	// HIDE login form and SHOW search form
	function canSubmit() {
		return isLoginValid();
	}

	function enableSubmitEvent () {

		/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
			ADD SERVER SIDE VALIDATION ...
		$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

		// Submit Login Form
		$("#submit").prop("disabled", !canSubmit() );

		$( "#login-form" ).submit(function( event ) {

			// Submit button enabled, then proceed (Details: http://api.jquery.com/submit/)
			// Hide login form
			$("#login-form").remove();


			// Show search form
			$("#form-container").html(searchForm);

			event.preventDefault();
		});

	}

	// check employee login input
	$employeeLogin.focus(loginEvent).keyup(loginEvent).keyup(enableSubmitEvent);

	enableSubmitEvent();




	// SEARCH RESULTS

	// API URL
	var url = "data/sites.json";

	// Perform Search
	$("#search").click(function() {

		console.log("search");

		$.getJSON(url, function(response) {

			// check for API call - pass/fail

			// If API call success, Return search results
			var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Property</th><th>LeaseStar ID</th><th>OneSite ID</th><th>Website Template</th><th>Content</th><th>Demo Site(s)</th></thead><tr>';

			$.each(response, function(index, sites) {
				searchResultsHTML += '<td>' + sites.pmc + '</td>';
				searchResultsHTML += '<td>' + sites.property + '</td>';
				searchResultsHTML += '<td>' + sites.leasestarid + '</td>';
				searchResultsHTML += '<td>' + sites.template + '</td>';
				searchResultsHTML += '<td>' + sites.content + '</td>';

				if (sites.livesite === true ) {
					searchResultsHTML += '<a href="http://' + sites.url + '" id="view" target="_blank">View</a>';
            		searchResultsHTML += '<a href="" id="view">Delete</a>';
				}
			}); // End each

			searchResultsHTML += '</tr></table>';

			// Display Search Results
			$('#search-results').html(searchResultsHTML);

		}); // End JSON call

	}); // End 


});
