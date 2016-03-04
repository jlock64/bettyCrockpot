import java.net.ConnectException;
import java.sql.*;
import java.util.ArrayList;

/**
 * Created by keatonfoster on 3/4/16.
 */
public class Main {
    // this method creates our dbase tables "user" and "recipe"
    public static void createTables (Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS user (user_Id IDENTITY, user_name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS recipe (recipe_id IDENTITY, recipe_join-id INT, recipe_name VARCHAR," +
                " description VARCHAR, ingredients VARCHAR, preparation VARCHAR, prep_time VARCHAR, cook_time VARCHAR");
    }
    // this method is inserting values into user dbase table
    // user_id is the identity and will be assigned automatically
    public static void insertUser (Connection conn, String userName, String password) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO user VALUES (NULL, ?, ?");
        stmt.setString(1, userName);
        stmt.setString(2, password);
        stmt.execute();
    }
    // this method pulls ONE user from the dbase user table, returns user object
    public static User selectUser(Connection conn, int userId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE user_id = ?");
        ResultSet results = stmt.executeQuery();
        stmt.setInt(1, userId);
        if (results.next()) {
            String userName = results.getString("user_name");
            String password = results.getString("password");
            User user = new User (userId, userName, password);
            return user;
        }
        return null;  //this is for safety, incase the requested recipe does not exist
    }
    // this method will insert recipe values into dbase recipe table
    public static void insertRecipe (Connection conn, int recipeJoinId, String recipeName, String description, String ingredients,
                                     String preparation, String prepTime, String cookTime) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO recipe VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)");
        stmt.setInt(1, recipeJoinId);
        stmt.setString(2, recipeName);
        stmt.setString(3, description);
        stmt.setString(4, ingredients);
        stmt.setString(5, preparation);
        stmt.setString(6, prepTime);
        stmt.setString(7, cookTime);
        stmt.execute();
    }

    public static Recipe selectRecipe (Connection conn, int recipeId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipe WHERE recipe_id = ?");
        ResultSet results = stmt.executeQuery();
        if (results.next()) {  // results.next() essentially checks the dbase table for a valid recipe_id value, and continues if true
            int recipeJoinId = results.getInt("recipe_join_id");
            String recipeName = results.getString("recipe_name");
            String description = results.getString("description");
            String ingredient = results.getString("ingredients");
            String preparation = results.getString("preparation");
            String prepTime = results.getString("prep_time");
            String cookTime = results.getString("cook_time");
            Recipe recipe = new Recipe (recipeId, recipeJoinId, recipeName, description, ingredient, preparation, prepTime, cookTime);
            return recipe;
        }
        return null; //this is for safety, incase the requested recipe does not exist
    }
    public static ArrayList<Recipe> selectRecipes (Connection conn) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipe INNER JOIN user ON recipe_join_id = user_id");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            int recipeId = results.getInt("recipe_id");
            int recipeJoinId = results.getInt("recipe_join_id");
            String recipeName = results.getString("recipe_name");
            String description = results.getString("description");
            String ingredient = results.getString("ingredients");
            String preparation = results.getString("preparation");
            String prepTime = results.getString("prep_time");
            String cookTime = results.getString("cook_time");
            Recipe recipe = new Recipe (recipeId, recipeJoinId, recipeName, description, ingredient, preparation, prepTime, cookTime);
        }
    }

    public static void main(String[] args) {

    }
}
