
// Authentication


// API url
var env = "10.13.77.57:8080";
var searchKey = "Grey";
var startIndex = 0;
var url = "http://" + env + "/v2/website/find?key=" + searchKey + "&startIndex=" + startIndex + "";
// var url = "data/sites.json"

$("#search").click(function() {

  // create ajax request object
  var ajaxReq = new XMLHttpRequest();

  // Run Callback function when ajax call is successful and ready
  ajaxReq.onreadystatechange = function() {

    if (ajaxReq.readyState === 4 && ajaxReq.status === 200) {

      var sites = JSON.parse(ajaxReq.responseText);

      // Check for null from API / JSON
      console.log("response success from API");


      var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Property</th><th>Company Name(PMC)</th><th>Website Template (templateId)</th><th>Website Template</th><th>Content</th><th>Demo Site(s)</th></thead>';

      // loop through
      for(var i=0; i < sites.searchResult.length; i += 1) {

        searchResultsHTML += '<tr>';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyId + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyName + "<br/>(PropID: " + sites.searchResult[i].propertyId + ')</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyName + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].templateId + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].isContentComplete + '</td>';

        // check website exists
        searchResultsHTML += '<td>' + sites.searchResult[i].status + '</td>';
        searchResultsHTML += '<td><a href="http://' + sites.searchResult[i].url + '" target="_blank">View</a> | <a href="#">Add New</a></td>';
        searchResultsHTML += '</tr>';

      }

      searchResultsHTML += '</table>';
      document.getElementById('search-results').innerHTML = searchResultsHTML;

    }

  };

  ajaxReq.open("GET", url);
  ajaxReq.send();

  return false;

}); // End Search click

