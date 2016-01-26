
(function() {

  $("#get-json").click(function() {

    var url = $("#ajaxurl").val();

    $.getJSON(url, function(jsonData) {

      var body = document.getElementsByTagName("body")[0];
      var json = jsonData;

      var heading = json.heading;
      var h1 = document.createElement(h1);
      var h1Text = document.createTextNode(heading);
      h1.appendChild(h1Text);

      // create list
      var list = document.createElement("ul");
      
      // get items object and loop thru it
      var items = json.items;

      for (var key in items) { // for in loop
        var item = items[key]; // item text value from JSON

        var li = document.createElement("li");
        var liText = document.createTextNode(item);
        li.appendChild(liText);
        list.appendChild(li); // Append list items to list
      }

      // output to body of page
      body.appendChild(h1);
      body.appendChild(list);

    }); // END $.getJSON

    return false; // prevent default button click behavior

  }); // END click

})(); // END wrapper function to contain scope
