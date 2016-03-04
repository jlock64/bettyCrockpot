$(document).ready(function(){
  page.init();
});

var page = {
  userName: '',
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

    //I know this one works
    $('form.login').on('submit', function(event){
      event.preventDefault();
      console.log("Login Clicked!");
      page.submitLogin();
    });

    //CANNOT DO IT THIS WAY will submit when clicking into input fields?!
    // $('form.login').on('click', page.submitLogin);

    //I know this one works
    $('form.signUp').on('submit', function(event){
      event.preventDefault();
      console.log("Sign up Clicked!");
      page.submitNewUser();
    });

    // $('form.signUp').on('submit', page.submitNewUser);

    //I know this one works
    $('form.newRecipe').on('submit', function(event){
      event.preventDefault();
      console.log("New Recipe Clicked!");
      page.submitNewRecipe();
    });

    // $('form.newRecipe').on('submit', page.submitNewRecipe);

    $(".signUpHeader").click(function(){
      $(".signUpHeader").hide();
    });
  },

  //kicking off the load profile stuff
  submitLogin: function(event){
    var user = page.getLoginFromDom();
    console.log("USER LOGGED IN", user);
    // var profile = page.findProfile(user);
    //page.loadProfileToDom(profile);
  },

  findProfile: function(user){
    //find data associated with this user password combo
    //return data
  },

  loadProfileToDom: function(user){
    //return looped, templated, recipes to append
  },

  getLoginFromDom: function(event){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    // console.log(username, password);
    return {
      username: username,
      password: password
    };
  },

  //kicking off the new user feature
  submitNewUser: function(event){
    var newUser = page.getNewUserFromDom();
    console.log("NEW USER", newUser);
    // page.addNewUserToDom(newUser);
  },

  //retrieve sign up info from DOM return object
  getNewUserFromDom: function(){
    var username = $('input[name="newUsername"]').val();
    var password = $('input[name="newPassword"]').val();
    // console.log("new user info", username, password);
    page.userName = username;
    return {
      username: username,
      password: password
    };
  },

  //puts username into storage and on the page at Welcome user
  addNewUserToDom: function(newUser){
    $.ajax({
      // url: ,
      // method: 'POST',
      // data: newUser,
      // success: function(response){
      //   var signature = _.template(templates.userCard);
      //   $('.userCard').html(signature(newUser));
      // },
      // error: function(err){
      //   console.log("error in addNewUserToDom", err);
      // }
    })
  },

  //kicking off the recipe add feature
  submitNewRecipe: function(event){
    var newRecipe = page.getNewRecipeFromDom();
    console.log("new recipe info", newRecipe);
    // page.addRecipe(newRecipe);
  },

  //get new recipe from DOM return new object
  getNewRecipeFromDom: function(){
    var title = $('input[name="title"]').val();
    var description = $('textarea[name="description"]').val();
    var ingredients = $('textarea[name="ingredients"]').val();
    var preparation = $('textarea[name="directions"]').val();
    var prepTime = $('input[name="prepTime"]').val();
    var cookTime = $('input[name="cookTime"]').val();
    // console.log(title, description, ingredients, directions, prepTime, cookTime);
    // var newRecipe =
    return {
      title: title,
      description: description,
      ingredients: ingredients,
      preparation: preparation,
      prepTime: prepTime,
      cookTime: cookTime
    };
    // console.log(newRecipe);
    // return newRecipe;
  },

  //ajax call to push new recipe object
  addRecipe: function(newRecipe){
    $.ajax({
      // url: ,
      // method: 'POST',
      // data: newRecipe,
      // success: function(response){
      //   page.getRecipes();
      // },
      // error: function(err){
      //   console.log("error in addRecipe", err);
      // }
    });
  },

  //ajax request to retrieve new object or array
  getRecipes: function(){
    $.ajax({
      //  url: ,
      //  method: 'GET',
      //  success: function (recipes) {
      //    console.log("GOT recipes", recipes);
      //    page.addRecipesToDom(recipes);
      //  },
      //  error: function (err) {
      //    console.log("ERROR in getRecipes", err);
      //  }
     });
  },

  //loop over that object or array to append to articleWrapper in templates
  addRecipesToDom: function(recipeArr){
    $('.articleWrapper').html('');
    _.each(recipeArr, function (el) {
      var signature = _.template(templates.recipeCardBig);
      $('.articleWrapper').append(signature(el));
    });
  },

  // BUILD URL //
  buildUrl: function() {
    return page.url + page.recipeId + page.apiKey;
  },

  // GET DATA AJAX CALL //
  getRecipeData: function() {
    $.ajax({
      // method: 'GET',
      // url: page.buildUrl(),
      // dataType: 'json',
      // success: function(data) {
      //   window.glob = data;
      //   console.log(data);
      // },
      // error: function(err) {
      //   alert('There was an error');
      // }
    });
  },

  // ADD DATA TO PAGE //
  // addDataToPage: function() {
  //
  // },













} // end of page object literal
