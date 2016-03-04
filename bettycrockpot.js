$(document).ready(function(){
  page.init();
})

var page = {
  url: 'http://api.bigoven.com/recipes',
  keyWord: '?title_kw=chicken',
  // recipeId: '05734',
  // apiKey: '?api_key=i4mh8L358389f4Tfsq82EWZUUlO9268k',
  init: function() {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){
    page.getRecipeData();
  },
  initEvents: function() {

  },

  // BUILD URL //
  buildUrl: function() {
    return page.url + page.keyWord;
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
    })
  },

  // ADD DATA TO PAGE //
  // addDataToPage: function() {
  //
  // },













} // end of page object literal
