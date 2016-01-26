

//<<<<<<<<<<<<<<<<<<---------- CLIENT SIDE VALIDATION ---------->>>>>>>>>>>>>>>>>>>>

  // Client side validation
  var $employeeLogin = $(employeeLogin);
  var $employeePassword = $(employeePassword);
  var searchForm = '<div class="row search"><div class="col-sm-12 text-center"><input type="text" id="searchInput" placeholder="Enter PMC, Property Name or ID (Search on LeaseStar or OneSite property ID)" > <button id="search" class="btn-sm btn-primary">GO</button></div></div>';

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
      $("form span.invalid-login").hide();
    } else {
      console.log("Login must be entered");
      // show invalid login message
      $("form span.invalid-login").show();
    }

    // find out if password is valid = greater than 8
    if ( isPasswordValid() ) {
      console.log("Password valid");
      $("form span.invalid-password").hide();
    } else {
      console.log("Password must be entered");
      // show invalid login message
      $("form span.invalid-password").show();
    }

  }

  // HIDE login form and SHOW search form
  function canSubmit() {
    return isLoginValid();
  }

  function enableSubmitEvent () {

    // Submit Login Form
    $("#submit").prop("disabled", !canSubmit() );

    // Submit button enabled, then proceed
    $( "#login-form" ).submit(function( event ) {

      // AUTH.JS code here

      // http://10.13.77.57:8080/v2/website/authenticate?username={}&password={}
      // Expected Response: {"valid":true}

      var username = $employeeLogin.val();
      var pw = $employeePassword.val();
      var authUrl = "http://api.pv4.myleasestar.com/v2/website/authenticate?username=" + username + "&password=" + pw + "";
      // var authUrl = "http://10.13.77.57:8080/v2/website/authenticate?username=" + username + "&password=" + pw + ""; 
     // var authUrl = "data/auth.json";

      $.getJSON( authUrl, authCheck);
      function authCheck ( json ) {
        console.log("json value: " + json.valid);
        
        if( json.valid ) {

           // Hide login form
           $("#login-form").remove();

           // Show search form
           $("#form-container").html(searchForm);

        } else {

           // Auth failed, notify user
           console.log("Your username and/or password are incorrect. Try again... ");

        }
        
      }
      event.preventDefault();
      
    });

  }

  // check employee login input
  $employeeLogin.focus(loginEvent).keyup(loginEvent).keyup(enableSubmitEvent);

  enableSubmitEvent();
