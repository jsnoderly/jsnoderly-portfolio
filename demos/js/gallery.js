
$(document).ready(function() {

	// Manually create JSON file with gallery data 
	// OR use for loop to create the JSON data
	// OR put data in Firebase DB and get JSON from it
	var galleryBath = [
		'bathroom1_thmb.jpg',
		'bathroom2_thmb.jpg',
		'bathroom3_thmb.jpg',
		'bathroom4_thmb.jpg',
		'bathroom5_thmb.jpg',
		'bathroom6_thmb.jpg',
		'bathroom7_thmb.jpg',
		'bathroom8_thmb.jpg',
		'bathroom9_thmb.jpg'
	];

	/*<div class="col-md-4"><img src="images/bath/thumbnails/bathroom1_thmb.jpg"></div>*/
	var galleryImages = '';
	$.each( galleryBath, function(idx,image) {

		var imgIdx = idx+1;
		var iterator = toString(imgIdx % 3);
		// Start Row
		if(imgIdx === 1) { // 
			galleryImages += '<section class="row">';
		} else if (iterator.charAt(".333") !== -1) {
			// start row at 1 and then every 3rd after
			console.log(".333 is in the string. iterator is: " + iterator);
		}

		// Display 3 images per row
		galleryImages += '<div class="col-md-4"><img src="images/bath/thumbnails/' + image + '"></div>';

		// End Row
		if(imgIdx % 3 === 0) {
			console.log("end row: " + imgIdx);
			galleryImages += '</section>';
		}

	});

	$("#gallery-bath").html(galleryImages);


}); // END ready


