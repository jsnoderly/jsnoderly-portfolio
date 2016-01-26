
$(document).ready(function() {
// wrapper function for scope

		// use $.post AND then do it with $.ajax
		$('#signupform').on('submit', function(evt){
			evt.preventDefault();
			var details = $('#signupform').serialize(); // serialize form data
			$.post('process.php', details, function(data) { // data is callback data. e.g. success

				$('#signupform').html(data);

			}); // details is serialized form data as query string

		});


});
