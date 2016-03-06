var templates = {
  userCard: [
      '<h1>Welcome <%= userName %>!</h1>'
  ].join(''),
  recipeCardBig: [
    '<article class="recipeCard" data-postid="<%= recipeId %>">',
      '<div class="title">',
        '<h2> <%= recipeName %> </h2>',
      '</div>',
      '<button type="button" name="delete" id="delete">Delete</button>',
      // '<button type="button" name="edit" id="edit">Edit</button>',
      '<div class="description">',
        '<h6> <%= description %> </h6>',
      '</div>',
      '<div class="cardLeft">',
          '<h4>Ingredients: </h4>',
          '<div class="ingredients">',
            '<p> <%= ingredients %> </p>',
          '</div>',
          '<div class="times">',
            '<h4>Prep Time: </h4><div class="prep"><p> <%= prepTime %> </p></div>',
            '<h4>Cook Time: </h4><div class="cook"><p> <%= cookTime %> </p></div>',
          '</div>',
      '</div>',
      '<div class="cardRight">',
          '<h4>Directions: </h4>',
          '<div class="directions">',
            '<p> <%= preparation %> </p>',
          '</div>',
      '</div>',
    '</article>'
  ].join('') //append to div.articleWrapper
}
