/**
 * Created by noellemachin on 3/4/16.
 */
public class Recipe {
    int recipeId;
    int recipeJoinId;
    String recipeName;
    String description;
    String ingredients;
    String preparation;
    String prepTime;
    String cookTime;

    public Recipe(int recipeId, int recipeUserId, String recipeName, String description, String ingredients, String preparation, String prepTime, String cookTime) {
        this.recipeId = recipeId;
        this.recipeJoinId = recipeUserId;
        this.recipeName = recipeName;
        this.description = description;
        this.ingredients = ingredients;
        this.preparation = preparation;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public int getRecipeJoinId() {
        return recipeJoinId;
    }

    public void setRecipeJoinId(int recipeJoinId) {
        this.recipeJoinId = recipeJoinId;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getPreparation() {
        return preparation;
    }

    public void setPreparation(String preparation) {
        this.preparation = preparation;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public String getCookTime() {
        return cookTime;
    }

    public void setCookTime(String cookTime) {
        this.cookTime = cookTime;
    }
}
