
/*
  UI code details
  --------------------------
  150 lines of javascript
  350 lines of code total
  2.5 days
*/

//<<<<<<<<<<<<<<<<<<---------- SEARCH ---------->>>>>>>>>>>>>>>>>>>>

// Sites Search API Call
$(document).on('click', '#search', function( event ) {

  // API url parameters
  var env = "api.pv4.myleasestar.com"; // 10.13.77.57:8080  api.pv4.myleasestar.com
  var searchKey = $("#searchInput").val();
  var startIndex = 0;
  var url = "http://" + env + "/v2/website/find?key=" + searchKey + "&startIndex=" + startIndex + "";
  //var url = "http://" + env + "/v2/website/find?key=" + searchKey;
  //var url = "data/sites.json";

  // create ajax request object
  var ajaxReq = new XMLHttpRequest();

  // Run Callback function when ajax call is successful and ready
  ajaxReq.onreadystatechange = function() {

    // Check API health
    if (ajaxReq.readyState === 4 && ajaxReq.status === 200 || ajaxReq.status === 304) {

      console.log("API success");

      var sites = JSON.parse(ajaxReq.responseText);

      var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Company Name</th><th>PropID</th><th>Property</th><th>Website Template</th><th>Demo Site(s)</th></thead>';

      // Default template name
      var templateName = "Other"; //
      var contentCompleteFlag=false;
      var contentTrustedFlag=false;
      /*var siteLiveFlag;*/

      // Websites API LOOP
      for(var i=0; i < sites.searchResult.length; i += 1) {

        searchResultsHTML += '<tr class="search-results-row">';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyId + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyName + '</td>';

        // Property ID
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyId + '</td>';        

        // Content Complete check
        if (sites.searchResult[i].isContentComplete == true) {
          contentCompleteFlag = '<div class="status good">C</div>';
        } else {
          contentCompleteFlag = '';
        }
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyName + contentCompleteFlag;

        // Content Trusted check
        if (sites.searchResult[i].propertyTrustness == true) {
          contentTrustedFlag = '<div class="status good">T</div>';
        } else {
          contentTrustedFlag = '';
        }
        searchResultsHTML += contentTrustedFlag + '</td>';

        // Live site (sold and in Prod)
        //if (sites.searchResult[i].url !== null) {
          //siteLiveFlag = '<div class="status good"></div>';
        //}
        if (sites.searchResult[i].templateId == 17292) {
          console.log("Lux: " + sites.searchResult[i].templateId);
          templateName = "Lux";
        } else if (sites.searchResult[i].templateId == 6112) {
          console.log("Lakeside: " + sites.searchResult[i].templateId);
          templateName = "Lakeside";
        }
        searchResultsHTML += '<td>' + templateName + '</td>';


        // Site Actions
        searchResultsHTML += '<td>';
        if (sites.searchResult[i].url !== null) {
          searchResultsHTML += '<a href="http://' + sites.searchResult[i].url + '" target="_blank">View</a> | ';
        }
        searchResultsHTML += '<a href="#" class="addNew">Add New</a></td>';
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


//<<<<<<<<<<<<<<<<<<---------- ADD NEW SITE ---------->>>>>>>>>>>>>>>>>>>>

// when Add New clicked
$(document).on("click", ".addNew", function(e) {

   var $row = $(this).parents('.search-results-row');
   var $clone = $row.clone();
    $clone.find("td:eq(4)").html('<select class="templateList"><option value="17292">Lux</option><option value="6112">Lakeside</option></select>');
    $clone.find("td:eq(5)").html('<a href="#" class="createSite">Create Site</a>');
    $row.after($clone);

  e.preventDefault();
});


//<<<<<<<<<<<<<<<<<<---------- CREATE SITE ---------->>>>>>>>>>>>>>>>>>>>

$(document).on("click", ".createSite", function(e) {

  // Get Property ID and Template ID
  var $row = $(this).parents('.search-results-row');
  var propId = $row.find("td:eq(2)").text();
  var templateId = $row.find("td:eq(4)").children(".templateList").val();
  console.log("PropID: " + propId + "Template ID: " + templateId);

  var env = "api.pv4.myleasestar.com";
  var siteUrl = "http://" + env + "/v2/website/integrate?pid=" + propId + "&templateId=" + templateId + "";

  $.getJSON( siteUrl, siteCreate);
      function siteCreate ( createSiteResponse ) {

        console.log(createSiteResponse);

        // loading spinner
/*        $(this).parent().append("<div style='width:20px;height:20px;background: url('http://www.hsi.com.hk/HSI-Net/pages/images/en/share/ajax-loader.gif') no-repeat right center'></div>");*/

        if (createSiteResponse.propertiesWithWebsiteCreated != null) {

          // Build new site URL
          if (templateId === 17292) {
            // Lux template only
            $(".createSite").replaceWith("<a href='http://" + propId + ".s0061-lux.demo.cms.dev.myleasestar.com' target='_blank' style='background-color:lightgreen;'>View Site</a>");
          } else {
            // All other templates
            $(".createSite").replaceWith("<a href='http://" + propId + ".demo.cms.dev.myleasestar.com' target='_blank' style='background-color:lightgreen;'>View Site</a>");
          }
          

        } else {
          $(".createSite").replaceWith("<p style='color:red'>Website Creation Failed</p>");
        }

        return createSiteResponse.propertiesWithWebsiteCreated;
      }
  
  e.preventDefault();

});





