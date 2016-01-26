
// javascript AjAX call

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {

	if (xhr.readyState === 4) {
		var employees = JSON.parse(xhr.responseText);
		var statusHTML = '<ul class="bulleted">';

		for (var i=0; i < employees.length; i += 1) {
			if (employees[i].inoffice === true ) {
				statusHTML += '<li class="in" title="in">';
			} else {
				statusHTML += '<li class="out" title="out">';
			}
			statusHTML += employees[i].name;
			statusHTML += '</li>'
		}
		statusHTML += '</ul>';
		document.getElementById('employee-list').innerHTML = statusHTML;
	}

};

xhr.open("GET", "data/employees.json");
xhr.send();



// Room Status

// create ajax request object
var ajaxReq = new XMLHttpRequest();

// Run Callback function when ajax call is successful and ready
ajaxReq.onreadystatechange = function() {

  if (ajaxReq.readyState === 4 && ajaxReq.status === 200) {
    var rooms = JSON.parse(ajaxReq.responseText);
    var status2HTML = '<ul class="rooms">';
    
    // loop through
    for(var i=0; i < rooms.length; i += 1) {
      if(rooms[i].available === true) {
        status2HTML += '<li class"empty">';
      } else {
        status2HTML += '<li class"full">';
      }
      status2HTML += rooms[i].room;
      status2HTML += '</li>';
    }
    status2HTML += '</ul>';
    document.getElementById('roomList').innerHTML = status2HTML;
  }

};

ajaxReq.open("GET", "data/rooms.json");
ajaxReq.send();

