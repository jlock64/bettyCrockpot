import org.junit.Test;
import static org.junit.Assert.*;

import java.sql.*;
import java.util.ArrayList;

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
    public void insertUser() throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "Kevin", "password");
        User user = Main.selectUser(conn, 1);
        endConnection(conn);
        assertTrue(user != null);
    }

    @Test
    public void insertRecipe() throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 1, "Test", "Test", "Test", "Test", "Test", "Test");
        Recipe recipe = Main.selectRecipe(conn, 1);
        endConnection(conn);
        assertTrue(recipe != null);
    }

    @Test
    public void selectRecipes() throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 1, "Test", "Test", "Test", "Test", "Test", "Test");
        ArrayList list = Main.selectRecipes(conn);
        endConnection(conn);
        assertTrue(list != null);
    }

    @Test // Not sure if this test is verifying the correct argument
    public void selectRecipesByUser() throws SQLException {
        Connection conn = startConnection();
        Main.insertUser(conn, "Kevin", "password");
        Main.insertRecipe(conn, 1, "Test", "Test", "Test", "Test", "Test", "Test");
        ArrayList list = Main.selectRecipesByUser(conn, 1);
        endConnection(conn);
        assertTrue(list != null);
    }

    @Test
    public void updateRecipes() throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 1, "Test", "Test", "Test", "Test", "Test", "Test");
        Recipe one = Main.selectRecipe(conn, 1);
        Main.updateRecipe(conn,"New", "Test", "Test", "Test", "Test", "Test", 1);
        Recipe two = Main.selectRecipe(conn, 1);
        endConnection(conn);
        assertTrue(one != two);
    }

    @Test
    public void deleteRecipe() throws SQLException {
        Connection conn = startConnection();
        Main.insertRecipe(conn, 1, "Test", "Test", "Test", "Test", "Test", "Test");
        Recipe recipe = Main.selectRecipe(conn, 1);
        Main.deleteRecipe(conn, 1);
        endConnection(conn);
        assertTrue(recipe != null);
    }
}
