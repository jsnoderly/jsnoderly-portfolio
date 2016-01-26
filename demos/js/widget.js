
$(document).ready(function(){

	// Employee Status

	var url = "data/employees.json";
	$.getJSON(url, function(response) {

		var statusHTML = '<ul class="bulleted">';
		$.each(response, function(index,employees) {

			if(employees.inoffice === true) {
				statusHTML += '<li class="in">';
			} else {
				statusHTML += '<li class="out">';
			}
			statusHTML += employees.name + '</li>';
		}); // END each loop
		statusHTML += '</ul>';
		$("#employeeList").html(statusHTML);

	}); // END getJSON


	// Room Status
	// WRITE IT AGAIN with $getJSON() ...


	// Get Rooms Status with $.ajax() - https://learn.jquery.com/ajax/jquery-ajax-methods/
	var urlRooms = "data/rooms.json";
	$.ajax({

		url: urlRooms,

		// The data to send (will be converted to a query string)
		data: {
			id: 123
		},
		type: "GET",
		dataType: "json",

		// code to run if request succeeds
		// response is passed to function
		success: function(response) {

			var roomStatus = '<ul class="rooms">';
			$.each(response, function(index,rooms) {
				if(rooms.available) {
					roomStatus += '<li class="empty"><a href="'+ rooms.url +'">' + rooms.room + '</a></li>';
				} else {
					roomStatus += '<li class="full">' + rooms.room + '</li>';
				}
			});
			roomStatus += '</ul>';
			$("#roomList").append(roomStatus);

		},

		error: function(xhr, status, errorThrown) {
			alert( "Sorry, there was a problem!" );
        	console.log( "Error: " + errorThrown );
        	console.log( "Status: " + status );
        	console.dir( xhr );
		},

		// Code to run regardless of success or failure
		complete: function( xhr, status ) {
        	console.log( "The request is complete!" );
    	}
	});


}); // END ready

