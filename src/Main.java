import jodd.json.JsonSerializer;
import spark.Session;
import spark.Spark;

import java.net.ConnectException;
import java.sql.*;
import java.util.ArrayList;

/**
 * Created by keatonfoster on 3/4/16.
 */
public class Main {
    // this method creates our dbase tables "user" and "recipe"
    public static void createTables(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS user (user_id IDENTITY, user_name VARCHAR, password VARCHAR)");
        stmt.execute("CREATE TABLE IF NOT EXISTS recipe (recipe_id IDENTITY, recipe_join_id INT, recipe_name VARCHAR, description VARCHAR, ingredients VARCHAR, preparation VARCHAR, prep_time VARCHAR, cook_time VARCHAR)");
    }

    // this method is inserting values into user dbase table
    // user_id is the identity and will be assigned automatically
    public static void insertUser(Connection conn, String userName, String password) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO user VALUES (NULL, ?, ?)");
        stmt.setString(1, userName);
        stmt.setString(2, password);
        stmt.execute();
    }

    // this method pulls ONE user from the dbase user table, returns user object
    public static User selectUser(Connection conn, String userName) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE user_name = ?");
        stmt.setString(1, userName);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            int userId = results.getInt("user_id");
            String password = results.getString("password");
            User user = new User(userId, userName, password);
            return user;
        }
        return null;  //this is for safety, incase the requested recipe does not exist
    }

    // this method will insert recipe values into dbase recipe table
    public static void insertRecipe(Connection conn, int recipeJoinId, String recipeName, String description, String ingredients,
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

    public static Recipe selectRecipe(Connection conn, int recipeId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipe WHERE recipe_id = ?");
        stmt.setInt(1, recipeId);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {  // results.next() essentially checks the dbase table for a valid recipe_id value, and continues if true
            int recipeJoinId = results.getInt("recipe_join_id");
            String recipeName = results.getString("recipe_name");
            String description = results.getString("description");
            String ingredient = results.getString("ingredients");
            String preparation = results.getString("preparation");
            String prepTime = results.getString("prep_time");
            String cookTime = results.getString("cook_time");
            Recipe recipe = new Recipe(recipeId, recipeJoinId, recipeName, description, ingredient, preparation, prepTime, cookTime);
            return recipe;
        }
        return null; //this is for safety, incase the requested recipe does not exist
    }

    // using below method to obtain every recipe, regardless of user
    public static ArrayList<Recipe> selectRecipes(Connection conn) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipe");
        ResultSet results = stmt.executeQuery();
        ArrayList recipeList = new ArrayList();
        while (results.next()) {
            int recipeId = results.getInt("recipe_id");
            int recipeJoinId = results.getInt("recipe_join_id");
            String recipeName = results.getString("recipe_name");
            String description = results.getString("description");
            String ingredient = results.getString("ingredients");
            String preparation = results.getString("preparation");
            String prepTime = results.getString("prep_time");
            String cookTime = results.getString("cook_time");
            Recipe recipe = new Recipe(recipeId, recipeJoinId, recipeName, description, ingredient, preparation, prepTime, cookTime);
            recipeList.add(recipe);
        }
        return recipeList;
    }

    //using below method to obtain a certain users recipes (perhaps to display on their home pages)
    public static ArrayList<Recipe> selectRecipesByUser(Connection conn, int userId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipe INNER JOIN user ON recipe_join_id = user_id WHERE user_id = ?");
        stmt.setInt(1, userId);
        ResultSet results = stmt.executeQuery();

        ArrayList recipeList = new ArrayList();
        while (results.next()) {
            int recipeId = results.getInt("recipe_id");
            int recipeJoinId = results.getInt("recipe_join_id");
            String recipeName = results.getString("recipe_name");
            String description = results.getString("description");
            String ingredient = results.getString("ingredients");
            String preparation = results.getString("preparation");
            String prepTime = results.getString("prep_time");
            String cookTime = results.getString("cook_time");
            Recipe recipe = new Recipe(recipeId, recipeJoinId, recipeName, description, ingredient, preparation, prepTime, cookTime);
            recipeList.add(recipe);
        }
        return recipeList;
    }

    // using below method to change values of a specific recipe in the dbase recipe table
    public static void updateRecipe(Connection conn, String recipeName, String description, String ingredients, String preparation, String prepTime, String cookTime, int recipeId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("UPDATE recipe SET recipe_name = ?, description = ?, ingredients = ?, preparation = ?, prep_time = ?, cook_time = ? WHERE recipe_id = ?");
        stmt.setString(1, recipeName);
        stmt.setString(2, description);
        stmt.setString(3, ingredients);
        stmt.setString(4, preparation);
        stmt.setString(5, prepTime);
        stmt.setString(6, cookTime);
        stmt.setInt(7, recipeId);
        stmt.execute();
    }

    // using below method to delete a recipe from the dbase recipe table. duh
    public static void deleteRecipe(Connection conn, int recipeId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM recipe WHERE recipe_id = ?");
        stmt.setInt(1, recipeId);
        stmt.execute();
    }

    public static void main(String[] args) throws SQLException {
        Spark.externalStaticFileLocation("public");
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTables(conn);

        insertUser(conn, "BILLY JEAN", "PASSWORD!!!!");
        insertRecipe(conn, 1, "SPAGHETTI!!!", "LOTS OF SPAGHETTI", "SPAGHTTI THINGS", "PREPARE THE SPAGHETTI", "PREP THAT SHIT!", "COOK IT! DO IT!");

        Spark.init();
        Spark.get(
                "/getRecipes",
                ((request, response) -> {
                    JsonSerializer serializer = new JsonSerializer();
                    return serializer.serialize(selectRecipes(conn));
                })
        );
        Spark.get(
                "/getRecipesFromUser",
                ((request, response) -> {
                    User user = getUserFromSession(request.session(), conn);
                    int userId = user.userId;
                    JsonSerializer serializer = new JsonSerializer();
                    return serializer.serialize(selectRecipesByUser(conn, userId));
                })
        );
        Spark.post(
                "/login",
                ((request, response)-> {
                    String userName = request.queryParams("userName");  // ****NOT SURE ABOUT PARAMETER NAMES
                    String password = request.queryParams("password");  // ********
                    User user = selectUser(conn, userName);
                    Session session = request.session();
                    JsonSerializer serializer = new JsonSerializer();
                    if (user.password.equals(password) && userName != null) {
                        session.attribute("userName", userName);
                        return serializer.serialize(selectUser(conn, userName));
                    }
                    else if (user == null) {
                        return "User Name not recognized. Please create an account!";
                    }
                    else if (user.password != password) {
                        return "User Name and/or password not recognized.";
                    }
                    return "";
                })
        );
        Spark.post(
                "/logout",
                ((request, response) -> {
                    Session session = request.session();
                    session.invalidate();
                    return "";
                })
        );
        Spark.post(
                "/createUser",
                ((request, response) -> {
                    String userName = request.queryParams("userName");
                    String password = request.queryParams("password");
                    Session session = request.session();
                    JsonSerializer serializer = new JsonSerializer();
                    if (userName == null) {
                        return "Invalid Username";
                    }
                    else if (password == null) {
                        return "Invalid Password";
                    }
                    else {
                        insertUser(conn, userName, password);
                        session.attribute("userName", userName);
                        return serializer.serialize(selectUser(conn, userName));
                    }
                })
        );
        Spark.post(
                "/addRecipe",
                ((request, response) -> {
                    User user = getUserFromSession(request.session(), conn);
                    int userId = user.userId;
                    String recipeName = request.queryParams("recipeName");
                    String description = request.queryParams("description");
                    String ingredients = request.queryParams("ingredients");
                    String preparation = request.queryParams("preparation");
                    String prepTime = request.queryParams("prepTime");
                    String cookTime = request.queryParams("cookTime");
                    insertRecipe(conn, userId, recipeName, description, ingredients, preparation, prepTime, cookTime);
                    return "";
                })
        );
        Spark.post(
                "/deleteRecipe",
                ((request, response) -> {
                    int recipeId = Integer.valueOf(request.queryParams("recipeId"));
                    deleteRecipe(conn, recipeId);
                    return "";
                })
        );
        Spark.post(
                "/updateRecipe",
                ((request, response) -> {
                    String recipeName = request.queryParams("recipeName");
                    String description = request.queryParams("description");
                    String ingredients = request.queryParams("ingredients");
                    String preparation = request.queryParams("preparation");
                    String prepTime = request.queryParams("prepTime");
                    String cookTime = request.queryParams("cookTime");
                    int recipeId = Integer.valueOf(request.queryParams("recipeId"));
                    updateRecipe(conn, recipeName, description, ingredients, preparation, prepTime, cookTime, recipeId);
                    return "";
                })
        );

    }

    static User getUserFromSession(Session session, Connection conn) throws SQLException {
        String userName = session.attribute("userName");
        return selectUser(conn, userName);
    }
}
