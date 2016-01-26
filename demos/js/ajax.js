
(function() {

$("#get-json").click(function(){

  var url = $("#ajaxurl").val();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {

    if( (xhr.readyState === 4) && (xhr.status === 200 || xhr.status === 304) ) {
      var body = document.getElementsByTagName("body")[0]; // only one body = 0
      var p = document.getElementsByTagName("p")[0];

      var json = JSON.parse(xhr.responseText); // text representation of JSON data

      // Build out display code for page
      var heading = json.heading;
      var h1 = document.createElement(h1);
      var h1Text = document.createTextNode(heading);
      h1.appendChild(h1Text);

      // create list
      var list = document.createElement("ul");
      
      // get items object
      var items = json.items;

      // SWITCH OUT FOR $.each() iterator
      // AND use the Array to String approach = e.g. http://api.jquery.com/jQuery.getJSON/

      for (var key in items) { // for in loop
        var item = items[key]; // item text value from JSON


        // DEAL WITH ARRAY....


        var li = document.createElement("li");
        var liText = document.createTextNode(item);
        li.appendChild(liText);
        list.appendChild(li); // Append list items to list
      }

      // output to body of page
      body.appendChild(h1);
      body.appendChild(list);

      //body.removeChild(ajaxSend);

    }

  }; 
  xhr.open("GET",url,true);
  xhr.send(null);

  return false;
});

})();
