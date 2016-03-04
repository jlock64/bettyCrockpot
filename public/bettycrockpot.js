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
      page.getLogin();
    });

    $('form.signUp').on('submit', function(event){
      event.preventDefault();
      console.log("Sign up Clicked!");
      page.getSignUp();
    });

    $('form.newRecipe').on('submit', function(event){
      event.preventDefault();
      console.log("New Recipe Clicked!");
      page.getNewRecipe();
    });

    $(".signUpHeader").click(function(){
      $(".signUpHeader").hide();
    });
  },

  //retreive login info return object
  getLogin: function(){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    // console.log(username, password);
    var login = {
      username: username,
      password: password
    };
    console.log(login);
    return {
      username: username,
      password: password
    }
  },

  //retrieve sign up info return object
  getSignUp: function(){
    var username = $('input[name="newUsername"]').val();
    var password = $('input[name="newPassword"]').val();
    console.log(username, password);
    var login = {
      username: username,
      password: password
    };
    console.log(login);
    return {
      username: username,
      password: password
    }
  },

  //get new recipe return new object
  getNewRecipe: function(){
    var title = $('input[name="title"]').val();
    var description = $('textarea[name="description"]').val();
    var ingredients = $('textarea[name="ingredients"]').val();
    var preparation = $('textarea[name="directions"]').val();
    var prepTime = $('input[name="prepTime"]').val();
    var cookTime = $('input[name="cookTime"]').val();
    console.log(title, description, ingredients, directions, prepTime, cookTime);
    var newRec = {
      title: title,
      description: description,
      ingredients: ingredients,
      preparation: preparation,
      prepTime: prepTime,
      cookTime: cookTime
    };
    console.log(newRec);
    return {
      title: title,
      description: description,
      ingredients: ingredients,
      directions: directions,
      prepTime: prepTime,
      cookTime: cookTime
    }
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
