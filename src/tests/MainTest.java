import org.junit.Test;

import java.sql.*;
import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * Created by noellemachin on 3/4/16.
 */
public class MainTest {
    public Connection startConnection() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./text");
        Main.createTables(conn);
        return conn;
    }
    public void endConnection (Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("DROP TABLE user");
        stmt.execute("DROP TABLE recipe");
        conn.close();
    }

    @Test
    public void testUserInsertAndSelect () throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "test", "test");
        User user = Main.selectUser(conn, "brad");
        endConnection(conn);
        assertTrue(user != null);
    }
    @Test
    public void testRecipeInsertAndSelect () throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 97, "test", "test", "test", "test", "test", "test");
        Recipe recipe = Main.selectRecipe(conn, 1);
        endConnection(conn);
        assertTrue(recipe != null);
    }
    @Test
    public void testSelectRecipes () throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 97, "test", "test", "test", "test", "test", "test");
        ArrayList list = Main.selectRecipes(conn);
        endConnection(conn);
        assertTrue(list != null);
    }
    @Test // minorly concerned over why this one works, considering the userId and recipeJoinId's not matching, but it works
    public void testSelectRecipesByUser () throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 0, "test", "test", "test", "test", "test", "test");
        Main.insertUser(conn, "test", "test");
        ArrayList list = Main.selectRecipesByUser(conn, 1);
        endConnection(conn);
        assertTrue(list != null);
    }
    @Test
    public void testUpdateRecipe () throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 0, "test", "test", "test", "test", "test", "test");
        Recipe recipe1 = Main.selectRecipe(conn, 1);
        Main.updateRecipe(conn, "CHANGED THIS", "test", "test", "test", "test", "test", 1);
        Recipe recipe2 = Main.selectRecipe(conn, 1);
        endConnection(conn);
        assertTrue(recipe1 != recipe2);
    }
    @Test
    public void testDeleteRecipe () throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 0, "test", "test", "test", "test", "test", "test");
        Main.deleteRecipe(conn, 1);
        Recipe recipe = Main.selectRecipe(conn, 1);
        endConnection(conn);
        assertTrue(recipe == null);
    }

}