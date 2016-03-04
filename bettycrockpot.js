$(document).ready(function(){
  page.init();
})

var page = {
  url: 'http://api.bigoven.com/recipe/47725?api_key=',
  apiKey: 'i4mh8L358389f4Tfsq82EWZUUlO9268k',
  init: function() {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function(){

  },
  initEvents: function() {

  },
  // BUILD URL
  buildUrl: function() {
    return page.url + page.apiKey;
  },
  getData: function() {
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










} // end of page object literal
