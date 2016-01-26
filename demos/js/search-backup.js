


// SEARCH BACKUP AT 2:00 Feb 5th
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------


// SEARCH

// Sites search API Call
$(document).on('click', '#search', function( event ) {

  // API url parameters
  var env = "api.pv4.myleasestar.com"; // Local Box: 10.13.77.57:8080
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
    if (ajaxReq.readyState === 4 && ajaxReq.status === 200) {

      console.log("API success");

      var sites = JSON.parse(ajaxReq.responseText);

      var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Company Name</th><th>PropID</th><th>Property</th><th>Website Template</th><th>Demo Site(s)</th></thead>';

      // Default template name
      var templateName = "Lux"; // TemplateId: 17292
      var contentCompleteFlag=false;
      /*var siteLiveFlag;*/

      // loop through
      for(var i=0; i < sites.searchResult.length; i += 1) {

        searchResultsHTML += '<tr class="search-results-row">';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyId + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyName + '</td>';

        // Property ID
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyId + '</td>';        

        // Content Complete check
        if (sites.searchResult[i].isContentComplete == true) {
          contentCompleteFlag = '<div class="status good"></div>';
        } else {
          contentCompleteFlag = '';
        }
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyName + contentCompleteFlag + '</td>';

        // Live site (sold and in Prod)
        //if (sites.searchResult[i].url !== null) {
          //siteLiveFlag = '<div class="status good"></div>';
        //}
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



// ACTIONS

// when Add New clicked
// select parent (td?) or parents parent (tr) row and all it's content and clone
$(document).on("click", ".addNew", function(e) {

   var $row = $(this).parents('.search-results-row');
   var $clone = $row.clone();
    $clone.find("td:eq(4)").html('<select class="templateList"><option value="17292">Lux</option><option value="6112">Lakeside</option></select>');
    $clone.find("td:eq(5)").html('<a href="#" class="createSite">Create Site</a>');
    $row.after($clone);

  e.preventDefault();
});

$(document).on("click", ".createSite", function(e) {

  var $row = $(this).parents('.search-results-row');
  var getPropertyId = $row.find("td:eq(2)").text();
  console.log(getPropertyId);

  var propId = getPropertyId;
  var templateId = 17292; // Lux
  var env = "api.pv4.myleasestar.com";
  //var siteUrl = "http://" + env + "/v2/website/integrate?pid=" + propId + "&templateId=" + templateId + "";
  var siteUrl = "http://api.pv4.myleasestar.com/v2/website/integrate?pid=" + propId + "&templateId=17292";

  $.getJSON( siteUrl, siteCreate);
      function siteCreate ( createSiteResponse ) {

        console.log(createSiteResponse);

        if (createSiteResponse.propertiesWithWebsiteCreated != null) {
          $(".createSite").replaceWith("<p style='color:green'>Website Created</p>");
        } else {
          $(".createSite").replaceWith("<p style='color:red'>Website Creation Failed</p>");
        }

        return createSiteResponse.propertiesWithWebsiteCreated;
      }
  
  e.preventDefault();

});




// SEARCH BACKUP 5:01 PM FEB 5TH
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

// SEARCH

// Sites search API Call
$(document).on('click', '#search', function( event ) {

  // API url parameters
  var env = "api.pv4.myleasestar.com"; // 10.13.77.57:8080
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
    if (ajaxReq.readyState === 4 && ajaxReq.status === 200) {

      console.log("API success");

      var sites = JSON.parse(ajaxReq.responseText);

      var searchResultsHTML = '<div class="table-responsive" id="search-results"><h4>Your search found the following results:</h4><table class="table table-condensed table-striped table-hover"><thead><th>PMC</th><th>Company Name</th><th>PropID</th><th>Property</th><th>Website Template</th><th>Demo Site(s)</th></thead>';

      // Default template name
      var templateName = "Other"; // TemplateId: 17292
      var contentCompleteFlag=false;
      var contentTrustedFlag=false;
      /*var siteLiveFlag;*/

      // loop through
      for(var i=0; i < sites.searchResult.length; i += 1) {

        searchResultsHTML += '<tr class="search-results-row">';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyId + '</td>';
        searchResultsHTML += '<td>' + sites.searchResult[i].companyName + '</td>';

        // Property ID
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyId + '</td>';        

        // Content Complete check
        if (sites.searchResult[i].isContentComplete == true) {
          contentCompleteFlag = '<div class="status good"></div>';
        } else {
          contentCompleteFlag = '';
        }
        searchResultsHTML += '<td>' + sites.searchResult[i].propertyName + contentCompleteFlag;

        // Content Trusted check
        if (sites.searchResult[i].propertyTrustness == true) {
          contentTrustedFlag = '<div class="status good"></div>';
        } else {
          contentTrustedFlag = '';
        }
        searchResultsHTML += contentTrustedFlag + '</td>';

        // Live site (sold and in Prod)
        //if (sites.searchResult[i].url !== null) {
          //siteLiveFlag = '<div class="status good"></div>';
        //}
        if (sites.searchResult[i].templateId == 17292) {
          console.log(sites.searchResult[i].templateId);
          templateName = "Lux";
        } else if (sites.searchResult[i].templateId == 6112) {
          console.log(sites.searchResult[i].templateId);
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



// ACTIONS

// when Add New clicked
// select parent (td?) or parents parent (tr) row and all it's content and clone
$(document).on("click", ".addNew", function(e) {

   var $row = $(this).parents('.search-results-row');
   var $clone = $row.clone();
    $clone.find("td:eq(4)").html('<select class="templateList"><option value="17292">Lux</option><option value="6112">Lakeside</option></select>');
    $clone.find("td:eq(5)").html('<a href="#" class="createSite">Create Site</a>');
    $row.after($clone);

  e.preventDefault();
});

$(document).on("click", ".createSite", function(e) {

  var $row = $(this).parents('.search-results-row');
  var getPropertyId = $row.find("td:eq(2)").text();
  var getTemplateId = $row.find("td:eq(4)").children(".templateList").val();
  console.log("PropID: " + getPropertyId + "Template ID: " + getTemplateId);


  var propId = getPropertyId;
  var templateId = 17292;
  var env = "api.pv4.myleasestar.com";
  //var siteUrl = "http://" + env + "/v2/website/integrate?pid=" + propId + "&templateId=" + templateId + "";
  var siteUrl = "http://api.pv4.myleasestar.com/v2/website/integrate?pid=" + propId + "&templateId=" + getTemplateId + "";

  $.getJSON( siteUrl, siteCreate);
      function siteCreate ( createSiteResponse ) {

        console.log(createSiteResponse);

        // loading spinner
        $(this).parent().append("<div style='width:20px;height:20px;background: url('http://www.hsi.com.hk/HSI-Net/pages/images/en/share/ajax-loader.gif') no-repeat right center'></div>");

        if (createSiteResponse.propertiesWithWebsiteCreated != null) {
          $(".createSite").replaceWith("<p style='color:green'>Website Created</p>");
        } else {
          $(".createSite").replaceWith("<p style='color:red'>Website Creation Failed</p>");
        }

        return createSiteResponse.propertiesWithWebsiteCreated;
      }
  
  e.preventDefault();

});


