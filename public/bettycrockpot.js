$(document).ready(function(){
  page.init();
});

var page = {
  userName: '',
  userId: '',
  // url: 'http://api.bigoven.com/recipe/',
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
      $('.profileContent').show();
      $('.heroImg').hide();
      $('.recipeForm').hide();
    });


    //CANNOT DO IT THIS WAY will submit when clicking into input fields?!
    // $('form.login').on('click', page.submitLogin);

    //I know this one works
    $('form.signUp').on('submit', function(event){
      event.preventDefault();
      console.log("Sign up Clicked!");
      page.submitNewUser();
      $('.profileContent').show();
      $('.heroImg').hide();
      $('.recipeForm').hide();
    });

    // $('form.signUp').on('submit', page.submitNewUser);

    //I know this one works
    $('form.newRecipe').on('submit', function(event){
      event.preventDefault();
      console.log("New Recipe Clicked!");
      page.submitNewRecipe();
      $('.profileContent').show();
      $('.heroImg').hide();
      $('.recipeForm').hide();
    });

    $('#logout').on('click', function(event){
      event.preventDefault();
      console.log("logout CLICKED", event);
      page.logout();
      $('.heroImg').show();
      $('.recipeForm').hide();
      $('.profileContent').hide();
      $('.articleWrapper').html('');
      $('.userCard').html('');
    });

    $('.articleWrapper').on('click', '#delete', function(event){
      event.preventDefault();
      // console.log($(this).closest('article'));
      var recipeId = $(this).closest('article').data('postid');
      console.log("delete CLICKED", recipeId);
      page.deleteRecipe(recipeId);
    });

    $('.articleWrapper').on('click', '#edit', function(event){
      event.preventDefault();
      // console.log($(this).closest('article'));
      var recipeId = $(this).closest('article').data('postid');
      console.log("delete CLICKED", recipeId);
      page.editRecipe(recipeId);
    });

    // $('form.newRecipe').on('submit', page.submitNewRecipe);

    // USERS PAGE LINK
    $('div.navLinksWrapper .users').on('click', function() {
      $('.profileContent').show();
      $('.heroImg').hide();
      $('.recipeForm').hide();
    });
    // ADD RECIPES LINK
    $('div.navLinksWrapper .addRecipes').on('click', function() {
      $('.recipeForm').show();
      $('.heroImg').hide();
      $('.profileContent').hide();
    });
    // GET RECIPES LINK
    $('div.navLinksWrapper .getRecipes').on('click', function() {
      $('.recipeForm').hide();
      $('.heroImg').hide();
      $('.profileContent').hide();
    });
    // HOME BUTTON LINK
    $('.homeButton').on('click', function() {
      $('.heroImg').show();
      $('.recipeForm').hide();
      $('.profileContent').hide();
    });
    // SIGN UP BUTTON REVEAL SIGNUP MENU AND BUTTON DISSAPEARS
    $('.signUpHeader').on('click', function() {
      $('.rightNav').toggle();
      $(this).hide();
    });
  },

  deleteRecipe: function(recipeId){
    console.log(recipeId);
    $.ajax({
      url: '/deleteRecipe',
      method: 'POST',
      data:{recipeId:recipeId},
      success: function(response){
        console.log("response from deleteRecipe", response);
        page.loadProfileToDom();
      },
      error: function (err) {
        console.log("error in deleteRecipe", err);
      },
    });
  },

  // $('span').bind('dblclick',
  // function(){
  //     $(this).attr('contentEditable',true);
  // });

  editRecipe: function(recipeId){
    
  };

  updateRecipe: function(recipeId){
    $.ajax({
      url: '/updateRecipe',
      method: 'POST',
      data:{recipeId:recipeId},
      success: function(response){
        console.log("response from updateRecipe", response);
        page.loadProfileToDom();
      },
      error: function (err) {
        console.log("error in updateRecipe", err);
      },
    });
  },

  logout: function(){
    $.ajax({
      url: '/logout',
      method: 'POST',
      success: function(response) {
        console.log("response from logout");
        page.loadProfileToDom();
      },
      error: function(err){
        console.log("error in LOGOUT", err);
      }
    });
  },

  //kicking off the load profile stuff
  submitLogin: function(event){
    var user = page.getLoginFromDom();  // returns username, password object
    console.log("USER LOGGED IN", user);
    var signature = _.template(templates.userCard);
    $('.userCard').html(signature(user));
    page.findProfile(user);
  },

  getLoginFromDom: function(event){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    console.log(username, password);
    $('input[name="username"]').val('');
    $('input[name="password"]').val('');
    return {
      userName: username,
      password: password
    };
  },

  findProfile: function(user){
    //find data associated with this user password combo
    //return data
    $.ajax({
      url: '/login',
      method: 'POST',
      data: user,
      success: function(response) {
        console.log("response from find profile", response);
        page.loadProfileToDom(response);
      },
      error: function(err){
        console.log("error in findPROFILE", err);
      }
    })
  },

  loadProfileToDom: function(userProfile){
    //return looped, templated, recipes to append
    $.ajax({
       url: '/getRecipesFromUser',
       method: 'GET',
       success: function (recipes) {
         console.log("GOT recipes", recipes);
         var parsedRecipes = JSON.parse(recipes)
         console.log("parsed json", parsedRecipes);
         page.loopOverDataForRecipes(parsedRecipes);
       },
       error: function (err) {
         console.log("ERROR in loadProfileToDom", err);
       }
     });
  },

  loopOverDataForRecipes: function (recipesArr){
    $('.articleWrapper').html('');
    _.each(recipesArr, function (el) {
      console.log('this is the recipe loop',el);
      var signature = _.template(templates.recipeCardBig);
      $('.articleWrapper').append(signature(el));
    });
  },



  //kicking off the new user feature
  submitNewUser: function(event){
    var newUser = page.getNewUserFromDom();
    console.log("NEW USER from submit new user function", newUser);
    page.addNewUserToDom(newUser);
  },

  //retrieve sign up info from DOM return object
  getNewUserFromDom: function(){
    var username = $('input[name="newUsername"]').val();
    var password = $('input[name="newPassword"]').val();
    $('input[name="newUsername"]').val('');
    $('input[name="newPassword"]').val('');
    // console.log("new user info", username, password);
    page.userName = username;
    return {
      userName: username,
      password: password
    };
  },

  //puts username into storage and on the page at Welcome user
  addNewUserToDom: function(newUser){
    $.ajax({
      url: '/createUser',
      method: 'POST',
      data: newUser,
      success: function(response){
        console.log("response from add new user to dom", response);
        var signature = _.template(templates.userCard);
        $('.userCard').html(signature(newUser));
      },
      error: function(err){
        console.log("error in addNewUserToDom", err);
      }
    })
  },

  //kicking off the recipe add feature
  submitNewRecipe: function(event){
    var newRecipe = page.getNewRecipeFromDom();
    console.log("submit new recipe function", newRecipe);
    page.addRecipe(newRecipe);
  },

  //get new recipe from DOM return new object
  getNewRecipeFromDom: function(){
    var title = $('input[name="title"]').val();
    $('input[name="title"]').val('');
    var description = $('textarea[name="description"]').val();
    $('textarea[name="description"]').val('');
    var ingredients = $('textarea[name="ingredients"]').val();
    $('textarea[name="ingredients"]').val('');
    var preparation = $('textarea[name="directions"]').val();
    $('textarea[name="directions"]').val('');
    var prepTime = $('input[name="prepTime"]').val();
    $('input[name="prepTime"]').val('');
    var cookTime = $('input[name="cookTime"]').val();
    $('input[name="cookTime"]').val('');
    // console.log(title, description, ingredients, directions, prepTime, cookTime);
    return {
      recipeName: title,
      description: description,
      ingredients: ingredients,
      preparation: preparation,
      prepTime: prepTime,
      cookTime: cookTime
    };
  },

  //ajax call to push new recipe object
  addRecipe: function(newRecipe){
    $.ajax({
      url: '/addRecipe',
      method: 'POST',
      data: newRecipe,
      success: function(response){
        console.log("LOGGED THE RESPONSE TO ADD RECIPE", response);
        page.getRecipes();
      },
      error: function(err){
        console.log("error in addRecipe", err);
      }
    });
  },

  //ajax request to retrieve new object or array
  getRecipes: function(){
    $.ajax({
       url: '/getRecipesFromUser',
       method: 'GET',
       success: function (recipes) {
         console.log("GOT recipes", recipes);
         var newRecipes = JSON.parse(recipes)
         page.addRecipesToDom(newRecipes);
       },
       error: function (err) {
         console.log("ERROR in getRecipes", err);
       }
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
