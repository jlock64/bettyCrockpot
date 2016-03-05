$(document).ready(function(){
  page.init();
});

var page = {
  url: 'http://api.bigoven.com/recipe/',
  // keyWord: 'recipes?title_kw=chicken',
  recipeId: '530115',
  apiKey: '?api_key=i4mh8L358389f4Tfsq82EWZUUlO9268k',
  init: function() {
    console.log("init working");
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){
    console.log("styling workings");
    page.getRecipeData();
  },
  initEvents: function() {
    console.log("events working");

    $('form.login').on('submit', function(event){
      event.preventDefault();
      console.log("Login Clicked!");
      var username = $('input[name="username"]').val();
      var password = $('input[name="password"]').val();
      console.log(username, password);
    });

    // $(".signUpHeader").click(function(){
    //   $(".signUpHeader").hide();
    // });
  },

  // BUILD URL //
  buildUrl: function() {
    return page.url + page.recipeId + page.apiKey;
  },

  // GET DATA AJAX CALL //
  getRecipeData: function() {
    $.ajax({
      method: 'GET',
      url: page.buildUrl(),
      dataType: 'json',
      success: function(data) {
        window.glob = data;
        console.log(data);
      },
      error: function(err) {
        alert('There was an error');
      }
    });
  },

  // ADD DATA TO PAGE //
  // addDataToPage: function() {
  //
  // },













} // end of page object literal
